import os, fitz

cases_dir = 'cases'
for filename in sorted(os.listdir(cases_dir)):
    if not filename.endswith('.pdf'):
        continue
    filepath = os.path.join(cases_dir, filename)
    doc = fitz.open(filepath)
    print(f"==================================================")
    print(f"FILE: {filename} (pages: {len(doc)})")
    for i, page in enumerate(doc):
        text = page.get_text()
        print(f"--- Page {i+1} ---")
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        for l in lines[:10]: # print first 10 lines of each page
            print(f"  {l}")
        if len(lines) > 10:
            print(f"  ... ({len(lines)-10} more lines)")
