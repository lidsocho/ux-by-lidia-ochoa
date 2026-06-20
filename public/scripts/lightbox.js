(() => {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Expanded image view');
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close image viewer">&times;</button>' +
    '<div class="lightbox-content">' +
      '<img class="lightbox-content__img" alt="" />' +
      '<p class="lightbox-caption"></p>' +
    '</div>';
  document.body.appendChild(overlay);

  var lbImg = overlay.querySelector('.lightbox-content__img');
  var lbCaption = overlay.querySelector('.lightbox-caption');
  var opening = false;

  function close() {
    if (opening) return;
    overlay.classList.remove('lightbox-overlay--open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  document.addEventListener('click', function (e) {
    var img = e.target.closest('img');
    if (!img) return;
    // Skip decorative device frame images
    if (img.getAttribute('aria-hidden') === 'true') return;
    if (img.classList.contains('png-device-frame__device')) return;
    // Skip header logo, footer, nav images
    if (img.closest('header, footer, nav')) return;
    // Skip the lightbox itself
    if (img.closest('.lightbox-overlay')) return;

    // Check for a description on a parent [data-lightbox] element
    var lightboxParent = img.closest('[data-lightbox]');
    var description = lightboxParent ? lightboxParent.getAttribute('data-description') || '' : '';

    e.stopPropagation();
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = description;
    lbCaption.style.display = description ? '' : 'none';
    opening = true;
    overlay.classList.add('lightbox-overlay--open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { opening = false; }, 100);
  });
})();
