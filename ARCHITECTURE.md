# LinkSnip Client Architecture

## System Role

The client is a React SPA responsible for user authentication, URL management UI, and calling backend APIs exposed by `urlShortner-Server`.

## High-Level Architecture

```text
Browser
  -> React App (Vite build)
      -> Auth Context + Protected Routes
      -> Pages (Login, Signup, Dashboard, Profile)
      -> Components (tables, forms, modal, pagination)
      -> API Layer (Axios instance + interceptors)
          -> Backend API (/api/*)
```

## Runtime Flow

1. User logs in or signs up via `/api/user/login` or `/api/user/signup`.
2. Backend returns an access token and sets refresh token cookie.
3. Access token is stored in `localStorage`.
4. Axios interceptor attaches `Authorization: Bearer <token>` to API requests.
5. On `401`, interceptor calls `/api/user/refresh`, stores new access token, and retries the original request.
6. On refresh failure, client clears session and redirects to `/login`.

## Route Design

- Public routes:
- `/login`
- `/signup`

- Protected routes:
- `/` (Dashboard)
- `/profile`

`ProtectedRoute` prevents access when user session is missing.

## Key Modules

- `src/auth/AuthProvider.jsx`: auth state, login/logout behavior, profile bootstrap
- `src/api/axios.js`: axios instance and token refresh strategy
- `src/api/url.api.js`: URL API wrapper methods
- `src/pages/Dashboard.jsx`: URL CRUD, filters, pagination, search
- `src/pages/Profile.jsx`: user profile and account display

## State and Data Model

- Auth state:
- `user`
- `loading`
- `isAuthenticated`

- URL dashboard state:
- list data
- pagination metadata
- sorting, search, status filters
- modal states for create/edit/delete

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Axios
- Tailwind CSS 4
- React Hook Form
- React Hot Toast
- Zod

## Screenshots

- Existing asset: `public/og-image.png`
- Recommended folder for UI screenshots: `docs/screenshots/`

## Deployment Link

- Production frontend: https://linksnip.com/
