# Supabase Authentication Implementation Plan

## 1. Project Overview

**TT Job Board** is a Next.js 15 (App Router) frontend for a Trinidad & Tobago job board. It currently has:

- **No authentication** — the site is fully public/read-only
- **External API proxy** — a Next.js API route (`/api/jobs`) that proxies to Render
- **shadcn/ui** components with Tailwind CSS 4
- **Lucide** icons and **Framer Motion** animations
- **next-themes** for dark/light mode
- No existing state management beyond React `useState`/`useContext`

---

## 2. Goals

1. Add Supabase as the authentication provider (email/password + OAuth if desired)
2. Create user registration and login pages
3. Protect the site (or specific routes) behind authentication
4. Store user session state globally via a React context/provider
5. Integrate with the existing header/navigation to show user status
6. Prepare the app for future authenticated features (e.g., posting jobs)

---

## 3. Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Supabase JS client | `@supabase/supabase-js` v2 | Official, well-maintained, TypeScript support |
| Session management | Supabase Auth + middleware | Built-in session persistence via cookies |
| Route protection | Next.js App Router middleware | Native support in Next.js 15 |
| UI components | shadcn/ui (existing) | Consistent with current design system |
| Layout | Server Components + Client Components | Auth state is client-side; layout is server |

---

## 4. Implementation Phases

### Phase 1: Supabase Setup (Infrastructure)

**4.1. Create Supabase Project**

- Create a new project at [supabase.com](https://supabase.com)
- Note the `SUPABASE_URL` and `SUPABASE_ANON_KEY`

**4.2. Create Database Tables**

```sql
-- Enable the auth schema (already exists in Supabase)
-- Create a public.users table that mirrors auth.users

create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text check (role in ('user', 'admin')) default 'user',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Row Level Security policies
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

**4.3. Add Environment Variables**

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # server-only, never exposed to client
```

**4.4. Install Dependencies**

```bash
npm install @supabase/supabase-js
npm install -D @types/node  # if not already
```

---

### Phase 2: Supabase Client & Auth Provider

**5.1. Create Supabase Client (`src/lib/supabase/client.ts`)**

- Browser-only client with `createBrowserClient()`
- Uses cookie-based auth persistence

**5.2. Create Supabase Server Client (`src/lib/supabase/server.ts`)**

- Server-side client with `createServerClient()`
- Uses `cookies()` API from `@supabase/ssr` for SSR support

**5.3. Install `@supabase/ssr`**

```bash
npm install @supabase/ssr
```

**5.4. Create Auth Context Provider (`src/contexts/AuthContext.tsx`)**

- Wraps the app with a `SupabaseAuthProvider`
- Provides `session`, `user`, `isLoading`, `signIn`, `signUp`, `signOut`
- Uses `createServerClient` for server components and `createBrowserClient` for client components

**5.5. Wrap Root Layout (`app/layout.tsx`)**

- Add `<SupabaseAuthProvider>` wrapping the existing `<ThemeProvider>`
- Handle hydration mismatch with `useClient` boundary

---

### Phase 3: Login & Registration Pages

**6.1. Create Login Page (`app/auth/login/page.tsx`)**

- Form with email + password fields (using existing `Input`, `Label` components)
- Login form submission via `supabase.auth.signInWithPassword()`
- Error handling for invalid credentials
- Link to registration page
- "Forgot password" link (optional for Phase 3)
- Redirect to home page on success

**6.2. Create Registration Page (`app/auth/register/page.tsx`)**

- Form with: full name, email, password, confirm password
- Registration via `supabase.auth.signUp()`
- Email confirmation flow (redirect to login after signup, show message)
- Link to login page
- Password strength validation (optional)

**6.3. Create Sign Out Button (Header Integration)**

- Add to `Header.tsx`: show user avatar/email when logged in, otherwise show login/register links
- Sign out button calls `supabase.auth.signOut()`

---

### Phase 4: Route Protection & Middleware

**7.1. Create Middleware (`middleware.ts`)**

- Next.js middleware using Supabase SSR client
- Check auth session on protected routes
- Redirect unauthenticated users to `/auth/login`
- Skip middleware for static assets, API routes (except auth), and already-authenticated routes

**7.2. Define Protected Routes**

- Initially, protect all routes except `/`, `/auth/login`, `/auth/register`, `/auth/callback`, `/auth/signout`
- Add a `NEXT_PUBLIC_PROTECTED_ROUTES` list or define in middleware config

**7.3. Handle Auth Callback (`app/auth/callback/route.ts`)**

- Next.js API route handling OAuth redirect
- Exchange session via Supabase
- Redirect to intended destination or home page

---

### Phase 5: UI Components for Auth

**8.1. Create Auth UI Components**

| Component | File | Description |
|---|---|---|
| `LoginForm` | `src/components/auth/LoginForm.tsx` | Email/password login form |
| `RegisterForm` | `src/components/auth/RegisterForm.tsx` | Registration form |
| `SignOutButton` | `src/components/auth/SignOutButton.tsx` | Sign out button component |
| `UserMenu` | `src/components/auth/UserMenu.tsx` | Dropdown with user info + sign out |
| `AuthGuard` | `src/components/auth/AuthGuard.tsx` | Wrapper that redirects if not authenticated |
| `PublicOnly` | `src/components/auth/PublicOnly.tsx` | Wrapper that redirects to home if already authenticated |

**8.2. Add New shadcn/ui Components (if not present)**

- `Dialog` / `Sheet` — for mobile auth modals
- `Toast` — for auth success/error messages
- `Separator` — visual dividers in user menu
- `DropdownMenu` — for user dropdown in header

---

### Phase 6: Header & Navigation Updates

**9.1. Update `Header.tsx`**

- When **not logged in**: show "Login" and "Sign Up" links (right side)
- When **logged in**: show user avatar/initials + dropdown with:
  - User email
  - "Dashboard" link (placeholder for future)
  - "Sign Out" link
- Keep the theme toggle button

**9.2. Update `app/page.tsx`**

- If not authenticated, show a landing/hero section with CTA to sign up
- If authenticated, show the `AppState` job search component

---

### Phase 7: Testing & Polish

**10.1. Manual Testing Checklist**

- [ ] New user registration with email verification
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error shown)
- [ ] Sign out flow
- [ ] Refresh page while logged in (session persists)
- [ ] Navigate to protected route while logged out (redirects to login)
- [ ] Navigate to login/register while already logged in (redirects to home)
- [ ] Theme toggle works on auth pages
- [ ] Mobile responsive auth forms
- [ ] Dark mode on auth pages

**10.2. Edge Cases & Considerations**

- Email confirmation required? (Configure in Supabase dashboard)
- Password reset flow (Phase 2 extension)
- OAuth providers (Google, GitHub — Phase 2 extension)
- Rate limiting on auth endpoints
- CSRF protection (handled by Supabase cookies)
- Session token expiry (default 1 hour for access token, refresh via `supabase.auth.useSession()` or long-lived refresh token)

---

## 5. File Structure After Implementation

```
app/
  auth/
    login/
      page.tsx                    # Login page
    register/
      page.tsx                    # Registration page
    callback/
      route.ts                    # OAuth callback handler
    signout/
      route.ts                    # Sign out handler
  layout.tsx                      # Updated with AuthProvider
  page.tsx                        # Updated with auth-gated content
middleware.ts                     # Route protection middleware

src/
  lib/
    supabase/
      client.ts                   # Browser Supabase client
      server.ts                   # Server Supabase client
  contexts/
    AuthContext.tsx               # Auth state provider
  components/
    auth/
      LoginForm.tsx
      RegisterForm.tsx
      SignOutButton.tsx
      UserMenu.tsx
      AuthGuard.tsx
      PublicOnly.tsx
    Header.tsx                    # Updated with auth links
    ui/
      dialog.tsx                  # New shadcn component
      toast.tsx                   # New shadcn component
      dropdown-menu.tsx           # New shadcn component
  utils/
    types.ts                      # Add Auth types
```

---

## 6. Dependencies to Add

| Package | Purpose |
|---|---|
| `@supabase/supabase-js` | Supabase client SDK |
| `@supabase/ssr` | Supabase SSR integration for Next.js App Router |

---

## 7. Supabase Dashboard Configuration

1. **Authentication → Settings**
   - Enable email authentication
   - Configure email templates (optional)
   - Set site URL (`NEXT_PUBLIC_SITE_URL`)

2. **Authentication → Providers**
   - Enable Email (toggle on)
   - Optional: Enable Google, GitHub, etc.

3. **Authentication → URL Configuration**
   - Site URL: `https://your-domain.com`
   - Redirect URLs:
     - `https://your-domain.com/auth/callback`
     - `http://localhost:4000/auth/callback` (for dev)

4. **SQL Editor**
   - Run the migration SQL from Phase 4.2

---

## 8. Risk Assessment

| Risk | Mitigation |
|---|---|
| Hydration mismatch with Supabase session | Use `useClient` boundary; defer auth check to client |
| SSR not working with Supabase auth | Use `createServerClient` from `@supabase/ssr` with proper cookie handling |
| Existing jobs API needs auth | Add auth middleware to `/api/jobs` route (later phase) |
| Email confirmation delays user experience | Allow login without email confirmation initially, restrict actions |

---

## 9. Future Extensions (Out of Scope for Phase 1)

- Password reset flow
- OAuth providers (Google, GitHub)
- User profile / settings page
- Admin panel
- Role-based access control (admin vs user)
- Posting jobs (requires backend changes)
- Job applications
- Email notifications
- Social login with provider avatars

---

## 10. Recommended Implementation Order

1. **Day 1**: Phase 1 (Supabase setup) + Phase 2 (Client & Provider)
2. **Day 2**: Phase 3 (Login/Register pages) + Phase 4 (Middleware)
3. **Day 3**: Phase 5 (Auth UI components) + Phase 6 (Header updates)
4. **Day 4**: Phase 7 (Testing & polish)
