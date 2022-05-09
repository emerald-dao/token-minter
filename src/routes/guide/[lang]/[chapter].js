// import fetchChapters from '$lib/utilities/fetchChapters';

export const get = async ({ params }) => {
  // const { chapters } = await fetchChapters({ lang: params.lang });
  try {
    const chapter = await import(`../../../lib/guide/translations/en/flow-benefits.md`);

    return {
      status: 200,
      body: {
        chapterContent: chapter.default,
        // chapters: chapters,
      },
    };
  } catch (error) {
    return {
      status: 404,
      error: error.message,
    };
  }
};
