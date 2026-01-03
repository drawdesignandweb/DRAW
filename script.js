// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Contact Form with EmailJS
// IMPORTANT: Remplacez 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', et 'YOUR_PUBLIC_KEY' par vos propres identifiants EmailJS
// Pour obtenir ces identifiants, créez un compte gratuit sur https://www.emailjs.com/
// 1. Créez un service email
// 2. Créez un template avec les variables: {{from_name}}, {{from_email}}, {{message}}
// 3. Copiez votre Public Key depuis le dashboard

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// EmailJS initialization (uncomment and add your credentials)
 emailjs.init('z_3gPHqu-ynYkEIHl');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        showMessage('Veuillez remplir tous les champs', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    // OPTION 1: EmailJS (Recommandé)
    // Décommentez le code ci-dessous après avoir configuré EmailJS
    
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('service_iwjzeqe', 'template_is8352g', templateParams)
        .then(function(response) {
            showMessage('Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
            contactForm.reset();
        }, function(error) {
            showMessage('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        });
    

    // OPTION 2: FormSubmit (Alternative sans backend)
    // Créez un formulaire HTML avec action="https://formsubmit.co/votre-email@exemple.com"
    // et method="POST", puis décommentez ci-dessous:
    
    // Pour l'instant, simulation d'envoi réussi
    /*
    setTimeout(() => {
        showMessage('Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
        contactForm.reset();
    }, 1000);
    */
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show form message
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// INSTRUCTIONS POUR CONFIGURER L'ENVOI D'EMAIL:
//
// === OPTION 1: EmailJS (Recommandé) ===
// 1. Allez sur https://www.emailjs.com/ et créez un compte gratuit
// 2. Créez un service email (Gmail, Outlook, etc.)
// 3. Créez un template avec ces variables:
//    - {{from_name}} pour le nom
//    - {{from_email}} pour l'email
//    - {{message}} pour le message
// 4. Dans le dashboard EmailJS:
//    - Notez votre Service ID
//    - Notez votre Template ID
//    - Notez votre Public Key
// 5. Ajoutez cette ligne dans index.html avant </body>:
//    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
// 6. Dans ce fichier script.js:
//    - Décommentez la ligne emailjs.init() et ajoutez votre Public Key
//    - Décommentez le bloc emailjs.send() et ajoutez vos IDs
//    - Commentez la simulation setTimeout()
//
// === OPTION 2: FormSubmit ===
// 1. Modifiez le <form> dans index.html:
//    <form id="contactForm" action="https://formsubmit.co/votre-email@exemple.com" method="POST">
// 2. Ajoutez ces inputs cachés dans le formulaire:
//    <input type="hidden" name="_subject" value="Nouveau message depuis Draw">
//    <input type="hidden" name="_captcha" value="false">
//    <input type="hidden" name="_template" value="table">
// 3. Supprimez le code JavaScript du formulaire (addEventListener)
// 4. Le formulaire s'enverra automatiquement
//
// Pour des questions ou de l'aide, contactez-nous!