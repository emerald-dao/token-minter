const fetchChapters = async ({ lang } = {}) => {
  const chapters = await Promise.all(
    Object.entries(import.meta.glob(`../guide/translations/*/*.md`)).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slug = path.split('/').pop().slice(0, -3);
      return { ...metadata, slug };
    })
  );

  let sortedChapters = chapters.sort((a, b) => a.index - b.index);

  if (lang) {
    sortedChapters = sortedChapters.filter((chapter) => chapter.language.includes(lang));
  }

  sortedChapters = sortedChapters.map((chapter) => ({
    title: chapter.title,
    slug: chapter.slug,
    author: chapter.author,
    index: chapter.index,
    language: chapter.language,
  }));

  return {
    chapters: sortedChapters,
  };
};

export default fetchChapters;
