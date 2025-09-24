export default function Blog() {
  return (
    <section id="blog" className="py-20 px-8 max-w-6xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">ブログ</h2>
        <div className="bg-gray-50 dark:bg-gray-900 p-12 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-400">近日公開予定</h3>
          <p className="text-gray-600 dark:text-gray-300">
            AIとの対話を通じた思索、技術への取り組み、そして日常の中で見つけた小さな発見を綴る予定です。
          </p>
        </div>
      </div>
    </section>
  );
}