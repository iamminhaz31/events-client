# NeighborHub

A community platform where people create, join and track social service events such as winter clothes distribution, tree plantation and neighborhood cleanups.

**Live site:** https://events-client-ebon.vercel.app

**Server repository:** https://github.com/iamminhaz31/events-server

## Features

- Email and password registration with validation (uppercase, lowercase, minimum 6 characters) and Google login
- Create events with title, description, type, thumbnail, location and a future-only date
- Upcoming events grid that automatically hides events whose date has passed
- Event details page with a Join Event button (login required, no duplicate joins)
- Joined Events page showing the events you joined, sorted by date
- Manage Events page to update or delete only the events you created
- Profile page to view and update your name and photo
- Light and dark theme toggle across the whole app
- Protected server APIs using JWT verification, with owner checks on update and delete
- Loading skeletons, toast notifications and a fully responsive layout

## Tech Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and DaisyUI
- BetterAuth with MongoDB adapter and JWT plugin
- Express.js and MongoDB (separate server repository)

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file with these variables:

   ```
   NEXT_PUBLIC_API_URL=
   MONGODB_URI=
   DB_NAME=
   BETTER_AUTH_URL=
   BETTER_AUTH_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```