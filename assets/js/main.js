'use strict';
(function () {
  // Tracé ECG : se dessine une fois quand la bande entre à l'écran.
  var strip = document.querySelector('.strip');
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (strip && !calm && 'IntersectionObserver' in window) {
    var r = strip.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      strip.classList.add('armed');
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          strip.classList.remove('armed');
          strip.classList.add('drawing');
          io.disconnect();
        }
      }, { threshold: 0.4 });
      io.observe(strip);
    }
  }
  var dlg = document.getElementById('lightbox');
  var dlgImg = document.getElementById('lightbox-img');
  var dlgCap = document.getElementById('lightbox-cap');
  if (dlg && dlgImg && dlgCap && typeof dlg.showModal === 'function') {
    Array.prototype.forEach.call(document.querySelectorAll('.shot-link'), function (link) {
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
    dlg.addEventListener('click', function (ev) {
      if (ev.target === dlg) dlg.close();
    });
    dlg.addEventListener('close', function () { dlgImg.src = 'data:,'; });
  }
  var btn = document.getElementById('copy');
  var email = document.getElementById('email');
  var status = document.getElementById('copy-status');
  if (btn && email && status) {
    btn.addEventListener('click', function () {
      var text = email.textContent.trim();
      function selectFallback() {
        var r = document.createRange(); r.selectNodeContents(email);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        status.textContent = 'Adresse sélectionnée, copiez-la avec Ctrl+C ou Cmd+C.';
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            status.textContent = 'Adresse copiée.';
          }, selectFallback);
        } else { selectFallback(); }
      } catch (e) { selectFallback(); }
    });
  }
})();
