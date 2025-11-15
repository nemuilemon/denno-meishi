import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getCategoryDisplayName, type Category } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | もうちゃんのブログ',
  description: '日々の思索、論文読解、プロジェクト報告、対話記録',
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  // Group posts by category
  const categories: Category[] = ['note', 'papers', 'project', 'dialogs'];
  const postsByCategory = await Promise.all(
    categories.map(async category => ({
      category,
      displayName: await getCategoryDisplayName(category),
      posts: allPosts.filter(post => post.category === category),
    }))
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl font-bold mb-4">
            📚 ブログ
          </h1>
          <p className="text-xl text-gray-400">
            日々の思索、論文読解、プロジェクト報告、対話記録
          </p>
        </header>

        {/* Categories */}
        <div className="space-y-16">
          {postsByCategory.map(({ category, displayName, posts }) => (
            posts.length > 0 && (
              <section key={category}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold">{displayName}</h2>
                  <Link
                    href={`/blog/${category}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.slice(0, 6).map(post => (
                    <Link
                      key={post.slug}
                      href={`/blog/${category}/${post.slug}`}
                      className="group block p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500 transition-all"
                    >
                      <div className="mb-2">
                        <time className="text-sm text-gray-500">
                          {post.date || 'No date'}
                        </time>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
