// Scroll-spy for side navigation — updates aria-current and highlight bar
(function () {
  var nav = document.getElementById('side-nav');
  if (!nav) return;

  var desktopNav = nav.querySelector('.side-nav__desktop');
  var links = nav.querySelectorAll('.side-nav__link');
  var list = desktopNav ? desktopNav.querySelector('.side-nav__list') : nav.querySelector('.side-nav__list');
  var highlight = list ? list.querySelector('.side-nav__highlight') : null;
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
          var li = link.parentElement;
          var offset = li.offsetTop;
          var height = li.offsetHeight;
          highlight.style.transform = 'translateY(' + offset + 'px)';
          highlight.style.height = height + 'px';
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
        var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: motionOk ? 'smooth' : 'auto', block: 'start' });
        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
})();
