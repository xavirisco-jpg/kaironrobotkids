/* Kairon Robot Kids — script.js background-hero test
   This version uses hero-forest.jpg as the full hero image and hides the old separate Kairon overlay.
*/

(function () {
  const backgroundHeroPatch = document.createElement('style');
  backgroundHeroPatch.setAttribute('data-kairon-patch', 'background-hero-test');

  backgroundHeroPatch.textContent = `
    .hero{
      background-image:
        linear-gradient(90deg, rgba(255,255,255,.40) 0%, rgba(255,255,255,.20) 34%, rgba(255,255,255,.00) 62%),
        url("hero-forest.jpg") !important;
      background-size:cover !important;
      background-position:center center !important;
    }

    .hero-content{
      min-height:690px;
    }

    .hero-character img{
      display:none !important;
    }

    .hero-character{
      min-height:690px;
      pointer-events:none;
    }

    @media(max-width:1180px){
      .hero{
        background-position:center center !important;
      }
    }

    @media(max-width:850px){
      .hero{
        background-image:
          linear-gradient(180deg, rgba(255,255,255,.58) 0%, rgba(255,255,255,.35) 42%, rgba(255,255,255,.08) 100%),
          url("hero-forest.jpg") !important;
        background-position:62% center !important;
      }

      .hero-content{
        min-height:0;
      }

      .hero-character{
        min-height:430px;
        margin-top:-10px;
      }
    }

    @media(max-width:430px){
      .hero-character{
        min-height:360px;
      }
    }
  `;

  document.head.appendChild(backgroundHeroPatch);
})();

const translations = {
  en: {
    welcome: 'Welcome to the',
    heroTitle: 'magical<br>world of<br><strong>Kairon!</strong>',
    heroDescription: 'Explore magical forests, discover amazing creatures, learn, play and relax together.',
    adventure: 'New adventures await!',
    watchYoutube: 'Watch on YouTube',
    kidsTitle: 'For Kids',
    kidsText: 'Join Kairon on exciting adventures. Meet dragons, trolls, dinosaurs, unicorns and many magical friends. Learn, play and explore together!',
    parentsTitle: 'For Parents',
    parentsText: 'Safe AI-generated stories and relaxing videos designed to encourage curiosity, imagination and calm moments together.',
    messageTitle: 'Send a Message<br>to Kairon',
    messageText: 'Kairon loves to hear from you! Send a message and he will read it with joy.',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    messagePlaceholder: 'Your message...',
    send: 'Send Message',
    value1: 'Safe & Family<br>Friendly',
    value2: 'Made with Love<br>and Imagination',
    value3: 'Educational &<br>Entertaining',
    value4: 'Relaxing &<br>Calming',
    follow: 'Follow Kairon!',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    contact: 'Contact',
    rights: 'All rights reserved.',
    formMissing: 'Please complete your name, email and message.',
    formEmail: 'Please enter a valid email address.',
    formReady: 'Your email app is opening — thank you for writing to Kairon!'
  },
  es: {
    welcome: 'Bienvenido al',
    heroTitle: 'mágico<br>mundo de<br><strong>¡Kairon!</strong>',
    heroDescription: 'Explora bosques mágicos, descubre criaturas increíbles, aprende, juega y relájate con nosotros.',
    adventure: '¡Nuevas aventuras te esperan!',
    watchYoutube: 'Ver en YouTube',
    kidsTitle: 'Para peques',
    kidsText: 'Acompaña a Kairon en aventuras emocionantes. Conoce dragones, trolls, dinosaurios, unicornios y muchos amigos mágicos. ¡Aprende, juega y explora!',
    parentsTitle: 'Para familias',
    parentsText: 'Historias generadas con IA y vídeos relajantes pensados para despertar curiosidad, imaginación y momentos tranquilos en familia.',
    messageTitle: 'Envía un mensaje<br>a Kairon',
    messageText: '¡A Kairon le encanta leerte! Envíale un mensaje y lo recibirá con mucha ilusión.',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'Tu email',
    messagePlaceholder: 'Tu mensaje...',
    send: 'Enviar mensaje',
    value1: 'Seguro y apto<br>para familias',
    value2: 'Hecho con amor<br>e imaginación',
    value3: 'Educativo y<br>divertido',
    value4: 'Relajante y<br>tranquilo',
    follow: '¡Sigue a Kairon!',
    privacy: 'Privacidad',
    terms: 'Términos de uso',
    contact: 'Contacto',
    rights: 'Todos los derechos reservados.',
    formMissing: 'Completa tu nombre, email y mensaje.',
    formEmail: 'Escribe un email válido.',
    formReady: 'Se está abriendo tu aplicación de correo. ¡Gracias por escribir a Kairon!'
  }
};

let language = localStorage.getItem('kairon-language') || 'en';
if (!translations[language]) language = 'en';

function setLanguage(lang) {
  language = translations[lang] ? lang : 'en';
  localStorage.setItem('kairon-language', language);
  document.documentElement.lang = language;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[language][key] || '';
  });

  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const key = element.dataset.i18nHtml;
    element.innerHTML = translations[language][key] || '';
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = translations[language][key] || '';
  });

  document.querySelectorAll('.lang').forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

document.querySelectorAll('.lang').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

const INBOX_ADDRESS = 'xavirisco@gmail.com';
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = translations[language].formMissing;
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      formStatus.textContent = translations[language].formEmail;
      return;
    }

    const subject = encodeURIComponent(`Message for Kairon from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${INBOX_ADDRESS}?subject=${subject}&body=${body}`;
    formStatus.textContent = translations[language].formReady;
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

setLanguage(language);
