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


(function () {
  const magicalTextPatch = document.createElement('style');
  magicalTextPatch.setAttribute('data-kairon-patch', 'magical-hero-text');

  magicalTextPatch.textContent = `
    .eyebrow{
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding:8px 18px;
      border-radius:999px;
      background:rgba(255,255,255,.46);
      box-shadow:
        0 10px 24px rgba(2,70,160,.12),
        inset 0 0 18px rgba(255,255,255,.72);
      backdrop-filter:blur(5px);
      color:#0750c9;
      text-shadow:0 2px 0 rgba(255,255,255,.75);
    }

    .spark{
      filter:
        drop-shadow(0 0 5px rgba(255,215,67,.85))
        drop-shadow(0 3px 4px rgba(185,111,0,.18));
      transform:translateY(-1px);
    }

    .hero-title{
      letter-spacing:-.045em;
      line-height:.84;
      color:#0a49df;
      text-shadow:
        0 3px 0 rgba(255,255,255,.92),
        0 8px 15px rgba(2,53,151,.18),
        0 0 24px rgba(99,186,255,.28);
      -webkit-text-stroke:1.5px rgba(255,255,255,.62);
      position:relative;
    }

    .hero-title strong{
      color:#0746dc;
      text-shadow:
        0 3px 0 rgba(255,255,255,.95),
        0 9px 18px rgba(2,53,151,.22),
        0 0 22px rgba(255,225,86,.34);
    }

    .hero-title::after{
      content:"";
      position:absolute;
      left:-10px;
      top:-12px;
      width:88%;
      height:115%;
      background:
        radial-gradient(circle at 18% 18%, rgba(255,230,92,.55) 0 2px, transparent 3px),
        radial-gradient(circle at 72% 12%, rgba(255,255,255,.88) 0 2px, transparent 3px),
        radial-gradient(circle at 55% 72%, rgba(92,197,255,.55) 0 2px, transparent 3px);
      pointer-events:none;
      opacity:.75;
      filter:drop-shadow(0 0 5px rgba(255,230,92,.45));
    }

    .hero-description{
      max-width:390px;
      padding:12px 16px;
      border-radius:22px;
      background:rgba(255,255,255,.34);
      box-shadow:inset 0 0 20px rgba(255,255,255,.44);
      backdrop-filter:blur(4px);
      color:#062b73;
      text-shadow:0 1px 0 rgba(255,255,255,.65);
    }

    .adventure{
      display:inline-flex;
      align-items:center;
      gap:8px;
      margin-top:10px;
      padding:7px 14px;
      border-radius:999px;
      background:rgba(255,246,179,.38);
      box-shadow:
        0 8px 18px rgba(255,180,35,.12),
        inset 0 0 16px rgba(255,255,255,.48);
      color:#0750c9;
      text-shadow:0 1px 0 rgba(255,255,255,.7);
    }

    .hero-copy{
      filter:drop-shadow(0 10px 18px rgba(255,255,255,.16));
    }

    @media(max-width:850px){
      .hero-title{
        -webkit-text-stroke:1px rgba(255,255,255,.62);
      }

      .hero-description{
        max-width:100%;
      }
    }
  `;

  document.head.appendChild(magicalTextPatch);
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
