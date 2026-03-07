// Scroll-triggered reveal animations — respects prefers-reduced-motion
(function () {
  // Bail out if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Make all reveal elements visible immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute('data-delay');

          if (delay) {
            setTimeout(function () {
              el.classList.add('is-visible');
            }, parseInt(delay, 10));
          } else {
            el.classList.add('is-visible');
          }

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });

  // Handle stagger delays for grouped elements
  document.querySelectorAll('[data-stagger]').forEach(function (parent) {
    var stagger = parseInt(parent.getAttribute('data-stagger'), 10) || 100;
    var children = parent.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      child.style.transitionDelay = (i * stagger) + 'ms';
    });
  });
})();
