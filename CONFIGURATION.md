# Configuration Guide

## Overview

This document provides comprehensive configuration instructions for the Akkuro Lending AI Studio application, covering environment setup, API integrations, and deployment configurations.

## Table of Contents

- [Environment Variables](#environment-variables)
- [OpenAI Configuration](#openai-configuration)
- [Google Sheets Integration](#google-sheets-integration)
- [Application Configuration](#application-configuration)
- [Development Configuration](#development-configuration)
- [Production Configuration](#production-configuration)
- [Docker Configuration](#docker-configuration)
- [Security Configuration](#security-configuration)
- [Troubleshooting](#troubleshooting)

## Environment Variables

### Required Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=sk-proj-...                    # Your OpenAI API key

# Google Sheets Integration
GOOGLE_CLIENT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1A2B3C4D5E6F...               # Google Sheet ID
```

### Environment Variable Details

#### OpenAI Configuration

- **OPENAI_API_KEY**: Your OpenAI API key for GPT models, TTS, and embeddings
  - Format: `sk-proj-...` or `sk-...`
  - Required for all AI functionality
  - Obtain from: [OpenAI Platform](https://platform.openai.com/api-keys)

#### Google Sheets Integration

- **GOOGLE_CLIENT_EMAIL**: Service account email address
  - Format: `name@project-id.iam.gserviceaccount.com`
  - Required for data persistence
- **GOOGLE_PRIVATE_KEY**: Service account private key
  - Format: Must include `\n` for line breaks
  - Must be wrapped in quotes in .env file
  - Required for authentication
- **GOOGLE_SHEET_ID**: Target Google Sheet identifier
  - Format: Long alphanumeric string from sheet URL
  - Sheet must be shared edit permission with service account email
- **GOOGLE SHEET FORMAT**:
  - Sheet name: `Sheet1`
  - Sheet must have greater than or equal `31` columns (31 is current number of product's parameters)

## OpenAI Configuration

### API Key Setup

1. **Create OpenAI Account**:

   - Visit [OpenAI Platform](https://platform.openai.com)
   - Sign up or log in to your account

2. **Generate API Key**:

   - Go to [API Keys page](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Copy and store the key securely

3. **Set Usage Limits** (Recommended):
   - Go to [Billing settings](https://platform.openai.com/account/billing)
   - Set monthly usage limits
   - Configure email alerts

### Model Configuration

Configure OpenAI models in your application:

```typescript
// config/openai.ts
export const OPENAI_CONFIG = {
  models: {
    chat: "gpt-4o", // Main chat model
    tts: "tts-1-hd", // Text-to-speech model
  },
  settings: {
    temperature: 0, // Response integrity
  },
  features: {
    streaming: true, // Enable response streaming
    function_calling: true, // Enable tool usage
    web_search: true, // Enable web search tool
  },
};
```

### Rate Limits and Best Practices

#### Rate Limits (varies by plan):

- **Free Tier**: 3 requests/minute, 200 requests/day
- **Pay-as-you-go**: 3,500 requests/minute
- **Tier 1+**: Higher limits based on usage

#### Best Practices:

- Implement exponential backoff for rate limit errors
- Cache responses when appropriate
- Use streaming for better user experience
- Monitor token usage and costs

## Google Sheets Integration

### Service Account Setup

1. **Create Google Cloud Project**:

   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one

2. **Enable Google Sheets API**:

   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account**:

   ```bash
   # Using gcloud CLI
   gcloud iam service-accounts create akkuro-sheets \
     --display-name="Akkuro Sheets Service Account"

   # Create and download key
   gcloud iam service-accounts keys create service-account.json \
     --iam-account=akkuro-sheets@PROJECT_ID.iam.gserviceaccount.com
   ```

4. **Extract Credentials**:

   ```javascript
   // Extract from service-account.json
   const serviceAccount = require("./service-account.json");

   // Use these values in .env:
   // GOOGLE_CLIENT_EMAIL=serviceAccount.client_email
   // GOOGLE_PRIVATE_KEY=serviceAccount.private_key
   ```

### Google Sheet Setup

1. **Create Target Sheet**:

   - Create a new Google Sheet
   - Note the Sheet ID from the URL:
     `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

2. **Share with Service Account**:

   - Click "Share" button in Google Sheets
   - Add service account email (`GOOGLE_CLIENT_EMAIL`)
   - Grant "Editor" permissions

3. **Configure Sheet Structure**:
   ```
   Sheet Tabs Required:
   - Sheet name Sheet1
   - Sheet1 Having >= {number of product parameters} columns (e.g. current system is 31)
   ```
   _IMPORTANT_ Sheet used must have name `Sheet1` and `Sheet1` Having >= {number of product parameters} columns (e.g. current system is 31)

## Production Configuration (OPTIONAL)

### Production Environment Setup

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
DEBUG_MODE=false
LOG_LEVEL=error
ENABLE_API_LOGGING=false

# Production OpenAI settings
OPENAI_TIMEOUT=30000
OPENAI_MAX_TOKENS=4096

# Security settings
SECURE_COOKIES=true
HTTPS_ONLY=true
```

### Production Build Configuration

```json
{
  "scripts": {
    "build": "next build && cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static",
    "start": "cross-env NODE_ENV=production node .next/standalone/server.js",
    "start:prod": "yarn run build && yarn run start"
  }
}
```

### Performance Optimizations

```javascript
// next.config.mjs - Production optimizations
const nextConfig = {
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true, // Generate ETags for caching

  experimental: {
    optimizeCss: true, // Optimize CSS
    optimizeImages: true, // Optimize images
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.log in production
  },
};
```

## Docker Configuration

### Dockerfile

```dockerfile
# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GOOGLE_CLIENT_EMAIL=${GOOGLE_CLIENT_EMAIL}
      - GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY}
      - GOOGLE_SHEET_ID=${GOOGLE_SHEET_ID}
    restart: unless-stopped
```

## Troubleshooting

### Common Configuration Issues

#### 1. OpenAI API Key Issues

```bash
# Check API key format
echo $OPENAI_API_KEY | grep -E "^sk-(proj-)?[a-zA-Z0-9]{20,}"

# Test API key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 2. Google Sheets Authentication

```bash
# Validate service account key format
echo $GOOGLE_PRIVATE_KEY | head -1
# Should show: -----BEGIN PRIVATE KEY-----

# Test sheets access
node -e "
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\\\n/g, '\n'),
});
doc.loadInfo().then(() => console.log('✓ Sheets access working'));
"
```

#### 3. Environment Variable Loading

```typescript
// Debug environment variables
console.log("Environment check:", {
  NODE_ENV: process.env.NODE_ENV,
  hasOpenAI: !!process.env.OPENAI_API_KEY,
  hasGoogleEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
  hasGoogleKey: !!process.env.GOOGLE_PRIVATE_KEY,
  hasSheetId: !!process.env.GOOGLE_SHEET_ID,
});
```

#### 4. Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
yarn install

# Check for TypeScript errors
npx tsc --noEmit
```

### Performance Monitoring

```typescript
// lib/monitoring.ts
export function logPerformance(operation: string, startTime: number) {
  const duration = Date.now() - startTime;

  if (duration > 5000) {
    console.warn(`Slow operation: ${operation} took ${duration}ms`);
  }

  // Send to monitoring service
  if (process.env.NODE_ENV === "production") {
    // Analytics.track('performance', { operation, duration });
  }
}

// Usage in API routes
const startTime = Date.now();
// ... perform operation
logPerformance("openai-request", startTime);
```

---

For deployment specifics, see [DEPLOYMENT.md](./DEPLOYMENT.md).
For development setup, see [DEVELOPMENT.md](./DEVELOPMENT.md).
