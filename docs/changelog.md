# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [0.3.0] - 2026-01-06

### Added
- **Toolbox Section** (`/tools`)
  - Index page for experimental tools
  - **Clock Tool**: Real-time digital clock with immersive design
  - Shared layout architecture
- **UI Components**
  - **Showcase**: Project portfolio display component
  - **Footer**: Site-wide footer
  - **ParticleBackground**: Interactive background effect
- **Analytics**
  - Google Analytics 4 (GA4) integration

### Changed
- **Content Structure**
  - Expanded blog contents with new notes and dialogs (Dec 2025)
  - Enhanced blog content management utilities

### Removed
- **Contact System**
  - Removed Contact Form component
  - Removed associated API routes and database models

---

## [0.2.1] - 2025-11-16

### Fixed
- **Blog Directory Structure**
  - Updated `BLOG_DIR` constant in `src/lib/blog.ts` from `src/blog/blog` to `src/blog`
  - Fixed blog content path after directory restructuring

### Changed
- **Documentation Updates**
  - Updated `docs/plan-2025-11-16.md` with directory structure change history
  - Updated Content Root Directory path reference
  - Enhanced Jupyter Book deprecation section with migration status and implementation details
  - Updated blog content statistics (7 notes, 7 papers)

---

## [0.2.0] - 2025-11-16

### Added

#### Blog System Implementation
- **Markdown Processing Library (`src/lib/blog.ts`)**
  - File system-based content loading from `src/blog/blog/`
  - Server-side Markdown to HTML conversion using remark/rehype pipeline
  - Server-side syntax highlighting with `rehype-prism-plus`
  - Type-safe TypeScript interfaces for blog posts
  - Category support: note, papers, project, dialogs
  - Automatic date extraction from filename pattern (YY-MM-DD_Title.md)
  - Static site generation (SSG) via `getAllPostSlugs()`

- **Blog Pages**
  - `/blog` - Blog index page with all categories
  - `/blog/[category]` - Category listing pages
  - `/blog/[category]/[slug]` - Individual article pages
  - Full static generation with `generateStaticParams`
  - Dynamic metadata generation for SEO

- **Styling**
  - Markdown content styles in `src/app/globals.css`
  - Prism.js dark theme for syntax highlighting
  - Responsive typography with Tailwind CSS
  - Support for tables, code blocks, blockquotes, lists

- **Dependencies**
  - `gray-matter` ^4.0.3 - Frontmatter parsing
  - `remark` ^15.0.1 - Markdown processing
  - `remark-gfm` ^4.0.1 - GitHub Flavored Markdown
  - `remark-rehype` ^11.1.2 - Markdown to HTML AST
  - `rehype-stringify` ^10.0.1 - HTML string generation
  - `rehype-slug` ^6.0.0 - Auto-generate heading IDs
  - `rehype-prism-plus` ^2.0.1 - Server-side syntax highlighting

#### Documentation Updates
- **README.md**
  - Added Docker deployment section with quick start guide
  - Updated technology stack table with infrastructure tools
  - Added blog content structure documentation
  - Updated implementation roadmap with current progress
  - Enhanced project structure diagram

- **docs/architecture.md**
  - Updated technology stack to PostgreSQL 16
  - Added Docker container architecture diagram
  - Enhanced security considerations with Basic Auth details
  - Added blog content architecture section
  - Updated scalability roadmap with current state

- **docs/plan-2025-11-16.md**
  - Added rehype plugins for performance optimization
  - Detailed `src/lib/blog.ts` implementation guidelines
  - Moved syntax highlighting to Phase 1
  - Added performance optimization notes

### Changed
- Updated `Blog.tsx` component to use Next.js Link instead of external URL
- Fixed Prisma Client import path in `src/lib/prisma.ts`
- Enhanced blog description in homepage

### Fixed
- Prisma Client import path (`'@prisma/client'` instead of `'../generated/prisma'`)

### Performance
- Server-side syntax highlighting reduces client JavaScript
- Static site generation for all blog posts
- Zero runtime overhead for Markdown processing
- Improved Core Web Vitals (FCP/LCP)

---

## [0.1.0] - 2025-11-15

### Added

#### Core Application
- **Next.js 15 App Router** architecture
- **Landing Page** with hero section, profile, skills showcase
- **Contact Form System**
  - Real-time client-side validation
  - PostgreSQL database integration via Prisma
  - Admin interface at `/admin/contacts`
  - Basic Authentication for admin routes
  - Japanese language support

#### Infrastructure
- **Docker Deployment**
  - Multi-stage Dockerfile for optimized builds
  - Docker Compose orchestration
  - PostgreSQL 16 database service
  - Adminer database management GUI
  - Cloudflare Tunnel support for secure external access
  - Health checks and service dependencies

#### Database
- **Prisma ORM** integration
  - Contact model with automatic timestamps
  - Type-safe database operations
  - Migration support

#### UI/UX
- **Dark Theme** unified across all components
- **Responsive Design** with hamburger menu
- **Tailwind CSS v4** for styling
- **React Icons** ^5.5.0 for iconography

#### Content
- **Blog Content (Markdown)**
  - 8 research notes in `src/blog/blog/note/`
  - 6 paper reading reports in `src/blog/blog/papers/`
  - 1 project report in `src/blog/blog/project/`
  - 2 AI dialogue logs in `src/blog/blog/dialogs/`

#### Documentation
- **README.md** - Comprehensive project documentation
- **docs/architecture.md** - Technical architecture details
- **docs/plan-2025-11-15.md** - Docker deployment plan
- **docs/plan-2025-11-16.md** - Blog implementation plan

### Security
- Basic Authentication for admin routes
- Environment variable-based secrets management
- SQL injection protection via Prisma ORM
- XSS protection via React
- Secure Docker configuration

---

## Project Statistics

### Current Features
- ✅ Landing page with portfolio sections
- ✅ Blog system with 24+ articles
- ✅ Toolbox section with experimental utilities
- ✅ Interactive background (Particles)
- ✅ Google Analytics 4 integration
- ✅ Docker deployment with Cloudflare Tunnel
- ✅ Dark mode theme
- ✅ Responsive design

### Technology Stack
- **Framework**: Next.js 15.5.3 (App Router)
- **Runtime**: Node.js 20
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Containerization**: Docker & Docker Compose
- **Infrastructure**: Cloudflare Tunnel
- **Analytics**: Google Analytics 4

### Content Statistics
- **Total Blog Posts**: 24 articles
  - Research Notes: 12
  - Paper Reports: 8
  - Project Reports: 1
  - Dialogue Logs: 3

---

## Links

- [Project Repository](https://github.com/nemuilemon/denno-meishi)
- [Documentation](docs/README.md)
- [Architecture](docs/architecture.md)
- [Deployment Plan](docs/plan-2025-11-15.md)
- [Blog Implementation](docs/plan-2025-11-16.md)

---

## Contributing

See [README.md](../README.md#-contributing) for contribution guidelines.

## License

This project is licensed under the MIT License.
