# Akkuro Lending AI Studio - based on the Responses starter app

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![NextJS](https://img.shields.io/badge/Built_with-NextJS-blue)
![OpenAI API](https://img.shields.io/badge/Powered_by-OpenAI_API-orange)

This repository contains a NextJS starter app built on top of the [Responses API](https://platform.openai.com/docs/api-reference/responses).
It leverages built-in tools ([web search](https://platform.openai.com/docs/guides/tools-web-search?api-mode=responses) and [file search](https://platform.openai.com/docs/guides/tools-file-search)) and implements a chat interface with multi-turn conversation handling.

Features:

- Multi-turn conversation handling
- Web search tool configuration
- Vector store creation & file upload for use with the file search tool
- Function calling
- Streaming responses & tool calls
- Display annotations

This app is meant to be used as a starting point to build a conversational assistant that you can customize to your needs.

## Documentation

For comprehensive information about developing, configuring, and maintaining this project, please refer to our detailed documentation:

### 📚 Complete Documentation Set

- **[Development Guide](./DEVELOPMENT.md)** - Main development documentation
  - Project overview and architecture
  - Development setup and installation
  - Project structure and core components
  - Services, APIs, and state management
  - Development workflow and best practices
  
- **[API Documentation](./API.md)** - Complete API reference
  - OpenAI integration endpoints
  - Product management APIs
  - File operations and vector stores
  - Error handling and rate limits
  
- **[Component Documentation](./COMPONENTS.md)** - UI architecture guide
  - Component hierarchy and design principles
  - Core components (Chat, Voice, Tools)
  - UI components and screen components
  - State integration and testing
  
- **[Configuration Guide](./CONFIGURATION.md)** - Environment and setup
  - Environment variables and API keys
  - OpenAI and Google Sheets configuration
  - Development and production setup
  - Docker configuration and security
  
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment
  - Antagonist hosting deployment steps
  - Environment configuration
  - Process management and troubleshooting

### 🚀 Quick Start Links

- [Installation & Setup](./DEVELOPMENT.md#development-setup) - Get started in minutes
- [Environment Configuration](./CONFIGURATION.md#environment-variables) - Required API keys and settings
- [Project Structure](./DEVELOPMENT.md#project-structure) - Understand the codebase layout
- [Troubleshooting](./DEVELOPMENT.md#troubleshooting) - Common issues and solutions

## How to use

1. **Set up the OpenAI API:**

   - If you're new to the OpenAI API, [sign up for an account](https://platform.openai.com/signup).
   - Follow the [Quickstart](https://platform.openai.com/docs/quickstart) to retrieve your API key.

2. **Set the OpenAI API key:**

   2 options:

   - Set the `OPENAI_API_KEY` environment variable [globally in your system](https://platform.openai.com/docs/libraries#create-and-export-an-api-key)
   - Set the `OPENAI_API_KEY` environment variable in the project: Create a `.env` file at the root of the project and add the following line (see `.env.example` for reference):
   - Set `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY` and `GOOGLE_SHEET_ID` environment variable so that the storeProduct service can connect to a google sheet.

   ```bash
   OPENAI_API_KEY=<your_api_key>
   ```

3. **Clone the Repository:**

   ```bash
   git clone https://github.com/barttermorshuizen/akkuro-lending-ai-studio
   ```

4. **Install dependencies:**

   Run in the project root:

   ```bash
   yarn install
   ```

5. **Run the app:**

   ```bash
   yarn run dev
   ```

   The app will be available at [`http://localhost:3000`](http://localhost:3000).

## Contributing

You are welcome to open issues or submit PRs to improve this app, however, please note that we may not review all suggestions.

For detailed contributing guidelines, see our [Development Guide](./DEVELOPMENT.md#contributing).

## License

This project is licensed under the MIT License. See the LICENSE file for details.
