export default function Showcase() {
  return (
          <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">Webアプリ『皆の秘密基地』</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ToDo、スケジュール、家計簿を一元管理できるフルスタックWebアプリケーション。企画から設計、開発、そしてDockerを用いた本番環境へのデプロイまで、全て独力で完遂。
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">React</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Node.js</span>
                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full">PostgreSQL</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Docker</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">ナレッジエンジン『A.N.C.』</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                AIとの対話ログや学習メモを効率的に管理・分析するために開発したデスクトップアプリケーション。MVCモデルに基づいた設計と、AIによる非同期分析機能が特徴。
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Python</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Flet</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">TinyDB</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">MVC</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}