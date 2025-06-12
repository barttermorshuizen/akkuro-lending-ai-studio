# Akkuro Lending AI Studio - Development Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
- [Services & APIs](#services--apis)
- [State Management](#state-management)
- [Configuration](#configuration)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Project Overview

Akkuro Lending AI Studio is a Next.js-based conversational AI application designed for lending product configuration and management. Built on OpenAI's Responses API, it provides an intelligent interface for creating, configuring, and managing lending products through natural conversation.

### Key Features

- **AI-Powered Conversations**: Multi-turn conversations with OpenAI integration
- **Lending Product Management**: Complete workflow for lending product configuration
- **Google Sheets Integration**: Data persistence via Google Sheets API
- **Voice Interface**: Speech recognition and text-to-speech capabilities
- **File Processing**: PDF generation and file upload/search functionality
- **Real-time State Management**: Zustand-based state management with persistence
- **Modern UI**: Responsive design with Tailwind CSS and Radix, Shadcn UI components

### Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **AI**: OpenAI API (GPT models, TTS, Embeddings)
- **State Management**: Zustand, XState
- **Data Integration**: Google Sheets API
- **Development**: ESLint, Prettier, TypeScript

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Next.js API   │    │   External APIs │
│   (React/Next)  │◄──►│   Routes        │◄──►│   OpenAI        │
│                 │    │                 │    │   Google Sheets │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Component Architecture

```
App Layout
├── Header
├── Main Content
│   ├── Chat Interface
│   │   ├── Message Components
│   │   ├── Tool Call Components
│   │   └── Voice Input/TTS
│   ├── Configuration Panels
│   │   ├── Tools Panel
│   │   ├── State Machine Panel
│   │   └── Product Screens
│   └── File Management
│       ├── File Upload
│       └── Vector Store Setup
```

## Development Setup

### Prerequisites

- Node.js 18+
- yarn package manager
- OpenAI API key
- Google Cloud Service Account (for Sheets integration)

### Environment Variables

Create a `.env` file in the project root:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Google Sheets Integration
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key_here
GOOGLE_SHEET_ID=your_google_sheet_id
```

### Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/barttermorshuizen/akkuro-lending-ai-studio
   cd akkuro-lending-ai-studio
   ```

2. **Install dependencies**:

   ```bash
   (optional - if you have not installed yarn yet) npm install -g yarn 
   yarn install
   ```

3. **Run development server**:

   ```bash
   yarn run dev
   ```

4. **Open browser**: Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `yarn run dev` - Start development server
- `yarn run build` - Create production build
- `yarn run start` - Start production server
- `yarn run lint` - Run ESLint
- `yarn run format` - Format code with Prettier

## Project Structure

```
akkuro-lending-ai-studio/
├── app/                         # Next.js App Router
│   ├── api/                     # API routes
│   │   ├── functions/           # Function calling endpoints
│   │   ├── openai-tts/          # Text-to-speech API
│   │   ├── pdf/                 # PDF generation
│   │   ├── responses/           # OpenAI responses handling
│   │   ├── state/               # State management APIs
│   │   ├── turn_response/       # Conversation turn handling
│   │   └── vector_stores/       # File search functionality
│   ├── actions/                 # Server actions
│   ├── assets/                  # Static assets
│   ├── components/              # App-specific components
│   ├── fonts/                   # Custom fonts
│   ├── login/                   # Authentication pages
│   ├── studio/                  # Main studio interface
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                  # Reusable UI components
│   ├── condition/               # Conditional components
│   ├── screens/                 # Screen components
│   ├── tools/                   # Tool-specific components
│   ├── ui/                      # Base UI components
│   ├── annotations.tsx          # Message annotations
│   ├── assistant.tsx            # AI assistant interface
│   ├── chat.tsx                 # Main chat interface
│   ├── file-upload.tsx          # File upload functionality
│   ├── message.tsx              # Message display
│   ├── tool-call.tsx            # Tool call handling
│   └── voice-input.tsx          # Voice input component
├── config/                      # Configuration files
├── data/                        # Static data files
├── docs/                        # Documentation
├── exceptions/                  # Custom error handling
├── hooks/                       # Custom hooks to separate complex logic from UI components
├── lib/                         # Utility libraries
├── scripts/                     # Build/deployment scripts
├── services/                    # Business logic services
│   ├── readProduct.ts           # Product reading service
│   ├── resetProduct.ts          # Product reset functionality
│   ├── storeAcceptanceCriteria.ts
│   ├── storeAll.ts              # Bulk storage service
│   ├── storeGoLive.ts           # Go-live process
│   ├── storeInitialSetup.ts     # Initial setup service
│   ├── storeLoanParameters.ts   # Loan parameters storage
│   ├── storePricing.ts          # Pricing configuration
│   └── storeRegulatoryCheck.ts  # Regulatory compliance
├── stores/                      # Zustand state stores
│   ├── useAudioCacheStore.ts    # Audio caching
│   ├── useAuthStore.ts          # Authentication state
│   ├── useComplianceCheckStore.ts # Compliance Check
│   ├── useConfiguringProductStore.ts # Product configuration
│   ├── useConversationStore.ts  # Chat state management
│   ├── useRegulatoryCheck.ts    # Regulatory state
│   ├── useSimulationProductPopupStore.ts
│   ├── useTextToVoiceToggleStore.ts
│   └── useToolsStore.ts         # Tools configuration
├── types/                       # TypeScript type definitions
│   ├── compliance-check-model.ts
│   ├── errors.ts                # Error type definitions
│   ├── pdf-data-model.ts        # PDF data structures
│   ├── product.ts               # Product type definitions
│   └── speech-recognition.d.ts  # Speech API types
└── public/                      # Static assets
```

## Core Components

### Chat System

The chat system is the heart of the application, providing conversational AI capabilities:

#### Key Files:

- `components/chat.tsx` - Main chat interface
- `components/message.tsx` - Individual message rendering
- `components/tool-call.tsx` - Tool execution display
- `components/annotations.tsx` - Message annotations

#### Features:

- Multi-turn conversations
- Streaming responses
- Tool call visualization
- Message annotations
- Voice input/output

### Product Configuration

The product configuration system guides users through lending product setup:

#### Key Files:

- `components/screens/` - Configuration screens
- `services/store*.ts` - Data persistence services
- `stores/useConfiguringProductStore.ts` - Configuration state

#### Workflow:

1. Initial Setup
2. Loan Parameters
3. Pricing Configuration
4. Regulatory Checks
5. Acceptance Criteria
6. Go Live Process

### Voice Interface

Integrated speech recognition and text-to-speech:

#### Key Files:

- `components/voice-input.tsx` - Speech input
- `components/text-to-speech.tsx` - Speech output
- `app/api/openai-tts/` - TTS API integration

## Services & APIs

### Google Sheets Integration

All product data is stored in Google Sheets for easy access and collaboration:

#### Configuration:

- Service account authentication
- Sheet ID configuration
- Row-based data storage

#### Services:

- `storeAll.ts` - Bulk data operations
- `storeInitialSetup.ts` - Initial product setup
- `storeLoanParameters.ts` - Loan configuration
- `storePricing.ts` - Pricing setup
- `storeRegulatoryCheck.ts` - Compliance data
- `readProduct.ts` - Data retrieval

### OpenAI Integration

Multiple OpenAI services are integrated:

#### APIs Used:

- **Chat Completions**: Conversational AI
- **Embeddings**: File search capabilities
- **Text-to-Speech**: Voice output
- **Function Calling**: Tool execution

#### Key Endpoints:

- `/api/responses/` - Main conversation handling
- `/api/turn_response/` - Turn-based responses
- `/api/openai-tts/` - Text-to-speech conversion
- `/api/vector_stores/` - File search setup

## State Management

The application uses Zustand for state management with multiple specialized stores:

### Core Stores:

- **useConversationStore** - Chat history and state
- **useConfiguringProductStore** - Product configuration workflow
- **useToolsStore** - Tool configuration and availability
- **useAuthStore** - User authentication state

### Specialized Stores:

- **useAudioCacheStore** - Audio caching for TTS
- **useComplianceCheckStore** - Regulatory compliance state
- **useTextToVoiceToggleStore** - Voice interface preferences

### State Persistence:

States are persisted across sessions using Zustand's persistence middleware.

## Configuration

### Environment Configuration

The application supports multiple environment configurations:

#### Development:

```bash
NODE_ENV=development
OPENAI_API_KEY=your_dev_key
```

#### Production:

```bash
NODE_ENV=production
OPENAI_API_KEY=your_prod_key
```

### OpenAI Configuration

Configure OpenAI settings in the tools panel:

- Model selection
- Temperature settings
- Web search toggle
- File search configuration

### Google Sheets Setup

1. Create Google Cloud Service Account
2. Download service account key
3. Share target sheet with service account email
4. Configure environment variables

## Development Workflow

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js config
- **Prettier**: Code formatting
- **Tailwind CSS**: Utility-first styling

### Git Workflow

1. Create feature branch from main
2. Implement changes with proper typing
3. Run linting and formatting
4. Test functionality locally
5. Create pull request with description

### Component Development

1. Create components in appropriate directory
2. Add proper TypeScript interfaces
3. Implement accessibility features
4. Add proper error handling
5. Document component usage

## Testing

### Manual Testing Checklist

- [ ] Chat functionality works correctly
- [ ] Voice input/output functions
- [ ] File upload and search
- [ ] Product configuration workflow
- [ ] Google Sheets integration
- [ ] Tool execution
- [ ] Error handling

### Environment Testing

Test in both development and production environments to ensure consistency.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Build Process

```bash
yarn run build
```

This creates a standalone Next.js build in `.next/standalone/` for production deployment.

### Environment Setup

Ensure all environment variables are properly configured in the production environment.

## Troubleshooting

### Common Issues

#### OpenAI API Errors

- **Solution**: Check API key validity and rate limits
- **Debug**: Check browser console and server logs

#### Google Sheets Connection

- **Solution**: Verify service account permissions and sheet sharing
- **Debug**: Check authentication credentials format

#### Build Failures

- **Solution**: Clear `.next` directory and node_modules, reinstall dependencies
- **Command**: `rm -rf .next node_modules && yarn install`

#### Voice Features Not Working

- **Solution**: Check browser permissions for microphone access
- **Debug**: Test in different browsers and HTTPS environment

### Debugging Tips

1. Use browser developer tools for frontend issues
2. Check server logs for API errors
3. Verify environment variable loading
4. Test OpenAI API connectivity separately
5. Validate Google Sheets permissions

### Performance Issues

- Monitor OpenAI API usage and rate limits
- Check for memory leaks in state management
- Optimize image and asset loading
- Review database query efficiency

---

For specific deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
For general usage, see [README.md](./README.md).
