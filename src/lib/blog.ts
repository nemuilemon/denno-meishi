import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';

// Content root directory
const BLOG_DIR = join(process.cwd(), 'src', 'blog', 'blog');

// Valid blog categories
export type Category = 'note' | 'papers' | 'project' | 'dialogs';

// Blog post metadata and content
export interface BlogPost {
  slug: string;
  category: Category;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  htmlContent?: string;
}

/**
 * Convert Markdown to HTML with syntax highlighting
 * Processes on the server side for optimal performance
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)           // GitHub Flavored Markdown
    .use(remarkRehype)        // Convert Markdown AST to HTML AST
    .use(rehypeSlug)          // Add IDs to headings for table of contents
    .use(rehypePrism)         // Syntax highlighting (server-side)
    .use(rehypeStringify)     // Convert to HTML string
    .process(markdown);

  return result.toString();
}

/**
 * Get all post slugs for generateStaticParams
 * Returns all valid post paths across all categories
 */
export async function getAllPostSlugs(): Promise<{
  category: Category;
  slug: string;
}[]> {
  const categories: Category[] = ['note', 'papers', 'project', 'dialogs'];

  const slugs = await Promise.all(
    categories.map(async (category) => {
      try {
        const categoryDir = join(BLOG_DIR, category);
        const files = await fs.readdir(categoryDir);

        return files
          .filter(file => file.endsWith('.md') && !file.startsWith('_'))
          .map(file => ({
            category,
            slug: file.replace(/\.md$/, ''),
          }));
      } catch (error) {
        // Category directory doesn't exist or is empty
        console.warn(`Warning: Could not read directory for category "${category}"`, error);
        return [];
      }
    })
  );

  return slugs.flat();
}

/**
 * Get all posts in a specific category
 * Posts are sorted by date (newest first)
 */
export async function getPostsByCategory(category: Category): Promise<BlogPost[]> {
  try {
    const categoryDir = join(BLOG_DIR, category);
    const files = await fs.readdir(categoryDir);

    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.md') && !file.startsWith('_'))
        .map(async (file) => {
          const slug = file.replace(/\.md$/, '');
          const fullPath = join(categoryDir, file);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Extract title from frontmatter, content h1, or filename
          let title = data.title;
          if (!title) {
            // Try to extract first h1 heading from content
            const h1Match = content.match(/^#\s+(.+)$/m);
            title = h1Match ? h1Match[1].trim() : slug.replace(/_/g, ' ');
          }

          // Extract date from frontmatter or filename (format: YY-MM-DD_Title)
          const dateMatch = slug.match(/^(\d{2}-\d{2}-\d{2})/);
          const date = data.date || (dateMatch ? `20${dateMatch[1]}` : '');

          // Create excerpt from content (first 200 characters)
          const excerpt = data.excerpt || content.slice(0, 200).replace(/\n/g, ' ') + '...';

          return {
            slug,
            category,
            title,
            date,
            content,
            excerpt,
          };
        })
    );

    // Sort by date (newest first)
    return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  } catch (error) {
    console.error(`Error reading posts for category "${category}":`, error);
    return [];
  }
}

/**
 * Get a specific post by category and slug
 * Returns null if post not found
 */
export async function getPostBySlug(
  category: Category,
  slug: string
): Promise<BlogPost | null> {
  try {
    const fullPath = join(BLOG_DIR, category, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract title from frontmatter, content h1, or filename
    let title = data.title;
    if (!title) {
      // Try to extract first h1 heading from content
      const h1Match = content.match(/^#\s+(.+)$/m);
      title = h1Match ? h1Match[1].trim() : slug.replace(/_/g, ' ');
    }

    // Extract date from frontmatter or filename
    const dateMatch = slug.match(/^(\d{2}-\d{2}-\d{2})/);
    const date = data.date || (dateMatch ? `20${dateMatch[1]}` : '');

    // Convert Markdown to HTML with syntax highlighting
    const htmlContent = await markdownToHtml(content);

    return {
      slug,
      category,
      title,
      date,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading post "${category}/${slug}":`, error);
    return null;
  }
}

/**
 * Get all posts across all categories
 * Useful for blog index page
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const categories: Category[] = ['note', 'papers', 'project', 'dialogs'];

  const allPosts = await Promise.all(
    categories.map(category => getPostsByCategory(category))
  );

  return allPosts.flat().sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get category display name from _index.md file
 * Reads the first h1 heading from each category's _index.md
 */
export async function getCategoryDisplayName(category: Category): Promise<string> {
  try {
    const indexPath = join(BLOG_DIR, category, '_index.md');
    const fileContents = await fs.readFile(indexPath, 'utf8');

    // Extract first h1 heading (# Title)
    const headingMatch = fileContents.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      return headingMatch[1].trim();
    }

    // Fallback to default names if no heading found
    const fallbackNames: Record<Category, string> = {
      note: 'ノート',
      papers: '論文読解',
      project: 'プロジェクト報告',
      dialogs: '対話記録',
    };
    return fallbackNames[category];
  } catch (error) {
    console.warn(`Warning: Could not read _index.md for category "${category}"`, error);
    // Fallback to default names
    const fallbackNames: Record<Category, string> = {
      note: 'ノート',
      papers: '論文読解',
      project: 'プロジェクト報告',
      dialogs: '対話記録',
    };
    return fallbackNames[category];
  }
}

/**
 * Validate if a string is a valid category
 */
export function isValidCategory(value: string): value is Category {
  return ['note', 'papers', 'project', 'dialogs'].includes(value);
}
