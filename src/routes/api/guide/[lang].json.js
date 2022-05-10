import fetchChapters from '$lib/utilities/fetchChapters';

export const get = async ({ params }) => {
  try {
    /**
     * These let you add query params to change what's retrieved from the endpoint, e.g.,
     * /api/guide.json?lang=es
     **/
    const lang = params.lang;

    const options = {
      lang: lang || null,
    };

    /**
     * Endpoint uses a utility function for retrieving the posts, because without that,
     * query parameters wouldn't result in static routes being generated at build time.
     * It's also a little cleaner in the code.
     */
    const { chapters } = await fetchChapters(options);

    return {
      status: 200,
      body: {
        chapters,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Could not fetch posts. ' + error,
      },
    };
  }
};
