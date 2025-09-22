# Denno Meishi Documentation

This directory contains comprehensive documentation for the Denno Meishi portfolio website project.

## Documentation Index

### 📋 [Architecture Overview](./architecture.md)
Complete technical architecture documentation including:
- Technology stack and project structure
- Component hierarchy and data models
- API design and database schema
- Performance and security considerations
- Scalability recommendations

### 🔄 [App Router Migration](./app-router-migration.md)
Detailed documentation of the architectural migration:
- Migration from mixed Pages/App Router to unified App Router
- Technical changes and code examples
- Directory structure changes
- Verification steps and benefits achieved

## Quick Reference

### Project Structure
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── admin/          # Admin pages
│   └── components/     # UI components
├── lib/                # Utilities
└── generated/          # Generated files
```

### Key Commands
```bash
npm run dev             # Development server
npm run build           # Production build
npm run lint            # Code linting
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema to database
```

### API Endpoints
- `GET /api/test-db` - Database test
- `POST /api/contacts` - Submit contact
- `GET /api/admin/contacts` - Retrieve contacts

## Development Guidelines

### Adding New Features
1. Follow App Router conventions
2. Use TypeScript interfaces
3. Implement proper error handling
4. Add client-side validation
5. Update documentation

### Code Style
- Use Tailwind CSS for styling
- Follow ESLint configuration
- Use `'use client'` only when necessary
- Implement proper error boundaries

### Database Changes
1. Update `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Run `npx prisma generate`
4. Update TypeScript interfaces

## Troubleshooting

### Common Issues
- **Port conflicts**: Use different port with `-p` flag
- **Prisma errors**: Regenerate client with `npx prisma generate`
- **Build errors**: Check ESLint configuration and TypeScript errors

### Getting Help
- Check Next.js documentation for App Router
- Review Prisma documentation for database issues
- Consult Tailwind CSS documentation for styling

## Contributing

When making changes to the project:
1. Update relevant documentation
2. Test all affected functionality
3. Ensure build passes without errors
4. Follow existing code patterns and conventions