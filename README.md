# AMO (Analyze, Monitor, Optimize)

A comprehensive system combining web and desktop applications for business management, POS operations, and analytics.

## Project Structure

```
.
├── web/           # Next.js web application
├── desktop/       # C# desktop application
└── shared/        # Shared resources and documentation
```

## Web Application (Next.js)

The web application serves as the central management platform with the following features:
- User authentication and authorization
- License management
- Fraud monitoring
- User activity logs
- Receipt QR code validation
- Centralized tracking and analytics

### Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Prisma ORM
- PostgreSQL (via Supabase)
- Vercel hosting

## Desktop Application (C#)

The desktop application provides offline capabilities with:
- User authentication
- Client management
- Product/Item management
- POS system with receipt generation
- QR code generation for receipts
- Weekly sync with web platform

### Tech Stack
- C# .NET
- SQLite
- REST API integration
- QR code generation

## Getting Started

### Web Application Setup
1. Navigate to the `web` directory
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`

### Desktop Application Setup
1. Navigate to the `desktop` directory
2. Open the solution in Visual Studio
3. Restore NuGet packages
4. Build and run the application

## License

This project is proprietary software. All rights reserved.

## Contributing

Please contact the project maintainers for contribution guidelines. 