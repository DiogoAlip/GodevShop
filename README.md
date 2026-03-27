# GodevShop

## Description

GodevShop is e-commerce web application built with React, TypeScript, and Vite. This project provides a shopping experience with admin dashboard functionality, featuring real-time data fetching, authentication system, and responsive UI components.

### Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite with SWC for fast development and optimized builds
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router v7
- **Forms**: React Hook Form
- **Data Fetching**: TanStack React Query
- **Toast Notifications**: Sonner
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Code Quality**: ESLint with TypeScript and React rules

## Features

- **User-Facing Shop**
  - Home page with featured products
  - Product details page
  - Gender-based product filtering
  - Responsive design with mobile support

- **Admin Dashboard**
  - Protected route authentication
  - Product management (CRUD operations)
  - Dashboard overview

- **Authentication**
  - User registration and login
  - Protected routes for admin functionality
  - Session management with Zustand

- **Shared Components**
  - Reusable UI components from shadcn/ui
  - Custom components (pagination, loading states)
  - Protected route wrappers

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd godev-shop
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

   _(or `npm install` or `yarn install` if you're not using pnpm)_

3. **Configure environment variables**

   Create a `.env` file in the project root (if needed) based on your backend API requirements.

4. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application will start at `http://localhost:5173`

### Available Scripts

```bash
# Install dependencies
pnpm install

# Run development server with HMR
pnpm dev

# Build for production
pnpm build

# Run ESLint
pnpm lint

# Preview production build
pnpm preview
```

### Project Structure

```
src/
├── admin/          # Admin dashboard pages and components
├── api/            # API-related utilities
├── app.router.tsx  # React Router configuration
├── auth/           # Authentication pages, actions, and store
├── components/     # Shared components (UI, custom)
├── interfaces/     # TypeScript interfaces and types
├── lib/            # Utility functions
├── shop/           # Shop frontend pages and components
├── assets/         # Static assets
└── mocks/          # Mock data
```

## Development

### Adding Tests

When adding tests:

- Use Vitest for unit and integration tests
- Create test files with `.test.ts` or `.spec.ts` suffixes
- Run tests with `pnpm test` (to be added to package.json)
- Run a single test file with `pnpm test <file-name>`

### Code Style

Follow the conventions defined in `AGENTS.md`:

- Import order: React/Next.js first, then 3rd party libraries, then local imports
- Use `type` keyword for type-only imports
- TypeScript strict mode enabled
- Components in PascalCase
- Type interfaces use PascalCase
- Private functions prefixed with underscore

## License

This project is public and free.
