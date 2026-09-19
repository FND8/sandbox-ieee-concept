# The Sandbox 4.0 — IEEE ITB SB Event Management Platform

---

## 1. Short Project Overview
**The Sandbox 4.0** is a full-stack event management web application built for the IEEE ITB SB. It serves as a lightweight platform to showcase and manage technical seminars, workshops, and competitive challenges. The application provides a public-facing festival landing page for users to view and search for events, alongside a secure administrative dashboard for organizers to manage event data (CRUD operations).

---

## 2. List of Completed Features
**MUST HAVE Features:**
* **Public Event List & Details (`#events`):** Interactive landing page section featuring a responsive grid of scheduled festival seminars, workshops, and challenges.
* **Dynamic Event Detail View (`/events/[id]`):** Dedicated page displaying comprehensive event metadata, timestamps, locations, and descriptions.
* **Admin Authentication (`/login`):** Secure email/password authentication portal restricting access strictly to authorized personnel.
* **Admin Dashboard (`/admin`):** Central management interface listing all festival records with real-time data synchronization.
* **Create Event (`/admin/events/new`):** Dedicated form with strict input validation for adding new festival entries.
* **Edit Event (`/admin/events/[id]/edit`):** Pre-populated form supporting smooth modifications to existing event details.
* **Delete Event with Confirmation:** Integrated destructive action guarded by a Shadcn `AlertDialog` confirmation modal and loading indicators.
* **CRUD Operations**: Dedicated forms to Create and Edit events, and a confirmation-guarded Delete mechanism via AlertDialog.
* **Database Persistence**: Full integration with a PostgreSQL database (Supabase).
* **Validation**: Strict form validation with clear user feedback for invalid inputs.
* **Robust UI States:** Fully engineered Loading Skeletons, Empty States, and Error handling boundaries across all core views.
* **Responsive Design:** Optimized for seamless mobile, tablet, and desktop viewports using Tailwind CSS.

**SHOULD HAVE Features (Bonus):**
* **Real-time Event Search**: Client-side search bar filtering events by title, location, or theme.
* **Status Filtering**: Interactive pill tabs to filter events by "Upcoming", "Ongoing", or "Completed".
* **Dynamic Countdown Timer**: Real-time countdown to the registration deadlines for each event.
* **Interactive FAQ**: Collapsible question list with a prominent answer display and Instagram CTA.
* **Unified Branding**: Uniform navbar and footer applied across all views.
* **SEO Metadata**: Pre-configured OpenGraph and Twitter card metadata for link sharing.

---

## 3. Architecture Summary
* **Framework:** Built using the **Next.js App Router**, leveraging Server Components for secure, direct-to-database server-side rendering and Client Components for interactive forms and modals.
* **Security & Middleware:** Route interception via Next.js `middleware.ts` to automatically protect all `/admin/*` paths against unauthenticated access.
* **Database & Auth Integration:** Powered by Supabase SSR (`@supabase/ssr`), enforcing PostgreSQL Row Level Security (RLS) policies for granular access control.
* **Modular Code Structure:** Separation of concerns across modular UI components, validation schemas (`Zod`), and Supabase client helpers.

---

## 4. Tech Stack Used & Rationales
* **Next.js (App Router):** Unified fullstack framework enabling rapid frontend rendering and backend API route execution in a single repository.
* **Supabase (PostgreSQL & Auth):** Provides instant, scalable database persistence with native RLS policies and built-in authentication, drastically reducing setup overhead.
* **Tailwind CSS & Shadcn UI:** Delivers a modern, accessible, minimalist dark-mode interface optimized for rapid development without styling bloat.
* **Bun:** Utilized as the primary package manager for lightning-fast dependency installation and script execution.
* **Zod**: Used for strict TypeScript-first schema validation on admin forms to ensure database integrity.
* **Lucide React & Sonner**: Used for lightweight SVG icons and seamless toast notifications for error/success handling.

---

## 5. Local Setup & Run Instructions

Clone the repository and run the application locally using **Bun**:

# 1. Clone the repository
```sh
git clone [https://github.com/your-username/sandbox-ieee-concept.git](https://github.com/your-username/sandbox-ieee-concept.git)
cd sandbox-ieee-concept
```

# 2. Install dependencies using Bun
```sh
bun install
```

# 3. Set up your environment variables (see Section 5)
```sh
cp .env.example .env.local
```

# 4. Run the development server
```sh
bun dev
```
Open http://localhost:3000 in your browser to view the application.

# 5. Required Environment Variables (.env.example)
Create a `.env.local` file in the root directory with the following keys:
```sh
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
# 6. Database Setup Instructions
Create a new project on Supabase.

Navigate to the SQL Editor in your Supabase Dashboard and execute the following schema script:

SQL
```sh
-- Create the 'events' table
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'upcoming',
    theme TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Allow public read access" ON public.events FOR SELECT USING (true);

-- Authenticated admin mutation policies
CREATE POLICY "Allow authenticated admins to insert" ON public.events FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated admins to update" ON public.events FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated admins to delete" ON public.events FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);
Go to Authentication > Providers > Email and ensure "Confirm email" is disabled so demo logins work instantly.
```

---

## 6. Evaluator / Demo Account Credentials
To test the admin dashboard, create an account via your local Supabase Auth dashboard or sign in using your configured environment test user credentials.

---

## 7. Known Issues or Limitations
* **Timezone Formatting**: Event dates are strictly formatted using en-GB to prevent Next.js server-client hydration mismatches. Timezones currently default to the user's local browser time.
* **Image Assets**: The watermark logo requires a true transparent PNG or SVG. JPEGs will result in a solid block rather than a translucent overlay due to the lack of an alpha channel.
* **Pagination**: Currently omitted; the event grid fetches all active events. This is suitable for a festival scope but would require pagination (limit/offset) if scaling to hundreds of past events.

---

## 8. AI Tools Used & Overview
AI Tools (Gemini) were used primarily as a thought partner and pair-programming assistant to scaffold repetitive UI layouts, like the Tailwind grid for the FAQ and Countdown timer. It was also utilized to debug Next.js specific hydration errors regarding nested DOM elements (e.g., placing buttons inside Radix UI triggers) and to refine the interactive search/filter logic on the client components. All architectural decisions, database schemas, and security boundaries were independently designed and verified.

---