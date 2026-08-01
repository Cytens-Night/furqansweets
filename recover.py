import json

log_path = r"C:\Users\busin\.gemini\antigravity\brain\77c37537-a845-43d4-89c5-e7b8698b1a5d\.system_generated\logs\transcript_full.jsonl"
svg_content = None

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get('content', '')
            if 'uuid-1e7ee34c-e638-484f-bf6c-1ab83fd836e8' in content and '<?xml' in content:
                start = content.find('<?xml')
                end = content.rfind('</svg>') + 6
                if start != -1 and end != -1:
                    svg_content = content[start:end]
                    break
        except json.JSONDecodeError:
            continue

if svg_content:
    with open(r"c:\Users\busin\OneDrive\Desktop\Furqansweets  website\assets\furqansweets logo.svg", 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print("Extracted successfully!")
else:
    print("Could not find SVG in logs.")
