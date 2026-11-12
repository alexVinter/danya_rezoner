interface TelegramMessage {
  botToken: string;
  chatId: string;
  text: string;
}

/** Report success only after Telegram (directly or through the existing proxy) confirms it. */
export async function sendTelegramMessage(
  { botToken, chatId, text }: TelegramMessage,
  request: typeof fetch = fetch,
): Promise<boolean> {
  const body = JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' });
  const endpoints = [
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    `/api/telegram/bot${botToken}/sendMessage`,
  ];
  for (const endpoint of endpoints) {
    try {
      const response = await request(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.ok === true) return true;
    } catch {
      // The current hosting may provide a proxy when the direct API is unavailable.
    }
  }
  return false;
}
