# Deployment Guide for Antagonist Hosting

## Prerequisites

- Node.js 18+ installed on the server
- Access to Antagonist hosting control panel
- SSH access to your Antagonist server

## Pre-deployment Steps

1. Create production build locally:

```bash
yarn run build
```

## Environment Variables Setup

Create a `.env` file in your app directory with these variables:

```
OPENAI_API_KEY=your_key_here
GOOGLE_CLIENT_EMAIL=your_email_here
GOOGLE_PRIVATE_KEY=your_key_here
GOOGLE_SHEET_ID=your_id_here
```

Important:

1. Replace all placeholder values with your actual API keys and credentials
2. Make sure the .env file has restricted permissions:

```bash
chmod 600 .env
```

3. Consider using your hosting provider's environment variables feature if available, instead of storing them in a file

## Antagonist Hosting Configuration

Configure the following settings in the Antagonist Node.js control panel:

1. Node.js Settings:

   - Node.js version: 18.20.7
   - Application mode: Change from "Development" to "Production"
   - Application root: Verify it shows your app directory (e.g., akkuro-lending-ai-studio/app)
   - Application startup file: `server.js`
   - Passenger log file: Leave as default or customize if needed

2. Application URL:

   - Confirm your domain is correctly set
   - Use the "OPEN" button to verify the application is accessible

3. Configuration Files:
   - The package.json should be automatically detected
   - You can use the "Run YARN Install" button after making changes
   - Use the "Run JS script" button to start the application

## Deployment Steps

1. Connect to your Antagonist server via SSH:

```bash
ssh username@your-server.antagonist.nl
```

2. Navigate to your app directory:

```bash
cd app
```

3. Upload the following files and directories using SFTP or your preferred method:

   - `.next/` directory containing:
     - `server/` - Contains server-side code
     - `static/` - Contains static assets
     - `types/` - Contains TypeScript types
     - `package-lock.json` - Lock file for Next.js dependencies
     - `package.json` - Next.js package configuration
     - `server.js` - Server configuration
   - `public/` directory
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - `.env` file (with your environment variables)

   Note: Transfer ALL contents of the .next directory as shown in the file structure. Each file is necessary for the production build to work correctly.

4. Install dependencies on the server:

```bash
yarn install --production
```

Note: This will create the node_modules directory on the server, so you don't need to upload it

## Process Management

The application process is managed by Antagonist hosting:

1. The platform uses the specified startup file (server.js) to run your application
2. Process management, restarts, and logging are handled automatically
3. You can monitor the application status through the Antagonist control panel

## Domain and Routing Setup

The routing is managed through the Antagonist hosting control panel:

1. In the control panel, configure your domain to point to the Node.js application
2. Antagonist will automatically handle the necessary Nginx configuration
3. Static files in the .next/static directory will be served automatically
4. WebSocket connections for real-time features are supported by default

## Maintenance & Troubleshooting

If the application fails to start:

1. Check the application logs in the Antagonist control panel
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed:

```bash
yarn install --production
```

4. Check the server status in the Antagonist control panel
