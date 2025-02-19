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
  });