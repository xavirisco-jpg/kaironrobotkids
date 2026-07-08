/* Kairon Robot Kids — script.js with Formspree
   Keeps the clean integrated hero background and enables real form sending.
*/

(function () {
  const backgroundHeroPatch = document.createElement('style');
  backgroundHeroPatch.setAttribute('data-kairon-patch', 'background-hero-final');

  backgroundHeroPatch.textContent = `
    .hero{
      background-image:
        linear-gradient(90deg, rgba(255,255,255,.40) 0%, rgba(255,255,255,.20) 34%, rgba(255,255,255,.00) 62%),
        url("assets/hero-forest.jpg") !important;
      background-size:cover !important;
      background-position:center center !important;
      background-repeat:no-repeat !important;
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
          linear-gradient(180deg, rgba(255,255,255,.62) 0%, rgba(255,255,255,.38) 42%, rgba(255,255,255,.10) 100%),
          url("assets/hero-forest.jpg") !important;
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
    formUnsafe: 'Please remove links, code or unusual hidden characters from the message.',
    formSending: 'Sending your message...',
    formSuccess: 'Message sent. Kairon will read it soon!',
    formFail: 'Could not send the message. Please try again in a moment.'
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
    formUnsafe: 'Quita enlaces, código o caracteres invisibles raros del mensaje.',
    formSending: 'Enviando mensaje...',
    formSuccess: 'Mensaje enviado. ¡Kairon lo leerá pronto!',
    formFail: 'No se ha podido enviar. Prueba otra vez en un momento.'
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

const FORM_ENDPOINT = 'https://formspree.io/f/xnjkkpoy';

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const safetyRules = {
  name: /^[a-zA-ZÀ-ÿ0-9 .,'-]{2,40}$/,
  email: /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/,
  blockedContent: /(<[^>]*>|https?:\/\/|www\.|javascript:|data:|mailto:|tel:|bit\.ly|tinyurl|t\.co|discord\.gg|\.ru\b|\.zip\b|\.mov\b)/i,
  hiddenChars: /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E]/
};

function cleanText(text) {
  return String(text || '')
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E]/g, '')
    .replace(/[<>]/g, '')
    .trim();
}

function isSafeMessage(text) {
  if (!text || text.length < 3 || text.length > 900) return false;
  if (safetyRules.blockedContent.test(text)) return false;
  if (safetyRules.hiddenChars.test(text)) return false;
  return true;
}

if (form && formStatus) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const name = cleanText(document.getElementById('contact-name').value);
    const email = cleanText(document.getElementById('contact-email').value);
    const message = cleanText(document.getElementById('contact-message').value);

    if (!name || !email || !message) {
      formStatus.textContent = translations[language].formMissing;
      return;
    }

    if (!safetyRules.name.test(name)) {
      formStatus.textContent = language === 'es'
        ? 'El nombre contiene caracteres no válidos.'
        : 'The name contains invalid characters.';
      return;
    }

    if (!safetyRules.email.test(email)) {
      formStatus.textContent = translations[language].formEmail;
      return;
    }

    if (!isSafeMessage(message)) {
      formStatus.textContent = translations[language].formUnsafe;
      return;
    }

    const payload = {
      name,
      email,
      message,
      source: 'kaironrobotkids.com',
      _subject: `Message for Kairon from ${name}`,
      _replyto: email
    };

    try {
      formStatus.textContent = translations[language].formSending;
      if (submitButton) submitButton.disabled = true;

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Formspree submission failed');

      form.reset();
      formStatus.textContent = translations[language].formSuccess;
    } catch (error) {
      formStatus.textContent = translations[language].formFail;
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

setLanguage(language);
