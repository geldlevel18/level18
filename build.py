#!/usr/bin/env python3
"""Level 18 – bouwt de site opnieuw uit data/regels.json.
Gebruik: python3 build.py   (na elke wijziging in data/regels.json)"""
import json, re, os, sys, datetime
D = os.path.dirname(os.path.abspath(__file__))
R = json.load(open(os.path.join(D, 'data', 'regels.json'), encoding='utf-8'))

def nl(v):
    if isinstance(v, str): return v
    if isinstance(v, bool): return str(v)
    if abs(v - round(v)) < 1e-9: return f"{int(round(v)):,}".replace(',', '.')
    return f"{v:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')

MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december']
d = datetime.date.fromisoformat(R['gecontroleerd'])
EXTRA = {
  'gecontroleerd_nl': f"{d.day} {MAANDEN[d.month-1]} {d.year}",
  'bronnen_html': ''.join(f'<li><a href="{b["u"]}" target="_blank" rel="noopener">{b["t"]}</a></li>' for b in R['bronnen']),
}

def render(src):
    def rep(m):
        k = m.group(1).strip()
        if k == 'js:ALL': return json.dumps(R, ensure_ascii=False)
        if k.startswith('js:'): return json.dumps(R[k[3:]], ensure_ascii=False)
        if k.startswith('='): return nl(eval(k[1:], {'round': round, 'max': max, 'min': min}, R))
        if k in EXTRA: return EXTRA[k]
        if k in ('jaar','jaar_volgend'): return str(R[k])
        if k in R: return nl(R[k])
        sys.exit(f'Onbekende sleutel in sjabloon: {k}')
    return re.sub(r'\{\{\s*([^}]+?)\s*\}\}', rep, src)

TARGETS = [
  ('app/index.template.html', 'app/index.html', {'p': '', 'over': '../organisaties.html'}),
  ('app/index.template.html', 'index.html', {'p': 'app/', 'over': 'organisaties.html'}),
  ('index.template.html', 'organisaties.html', {}),
]
for tpl, out, extra in TARGETS:
    p = os.path.join(D, tpl)
    if os.path.exists(p):
        EXTRA.update(extra)
        open(os.path.join(D, out), 'w', encoding='utf-8').write(render(open(p, encoding='utf-8').read()))
        print('gebouwd:', out)
