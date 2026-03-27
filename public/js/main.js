document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    // Kontrola a zobrazení souhlasu s cookies
    if (!cookiesAccepted) {
      cookieConsent.style.display = 'block';
    }

    // Posluchač události pro tlačítko "Souhlasím"
    acceptCookiesButton.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieConsent.style.display = 'none';
    });

    // Fade-in on scroll (excluding hero section)
    const fadeTargets = [
      ...document.querySelectorAll('.row--fact'),
      ...document.querySelectorAll('.arguments__item'),
      ...document.querySelectorAll('.services > div'),
      ...document.querySelectorAll('.nzu, .webAplikace, .career, .contact'),
    ];

    fadeTargets.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeTargets.forEach(el => observer.observe(el));
  });