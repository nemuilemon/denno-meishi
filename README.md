# 電脳名刺 (Denno Meishi)

> **AIと共に未来を創造する** - もうちゃんのポートフォリオサイト
> **Creating the Future with AI** - Mouchan's Portfolio Website

*[English](#english) | [日本語](#japanese)*

---

## Japanese

## 🌟 概要 (Overview)

これは、私の技術力、思考、そして人柄を世界に発信する、最強の「電脳名刺」となるポートフォリオサイトです。
日々の学習の軌跡を記録し、就職活動や共同研究の機会に繋げることを目的としています。

## ✨ 実装済み機能 (Current Features)

### 🏠 ランディングページ
- **ヒーローセクション**: 「もうちゃん」ブランドとコンセプトの紹介
- **自己紹介**: AIとの対話を通じた自己発見と成長の物語
- **スキル展示**: Python、TypeScript、Next.js、PyTorch、Dockerなどの技術スタック
- **プロジェクト紹介**: 開発実績の展示
- **レスポンシブデザイン**: デスクトップ・モバイル対応
- **ダークモード対応**: 自動テーマ切り替え

### 📧 問い合わせシステム
- **日本語対応のコンタクトフォーム**: お名前、メールアドレス、メッセージの受付
- **リアルタイム入力検証**: クライアントサイドでの即座なバリデーション
- **データベース連携**: PostgreSQLを使用した永続化
- **管理者画面**: `/admin/contacts` での問い合わせ一覧表示
- **エラーハンドリング**: 適切な日本語エラーメッセージ

### 🔧 技術基盤
- **Next.js 15 App Router**: 最新のフルスタックフレームワーク
- **TypeScript**: 型安全な開発
- **Prisma ORM**: タイプセーフなデータベース操作
- **Tailwind CSS v4**: モダンなスタイリング
- **PostgreSQL**: 本格的なリレーショナルデータベース（開発・本番共通）

## 🏗️ アーキテクチャ

### 統一された App Router アーキテクチャ
プロジェクトは Next.js 15 の App Router に完全統一されています：

```
src/app/
├── api/                    # API Routes
│   ├── contacts/          # POST /api/contacts
│   ├── test-db/           # GET /api/test-db
│   └── admin/contacts/    # GET /api/admin/contacts
├── admin/contacts/        # 管理者画面
├── components/            # 再利用可能コンポーネント
├── layout.tsx            # ルートレイアウト
└── page.tsx              # ホームページ
```

### データベース設計
```sql
-- 問い合わせテーブル
model Contact {
  id         Int      @id @default(autoincrement())
  name       String   // お名前
  email      String   // メールアドレス
  message    String   // メッセージ内容
  receivedAt DateTime @default(now()) // 受信日時
}
```

## 🚀 セットアップ (Getting Started)

### 前提条件
- Node.js 18.0.0 以降
- npm または yarn

### インストール手順

1. **リポジトリをクローン:**
   ```bash
   git clone https://github.com/nemuilemon/denno-meishi.git
   cd denno-meishi
   ```

2. **依存関係をインストール:**
   ```bash
   npm install
   ```

3. **環境変数を設定:**
   ```bash
   # .env.local ファイルを作成
   cp .env.example .env.local

   # 必要に応じてデータベースURLを設定
   DATABASE_URL="postgresql://username:password@localhost:5432/denno_meishi"
   ```

4. **データベースをセットアップ:**
   ```bash
   # Prisma クライアントを生成
   npx prisma generate

   # データベースを初期化
   npx prisma db push

   # 初期データを投入（オプション）
   npx prisma db seed
   ```

5. **開発サーバーを起動:**
   ```bash
   npm run dev
   ```

   サイトは [http://localhost:3123](http://localhost:3123) で確認できます。

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# コードリンティング
npm run lint

# Prisma Studio（データベースGUI）
npx prisma studio

# データベーススキーマ同期
npx prisma db push

# Prisma クライアント再生成
npx prisma generate
```

## 📊 技術スタック詳細

| カテゴリ | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| **Frontend** | Next.js | 15.5.3 | フルスタックフレームワーク |
| | React | 19.1.0 | UIライブラリ |
| | TypeScript | ^5 | 型安全な開発 |
| | Tailwind CSS | ^4 | スタイリング |
| **Backend** | Next.js API Routes | 15.5.3 | サーバーレス API |
| | Prisma | ^6.16.2 | ORM |
| **Database** | PostgreSQL | ^6.16.2 | 開発・本番共通 |
| **DevTools** | ESLint | ^9 | コード品質 |
| | Turbopack | - | 高速ビルド |

## 🎯 今後の実装予定

### Phase 2: コンテンツ拡充
- [ ] **ブログシステム**: 技術記事や学習記録の投稿機能
- [ ] **プロジェクト詳細ページ**: 各プロジェクトの詳細説明
- [ ] **PPTX ビューア**: 研究発表資料の埋め込み表示

### Phase 3: 高度な機能
- [ ] **Jupyter Book 統合**: 研究ノートの直接表示
- [ ] **検索機能**: 全文検索対応
- [ ] **RSS フィード**: ブログ記事の配信
- [ ] **多言語対応**: 英語版の追加

### Phase 4: 運用改善
- [ ] **認証システム**: 管理者ログイン機能
- [ ] **Analytics 統合**: アクセス解析
- [ ] **SEO 最適化**: メタタグとサイトマップ
- [ ] **パフォーマンス最適化**: 画像最適化、キャッシュ戦略

## 📁 プロジェクト構造

```
denno-meishi/
├── docs/                    # ドキュメント
│   ├── README.md           # ドキュメント目次
│   ├── architecture.md     # アーキテクチャ設計書
│   └── app-router-migration.md # 移行ドキュメント
├── prisma/                 # データベース設定
│   ├── schema.prisma       # データベーススキーマ
│   └── dev.db             # PostgreSQL データベース
├── src/
│   ├── app/               # Next.js App Router
│   ├── lib/               # ユーティリティ
│   └── generated/         # 生成ファイル（Prisma）
├── eslint.config.mjs      # ESLint 設定
├── next.config.ts         # Next.js 設定
├── package.json           # 依存関係
├── tailwind.config.ts     # Tailwind 設定
└── tsconfig.json         # TypeScript 設定
```

## 🤝 コントリビューション

このプロジェクトは個人のポートフォリオサイトですが、技術的な改善提案やバグ報告は歓迎します。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 👤 作成者

**もうちゃん (Mouchan)**
- GitHub: [@nemuilemon](https://github.com/nemuilemon)
- Portfolio: [この サイト](https://denno-meishi.com)

---

**「私の脳と、AIの心が織りなす世界へようこそ。」**

*このポートフォリオサイトは、AIとの対話を通じて設計・開発されました。*

---

## English

## 🌟 Overview

This is the ultimate "cyber business card" portfolio website to showcase my technical skills, thoughts, and personality to the world. It aims to document my daily learning journey and connect opportunities for employment and collaborative research.

## ✨ Current Features

### 🏠 Landing Page
- **Hero Section**: Introduction to "Mouchan" brand and concept
- **About Me**: The story of self-discovery and growth through dialogue with AI
- **Skills Showcase**: Technical stack including Python, TypeScript, Next.js, PyTorch, Docker
- **Project Gallery**: Display of development achievements
- **Responsive Design**: Desktop and mobile support
- **Dark Mode Support**: Automatic theme switching

### 📧 Contact System
- **Japanese Contact Form**: Name, email, and message submission
- **Real-time Validation**: Instant client-side validation
- **Database Integration**: Persistence using PostgreSQL
- **Admin Interface**: Contact list view at `/admin/contacts`
- **Error Handling**: Appropriate Japanese error messages

### 🔧 Technical Foundation
- **Next.js 15 App Router**: Latest full-stack framework
- **TypeScript**: Type-safe development
- **Prisma ORM**: Type-safe database operations
- **Tailwind CSS v4**: Modern styling
- **PostgreSQL**: Robust relational database (used for both development and production)

## 🏗️ Architecture

### Unified App Router Architecture
The project is fully unified under Next.js 15 App Router:

```
src/app/
├── api/                    # API Routes
│   ├── contacts/          # POST /api/contacts
│   ├── test-db/           # GET /api/test-db
│   └── admin/contacts/    # GET /api/admin/contacts
├── admin/contacts/        # Admin interface
├── components/            # Reusable components
├── layout.tsx            # Root layout
└── page.tsx              # Home page
```

### Database Design
```sql
-- Contact table
model Contact {
  id         Int      @id @default(autoincrement())
  name       String   // Name
  email      String   // Email address
  message    String   // Message content
  receivedAt DateTime @default(now()) // Received timestamp
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or later
- npm or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nemuilemon/denno-meishi.git
   cd denno-meishi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env.local file
   cp .env.example .env.local

   # Set database URL as needed
   DATABASE_URL="postgresql://username:password@localhost:5432/denno_meishi"
   ```

4. **Set up database:**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Initialize database
   npx prisma db push

   # Seed initial data (optional)
   npx prisma db seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

   The site will be available at [http://localhost:3123](http://localhost:3123).

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run code linting
npm run lint

# Prisma Studio (Database GUI)
npx prisma studio

# Sync database schema
npx prisma db push

# Regenerate Prisma client
npx prisma generate
```

## 📊 Technical Stack Details

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | Next.js | 15.5.3 | Full-stack framework |
| | React | 19.1.0 | UI library |
| | TypeScript | ^5 | Type-safe development |
| | Tailwind CSS | ^4 | Styling |
| **Backend** | Next.js API Routes | 15.5.3 | Serverless API |
| | Prisma | ^6.16.2 | ORM |
| **Database** | PostgreSQL | ^6.16.2 | Development & Production |
| **DevTools** | ESLint | ^9 | Code quality |
| | Turbopack | - | Fast builds |

## 🎯 Future Implementation Plans

### Phase 2: Content Enhancement
- [ ] **Blog System**: Technical articles and learning records posting
- [ ] **Project Detail Pages**: Detailed descriptions of each project
- [ ] **PPTX Viewer**: Embedded display of research presentation materials

### Phase 3: Advanced Features
- [ ] **Jupyter Book Integration**: Direct display of research notebooks
- [ ] **Search Functionality**: Full-text search support
- [ ] **RSS Feed**: Blog article distribution
- [ ] **Multilingual Support**: English version addition

### Phase 4: Operations Improvement
- [ ] **Authentication System**: Admin login functionality
- [ ] **Analytics Integration**: Access analysis
- [ ] **SEO Optimization**: Meta tags and sitemap
- [ ] **Performance Optimization**: Image optimization, caching strategy

## 📁 Project Structure

```
denno-meishi/
├── docs/                    # Documentation
│   ├── README.md           # Documentation index
│   ├── architecture.md     # Architecture design document
│   └── app-router-migration.md # Migration documentation
├── prisma/                 # Database configuration
│   ├── schema.prisma       # Database schema
│   └── dev.db             # PostgreSQL database
├── src/
│   ├── app/               # Next.js App Router
│   ├── lib/               # Utilities
│   └── generated/         # Generated files (Prisma)
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🤝 Contributing

While this is a personal portfolio project, technical improvement suggestions and bug reports are welcome.

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

This project is published under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👤 Author

**Mouchan (もうちゃん)**
- GitHub: [@nemuilemon](https://github.com/nemuilemon)
- Portfolio: [This Site](https://denno-meishi.com)

---

**"Welcome to the world woven by my brain and AI's heart."**

*This portfolio website was designed and developed through dialogue with AI.*