document.addEventListener('DOMContentLoaded', () => {
  const STUDENT_NAME = 'Kelyandame Oluwafolajimi Akinlade';
  const firstName = STUDENT_NAME.split(' ')[0];

  document.querySelectorAll('[data-student-name]').forEach((nameNode) => {
    nameNode.textContent = nameNode.dataset.studentName === 'first' ? firstName : STUDENT_NAME;
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const yearNode = document.querySelector('[data-current-year]');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const portfolioVideo = document.querySelector('#portfolio-video');
  const mediaFallback = document.querySelector('#media-fallback');

  if (portfolioVideo && mediaFallback) {
    portfolioVideo.addEventListener('loadedmetadata', () => {
      portfolioVideo.hidden = false;
      mediaFallback.hidden = true;
    });

    portfolioVideo.addEventListener('error', () => {
      portfolioVideo.hidden = true;
      mediaFallback.hidden = false;
    });

    portfolioVideo.load();
  }
});
