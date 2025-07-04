# RepWise(AI) - Healthcare Rep Performance Management System

## Overview

RepWise(AI) is a web application designed to streamline healthcare representative performance management by combining KPI visibility, structured coaching workflows, and AI-driven training recommendations in a single platform. The application serves two primary user roles: Healthcare Representatives who view personal KPIs and coaching actions, and Direct Managers who monitor team performance and provide coaching feedback.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Build Tool**: Vite for development and production builds
- **Authentication**: JWT-based authentication with localStorage persistence

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **API Pattern**: RESTful API with JSON responses
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Storage**: DatabaseStorage class implementing persistent PostgreSQL storage
- **Session Management**: Database-backed user authentication and session management
- **Development Server**: Vite middleware integration for hot module replacement

### Database Schema
- **Users**: Authentication and role management (manager/rep)
- **Reports**: Coaching reports with KPI data and status tracking
- **KPI Metrics**: Performance metrics (sales, calls, appointments, conversion rates)
- **Training Recommendations**: AI-generated suggestions with acceptance tracking

## Key Components

### Authentication System
- JWT token-based authentication
- Role-based access control (manager vs representative)
- Secure login/logout with credential validation
- Mock authentication service for development

### Dashboard Interface
- Quick stats overview (active reports, average performance, recommendations)
- Sortable and searchable reports tables
- Performance trend indicators with color-coded status
- Navigation between dashboard and detailed report views

### KPI Management
- Real-time KPI display cards with trend indicators
- Threshold-based status calculation (positive, warning, negative)
- Multiple KPI types: sales figures, call metrics, appointment tracking, conversion rates
- Visual formatting for currency, percentages, and numeric values

### Coaching Workflow
- Rich-text feedback editor with auto-save functionality
- Report status management (ongoing, completed)
- Manager feedback collection and persistence
- Draft saving in localStorage for offline resilience

### AI Recommendations Engine
- Rule-based recommendation generation based on KPI performance
- Training, mentoring, and review suggestions
- Priority-based recommendation ranking
- Acceptance/rejection tracking for recommendations

## Data Flow

1. **Authentication Flow**: User credentials → API validation → JWT token → localStorage storage
2. **Dashboard Flow**: User login → Load reports data → Display aggregated statistics → Navigate to detailed views
3. **Report Management**: Create/view reports → Load KPI data → Generate AI recommendations → Manager feedback input
4. **KPI Analysis**: Raw metrics → Threshold comparison → Status calculation → Visual representation
5. **Recommendation Flow**: KPI analysis → AI engine → Generated suggestions → Manager review → Training assignment

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **class-variance-authority**: Styling utility for component variants
- **date-fns**: Date manipulation and formatting

### Development Tools
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundling for production
- **@replit/vite-plugin-***: Replit-specific development enhancements

### UI Components
- **lucide-react**: Modern icon library
- **tailwindcss**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible components

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- PostgreSQL database for persistent data storage
- Database seeding for consistent development data
- Replit-specific tooling for cloud development

### Production Considerations
- Express.js server with bundled client assets
- PostgreSQL database with Drizzle ORM and type safety
- Environment variable configuration for database connectivity
- Static asset serving with optimized builds

### Build Process
1. Client-side Vite build process generates optimized React bundle
2. Server-side esbuild creates Node.js executable
3. Database migrations applied via Drizzle Kit
4. Environment-specific configuration loading

## Changelog

```
Changelog:
- July 04, 2025: Initial setup
- July 04, 2025: Successfully migrated from in-memory storage to PostgreSQL database
  - Added PostgreSQL database schema with users, reports, kpiMetrics, and trainingRecommendations tables
  - Implemented DatabaseStorage class for persistent data operations
  - Created database seeding with sample users (manager + 3 reps) and coaching reports
  - All API endpoints now use persistent database storage
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```