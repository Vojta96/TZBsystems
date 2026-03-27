document.addEventListener('DOMContentLoaded', () => {
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptBtn     = document.getElementById('accept-cookies');

  if (cookieConsent && acceptBtn) {
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieConsent.style.display = 'flex';
    }
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieConsent.style.display = 'none';
    });
  }
});