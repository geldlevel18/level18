/*! Level 18 plug-in – gratis te gebruiken door iedere organisatie.
   Plak op je website:
   <div data-level18 data-org="Naam organisatie" data-hulp="https://jouw-hulppagina.nl"></div>
   <script src="https://<level18-domein>/embed/level18.js" defer></script>
   Opties: data-mode="kaart" (standaard) of data-mode="iframe" (game direct in je pagina)
*/
(function () {
  var me = document.currentScript || (function () { var s = document.getElementsByTagName('script'); return s[s.length - 1]; })();
  var base = new URL('../', me.src).href;
  function safeUrl(u) { try { var x = new URL(u); return x.protocol === 'https:' ? x.href : ''; } catch (e) { return ''; } }
  function render(el) {
    if (el.dataset.level18Done) return; el.dataset.level18Done = '1';
    var org = (el.dataset.org || '').slice(0, 60), hulp = safeUrl(el.dataset.hulp || ''), mode = el.dataset.mode || 'kaart';
    var q = new URLSearchParams(); if (org) q.set('org', org); if (hulp) q.set('hulp', hulp);
    var url = base + (q.toString() ? '?' + q.toString() : '');
    var root = el.attachShadow ? el.attachShadow({ mode: 'open' }) : el;
    if (mode === 'iframe') {
      root.innerHTML = '<iframe src="' + url + '" title="Level 18 – geldgame" loading="lazy" style="width:100%;max-width:440px;height:780px;border:0;border-radius:24px;box-shadow:0 10px 40px rgba(0,0,0,.25)"></iframe>';
      return;
    }
    root.innerHTML =
      '<style>' +
      '.c{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:440px;background:linear-gradient(135deg,#2b1470,#c2187a);color:#fff;border-radius:24px;padding:22px 22px 20px;position:relative;overflow:hidden;box-shadow:0 10px 40px rgba(43,20,112,.35)}' +
      '.b{position:absolute;right:16px;top:14px;width:64px;height:64px;border-radius:50%;background:#c6ff3d;color:#1a1530;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:26px}' +
      '.k{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#c6ff3d}' +
      'h3{font-size:22px;line-height:1.15;margin:6px 80px 8px 0}' +
      'p{margin:0 0 14px;color:#ffe3f3;font-size:14px;line-height:1.45}' +
      'a.go{display:inline-block;background:#c6ff3d;color:#1a1530;font-weight:800;text-decoration:none;padding:13px 18px;border-radius:14px;font-size:15px}' +
      '.s{font-size:12px;color:#f6c6e2;margin-top:12px}' +
      '</style>' +
      '<div class="c"><div class="b">18</div><div class="k">Geld & volwassen worden</div>' +
      '<h3>Speel Level 18: de geldgame</h3>' +
      '<p>Zorgverzekering, toeslagen, bijbaan, Klarna en je eerste budget. Met je eigen bedragen.</p>' +
      '<a class="go" target="_blank" rel="noopener" href="' + url + '">Start de game →</a>' +
      '<div class="s">Gratis · geen account · klaar in 1 minuut</div></div>';
    if (org) {
      var s = document.createElement('div'); s.className = 's'; s.textContent = 'Aangeboden door ' + org;
      root.querySelector('.c').appendChild(s);
    }
  }
  function run() { document.querySelectorAll('[data-level18]').forEach(render); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
