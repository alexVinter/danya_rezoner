import json

def get_block_val(entry):
    if not isinstance(entry, dict):
        return {}
    val = entry.get('value', {})
    if isinstance(val, dict) and 'value' in val:
        return val['value']
    return val

def extract_text(title_chunks):
    if not title_chunks or not isinstance(title_chunks, list):
        return ""
    res = []
    for c in title_chunks:
        if isinstance(c, list) and len(c) > 0:
            res.append(str(c[0]))
        elif isinstance(c, str):
            res.append(c)
    return "".join(res)

def parse_page(json_path, out_path, root_target_id):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    blocks = data.get('recordMap', {}).get('block', {})
    print(f"Total blocks in {json_path}: {len(blocks)}")
    
    lines = []
    visited = set()

    def traverse(block_id, depth=0):
        if block_id in visited:
            return
        visited.add(block_id)
        if block_id not in blocks:
            return
        val = get_block_val(blocks[block_id])
        if not val:
            return
        btype = val.get('type', '')
        props = val.get('properties', {})
        text = extract_text(props.get('title', []))
        indent = "  " * depth
        
        if btype == 'page':
            lines.append(f"{indent}# PAGE: {text}")
        elif btype == 'header':
            lines.append(f"{indent}# {text}")
        elif btype == 'sub_header':
            lines.append(f"{indent}## {text}")
        elif btype == 'sub_sub_header':
            lines.append(f"{indent}### {text}")
        elif btype == 'bulleted_list':
            lines.append(f"{indent}* {text}")
        elif btype == 'numbered_list':
            lines.append(f"{indent}1. {text}")
        elif btype == 'to_do':
            checked = props.get('checked', [['No']])[0][0] == 'Yes'
            lines.append(f"{indent}[{'x' if checked else ' '}] {text}")
        elif btype == 'callout':
            lines.append(f"{indent}> [CALLOUT] {text}")
        elif btype == 'quote':
            lines.append(f"{indent}> {text}")
        elif btype == 'divider':
            lines.append(f"{indent}---")
        elif btype == 'text':
            if text.strip():
                lines.append(f"{indent}{text}")
        elif btype == 'table_row':
            cells = []
            for col_id, col_chunks in props.items():
                cells.append(extract_text(col_chunks))
            lines.append(f"{indent}| " + " | ".join(cells) + " |")
        else:
            if text.strip():
                lines.append(f"{indent}[{btype}] {text}")
                
        children = val.get('content', [])
        for ch in children:
            traverse(ch, depth + 1)

    # Start at root_target_id
    if root_target_id in blocks:
        traverse(root_target_id, 0)
    
    # Also dump any unvisited blocks
    unvisited_lines = []
    for b_id in blocks:
        if b_id not in visited:
            val = get_block_val(blocks[b_id])
            btype = val.get('type', '')
            props = val.get('properties', {})
            text = extract_text(props.get('title', []))
            if text.strip():
                unvisited_lines.append(f"[{btype}] {text}")
                
    if unvisited_lines:
        lines.append("\n\n--- UNVISITED / ADDITIONAL BLOCKS ---")
        lines.extend(unvisited_lines)
            
    with open(out_path, 'w', encoding='utf-8') as out:
        out.write("\n".join(lines))
    print(f"Wrote {out_path} ({len(lines)} lines)")

if __name__ == '__main__':
    parse_page('page1.json', 'page1_parsed.md', '3f435814-86cf-8018-96b5-d7444df7f976')
    parse_page('page2.json', 'page2_parsed.md', '3f435814-86cf-80f6-9f31-e5c0862818ba')
