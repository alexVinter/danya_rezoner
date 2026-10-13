const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function launchEdge(port, width, height) {
  const edgePath = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
    ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`
  ]);

  let connected = false;
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/json`, res => {
          if (res.statusCode === 200) resolve();
          else reject(new Error('Status ' + res.statusCode));
        });
        req.on('error', reject);
        req.setTimeout(500, () => req.abort());
      });
      connected = true;
      break;
    } catch (e) {
      // retry
    }
  }

  if (!connected) {
    edge.kill();
    throw new Error(`Edge failed to start on port ${port}`);
  }

  return edge;
}

async function connectCDP(port) {
  const tabs = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTab = tabs.find(t => t.type === 'page');
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    callbacks.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.onopen = r);

  return { ws, send };
}

async function generateSingleMockup({
  url,
  viewportWidth,
  viewportHeight,
  isMobile = false,
  triggerAction = null,
  outputPath,
  port
}) {
  console.log(`\nGenerating: ${path.basename(outputPath)} (${isMobile ? 'Mobile 390px' : 'Desktop 1440px'})`);
  const edge = await launchEdge(port, viewportWidth, viewportHeight);

  try {
    const { ws, send } = await connectCDP(port);

    await send('Page.enable');
    await send('DOM.enable');

    if (isMobile) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: viewportWidth,
        height: viewportHeight,
        deviceScaleFactor: 2,
        mobile: true,
        fitWindow: false
      });
      await send('Emulation.setUserAgentOverride', {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
      });
    } else {
      await send('Emulation.setDeviceMetricsOverride', {
        width: viewportWidth,
        height: viewportHeight,
        deviceScaleFactor: 1,
        mobile: false,
        fitWindow: false
      });
    }

    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 2500));

    // Wait for fonts & images
    await send('Runtime.evaluate', {
      expression: `
        Promise.all([
          document.fonts.ready,
          Promise.all(Array.from(document.images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
          }))
        ])
      `,
      awaitPromise: true
    });

    if (triggerAction) {
      console.log('  Executing trigger action...');
      await send('Runtime.evaluate', {
        expression: triggerAction,
        awaitPromise: true
      });
      await new Promise(r => setTimeout(r, 1500));
    }

    // Inject clean artboard print styles
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const style = document.createElement('style');
          style.id = 'print-artboard-fix';
          style.innerHTML = \`
            @media print {
              @page {
                margin: 0 !important;
                size: auto !important;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
                height: auto !important;
              }
              .min-h-screen {
                min-height: auto !important;
              }
              header {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
              }
            }
          \`;
          document.head.appendChild(style);
        })()
      `
    });

    // Emulate print media to get precise dimensions under print styles
    await send('Emulation.setEmulatedMedia', { media: 'print' });
    await new Promise(r => setTimeout(r, 400));

    const dims = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const body = document.body;
          const html = document.documentElement;
          const height = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
          );
          return {
            width: ${viewportWidth},
            height: height
          };
        })()
      `,
      returnByValue: true
    });

    const val = dims.result?.result?.value || dims.result?.value;
    if (!val) {
      throw new Error(`Failed to measure dimensions: ${JSON.stringify(dims)}`);
    }

    const { width, height } = val;
    console.log(`  Measured print size: ${width} x ${height} px`);

    // Give 150px cushion so that under NO circumstance does Chromium break into page 2
    const paperWidth = +(width / 96).toFixed(4);
    const paperHeight = +((height + 150) / 96).toFixed(4);

    console.log(`  Target Artboard size: ${paperWidth}" x ${paperHeight}"`);

    const pdfData = await send('Page.printToPDF', {
      landscape: false,
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      paperWidth,
      paperHeight,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      scale: 1
    });

    if (pdfData.result && pdfData.result.data) {
      const buffer = Buffer.from(pdfData.result.data, 'base64');
      fs.writeFileSync(outputPath, buffer);

      // Verify page count
      const pdfText = buffer.toString('binary');
      const pageMatches = pdfText.match(/\/Type\s*\/Page\b/g);
      const pageCount = pageMatches ? pageMatches.length : 'unknown';

      console.log(`  [OK] Saved PDF (${buffer.length} bytes, ${pageCount} page): ${outputPath}`);
    } else {
      console.error('  [FAIL] Failed to generate PDF:', pdfData);
    }

    ws.close();
  } finally {
    edge.kill();
  }
}

async function main() {
  const desktopOut = path.join(process.cwd(), 'danya_site_desktop_mockup.pdf');
  const mobileOut = path.join(process.cwd(), 'danya_site_mobile_mockup.pdf');
  const serviceOut = path.join(process.cwd(), 'danya_service_mockup.pdf');
  const caseOut = path.join(process.cwd(), 'danya_case_study_mockup.pdf');

  console.log('=== GENERATING CLEAN ARTBOARD PDF MOCKUPS (NEW DESIGN) ===');

  // 1. Desktop Main Page
  await generateSingleMockup({
    url: 'http://127.0.0.1:3000/',
    viewportWidth: 1440,
    viewportHeight: 900,
    isMobile: false,
    outputPath: desktopOut,
    port: 9281
  });

  // 2. Mobile Main Page
  await generateSingleMockup({
    url: 'http://127.0.0.1:3000/',
    viewportWidth: 390,
    viewportHeight: 844,
    isMobile: true,
    outputPath: mobileOut,
    port: 9282
  });

  // 3. Service Detail Page (Telegram Ads)
  await generateSingleMockup({
    url: 'http://127.0.0.1:3000/#service-telegram-ads',
    viewportWidth: 1440,
    viewportHeight: 900,
    isMobile: false,
    outputPath: serviceOut,
    port: 9283
  });

  // 4. Case Study Page (Kontur.Ekstern)
  await generateSingleMockup({
    url: 'http://127.0.0.1:3000/#case-extern',
    viewportWidth: 1440,
    viewportHeight: 900,
    isMobile: false,
    outputPath: caseOut,
    port: 9284
  });

  console.log('\nAll Mockup PDFs successfully regenerated!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
