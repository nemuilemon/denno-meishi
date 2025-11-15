# Project Architecture

## Overview

Denno Meishi is a portfolio website built with Next.js 15 using the App Router architecture, featuring a contact form system with database persistence, blog content management, and production-ready Docker deployment.

## Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Runtime**: Node.js 20
- **Database**: PostgreSQL 16 with Prisma ORM
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5
- **Build Tool**: Turbopack
- **Containerization**: Docker & Docker Compose
- **Infrastructure**: Cloudflare Tunnel for secure external access

## Project Structure

```
denno-meishi/
├── src/
│   ├── app/                    # App Router directory
│   │   ├── api/               # API routes
│   │   │   ├── test-db/
│   │   │   │   └── route.ts   # Database test endpoint
│   │   │   ├── contacts/
│   │   │   │   └── route.ts   # Contact form submission
│   │   │   └── admin/
│   │   │       └── contacts/
│   │   │           └── route.ts # Admin contact retrieval
│   │   ├── admin/             # Admin pages (Basic Auth protected)
│   │   │   └── contacts/
│   │   │       └── page.tsx   # Contact management interface
│   │   ├── components/        # Reusable UI components
│   │   │   ├── About.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Showcase.tsx
│   │   │   └── Skills.tsx
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── favicon.ico       # Site icon
│   ├── blog/blog/            # Blog content (Markdown)
│   │   ├── intro.md          # Introduction
│   │   ├── note/             # Research notes (8 articles)
│   │   ├── papers/           # Paper reading reports (6 articles)
│   │   ├── project/          # Project reports (1 article)
│   │   └── dialogs/          # Dialog logs (2 articles)
│   ├── generated/            # Generated files (Prisma)
│   │   └── prisma/
│   └── lib/                  # Utility libraries
│       └── prisma.ts         # Database client
├── prisma/
│   └── schema.prisma         # Database schema
├── docs/                     # Documentation
│   ├── README.md            # Documentation index
│   ├── architecture.md      # This file
│   ├── plan-2025-11-15.md   # Deployment plan
│   └── plan-2025-11-16.md   # Blog implementation plan
├── public/                  # Static assets
├── Dockerfile               # Docker image definition
├── docker-compose.yml       # Multi-container orchestration
├── cloudflared-config.example.yml # Cloudflare Tunnel config
├── .env.example             # Environment variables template
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration (standalone output)
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Architecture Patterns

### App Router Architecture

The project uses Next.js App Router architecture throughout:

- **Pages**: Defined as `page.tsx` files within route directories
- **Layouts**: Shared UI defined in `layout.tsx` files
- **API Routes**: HTTP handlers in `route.ts` files
- **Components**: Reusable UI components in the `components/` directory

### Database Layer

```
Application Layer (React Components)
         ↓
API Layer (Next.js Route Handlers)
         ↓
ORM Layer (Prisma Client)
         ↓
Database Layer (PostgreSQL 16)
```

### Docker Container Architecture

```
┌─────────────────────────────────────────────┐
│           docker-compose.yml                │
├─────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │    db    │  │   app    │  │ adminer  │  │
│  │ (PostgreSQL) │ (Next.js)│  │  (GUI)   │  │
│  │   :5432  │←─│  :3000   │  │  :8080   │  │
│  └──────────┘  └──────────┘  └──────────┘  │
│                      ↑                       │
│  ┌────────────────────────────────────────┐ │
│  │      cloudflared (Cloudflare Tunnel)   │ │
│  │  Secure external access (production)   │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
         │
         ↓ (HTTPS via Cloudflare)
    Public Internet
```

### Component Hierarchy

```
RootLayout
├── HomePage
│   ├── Hero
│   ├── About
│   ├── Skills
│   ├── Showcase
│   ├── ContactForm
│   └── Footer
└── AdminContactsPage (separate route)
```

## Data Models

### Database Schema

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
}

model Contact {
  id         Int      @id @default(autoincrement())
  name       String
  email      String
  message    String
  receivedAt DateTime @default(now())
}
```

## API Design

### Endpoints

| Method | Endpoint | Purpose | Authentication |
|--------|----------|---------|----------------|
| GET | `/api/test-db` | Database connectivity test | None |
| POST | `/api/contacts` | Submit contact form | None |
| GET | `/api/admin/contacts` | Retrieve all contacts | Basic Auth |
| GET | `/admin/contacts` | Admin UI for contacts | Basic Auth |

**Authentication**: Admin routes are protected with HTTP Basic Authentication using environment variables `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

### Request/Response Formats

#### POST /api/contacts
```typescript
// Request
{
  "name": string,
  "email": string,
  "message": string
}

// Response (Success)
{
  "id": number,
  "name": string,
  "email": string,
  "message": string,
  "receivedAt": string
}

// Response (Error)
{
  "error": string
}
```

## Styling Architecture

### Tailwind CSS Classes

The project uses utility-first CSS with Tailwind:
- Component-scoped styling
- Responsive design patterns
- Consistent spacing and typography
- Color scheme based on blues and grays

### Component Structure

Components follow a consistent pattern:
1. TypeScript interfaces for props
2. State management with React hooks
3. Event handlers
4. Conditional rendering for different states
5. Tailwind classes for styling

## Build and Deployment

### Local Development
```bash
npm run dev    # Start development server with Turbopack on port 3123
```

### Local Production Build
```bash
npm run build  # Build optimized production bundle
npm start      # Start production server
```

### Docker Deployment

#### Development/Testing
```bash
docker-compose build           # Build Docker image
docker-compose up -d          # Start all services
docker-compose logs -f app    # View application logs
docker-compose exec app npx prisma migrate deploy  # Run migrations
```

#### Production with Cloudflare Tunnel
```bash
# 1. Set up environment variables in .env
# 2. Configure Cloudflare Tunnel credentials
# 3. Build and start all services
docker-compose build
docker-compose up -d

# 4. Verify services are running
docker-compose ps
```

### Build Output
- **Standalone Mode**: Next.js builds a minimal standalone server (`output: 'standalone'`)
- **Multi-stage Docker**: Optimized image with only production dependencies
- **Static Assets**: Pre-rendered and optimized
- **API Routes**: Server-rendered on demand
- **Database**: PostgreSQL with persistent volumes

## Performance Considerations

- **Server Components**: Default for better performance
- **Client Components**: Only where interactivity is needed (`'use client'`)
- **Static Generation**: Home page is statically generated
- **Database**: PostgreSQL with connection pooling
- **Turbopack**: Fast builds and hot module replacement in development
- **Docker Multi-stage Build**: Minimal production image size
- **Standalone Output**: Optimized server bundle

## Security Considerations

### Current Implementation
- ✅ **Basic Authentication**: Admin routes protected with HTTP Basic Auth
- ✅ **Input Validation**: API endpoints validate input data
- ✅ **Email Format Validation**: Client and server-side validation
- ✅ **SQL Injection Protection**: Prisma ORM parameterized queries
- ✅ **XSS Protection**: React's built-in escaping
- ✅ **Environment Variables**: Secrets stored in `.env` file (gitignored)
- ✅ **Docker Secrets**: Database credentials via environment variables
- ✅ **Cloudflare Tunnel**: Secure external access without exposing ports

### Production Recommendations
- Consider implementing rate limiting for API endpoints
- Add CSRF protection for state-changing operations
- Implement session-based authentication for better UX
- Enable database encryption at rest
- Set up automated security scanning
- Configure Content Security Policy (CSP) headers
- Enable HTTPS-only cookies

## Blog Content Architecture (Planned)

### Current State
- ✅ **Content Storage**: Markdown files in `src/blog/blog/`
- ✅ **Categories**: note, papers, project, dialogs
- ⏳ **Rendering**: Planning Next.js App Router implementation
- ⏳ **Markdown Processing**: To implement gray-matter + remark

### Planned Implementation

#### Technology Stack
- **gray-matter**: Parse YAML frontmatter from Markdown
- **remark**: Markdown to AST processing
- **remark-html**: Convert AST to HTML
- **remark-gfm**: GitHub Flavored Markdown support

#### Routing Structure
```
/blog                           # Blog index page
/blog/[category]                # Category listing (note, papers, etc.)
/blog/[category]/[slug]         # Individual article page
```

#### Components
- `BlogLayout`: Shared layout for blog pages
- `BlogCard`: Article preview card
- `MarkdownContent`: Rendered Markdown with syntax highlighting
- `CategoryNav`: Navigation between categories
- `TableOfContents`: Auto-generated from headings

See [docs/plan-2025-11-16.md](plan-2025-11-16.md) for detailed implementation plan.

## Monitoring and Observability

### Development
- Next.js built-in error reporting
- Console logging for debugging
- TypeScript compile-time checking
- Docker Compose logs

### Production Recommendations
- Error tracking service integration (e.g., Sentry)
- Performance monitoring (e.g., New Relic, Datadog)
- Database query monitoring via Prisma
- Logging aggregation (e.g., ELK stack, Loki)
- Uptime monitoring (e.g., UptimeRobot, Pingdom)

## Scalability Considerations

### Current Architecture
- ✅ **PostgreSQL Database**: Production-grade relational database
- ✅ **Docker Containerization**: Ready for horizontal scaling
- ✅ **Cloudflare Tunnel**: Built-in DDoS protection and CDN
- ⏳ **No Caching Layer**: Direct database queries
- ⏳ **Single Instance**: One app container

### Scaling Path

#### Short-term (Current → 1K users)
1. ✅ **Database**: PostgreSQL (done)
2. ✅ **Containerization**: Docker (done)
3. ⏳ **Connection Pooling**: Configure Prisma connection limits
4. ⏳ **Static Asset CDN**: Leverage Cloudflare's CDN

#### Mid-term (1K → 10K users)
1. **Caching Layer**: Add Redis for session/query caching
2. **Read Replicas**: PostgreSQL read replicas for scaling reads
3. **Load Balancing**: Multiple app containers behind load balancer
4. **Monitoring**: APM and logging aggregation

#### Long-term (10K+ users)
1. **Kubernetes**: Container orchestration for auto-scaling
2. **Database Sharding**: Horizontal database partitioning
3. **Microservices**: Split blog, contact, and admin services
4. **Edge Computing**: Deploy to multiple regions
5. **Message Queue**: Async processing for heavy operations