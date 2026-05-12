// Main JavaScript for gilleswb.github.io
// Navigation behavior: hamburger menu, smooth scroll, active link highlighting

// Enable JS-dependent styles (hides mobile nav by default when JS is available)
document.documentElement.classList.add('js-enabled');

(function () {
  'use strict';

  // ========================================================================
  // Hamburger Menu Toggle
  // ========================================================================

  const toggle = document.querySelector('.site-nav__toggle');
  const navList = document.getElementById('nav-menu');

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('site-nav__list--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ========================================================================
  // Smooth Scroll (JS-based for 300-500ms timing control)
  // ========================================================================

  // Disable CSS smooth scroll so JS handles it with precise timing
  document.documentElement.style.scrollBehavior = 'auto';

  var SCROLL_DURATION = 400; // ms (within 300-500ms requirement)

  function smoothScrollTo(targetY, duration) {
    var startY = window.pageYOffset;
    var distance = targetY - startY;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      // Ease-in-out quad
      var ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, startY + distance * ease);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  var navLinks = document.querySelectorAll('.site-nav__link');
  var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 60;

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu
      if (navList) {
        navList.classList.remove('site-nav__list--open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      }

      // Calculate target position (below the fixed nav)
      var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      smoothScrollTo(targetTop, SCROLL_DURATION);
    });
  });

  // ========================================================================
  // Active Link Highlighting (IntersectionObserver)
  // ========================================================================

  var sections = document.querySelectorAll('main > section[id]');

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    var observerOptions = {
      root: null,
      rootMargin: '-' + navHeight + 'px 0px -40% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('site-nav__link--active');
            } else {
              link.classList.remove('site-nav__link--active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
