# NeighborHub

A community-driven platform where people can create, join, and track social service events such as winter clothes distribution, tree plantation, donation campaigns, and neighborhood cleanups.

## Project Links

- **Live Website:** https://events-client-ebon.vercel.app/
- **Client Repository:** https://github.com/iamminhaz31/events-client
- **Server Repository:** https://github.com/iamminhaz31/events-server

## Features

- Email and password registration with validation (uppercase, lowercase, minimum 6 characters) and Google login.
- Create events with title, description, event type, thumbnail image, location, and a future-only date.
- Dynamic upcoming events grid that automatically hides events whose dates have passed.
- Event details page with a Join Event button (login required, no duplicate joins).
- Joined Events page displaying joined events sorted by date.
- Manage Events page to update or delete only the events created by the logged-in user.
- Profile page to view and update name and profile picture.
- Light and dark theme toggle across the entire application.
- Protected server APIs using JWT verification, with owner authorization checks for update and delete operations.
- Loading skeletons, toast notifications, and a fully responsive layout for desktop, tablet, and mobile devices.

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- DaisyUI

### Authentication & Authorization
- BetterAuth
- MongoDB Adapter
- JWT Plugin
- Google Authentication

### Backend
- Express.js
- MongoDB
- Node.js

## Run Locally

### 1. Clone the Client Repository

```bash
git clone https://github.com/iamminhaz31/events-client.git
cd events-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
NEXT_PUBLIC_API_URL=
MONGODB_URI=
DB_NAME=
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Add your actual credentials and configuration values. Never commit secret credentials to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Backend Repository

The backend is maintained separately.

**Server Repository:**  
https://github.com/iamminhaz31/events-server

Refer to the server repository's README for backend installation and configuration instructions.

---

**Project Name:** NeighborHub  
**Tagline:** Community. Service. Impact.

