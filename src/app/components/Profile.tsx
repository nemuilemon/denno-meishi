import { FaPython, FaDocker } from 'react-icons/fa';
import { BsFileText } from 'react-icons/bs';
import { SiTypescript, SiPytorch } from 'react-icons/si';
import { GrServer } from "react-icons/gr";

export default function Profile() {
  return (
    <section id="profile" className="py-20 px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-1 gap-12 items-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">私について</h2>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">AIとの協業による、次世代の課題解決アプローチ</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                私は、AIを単なるツールではなく「思考のパートナー」として活用し、人間の知的生産性を最大化することを探求するエンジニアです。<br/><br/>大規模言語モデル（LLM）との対話を通じて、複雑な技術課題の分析、コードのデバッグ、そして自身の思考プロセスの客観視を日常的に行っています。この「AIとの壁打ち」は、私の開発スタイルの中核であり、独力では到達し得なかった速度と深度での学習と問題解決を可能にしています。<br/><br/>この経験を通じて培ったのは、複雑な事象を構造化し、論理的に最適解を導き出す「解析的思考力」です。この能力は、人間とAIがそれぞれの強みを活かし合う、未来の協調型開発プロセスにおいて不可欠なスキルであると確信しています。<br/><br/>このポートフォリオでは、そうしたAIとのパートナーシップを通じて生み出された、具体的なプロジェクトを紹介します。
              </p>
            </div>
        </div>
      </div>

      <div className="py-20 px-8 bg-gray-900 mt-16 rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">保有スキル</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex flex-col items-center text-center">
              <FaPython className="text-5xl mb-4 text-yellow-400" />
              <h4 className="text-xl font-semibold mb-2">Python</h4>
              <p className="text-gray-300">
                思考の速度を落とさずにアイデアを形にするための主要言語。AtCoderでのアルゴリズム実装から、PyTorchを用いた論文実装、FletによるGUIアプリ『A.N.C.』のフルスクラッチ開発まで、幅広い領域で深く活用。
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex flex-col items-center text-center">
              <SiTypescript className="text-5xl mb-4 text-blue-400" />
              <h4 className="text-xl font-semibold mb-2">TypeScript</h4>
              <p className="text-gray-300">
                大規模なアプリケーションでも破綻しない、堅牢な開発を実現するための選択。Next.js/ReactでのフロントエンドからNode.js/ExpressでのバックエンドAPIまで、フルスタックでの型安全な開発を実践。
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex flex-col items-center text-center">
              <BsFileText className="text-5xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">Aegisub</h4>
              <p className="text-gray-300">
                1/1000秒単位での精度が求められる、プロフェッショナルな字幕編集ツール。映像・音声・テキストという複数の情報を同期させる精密なデータハンドリング能力と、ユーザーへの情報伝達を最適化する品質への執着を証明します。
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex flex-col items-center text-center">
              <SiPytorch className="text-5xl mb-4 text-orange-500" />
              <h4 className="text-xl font-semibold mb-2">PyTorch</h4>
              <p className="text-gray-300">
                AI研究の最前線を走るための必須スキル。Transformerなどの基盤モデルの論文実装を通じて、理論をコードに落とし込む能力を証明。モデルの構築、学習、評価という一連のサイクルを自律的に遂行可能。
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex flex-col items-center text-center">
              <FaDocker className="text-5xl mb-4 text-blue-500" />
              <h4 className="text-xl font-semibold mb-2">Docker</h4>
              <p className="text-gray-300">
                「いつでも、どこでも、誰でも」同じ環境を再現するための現代開発の基盤。PostgreSQLデータベースから、Ollamaを用いたローカルLLM実行環境まで、複雑なシステム構成をコード（Dockerfile/docker-compose.yml）で管理・運用。
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 flex flex-col items-center text-center">
              <GrServer className="text-5xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">Server & Infra</h4>
              <p className="text-gray-300">
                アイデアを世界に届けるための最終工程。VPS上でのLinuxサーバー構築、Nginxによるリバースプロキシ設定、ドメイン設定、本番環境へのアプリケーションデプロイまで、Webサービス公開に必要な一連の知識と経験を保有。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
