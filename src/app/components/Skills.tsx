export default function Skills() {
  return (
          <section className="py-20 px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Python</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AtCoderでの競技プログラミング、論文実装、ソフトウェア開発まで幅広く使用。
                <span className="block mt-2 text-sm text-gray-500">
                  (例: デスクトップメモアプリ『A.N.C.』をゼロから開発)
                </span>
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">TypeScript</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Next.jsを用いたフロントエンドからNode.jsでのバックエンドAPIまで、型安全な開発を実践。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Next.js</h3>
              <p className="text-gray-600 dark:text-gray-300">
                このポートフォリオサイトや『皆の秘密基地』など、複数のWebアプリケーションを構築。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">PyTorch</h3>
              <p className="text-gray-600 dark:text-gray-300">
                LLMモデルの構築、学習、評価に使用。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Docker</h3>
              <p className="text-gray-600 dark:text-gray-300">
                ローカル開発環境の再現性を担保。PostgreSQLやOllama + Open WebUI環境をコンテナで構築・運用。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Server & Infra</h3>
              <p className="text-gray-600 dark:text-gray-300">
                ConoHa VPS上でのサーバー構築、Nginxでのリバースプロキシ設定、本番環境へのデプロイを完遂。
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}