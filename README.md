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
- **レスポンシブデザイン**: デスクトップ・モバイル対応、ハンバーガーメニュー
- **ダークモード対応**: 統一されたダークテーマ

### 📧 問い合わせシステム
- **日本語対応のコンタクトフォーム**: お名前、メールアドレス、メッセージの受付
- **リアルタイム入力検証**: クライアントサイドでの即座なバリデーション
- **データベース連携**: PostgreSQLを使用した永続化
- **管理者画面**: `/admin/contacts` での問い合わせ一覧表示
- **Basic認証**: 管理者ルートのセキュリティ保護
- **エラーハンドリング**: 適切な日本語エラーメッセージ

### 📚 ブログコンテンツ (Blog Content)
- **ノート**: 日々の思索をMarkdownで記録 (`src/blog/blog/note/`)
- **論文読解**: 最新AI論文の要約と分析 (`src/blog/blog/papers/`)
- **プロジェクト報告**: 開発プロジェクトの完了報告 (`src/blog/blog/project/`)
- **対話記録**: AI との対話記録 (`src/blog/blog/dialogs/`)
- **実装状況**: Next.js App Routerベースのブログシステムを実装済み

### 🐳 Docker デプロイメント
- **完全コンテナ化**: Docker Compose による一括管理
- **マルチステージビルド**: 最適化された本番イメージ
- **PostgreSQL**: 永続化されたデータベース
- **Adminer**: データベース管理GUI（ポート8080）
- **Cloudflare Tunnel**: セキュアな外部公開（オプション）
- **ヘルスチェック**: 自動再起動とサービス依存関係管理

### 🔧 技術基盤
- **Next.js 15 App Router**: 最新のフルスタックフレームワーク
- **TypeScript**: 型安全な開発
- **Prisma ORM**: タイプセーフなデータベース操作
- **Tailwind CSS v4**: モダンなスタイリング
- **PostgreSQL**: 本格的なリレーショナルデータベース（開発・本番共通）
- **Docker & Docker Compose**: コンテナベースのデプロイメント

## 🏗️ アーキテクチャ

### 統一された App Router アーキテクチャ
プロジェクトは Next.js 15 の App Router に完全統一されています：

```
src/
├── app/
│   ├── api/                    # API Routes
│   │   ├── contacts/          # POST /api/contacts
│   │   ├── test-db/           # GET /api/test-db
│   │   └── admin/contacts/    # GET /api/admin/contacts
│   ├── admin/contacts/        # 管理者画面（Basic認証保護）
│   ├── components/            # 再利用可能コンポーネント
│   ├── layout.tsx            # ルートレイアウト
│   └── page.tsx              # ホームページ
├── blog/blog/                 # ブログMarkdownソース
│   ├── intro.md              # はじめに
│   ├── note/                 # ノート（8記事）
│   ├── papers/               # 論文読解（6記事）
│   ├── project/              # プロジェクト報告（1記事）
│   └── dialogs/              # 対話記録（2記事）
├── lib/                       # ユーティリティ関数
└── generated/                 # Prisma生成ファイル
```

### Docker コンテナ構成
```
docker-compose.yml
├── db (PostgreSQL 16)         # メインデータベース
├── app (Next.js 15)           # Webアプリケーション
├── adminer                    # DB管理GUI
└── cloudflared                # Cloudflare Tunnel (オプション)
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

### ローカル開発
```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# コードリンティング
npm run lint
```

### データベース管理
```bash
# Prisma Studio（データベースGUI）
npx prisma studio

# データベーススキーマ同期
npx prisma db push

# Prisma クライアント再生成
npx prisma generate
```

### Docker コマンド
```bash
# Dockerイメージをビルド
docker-compose build

# コンテナを起動（デタッチモード）
docker-compose up -d

# コンテナを停止
docker-compose down

# ログを確認（リアルタイム）
docker-compose logs -f

# 特定サービスのログを確認
docker-compose logs -f app

# コンテナ内でコマンド実行
docker-compose exec app npx prisma migrate deploy

# データベースも含めて完全削除
docker-compose down -v
```

## 📊 技術スタック詳細

| カテゴリ | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| **Frontend** | Next.js | 15.5.3 | フルスタックフレームワーク |
| | React | 19.1.0 | UIライブラリ |
| | TypeScript | ^5 | 型安全な開発 |
| | Tailwind CSS | ^4 | スタイリング |
| | React Icons | ^5.5.0 | アイコンライブラリ |
| **Backend** | Next.js API Routes | 15.5.3 | サーバーレスAPI |
| | Prisma | ^6.16.2 | ORM |
| **Database** | PostgreSQL | 16 | 本番・開発共通 |
| **Infrastructure** | Docker | - | コンテナ化 |
| | Docker Compose | - | オーケストレーション |
| | Cloudflare Tunnel | latest | セキュアな外部公開 |
| **DevTools** | ESLint | ^9 | コード品質 |
| | Turbopack | - | 高速ビルド |
| | Adminer | latest | DB管理GUI |

## 🎯 今後の実装予定

### Phase 2: ブログシステム実装（進行中）
- [ ] **Markdownレンダリング基盤**: gray-matter, remark, remark-htmlの統合
- [ ] **ブログルーティング**: `/blog`、`/blog/[category]`、`/blog/[category]/[slug]`
- [ ] **UIコンポーネント**: BlogCard, MarkdownContent, CategoryNav
- [ ] **シンタックスハイライト**: コードブロックの見やすい表示
- [ ] **SEO対応**: メタデータ、OGP、サイトマップ生成
- 📖 詳細: [docs/plan-2025-11-16.md](docs/plan-2025-11-16.md)

### Phase 3: コンテンツ拡充
- [ ] **プロジェクト詳細ページ**: 各プロジェクトの詳細説明
- [ ] **PPTX ビューア**: 研究発表資料の埋め込み表示
- [ ] **ブログ検索機能**: 全文検索対応
- [ ] **タグシステム**: 記事のカテゴライズとフィルタリング

### Phase 4: 高度な機能
- [ ] **RSSフィード**: ブログ記事の配信
- [ ] **多言語対応**: 英語版の追加
- [ ] **コメントシステム**: 記事へのフィードバック機能
- [ ] **Analytics統合**: アクセス解析

### Phase 5: 運用改善
- [ ] **管理者ダッシュボード**: 統計情報の可視化
- [ ] **画像最適化**: Next.js Imageの活用
- [ ] **キャッシュ戦略**: ISRとStatic Generationの最適化
- [ ] **CDN統合**: Cloudflare最適化

## 📁 プロジェクト構造

```
denno-meishi/
├── docs/                          # ドキュメント
│   ├── README.md                 # ドキュメント目次
│   ├── architecture.md           # アーキテクチャ設計書
│   ├── plan-2025-11-15.md        # デプロイ計画
│   └── plan-2025-11-16.md        # ブログ実装計画
├── prisma/                        # データベース設定
│   └── schema.prisma             # データベーススキーマ
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes
│   │   ├── admin/                # 管理画面
│   │   ├── components/           # コンポーネント
│   │   ├── layout.tsx            # ルートレイアウト
│   │   └── page.tsx              # ホームページ
│   ├── blog/blog/                # ブログMarkdownファイル
│   ├── lib/                      # ユーティリティ
│   └── generated/                # Prisma生成ファイル
├── public/                        # 静的ファイル
├── Dockerfile                     # Dockerイメージ定義
├── docker-compose.yml             # Docker Compose設定
├── cloudflared-config.example.yml # Cloudflare Tunnel設定例
├── .env.example                   # 環境変数テンプレート
├── eslint.config.mjs             # ESLint設定
├── next.config.ts                # Next.js設定（standalone出力）
├── package.json                  # 依存関係
├── tailwind.config.ts            # Tailwind設定
└── tsconfig.json                 # TypeScript設定
```

## 🐳 Docker デプロイメント

### クイックスタート

1. **環境変数の設定:**
   ```bash
   cp .env.example .env
   # .env ファイルを編集して必要な値を設定
   ```

2. **Dockerイメージのビルドとコンテナ起動:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

3. **データベースマイグレーション:**
   ```bash
   # DBがhealthyになるまで数秒待機してから実行
   docker-compose exec app npx prisma migrate deploy
   ```

4. **アクセス確認:**
   - アプリ: http://localhost:3000
   - Adminer (DB管理): http://localhost:8080

### Cloudflare Tunnel（本番環境）

Cloudflare Tunnelを使用してセキュアに外部公開できます。

1. **Cloudflared のセットアップ:**
   ```bash
   cloudflared tunnel login
   cloudflared tunnel create denno-meishi
   ```

2. **設定ファイルの準備:**
   ```bash
   cp cloudflared-config.example.yml cloudflared-config.yml
   # cloudflared-config.yml を編集してTunnel IDを設定
   ```

3. **.env にクレデンシャルパスを追加:**
   ```env
   CLOUDFLARED_CREDENTIALS=/path/to/.cloudflared/<TUNNEL_ID>.json
   ```

4. **DNS設定（Cloudflare Dashboard）:**
   - CNAMEレコードを追加: `yourdomain.com` → `<TUNNEL_ID>.cfargotunnel.com`

詳細: [docs/plan-2025-11-15.md](docs/plan-2025-11-15.md)

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
- **Responsive Design**: Desktop and mobile support with hamburger menu
- **Dark Mode Support**: Unified dark theme

### 📧 Contact System
- **Japanese Contact Form**: Name, email, and message submission
- **Real-time Validation**: Instant client-side validation
- **Database Integration**: Persistence using PostgreSQL
- **Admin Interface**: Contact list view at `/admin/contacts`
- **Basic Authentication**: Secure admin routes
- **Error Handling**: Appropriate Japanese error messages

### 📚 Blog Content
- **Notes**: Daily thoughts and insights in Markdown (`src/blog/blog/note/`)
- **Paper Reading**: Latest AI paper summaries and analysis (`src/blog/blog/papers/`)
- **Project Reports**: Development project completion reports (`src/blog/blog/project/`)
- **Dialog Logs**: Conversation records with AI (`src/blog/blog/dialogs/`)
- **Implementation Status**: Next.js App Router-based blog system implemented

### 🐳 Docker Deployment
- **Full Containerization**: Managed with Docker Compose
- **Multi-stage Build**: Optimized production image
- **PostgreSQL**: Persistent database
- **Adminer**: Database management GUI (port 8080)
- **Cloudflare Tunnel**: Secure external access (optional)
- **Health Checks**: Auto-restart and service dependency management

### 🔧 Technical Foundation
- **Next.js 15 App Router**: Latest full-stack framework
- **TypeScript**: Type-safe development
- **Prisma ORM**: Type-safe database operations
- **Tailwind CSS v4**: Modern styling
- **PostgreSQL**: Robust relational database (development & production)
- **Docker & Docker Compose**: Container-based deployment

## 🏗️ Architecture

### Unified App Router Architecture
The project is fully unified under Next.js 15 App Router:

```
src/
├── app/
│   ├── api/                    # API Routes
│   │   ├── contacts/          # POST /api/contacts
│   │   ├── test-db/           # GET /api/test-db
│   │   └── admin/contacts/    # GET /api/admin/contacts
│   ├── admin/contacts/        # Admin interface (Basic Auth protected)
│   ├── components/            # Reusable components
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── blog/blog/                 # Blog Markdown source
│   ├── intro.md              # Introduction
│   ├── note/                 # Notes (8 articles)
│   ├── papers/               # Paper reading (6 articles)
│   ├── project/              # Project reports (1 article)
│   └── dialogs/              # Dialog logs (2 articles)
├── lib/                       # Utility functions
└── generated/                 # Prisma generated files
```

### Docker Container Architecture
```
docker-compose.yml
├── db (PostgreSQL 16)         # Main database
├── app (Next.js 15)           # Web application
├── adminer                    # DB management GUI
└── cloudflared                # Cloudflare Tunnel (optional)
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

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run code linting
npm run lint
```

### Database Management
```bash
# Prisma Studio (Database GUI)
npx prisma studio

# Sync database schema
npx prisma db push

# Regenerate Prisma client
npx prisma generate
```

### Docker Commands
```bash
# Build Docker image
docker-compose build

# Start containers (detached mode)
docker-compose up -d

# Stop containers
docker-compose down

# View logs (real-time)
docker-compose logs -f

# View specific service logs
docker-compose logs -f app

# Execute command in container
docker-compose exec app npx prisma migrate deploy

# Remove everything including volumes
docker-compose down -v
```

## 📊 Technical Stack Details

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | Next.js | 15.5.3 | Full-stack framework |
| | React | 19.1.0 | UI library |
| | TypeScript | ^5 | Type-safe development |
| | Tailwind CSS | ^4 | Styling |
| | React Icons | ^5.5.0 | Icon library |
| **Backend** | Next.js API Routes | 15.5.3 | Serverless API |
| | Prisma | ^6.16.2 | ORM |
| **Database** | PostgreSQL | 16 | Development & Production |
| **Infrastructure** | Docker | - | Containerization |
| | Docker Compose | - | Orchestration |
| | Cloudflare Tunnel | latest | Secure external access |
| **DevTools** | ESLint | ^9 | Code quality |
| | Turbopack | - | Fast builds |
| | Adminer | latest | DB management GUI |

## 🎯 Future Implementation Plans

### Phase 2: Blog System Implementation (In Progress)
- [ ] **Markdown Rendering Foundation**: gray-matter, remark, remark-html integration
- [ ] **Blog Routing**: `/blog`, `/blog/[category]`, `/blog/[category]/[slug]`
- [ ] **UI Components**: BlogCard, MarkdownContent, CategoryNav
- [ ] **Syntax Highlighting**: Enhanced code block display
- [ ] **SEO Support**: Metadata, OGP, sitemap generation
- 📖 Details: [docs/plan-2025-11-16.md](docs/plan-2025-11-16.md)

### Phase 3: Content Enhancement
- [ ] **Project Detail Pages**: Detailed descriptions of each project
- [ ] **PPTX Viewer**: Embedded display of research presentation materials
- [ ] **Blog Search**: Full-text search functionality
- [ ] **Tag System**: Article categorization and filtering

### Phase 4: Advanced Features
- [ ] **RSS Feed**: Blog article distribution
- [ ] **Multilingual Support**: English version addition
- [ ] **Comment System**: Article feedback functionality
- [ ] **Analytics Integration**: Access analysis

### Phase 5: Operations Improvement
- [ ] **Admin Dashboard**: Statistics visualization
- [ ] **Image Optimization**: Next.js Image utilization
- [ ] **Caching Strategy**: ISR and Static Generation optimization
- [ ] **CDN Integration**: Cloudflare optimization

## 📁 Project Structure

```
denno-meishi/
├── docs/                          # Documentation
│   ├── README.md                 # Documentation index
│   ├── architecture.md           # Architecture design document
│   ├── plan-2025-11-15.md        # Deployment plan
│   └── plan-2025-11-16.md        # Blog implementation plan
├── prisma/                        # Database configuration
│   └── schema.prisma             # Database schema
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes
│   │   ├── admin/                # Admin interface
│   │   ├── components/           # Components
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── blog/blog/                # Blog Markdown files
│   ├── lib/                      # Utilities
│   └── generated/                # Prisma generated files
├── public/                        # Static files
├── Dockerfile                     # Docker image definition
├── docker-compose.yml             # Docker Compose configuration
├── cloudflared-config.example.yml # Cloudflare Tunnel config example
├── .env.example                   # Environment variables template
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration (standalone output)
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🐳 Docker Deployment

### Quick Start

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env file to set required values
   ```

2. **Build Docker image and start containers:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

3. **Run database migration:**
   ```bash
   # Wait a few seconds for DB to become healthy, then run:
   docker-compose exec app npx prisma migrate deploy
   ```

4. **Access the application:**
   - App: http://localhost:3000
   - Adminer (DB management): http://localhost:8080

### Cloudflare Tunnel (Production)

You can securely expose your app externally using Cloudflare Tunnel.

1. **Set up Cloudflared:**
   ```bash
   cloudflared tunnel login
   cloudflared tunnel create denno-meishi
   ```

2. **Prepare configuration file:**
   ```bash
   cp cloudflared-config.example.yml cloudflared-config.yml
   # Edit cloudflared-config.yml to set your Tunnel ID
   ```

3. **Add credentials path to .env:**
   ```env
   CLOUDFLARED_CREDENTIALS=/path/to/.cloudflared/<TUNNEL_ID>.json
   ```

4. **Configure DNS (Cloudflare Dashboard):**
   - Add CNAME record: `yourdomain.com` → `<TUNNEL_ID>.cfargotunnel.com`

Details: [docs/plan-2025-11-15.md](docs/plan-2025-11-15.md)

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