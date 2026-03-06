# LinkSnip Client

Frontend for the LinkSnip URL shortener platform, built with React and Vite. This application handles authentication, URL creation, URL management, filtering, pagination, and profile views.

## Repository References

- Server Repository: https://github.com/Pratham2137/urlShortner-Server
- Client Repository: https://github.com/Pratham2137/urlShortner-Client

## Highlights

- Authentication flow with protected routes
- Dashboard for creating, updating, deleting, and browsing short URLs
- Search, sorting, status filters, and pagination
- Token-based API calls with automatic access-token refresh
- Responsive UI with Tailwind CSS and toast notifications

## Deployment Link

- Production: https://cutlnk.vercel.app/

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Axios
- Tailwind CSS 4
- React Hook Form
- Zod

## Architecture

- Detailed architecture document: `ARCHITECTURE.md`

## Project Structure

```text
src/
	api/           # API clients and axios setup
	auth/          # Auth context, provider, and route guard
	components/    # Reusable UI components
	hooks/         # Custom hooks (auth, debounce)
	pages/         # Route pages (dashboard, login, signup, profile)
	utils/         # Utility functions
```

## Prerequisites

- Node.js 18+
- npm 9+
- Running backend server (`urlShortner-Server`)

## Environment Variables

Create a `.env` file in `urlShortner-Client/`.

```bash
VITE_API_URL=http://localhost:3000
```

Notes:
- `VITE_API_URL` should point to the backend base URL (without `/api`).
- Axios is configured to call `${VITE_API_URL}/api` and send cookies for refresh-token flow.

## Getting Started

```bash
npm install
npm run dev
```

The app runs on Vite default URL: `http://localhost:5173`.

## Available Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Authentication Flow

- Access token is stored in `localStorage` as `accessToken`
- Refresh token is stored as an HTTP-only cookie by the backend
- On 401 responses (except login/signup/refresh), the client calls `/user/refresh` and retries the original request
- If refresh fails, user session is cleared and redirected to `/login`

## Backend Dependency

This frontend expects the backend API from `urlShortner-Server` with routes under `/api`, including:

- `POST /api/user/signup`
- `POST /api/user/login`
- `POST /api/user/refresh`
- `POST /api/user/logout`
- `GET /api/user/profile`
- URL CRUD routes under `/api/url`

## Deployment

- Build: `npm run build`
- Deploy the generated `dist/` directory to your static hosting provider
- Set `VITE_API_URL` in your deployment environment to the production backend URL

## License

This project currently has no explicit license in `package.json`. Add one before public distribution.
