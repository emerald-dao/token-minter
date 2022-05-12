import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import toc from '@jsdevtools/rehype-toc';

function headings() {
  let visit;
  let tree_to_string;
  return async function transformer(tree, vFile) {
    if (!visit) {
      tree_to_string = (await import('mdast-util-to-string')).toString;
      visit = (await import('unist-util-visit')).visit;
    }

    vFile.data.headings = [];

    visit(tree, 'heading', (node) => {
      vFile.data.headings.push({
        level: node.depth,
        title: tree_to_string(node),
      });
    });

    if (!vFile.data.fm) vFile.data.fm = {};
    vFile.data.fm.headings = vFile.data.headings;
  };
}

const mdsvexConfig = {
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    dashes: 'oldschool',
  },
  layout: 'src/lib/components/layout/GuideLayout.svelte',
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  remarkPlugins: [headings],
};

export default mdsvexConfig;
