# Potsdamer Bürgerstiftung: Web Projects

This monorepo contains all public projects representing the Bürgerstiftung Potsdam on the web.

- **Website** - Main public website
- **Inselbühne** - Public website for our event location
- **Links** - URL shortener service and QR-Code-Redirection tool to prevent QR-Codes from going "dead"
- **Portal** - Custom Directus instance and build modified to fit our needs
- **Shop** - Work in progress integration of MedusaJS

## Contributing

This, as the work of the Bürgerstiftung in general, is mostly done in our free time. We are always open for useful contributions. Please contact us to get access to our test environments and API-keys if you want to help us improving these projects.

## Getting Started
If you have done things with React before, you're probably familiar with this setup. If not, just get in contact with us. We will support you on setting things up.

You will find a .env.example in each project. Rename this file to .env and setup the keys you got from us. These keys to our backend services are all pointing to test environments, so you can just do whatever you want and test things without braking anything.

### Prerequisites

- Node.js >= 24.0.0
- pnpm 10.12.0

### Installation

```bash
pnpm install
```

### Development Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
```

You can filter by specific projects by passing the --filter=**project** flag to every command, if you don't want to run them in parallel.


