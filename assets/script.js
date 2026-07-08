/* Kairon Robot Kids — clean script.js
   Fixes language switching, contact form and applies a visible hero robot placement patch.
*/

(function () {
  const heroRobotPatch = document.createElement('style');
  heroRobotPatch.setAttribute('data-kairon-patch', 'hero-robot-v2');

  heroRobotPatch.textContent = `
    .hero-content{
      min-height:690px;
    }

    .hero-character{
      position:relative;
      min-height:715px;
      overflow:visible;
      pointer-events:none;
    }

    .hero-character img{
      position:absolute;
      right:-10%;
      bottom:-26px;
      display:block;
      width:auto;
      height:clamp(690px,52vw,820px);
      z-index:2;
      filter:drop-shadow(0 30px 28px rgba(3,61,151,.30));
    }

    @media(max-width:1180px){
      .hero-content{
        grid-template-columns:50% 50%;
      }

      .hero-character{
        min-height:670px;
      }

      .hero-character img{
        right:-16%;
        bottom:-22px;
        height:clamp(620px,55vw,750px);
      }
    }

    @media(max-width:850px){
      .hero-content{
        grid-template-columns:1fr;
        min-height:0;
      }

      .hero-character{
        min-height:525px;
        margin-top:-24px;
      }

      .hero-character img{
        right:50%;
        bottom:-12px;
        height:535px;
        transform:translateX(50%);
      }
    }

    @media(max-width:430px){
      .hero-character{
        min-height:420px;
      }

      .hero-character img{
        height:438px;
      }
    }
  `;

  document.head.appendChild(heroRobotPatch);
})();

const translations = {
  en: {
    welcome: 'Welcome to the',
    heroTitle: 'magical<br>world of<br><strong>Kairon!</strong>',
    heroDescription: 'Explore magical forests, discover amazing creatures, learn, play and relax together.',
    adventure: 'New adventures await!',
    watchYoutube: 'Watch on YouTube',
    kidsTitle: 'For Kids',
    kidsText: 'Join Kairon on exciting adventures. Meet dragons, trolls, dinosaurs, unicorns and many magical friends.<br>Learn, play and explore together!',
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
    kidsText: 'Acompaña a Kairon en aventuras emocionantes. Conoce dragones, trolls, dinosaurios, unicornios y muchos amigos mágicos.<br>¡Aprende, juega y explora!',
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
