import i18n from 'sveltekit-i18n';
import lang from './lang.json';

const config = {
  translations: {
    en: { lang },
    es: { lang },
    ru: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'toc',
      loader: async () => (await import('./en/toc.json')).default,
    },
    {
      locale: 'es',
      key: 'toc',
      loader: async () => (await import('./es/toc.json')).default,
    },
    {
      locale: 'ru',
      key: 'toc',
      loader: async () => (await import('./es/toc.json')).default,
    },
  ],
};

export const defaultLocale = 'en';

export const { t, locale, locales, loading, loadTranslations, translations } = new i18n(config);

// Translations logs
loading.subscribe(async ($loading) => {
  if ($loading) {
    console.log('Loading translations...');

    await loading.toPromise();
    console.log('Updated translations', translations.get());
  }
});
