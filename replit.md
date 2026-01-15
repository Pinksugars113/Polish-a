# LacquerLab - Nail Polish Collection Manager

## Overview

LacquerLab is a nail polish collection management application that allows users to catalog their polish collection, add new polishes with color swatches, and use AI-powered color matching to find polishes in their collection that match inspiration images (outfits, flowers, etc.).

The application follows a full-stack TypeScript architecture with a React frontend and Express backend, using PostgreSQL for data persistence and OpenAI for intelligent color matching.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for polished transitions
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: REST endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **AI Integration**: OpenAI API for image-based color matching

### Data Layer
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` - defines the `polishes` table
- **Migrations**: Drizzle Kit with `db:push` command for schema sync

### Key Data Model
The `polishes` table stores:
- Brand, name, hex color code
- Finish type (Glossy, Matte, Jelly, Cateye, Glitter, Shimmer)
- Optional photo URL and notes

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database schema and Zod validation schemas
- `routes.ts`: API route definitions with type-safe contracts

### Development vs Production
- Development: Vite dev server with HMR, Express serves API
- Production: Vite builds to `dist/public`, Express serves static files

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### AI Services
- **OpenAI API**: Used for color matching feature - analyzes uploaded images to find matching polish colors
- Configured via `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL`

### UI Component Library
- **shadcn/ui**: Pre-built accessible components (new-york style variant)
- **Radix UI**: Underlying primitives for components
- **Lucide React**: Icon library

### Key NPM Packages
- `@tanstack/react-query`: Data fetching and caching
- `framer-motion`: Animation library
- `react-hook-form` + `@hookform/resolvers`: Form handling with Zod validation
- `csv-parse`: CSV import functionality for bulk polish data