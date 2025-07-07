# TimeScope News Application

## Overview

TimeScope is a modern news platform built with React, TypeScript, and Express.js. The application provides a clean, responsive interface for browsing and reading news articles with features like search, categorization, and featured content. It follows a full-stack architecture with a React frontend and Express backend, using Drizzle ORM for database operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API Style**: RESTful API endpoints
- **Session Management**: Express sessions with PostgreSQL storage
- **Development**: In-memory storage fallback for development

### Data Storage Solutions
- **Primary Database**: PostgreSQL (production)
- **ORM**: Drizzle ORM with Zod validation
- **Development Storage**: In-memory storage for articles and users
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### Database Schema
The application uses two main entities:
- **Articles**: Contains title, slug, content, author information, category, publication date, and featured status
- **Users**: Basic user management with username and password (prepared for future authentication)

### Frontend Components
- **Navigation**: Sticky header with category links and search functionality
- **ArticleCard**: Reusable component with multiple display variants (hero, sidebar, grid)
- **SearchOverlay**: Modal search interface with real-time results
- **Pages**: Homepage with featured articles and individual article pages

### API Endpoints
- `GET /api/articles` - Retrieve all articles
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/slug/:slug` - Get article by slug
- `GET /api/articles/category/:category` - Get articles by category
- `GET /api/articles/search` - Search articles (prepared endpoint)

## Data Flow

1. **Article Display**: Homepage fetches articles and featured content separately, displaying featured articles prominently with others in a grid layout
2. **Article Reading**: Individual articles are fetched by slug and rendered with full content and metadata
3. **Search**: Search overlay provides real-time article search (endpoint prepared but not fully implemented)
4. **Navigation**: Category-based navigation allows filtering articles by topic

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for production
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React routing
- **@radix-ui/***: Accessible UI component primitives

### Development Tools
- **Vite**: Fast development server and build tool
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **TypeScript**: Type safety across the application
- **TailwindCSS**: Utility-first styling

## Deployment Strategy

### Build Process
- Frontend builds to `dist/public` using Vite
- Backend builds to `dist` using esbuild with ESM format
- Single build command handles both frontend and backend compilation

### Environment Setup
- Development: Uses in-memory storage and Vite dev server
- Production: Requires `DATABASE_URL` environment variable for PostgreSQL
- Database migrations managed through `drizzle-kit push` command

### Server Configuration
- Express serves both API endpoints and static frontend files
- Vite middleware in development for hot reloading
- Request logging for API endpoints with response capture

## Changelog
- July 07, 2025. Initial setup
- July 07, 2025. Added comprehensive navigation system with working category pages, expanded article database to 25+ articles across all categories, fixed console warnings, and ensured all links work properly for paywall testing

## User Preferences

Preferred communication style: Simple, everyday language.
User needs: Working navigation links for all categories, paywall testing capability, Fastly CDN compatibility.