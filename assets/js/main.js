'use strict';

(function () {
  var isEn = (document.documentElement.lang || '').indexOf('en') === 0;
  /* Graphe causal : tracé des arêtes une seule fois au chargement. */
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!calm) {
    Array.prototype.forEach.call(document.querySelectorAll('.graph'), function (fig) {
      var svg = Array.prototype.filter.call(fig.querySelectorAll('svg'), function (s) { return s.getBoundingClientRect().width > 0; })[0];
      if (!svg) return;
      Array.prototype.forEach.call(svg.querySelectorAll('.g-edge:not(.g-edge--future)'), function (e) {
        e.style.setProperty('--len', Math.ceil(e.getTotalLength()) + 'px');
      });
      fig.classList.add('draw-in');
      window.setTimeout(function () { fig.classList.remove('draw-in'); }, 1400);
    });
  }

  /* Graphe causal : au survol ou au focus d'un nœud, on allume ses causes et ses effets. */
  Array.prototype.forEach.call(document.querySelectorAll('.graph svg'), function (svg) {
    var figure = svg.closest('.graph');
    var edges = Array.prototype.slice.call(svg.querySelectorAll('.g-edge'));
    var nodes = {};
    Array.prototype.forEach.call(svg.querySelectorAll('.g-node'), function (n) { nodes[n.getAttribute('data-id')] = n; });

    function walk(start, dir) {
      var seen = {}; var stack = [start];
      while (stack.length) {
        var id = stack.pop();
        edges.forEach(function (e) {
          var from = e.getAttribute('data-from'); var to = e.getAttribute('data-to');
          var next = dir === 'down' ? (from === id ? to : null) : (to === id ? from : null);
          if (next && !seen[next]) { seen[next] = true; stack.push(next); }
        });
      }
      return seen;
    }

    function trace(id) {
      var lit = walk(id, 'down'); var up = walk(id, 'up');
      Object.keys(up).forEach(function (k) { lit[k] = true; });
      lit[id] = true;
      figure.classList.add('is-tracing');
      Object.keys(nodes).forEach(function (k) {
        nodes[k].classList.toggle('is-lit', !!lit[k]);
        nodes[k].classList.toggle('is-focus', k === id);
      });
      edges.forEach(function (e) {
        e.classList.toggle('is-lit', !!lit[e.getAttribute('data-from')] && !!lit[e.getAttribute('data-to')]);
      });
    }

    function reset() {
      figure.classList.remove('is-tracing');
      Object.keys(nodes).forEach(function (k) { nodes[k].classList.remove('is-lit', 'is-focus'); });
      edges.forEach(function (e) { e.classList.remove('is-lit'); });
    }

    Object.keys(nodes).forEach(function (id) {
      var link = nodes[id].closest('a');
      var target = link || nodes[id];
      target.addEventListener('pointerenter', function () { trace(id); });
      target.addEventListener('pointerleave', reset);
      if (link) {
        link.addEventListener('focus', function () { trace(id); });
        link.addEventListener('blur', reset);
      }
    });
  });

  /* Visionneuse des captures d'écran (élément <dialog> natif). */
  var dlg = document.getElementById('lightbox');
  var dlgMedia = document.getElementById('lightbox-media');
  var dlgImg = document.createElement('img');
  dlgImg.className = 'lightbox-img';
  dlgImg.alt = '';
  if (dlgMedia) dlgMedia.appendChild(dlgImg);
  var dlgCap = document.getElementById('lightbox-cap');
  if (dlg && dlgMedia && dlgCap && typeof dlg.showModal === 'function') {
    Array.prototype.forEach.call(document.querySelectorAll('.shot a'), function (link) {
      link.addEventListener('click', function (ev) {
        ev.preventDefault();
        var img = link.querySelector('img');
        var cap = link.parentNode.querySelector('figcaption');
        dlgImg.src = link.getAttribute('href');
        dlgImg.alt = img ? img.alt : '';
        dlgCap.textContent = cap ? cap.textContent : '';
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', function (ev) { if (ev.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { dlgImg.removeAttribute('src'); });
  }

  /* Copie de l'adresse courriel, avec repli par sélection. */
  var btn = document.getElementById('copy');
  var email = document.getElementById('email');
  var status = document.getElementById('copy-status');
  if (btn && email && status) {
    var selectFallback = function () {
      var r = document.createRange(); r.selectNodeContents(email);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      status.textContent = isEn ? 'Address selected. Copy it with Ctrl+C or Cmd+C.' : 'Adresse sélectionnée. Copiez-la avec Ctrl+C ou Cmd+C.';
    };
    btn.addEventListener('click', function () {
      var text = email.textContent.trim();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { status.textContent = isEn ? 'Address copied.' : 'Adresse copiée.'; }, selectFallback);
        } else { selectFallback(); }
      } catch (e) { selectFallback(); }
    });
  }
})();
