## Project Overview

This monorepo contains multiple applications and packages:

- **Website** - Main public website with donation functionality
- **Inselbühne** - Event management and ticketing platform
- **Links** - URL shortener service
- **UI Package** - Shared React components

## Technical Stack

### Core Technologies
- **Framework**: Next.js 13-15 (App Router)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Monorepo**: Turborepo
- **Styling**: Tailwind CSS
- **State Management**: Jotai
- **Animations**: Framer Motion

### Key Dependencies

#### Frontend
- **React**: 18-19 (latest)
- **Next.js**: 13.4.6 - 15.3.3
- **Tailwind CSS**: 3.2.4 with plugins:
  - `@tailwindcss/typography`
  - `@tailwindcss/aspect-ratio`
  - `@tailwindcss/forms`
  - `@tailwindcss/line-clamp`
- **UI Components**: Headless UI, Heroicons
- **Responsive Layout**: react-responsive-masonry

#### Backend & APIs
- **Wix SDK**: Content management and data
- **Directus SDK**: Headless CMS integration
- **Mollie API**: Payment processing
- **Frappe SDK**: ERP integration
- **GraphQL**: Data fetching

#### Development Tools
- **ESLint**: Code linting with custom config
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing

## Project Structure

```
buergerstiftung/
├── apps/
│   ├── website/          # Main public website (port 3000)
│   ├── inselbuehne/      # Event platform (port 3001)
│   └── links/            # URL shortener (port 3002)
├── packages/
│   ├── ui/               # Shared React components
│   ├── eslint-config-custom/  # Shared ESLint config
│   └── tsconfig/         # Shared TypeScript config
└── turbo.json           # Turborepo configuration
```

## Getting Started

### Prerequisites
- Node.js >= 14.0.0
- pnpm 10.12.0

### Installation
```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Development Commands
```bash
# Start all applications in development mode
pnpm dev

# Build all applications
pnpm build

# Lint all packages
pnpm lint

# Format code
pnpm format
```

### Environment Variables

The following environment variables are required:

- `MOLLIE_API_KEY` - Payment processing
- `WIX_API_KEY` - Content management
- `NEXT_PUBLIC_INSTAGRAM_TOKEN` - Social media integration

## Applications

### Website (Port 3000)
Main public website featuring:
- Donation system with Mollie integration
- Project showcase
- News and blog
- Event listings
- Contact forms
- Visual editing with Directus

### Inselbühne (Port 3001)
Event management platform with:
- Event creation and management
- Ticket sales
- QR code scanning
- Event listings
- Wix integration for content

### Links (Port 3002)
URL shortener service built with Nitro (Nuxt's server engine):
- Short URL generation
- Redirect handling
- Analytics tracking

## License

Private project - All rights reserved
