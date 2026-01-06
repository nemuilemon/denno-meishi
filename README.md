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
- **プロジェクト紹介 (Showcase)**: 開発実績のインタラクティブな展示
- **レスポンシブデザイン**: デスクトップ・モバイル対応
- **ダークモード対応**: 没入感のあるパーティクル背景

### 🧰 ツールボックス (`/tools`)
- **実験的ユーティリティ**: 日々の活動を支援するツール群
- **Clock**: 没入型デジタル時計
- **拡張性**: 共通レイアウトによる容易なツール追加

### 📚 ブログコンテンツ (Blog Content)
- **ノート**: 日々の思索をMarkdownで記録 (`src/blog/note/`)
- **論文読解**: 最新AI論文の要約と分析 (`src/blog/papers/`)
- **プロジェクト報告**: 開発プロジェクトの完了報告 (`src/blog/project/`)
- **対話記録**: AI との対話記録 (`src/blog/dialogs/`)
- **実装状況**: Next.js App RouterベースのMarkdownブログシステム

### 🐳 Docker デプロイメント
- **完全コンテナ化**: Docker Compose による一括管理
- **マルチステージビルド**: 最適化された本番イメージ
- **Cloudflare Tunnel**: セキュアな外部公開

### 🔧 技術基盤
- **Next.js 15 App Router**: 最新のフルスタックフレームワーク
- **TypeScript**: 型安全な開発
- **Tailwind CSS v4**: モダンなスタイリング
- **Google Analytics 4**: ユーザー行動分析
- **Docker & Docker Compose**: コンテナベースのデプロイメント

## 🏗️ アーキテクチャ

### 統一された App Router アーキテクチャ
プロジェクトは Next.js 15 の App Router に完全統一されています：

```
src/
├── app/
│   ├── tools/                 # ツールボックス
│   ├── blog/                  # ブログページ
│   ├── components/            # 再利用可能コンポーネント
│   ├── layout.tsx             # ルートレイアウト（GA4含む）
│   └── page.tsx               # ホームページ
├── blog/                      # ブログMarkdownソース
│   ├── note/                  # ノート
│   ├── papers/                # 論文読解
│   ├── project/               # プロジェクト報告
│   └── dialogs/               # 対話記録
└── lib/                       # ユーティリティ関数
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

3. **開発サーバーを起動:**
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

### Docker コマンド
```bash
# Dockerイメージをビルド
docker-compose build

# コンテナを起動
docker-compose up -d
```

## 📊 技術スタック詳細

| カテゴリ | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| **Frontend** | Next.js | 15.5.3 | フルスタックフレームワーク |
| | React | 19.1.0 | UIライブラリ |
| | TypeScript | ^5 | 型安全な開発 |
| | Tailwind CSS | ^4 | スタイリング |
| **Infrastructure** | Docker | - | コンテナ化 |
| | Cloudflare Tunnel | latest | セキュアな外部公開 |
| **Analytics** | Google Analytics 4 | - | アクセス解析 |

## 🎯 今後の実装予定

### コンテンツ拡充と機能強化
- [ ] **ツールボックス拡張**: 新しいユーティリティツールの追加
- [ ] **インタラクション改善**: マイクロインタラクションの強化
- [ ] **検索機能**: ブログ記事の全文検索
- [ ] **SEO最適化**: メタデータの継続的な改善

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

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 👤 作成者

**もうちゃん (Mouchan)**
- GitHub: [@nemuilemon](https://github.com/nemuilemon)
- Portfolio: [この サイト](https://nemuilemon.top)

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
- **Project Gallery (Showcase)**: Interactive display of development achievements
- **Responsive Design**: Desktop and mobile support
- **Dark Mode Support**: Immersive particle background

### 🧰 Toolbox (`/tools`)
- **Experimental Utilities**: Tools to support daily activities
- **Clock**: Immersive digital clock
- **Extensible**: easy tool addition via shared layout

### 📚 Blog Content
- **Notes**: Daily thoughts and insights in Markdown (`src/blog/note/`)
- **Paper Reading**: Latest AI paper summaries and analysis (`src/blog/papers/`)
- **Project Reports**: Development project completion reports (`src/blog/project/`)
- **Dialog Logs**: Conversation records with AI (`src/blog/dialogs/`)
- **Implementation Status**: Next.js App Router-based Markdown blog system

### 🐳 Docker Deployment
- **Full Containerization**: Managed with Docker Compose
- **Multi-stage Build**: Optimized production image
- **Cloudflare Tunnel**: Secure external access

### 🔧 Technical Foundation
- **Next.js 15 App Router**: Latest full-stack framework
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Modern styling
- **Google Analytics 4**: User behavior analysis
- **Docker & Docker Compose**: Container-based deployment

## 🏗️ Architecture

### Unified App Router Architecture
The project is fully unified under Next.js 15 App Router:

```
src/
├── app/
│   ├── tools/                 # Toolbox
│   ├── blog/                  # Blog pages
│   ├── components/            # Reusable components
│   ├── layout.tsx             # Root layout (includes GA4)
│   └── page.tsx               # Home page
├── blog/                      # Blog Markdown source
│   ├── note/                  # Notes
│   ├── papers/                # Paper reading
│   ├── project/               # Project reports
│   └── dialogs/               # Dialog logs
└── lib/                       # Utility functions
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

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The site will be available at [http://localhost:3123](http://localhost:3123).

##  Technical Stack Details

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | Next.js | 15.5.3 | Full-stack framework |
| | React | 19.1.0 | UI library |
| | TypeScript | ^5 | Type-safe development |
| | Tailwind CSS | ^4 | Styling |
| **Infrastructure** | Docker | - | Containerization |
| | Cloudflare Tunnel | latest | Secure external access |
| **Analytics** | Google Analytics 4 | - | User analysis |

## 🎯 Future Implementation Plans

### Content & Feature Enhancement
- [ ] **Toolbox Expansion**: Add new utility tools
- [ ] **Interaction**: Enhanced micro-interactions
- [ ] **Search**: Full-text search for blog posts
- [ ] **SEO**: Continuous metadata optimization

## 📝 License

This project is published under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👤 Author

**Mouchan (もうちゃん)**
- GitHub: [@nemuilemon](https://github.com/nemuilemon)
- Portfolio: [This Site](https://nemuilemon.top)

---

**"Welcome to the world woven by my brain and AI's heart."**

*This portfolio website was designed and developed through dialogue with AI.*