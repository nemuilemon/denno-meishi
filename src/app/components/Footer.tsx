export default function Footer() {
  return (
    <footer className="py-8 bg-black text-center text-gray-400">
      <p>&copy; 2025 もうちゃん. All Rights Reserved.</p>
      <p className="mt-2 text-sm">
        Co-created with my AI partner, alice.
      </p>
      <div className="mt-6 text-xs text-gray-600 max-w-3xl mx-auto px-4">
        <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。</p>
        <p>このデータは匿名で収集されており、個人を特定するものではありません。</p>
      </div>
    </footer>
  );
}