# ConverzAI

A full-stack web application that enables AI-powered real-time video
meetings with instruction-driven agents. Users can create custom AI
agents, schedule meetings, conduct live video calls, and access meeting
artifacts such as recordings, transcripts, and summaries.

## Overview

The platform is built as a production-style system with a focus on
real-time communication, asynchronous processing, and clean API-driven
architecture. AI capabilities are integrated as part of the meeting
workflow rather than treated as standalone demos.

## Key Features

-   AI-powered real-time video meetings
-   Custom instruction-based AI agents
-   User authentication and authorization
-   Agent and meeting CRUD workflows
-   Call recording and video playback
-   Automated meeting transcripts and summaries
-   Persistent meeting history with statuses
-   Mobile-responsive user interface

## Tech Stack

-   **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS v4,
    shadcn/ui
-   **Backend:** Node.js, REST APIs
-   **Real-time Video:** Stream Video SDK
-   **AI Integration:** OpenAI APIs
-   **Background Jobs:** Inngest
-   **Authentication:** Better Auth

## Architecture Notes

-   Real-time video sessions are handled via the Stream Video SDK
-   Long-running tasks such as transcription and summarization are
    processed asynchronously using Inngest
-   Webhooks are used to receive external event callbacks and trigger
    background workflows
-   API-first design for agents, meetings, and session lifecycle
    management

## Running the Project Locally

For full functionality in development, the web app, webhook tunnel, and
Inngest dev server must all be running.

### Required

npm install\
npm run dev

### Required for Full Functionality

npm run dev:webhook\
npx --ignore-scripts=false inngest-cli@latest dev

### Optional Development Utilities

npm run db:push\
npm run db

## Notes

- Core functionality is implemented and usable. Ongoing work focuses on improving agent behavior and orchestration.
- Some features require environment variables. A `.env.example` file will be provided in a future update.
