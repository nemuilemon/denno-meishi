import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPostsByCategory,
  getCategoryDisplayName,
  isValidCategory,
} from '@/lib/blog';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isValidCategory(category)) {
    return {
      title: 'Not Found',
    };
  }

  const displayName = getCategoryDisplayName(category);

  return {
    title: `${displayName} | Blog`,
    description: `${displayName} - もうちゃんの研究ノート`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Validate category
  if (!isValidCategory(category)) {
    notFound();
  }

  const posts = await getPostsByCategory(category);
  const displayName = getCategoryDisplayName(category);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-12">
          <Link
            href="/blog"
            className="inline-block text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-4">{displayName}</h1>
          <p className="text-gray-400">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </p>
        </header>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <article
                key={post.slug}
                className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500 transition-all"
              >
                <Link href={`/blog/${category}/${post.slug}`} className="group block">
                  <div className="mb-2">
                    <time className="text-sm text-gray-500">
                      {post.date || 'No date'}
                    </time>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
