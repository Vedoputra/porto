(function () {
  var items = document.querySelectorAll('.reveal');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

(function () {
  var headings = document.querySelectorAll('.type-heading');
  if (!headings.length) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var typingSpeed = 90;

  function setupHeading(heading) {
    var textEl = heading.querySelector('.type-text');
    if (!textEl) return;
    var planeWrap = heading.querySelector('.plane-wrap');
    var fullText = textEl.getAttribute('data-full-text') || textEl.textContent;

    function typeIt() {
      textEl.textContent = '';
      var i = 0;

      (function step() {
        textEl.textContent = fullText.slice(0, i);
        if (i < fullText.length) {
          i++;
          setTimeout(step, typingSpeed);
        } else if (planeWrap) {
          planeWrap.classList.add('is-in');
        }
      })();
    }

    if (prefersReduced) {
      if (planeWrap) planeWrap.classList.add('is-in');
      return;
    }

    if ('IntersectionObserver' in window) {
      var headingObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            typeIt();
            headingObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      headingObserver.observe(heading);
    } else {
      typeIt();
    }
  }

  headings.forEach(setupHeading);
})();
