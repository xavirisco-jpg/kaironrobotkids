/* Kairon Robot Kids - Google Analytics */
(function () {
  const MEASUREMENT_ID = 'G-DNQTW6FMEQ';
  const CONSENT_KEY = 'kairon-analytics-consent';

  function readConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (error) {
      // If storage is unavailable, keep the current page behavior only.
    }
  }

  const storedConsent = readConsent();
  let analyticsEnabled = storedConsent === 'granted';
  let analyticsLoaded = false;

  function loadGoogleAnalytics() {
    if (!analyticsEnabled || analyticsLoaded) return;
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });

    window.gtag('set', {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
      transport_type: 'beacon'
    });
  }

  function trackEvent(name, params) {
    if (!analyticsEnabled) return;
    loadGoogleAnalytics();
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', name, Object.assign({
      transport_type: 'beacon'
    }, params || {}));
  }

  window.kaironTrackEvent = trackEvent;

  function updateAnalyticsConsent(granted) {
    saveConsent(granted ? 'granted' : 'denied');
    analyticsEnabled = granted;

    if (granted) {
      loadGoogleAnalytics();

      trackEvent('analytics_consent_granted');
    }

    const banner = document.querySelector('[data-analytics-consent]');
    if (banner) banner.remove();
  }

  function currentLanguage() {
    const storedLanguage = (() => {
      try {
        return window.localStorage.getItem('kairon-language');
      } catch (error) {
        return null;
      }
    })();

    return storedLanguage === 'es' || document.documentElement.lang === 'es' ? 'es' : 'en';
  }

  function consentCopy() {
    if (currentLanguage() === 'es') {
      return {
        text: 'Usamos Google Analytics para entender visitas y mejorar la web. No usamos anuncios personalizados.',
        accept: 'Aceptar',
        decline: 'Rechazar'
      };
    }

    return {
      text: 'We use Google Analytics to understand visits and improve the site. We do not use personalized ads.',
      accept: 'Accept',
      decline: 'Decline'
    };
  }

  function showConsentBanner() {
    if (storedConsent === 'granted' || storedConsent === 'denied') return;

    const copy = consentCopy();
    const banner = document.createElement('aside');
    banner.setAttribute('data-analytics-consent', '');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Analytics consent');
    banner.innerHTML = `
      <p>${copy.text}</p>
      <div>
        <button type="button" data-consent-decline>${copy.decline}</button>
        <button type="button" data-consent-accept>${copy.accept}</button>
      </div>
    `;

    const styles = document.createElement('style');
    styles.setAttribute('data-analytics-consent-style', '');
    styles.textContent = `
      [data-analytics-consent]{
        position:fixed;
        z-index:9999;
        left:16px;
        right:16px;
        bottom:16px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:14px;
        max-width:760px;
        margin:auto;
        padding:14px 16px;
        border:2px solid rgba(20,80,206,.18);
        border-radius:18px;
        background:rgba(255,255,255,.96);
        box-shadow:0 14px 36px rgba(6,35,111,.22);
        color:#173563;
        font:700 14px/1.35 "Trebuchet MS", Arial, sans-serif;
      }
      [data-analytics-consent] p{
        margin:0;
      }
      [data-analytics-consent] div{
        display:flex;
        gap:8px;
        flex:0 0 auto;
      }
      [data-analytics-consent] button{
        min-height:40px;
        padding:9px 13px;
        border:0;
        border-radius:999px;
        background:#eef7ff;
        color:#1264dd;
        font:900 13px/1 "Trebuchet MS", Arial, sans-serif;
        cursor:pointer;
      }
      [data-analytics-consent] [data-consent-accept]{
        background:#1264dd;
        color:#fff;
      }
      @media(max-width:560px){
        [data-analytics-consent]{
          align-items:stretch;
          flex-direction:column;
        }
        [data-analytics-consent] div{
          display:grid;
          grid-template-columns:1fr 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(banner);

    banner.querySelector('[data-consent-accept]').addEventListener('click', () => {
      updateAnalyticsConsent(true);
    });

    banner.querySelector('[data-consent-decline]').addEventListener('click', () => {
      updateAnalyticsConsent(false);
    });
  }

  document.addEventListener('click', (event) => {
    if (!event.target || typeof event.target.closest !== 'function') return;

    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.href;
    if (href.includes('youtube.com/@KaironRobotKids')) {
      trackEvent('youtube_click', { link_url: href });
      return;
    }

    if (href.includes('kairon-magic-egg-rush')) {
      trackEvent('game_click', { link_url: href });
      return;
    }

    if (link.hasAttribute('download')) {
      trackEvent('file_download', {
        file_name: link.getAttribute('href') || href,
        link_url: href
      });
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showConsentBanner);
  } else {
    showConsentBanner();
  }

  loadGoogleAnalytics();
})();
