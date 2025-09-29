export default function Blog() {
  return (
    <section id="blog" className="py-20 px-8 max-w-6xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">ブログ</h2>
        <div className="bg-gray-900 p-12 rounded-2xl">
          <p className="text-lg text-gray-300 mb-8">
            AIとの対話を通じた思索、技術への取り組み、そして日常の中で見つけた小さな発見を綴っています。
          </p>
          <a
            href="/blog/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
          >
            ブログを読む
          </a>
        </div>
      </div>
    </section>
  );
}