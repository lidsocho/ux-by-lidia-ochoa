// Scroll-spy for side navigation — updates aria-current and highlight pill
(function () {
  var nav = document.getElementById('side-nav');
  if (!nav) return;

  var links = nav.querySelectorAll('.side-nav__link');
  var list = nav.querySelector('.side-nav__list');
  var highlight = nav.querySelector('.side-nav__highlight');
  if (!links.length) return;

  var sectionIds = [];
  links.forEach(function (link) {
    var id = link.getAttribute('data-section');
    if (id) sectionIds.push(id);
  });

  // Track which sections are currently visible
  var visibleSections = new Set();

  function setActive(id) {
    links.forEach(function (link) {
      var isActive = link.getAttribute('data-section') === id;
      if (isActive) {
        link.setAttribute('aria-current', 'true');
        if (highlight && list) {
          // Use actual DOM position instead of hardcoded offset
          var offset = link.parentElement.offsetTop;
          highlight.style.transform = 'translateY(' + offset + 'px)';
        }
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // Activate the topmost visible section in DOM order
  function activateTopmost() {
    for (var i = 0; i < sectionIds.length; i++) {
      if (visibleSections.has(sectionIds[i])) {
        setActive(sectionIds[i]);
        return;
      }
    }
  }

  // Intersection Observer watches each section
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });
      activateTopmost();
    },
    {
      rootMargin: '-10% 0px -50% 0px',
      threshold: 0,
    }
  );

  sectionIds.forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  // Smooth scroll on nav link click
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = link.getAttribute('data-section');
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
})();
