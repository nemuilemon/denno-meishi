# Project Architecture

## Overview

Denno Meishi is a portfolio website built with Next.js 15 using the App Router architecture, featuring a contact form system with database persistence.

## Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Runtime**: Node.js
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Build Tool**: Turbopack

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
│   │   ├── admin/             # Admin pages
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
│   ├── generated/            # Generated files (Prisma)
│   │   └── prisma/
│   └── lib/                  # Utility libraries
│       └── prisma.ts         # Database client
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── dev.db               # SQLite database file
├── docs/                    # Documentation
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
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
Database Layer (SQLite)
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
| GET | `/api/admin/contacts` | Retrieve all contacts | None* |

*Note: Authentication should be implemented for admin endpoints in production.

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

### Development
```bash
npm run dev    # Start development server with Turbopack
```

### Production
```bash
npm run build  # Build optimized production bundle
npm start      # Start production server
```

### Build Output
- Static pages are pre-rendered at build time
- API routes are server-rendered on demand
- Assets are optimized and bundled

## Performance Considerations

- **Server Components**: Default for better performance
- **Client Components**: Only where interactivity is needed (`'use client'`)
- **Static Generation**: Home page is statically generated
- **Database**: SQLite for development, easily replaceable for production

## Security Considerations

### Current Implementation
- Input validation on API endpoints
- Email format validation
- SQL injection protection via Prisma ORM
- XSS protection via React's built-in escaping

### Production Recommendations
- Add authentication for admin endpoints
- Implement rate limiting
- Add CSRF protection
- Use environment variables for secrets
- Consider database encryption

## Monitoring and Observability

### Development
- Next.js built-in error reporting
- Console logging for debugging
- TypeScript compile-time checking

### Production Recommendations
- Error tracking service integration
- Performance monitoring
- Database query monitoring
- Logging aggregation

## Scalability Considerations

### Current Architecture Limits
- SQLite database (single file)
- No caching layer
- Single server deployment

### Scaling Path
1. **Database**: Migrate to PostgreSQL/MySQL
2. **Caching**: Add Redis for session/data caching
3. **CDN**: Static asset distribution
4. **Monitoring**: Add APM and logging
5. **Container**: Docker deployment
6. **Orchestration**: Kubernetes for multi-instance deployment