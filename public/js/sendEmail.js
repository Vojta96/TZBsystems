

window.onload = function () {
    var currentTime = new Date();
    var formattedTime = currentTime.toDateString() + " " + currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('time').value = formattedTime;

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('service_85vcgzd', 'template_y5hj9l4', this)
            .then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
}