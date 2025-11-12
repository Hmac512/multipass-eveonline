# Opacity Multipass Demo

This is a demo application built with [Next.js](https://nextjs.org) to showcase the Opacity multipass authentication flow.

## Setup

Before running the application, copy `env.example` to `.env` and fill out all the required values:

```bash
cp env.example .env
```

The environment file requires the following variables:
- `API_KEY` - Your Opacity API key
- `NEXT_PUBLIC_TEMPLATE_ID` - Template ID for login flow
- `NEXT_PUBLIC_LOGOUT_TEMPLATE_ID` - Template ID for logout flow

You can find your API key and template IDs at [app.opacity.network](https://app.opacity.network).

## Getting Started

After configuring your environment variables, run the development server:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo in action.
