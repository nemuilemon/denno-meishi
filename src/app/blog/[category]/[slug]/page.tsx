import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getAllPostSlugs,
  getCategoryDisplayName,
  isValidCategory,
} from '@/lib/blog';

interface PostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ category, slug }) => ({
    category,
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { category, slug } = await params;

  if (!isValidCategory(category)) {
    return {
      title: 'Not Found',
    };
  }

  const post = await getPostBySlug(category, slug);

  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || post.title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;

  // Validate category
  if (!isValidCategory(category)) {
    notFound();
  }

  const post = await getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const categoryDisplayName = getCategoryDisplayName(category);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Navigation */}
        <nav className="mb-8 flex items-center text-sm text-gray-400">
          <Link
            href="/blog"
            className="hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/blog/${category}`}
            className="hover:text-blue-400 transition-colors"
          >
            {categoryDisplayName}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-12 pb-8 border-b border-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            {post.date && (
              <time>{post.date}</time>
            )}
            <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
              {categoryDisplayName}
            </span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
          />
        </article>

        {/* Footer Navigation */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex justify-between">
            <Link
              href={`/blog/${category}`}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to {categoryDisplayName}
            </Link>
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              All Posts →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
