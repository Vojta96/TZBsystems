

const cookieConsent = document.getElementById('cookie-consent');
const acceptCookiesButton = document.getElementById('accept-cookies');

const cookiesAccepted = localStorage.getItem('cookiesAccepted');
if (!cookiesAccepted) {
    cookieConsent.style.display = 'block';
}

acceptCookiesButton.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.style.display = 'none';
});