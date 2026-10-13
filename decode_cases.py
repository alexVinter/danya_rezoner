import sys

# Test mapping
# In Case 1:
# ˜@>42865=85 >=;09=-:>=D5@5=F88 4;O 1CE30;B5@>2
# Продвижение онлайн-конференции для бухгалтеров
pairs = [
    ("˜@>42865=85 >=;09=-:>=D5@5=F88 4;O 1CE30;B5@>2", "Продвижение онлайн-конференции для бухгалтеров"),
    (" 040G0. ˜@82;5GL @538AB@0F88 3;02=KE 1CE30;B5@>2", "Задача. Привлечь регистрации главных бухгалтеров"),
    ("5H5=85.", "Решение."),
    ("!>E@0=OBL", "Сохранять"),
    ("!@54=89", "Средний"),
    ("'B> A@01>B0;>", "Что сработало"),
    (" 87C0;", "Визуал"),
    (" 0?CAB8;", "Запустил"),
    ("!B0;>.", "Стало."),
    (" K;>.", "Было."),
    ("˜;0=", "План")
]

char_map = {}
for enc, dec in pairs:
    for e, d in zip(enc, dec):
        char_map[e] = d

with open('cases_summary.txt', 'r', encoding='utf-8') as f:
    text = f.read()

decoded = []
for ch in text:
    if ch in char_map:
        decoded.append(char_map[ch])
    else:
        # Check standard Cyrillic ASCII shift
        # In many older converters:
        # '@' (64) -> 'р' (1088), diff = 1024
        # 'A' (65) -> 'с' (1089), diff = 1024
        # 'B' (66) -> 'т' (1090), diff = 1024
        # Let's check if ord(ch) + 1024 is in cyrillic!
        code = ord(ch)
        if 0x20 <= code <= 0x7E:
            cyr_code = code + 1024 # 0x400
            # Let's check
            decoded.append(chr(cyr_code) if 1040 <= cyr_code <= 1105 else ch)
        else:
            decoded.append(ch)

with open('cases_decoded.txt', 'w', encoding='utf-8') as f:
    f.write("".join(decoded))

print("Decoded written to cases_decoded.txt")
