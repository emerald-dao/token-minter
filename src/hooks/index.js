import { defaultLocale, locales } from '$lib/guide/translations';

const routeRegex = new RegExp(/^\/[^.]*([?#].*)?$/);

export const handle = async ({ event, resolve }) => {
  const { url, request } = event;
  const { pathname } = url;

  // If this request is a route request
  if (routeRegex.test(pathname)) {
    // Get defined locales
    const supportedLocales = locales.get();

    // Get relative pathname
    const relativePathname = pathname.replace('/guide', '');

    // Try to get locale from `pathname`.
    let locale = supportedLocales.find(
      (l) => `${l}`.toLowerCase() === `${relativePathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase()
    );

    // If route locale is not supported
    if (!locale && pathname.startsWith('/guide')) {
      // Get user preferred locale
      locale = `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();

      // Set default locale if user preferred locale does not match
      if (!supportedLocales.includes(locale)) locale = defaultLocale;

      // 301 redirect
      return new Response(undefined, {
        headers: { location: `/guide/${locale}${pathname.replace('/guide', '')}` },
        status: 301,
      });
    }

    // Add html `lang` attribute
    const response = await resolve(event);
    const body = await response.text();

    return new Response(`${body}`.replace(/<html.*>/, `<html lang="${locale}">`), response);
  }

  return resolve(event);
};
