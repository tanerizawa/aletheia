# 🔐 ADMIN PANEL - Rumah Aletheia

**Version**: 1.0.0 (Basic Implementation)  
**Date**: January 5, 2026  
**Status**: Functional (UI Complete, Database Integration Pending)

---

## 🎯 OVERVIEW

Admin Panel untuk mengelola seluruh konten website Rumah Aletheia:
- E-books (Perpustakaan Digital)
- Articles (Blog/Artikel)
- Events (Kegiatan & Dokumentasi)
- Images (Upload & Management)
- Pages (Coming Soon content)
- Settings (Konfigurasi website)

---

## 🚀 ACCESS ADMIN PANEL

### Production URL
```
https://academos.or.id/admin
```

### Default Credentials (⚠️ CHANGE IN PRODUCTION!)
```
Username: admin@academos.or.id
Password: admin123
```

**IMPORTANT**: Credentials ini hardcoded untuk development. Ganti dengan database-based auth di production!

---

## 📁 ADMIN ROUTES

### Public Routes (No Auth Required)
- `/admin/login` - Login page

### Protected Routes (Requires Authentication)
- `/admin` - Dashboard
- `/admin/ebooks` - E-books management
- `/admin/ebooks/new` - Add new e-book
- `/admin/ebooks/edit/[id]` - Edit e-book (coming soon)
- `/admin/articles` - Articles management (coming soon)
- `/admin/events` - Events management (coming soon)
- `/admin/images` - Image upload & management (coming soon)
- `/admin/pages` - Manage coming-soon pages (coming soon)
- `/admin/settings` - System settings (coming soon)

### API Routes
- `POST /api/admin/login` - Login endpoint
- `POST /api/admin/logout` - Logout endpoint

---

## 🏗️ ARCHITECTURE

### Authentication System

**File**: `/src/lib/auth.ts`

#### Features:
- Simple session-based authentication
- In-memory session storage (resets on server restart)
- HTTP-only cookies for security
- Session expiration (7 days)
- Server-side auth checks

#### Functions:
```typescript
login(username, password) // Login user, create session
logout() // Destroy session
getSession() // Get current user from session
requireAuth() // Protect routes (redirects to /admin/login if not authenticated)
isAuthenticated() // Check if user is logged in
```

#### Current Limitations:
- ⚠️ **In-memory sessions** - Lost on server restart
- ⚠️ **Hardcoded credentials** - Not secure for production
- ⚠️ **No password hashing** - Plain text comparison
- ⚠️ **Single user** - No multi-user support

#### Production Requirements:
- [ ] Move sessions to database or Redis
- [ ] Hash passwords with bcrypt
- [ ] Implement proper user management
- [ ] Add JWT tokens (optional)
- [ ] Implement role-based access control (RBAC)
- [ ] Add 2FA support (optional)

---

## 📊 DASHBOARD FEATURES

### Quick Stats
- Total E-books count
- Total Articles count
- Total Events count
- Total Images uploaded

### Management Cards
Visual cards linking to:
1. E-books Management
2. Articles Management
3. Events Management
4. Images Management
5. Pages Management
6. Settings

### Quick Actions
- Add E-book
- Write Article
- Create Event
- Upload Image

---

## 📚 E-BOOKS MANAGEMENT

### List View (`/admin/ebooks`)

**Features:**
- Table view with all ebooks
- Display: Cover, Title, Author, Category, Rating, Views, Status
- Actions: View (frontend), Edit, Delete
- Stats: Total books, Total views, Total downloads, Avg rating
- Empty state with CTA

**Current Data Source:**
- Reads from `/src/data/ebooks.ts` (hardcoded)
- No database integration yet

### Add New E-book (`/admin/ebooks/new`)

**Form Sections:**

1. **Basic Information**
   - Title *
   - Author *
   - Category * (dropdown)
   - Description *

2. **Publishing Details**
   - Publisher
   - Publish Year
   - ISBN
   - Pages
   - Language
   - File Size

3. **File & Access**
   - Cover Image upload
   - Available Online (checkbox)
   - Downloadable (checkbox)
   - Requires Login (checkbox)

4. **Tags**
   - Comma-separated tags

**Buttons:**
- Cancel (back to list)
- Save as Draft (not implemented)
- Publish (not implemented)

**Current Status:**
- ✅ UI complete
- ⏳ Form handling not implemented
- ⏳ File upload not implemented
- ⏳ Database save not implemented

---

## 🔧 IMPLEMENTATION STATUS

### ✅ Completed (Phase 1)
1. **Authentication System**
   - Login page with form
   - Login API endpoint
   - Logout API endpoint
   - Session management (in-memory)
   - Protected routes with `requireAuth()`

2. **Dashboard**
   - Welcome section
   - Quick stats cards
   - Management cards with links
   - Quick actions
   - User info display
   - Logout button

3. **E-books Management**
   - List view with table
   - Stats display
   - Empty state
   - Add new e-book form (UI only)

### ⏳ Pending (Phase 2)
4. **E-books CRUD**
   - [ ] Create e-book (save to DB)
   - [ ] Edit e-book form
   - [ ] Update e-book (save to DB)
   - [ ] Delete e-book (with confirmation)
   - [ ] Search & filter
   - [ ] Pagination

5. **Articles Management**
   - [ ] List view
   - [ ] Add new article form
   - [ ] Markdown editor
   - [ ] Create/Update/Delete operations
   - [ ] Category management

6. **Events Management**
   - [ ] List view
   - [ ] Add new event form
   - [ ] Photo gallery upload
   - [ ] Create/Update/Delete operations
   - [ ] Registration tracking

7. **Image Management**
   - [ ] Image upload with preview
   - [ ] Gallery view
   - [ ] Image optimization
   - [ ] Delete images
   - [ ] Organize by folder

8. **Pages Management**
   - [ ] Content editor for /belajar
   - [ ] Content editor for /penelitian
   - [ ] Content editor for /penerbitan
   - [ ] Content editor for /tentang/tim
   - [ ] Content editor for /tentang/sejarah

9. **Settings**
   - [ ] User management
   - [ ] Change password
   - [ ] Website configuration
   - [ ] Analytics settings

### ⏳ Pending (Phase 3 - Database)
10. **Database Integration**
    - [ ] Setup Prisma ORM
    - [ ] Create database schema
    - [ ] Migrations
    - [ ] Seed data from current TypeScript files
    - [ ] API routes for CRUD operations

---

## 🗄️ DATABASE SCHEMA (Planned)

### Recommended: Prisma + PostgreSQL

**Prisma Schema** (`prisma/schema.prisma`):

```prisma
// User model for authentication
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed with bcrypt
  name      String?
  role      Role     @default(EDITOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}

// Ebook model
model Ebook {
  id              String    @id @default(cuid())
  title           String
  slug            String    @unique
  author          String
  publisher       String?
  publishYear     Int?
  category        String
  description     String    @db.Text
  coverImage      String?
  format          String[]  // ["PDF", "EPUB"]
  pages           Int?
  language        String    @default("Indonesia")
  isbn            String?
  fileUrl         String?
  fileSize        String?
  availableOnline Boolean   @default(true)
  requiresLogin   Boolean   @default(false)
  downloadable    Boolean   @default(true)
  tags            String[]
  addedDate       DateTime  @default(now())
  rating          Float?
  views           Int       @default(0)
  downloads       Int       @default(0)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// Article model
model Article {
  id            String        @id @default(cuid())
  slug          String        @unique
  title         String
  excerpt       String
  content       String        @db.Text
  coverImage    String?
  category      String
  authorId      String
  author        ArticleAuthor @relation(fields: [authorId], references: [id])
  publishedDate DateTime      @default(now())
  updatedDate   DateTime?
  readTime      Int           // in minutes
  tags          String[]
  views         Int           @default(0)
  likes         Int           @default(0)
  featured      Boolean       @default(false)
  published     Boolean       @default(false)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model ArticleAuthor {
  id       String    @id @default(cuid())
  name     String
  role     String
  avatar   String?
  articles Article[]
}

// Event model
model Event {
  id                     String       @id @default(cuid())
  slug                   String       @unique
  title                  String
  description            String       @db.Text
  type                   String
  status                 EventStatus
  startDate              DateTime
  endDate                DateTime?
  time                   String
  location               String
  organizer              String
  maxParticipants        Int?
  registeredParticipants Int          @default(0)
  registrationDeadline   DateTime?
  contactPerson          String?
  contactPhone           String?
  coverImage             String?
  photos                 EventPhoto[]
  tags                   String[]
  featured               Boolean      @default(false)
  createdAt              DateTime     @default(now())
  updatedAt              DateTime     @updatedAt
}

enum EventStatus {
  UPCOMING
  ONGOING
  COMPLETED
}

model EventPhoto {
  id           String   @id @default(cuid())
  eventId      String
  event        Event    @relation(fields: [eventId], references: [id])
  url          String
  caption      String
  photographer String?
  takenDate    DateTime
  createdAt    DateTime @default(now())
}
```

---

## 🔨 NEXT STEPS TO FULLY FUNCTIONAL ADMIN

### Step 1: Database Setup (Priority: HIGH)

```bash
# Install Prisma
npm install prisma @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init

# Create schema (see above)
# Edit prisma/schema.prisma

# Run migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Seed database from existing data
npx prisma db seed
```

### Step 2: Create API Routes

Example for E-books:

**Create**: `POST /api/admin/ebooks`
```typescript
// /src/app/api/admin/ebooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  await requireAuth();
  
  const data = await request.json();
  
  const ebook = await prisma.ebook.create({
    data: {
      ...data,
      slug: generateSlug(data.title),
    },
  });
  
  return NextResponse.json({ success: true, ebook });
}
```

**Update**: `PATCH /api/admin/ebooks/[id]`
**Delete**: `DELETE /api/admin/ebooks/[id]`
**Get**: `GET /api/admin/ebooks` (with pagination)

### Step 3: Form Handling

Update `/admin/ebooks/new/page.tsx` to use client component with actual form submission:

```typescript
'use client';

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('/api/admin/ebooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  if (response.ok) {
    router.push('/admin/ebooks');
  }
};
```

### Step 4: Image Upload

Options:
1. **Local storage** (`/public/images/`)
2. **Cloud storage** (Cloudinary, AWS S3, Google Cloud Storage)
3. **Vercel Blob** (if deploying to Vercel)

Example with Cloudinary:
```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const result = await cloudinary.uploader.upload(file);
const imageUrl = result.secure_url;
```

### Step 5: Rich Text Editor

For articles, use markdown editor:
- **react-markdown-editor-lite**
- **@uiw/react-md-editor**
- **TipTap** (WYSIWYG)

---

## 🔒 SECURITY CONSIDERATIONS

### Current Security Level: ⚠️ DEVELOPMENT ONLY

**Issues:**
1. Hardcoded credentials
2. No password hashing
3. In-memory sessions (not persistent)
4. No CSRF protection
5. No rate limiting
6. No input validation
7. No SQL injection protection (not using DB yet)

### Production Security Checklist:

- [ ] **Move credentials to database**
- [ ] **Hash passwords** with bcrypt (12+ rounds)
- [ ] **Use environment variables** for secrets
- [ ] **Implement CSRF tokens**
- [ ] **Add rate limiting** on login endpoint
- [ ] **Validate all inputs** (server-side)
- [ ] **Use Prisma parameterized queries** (SQL injection protection)
- [ ] **Add HTTPS only** cookies
- [ ] **Implement session timeout**
- [ ] **Add audit logging** (who changed what, when)
- [ ] **Regular security audits**
- [ ] **Keep dependencies updated**

---

## 📱 RESPONSIVE DESIGN

Admin panel is fully responsive:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

All tables scroll horizontally on mobile.

---

## 🎨 UI DESIGN

### Colors:
- Primary: `#B05E3F` (Terracotta)
- Secondary: `#2C5F5D` (Deep Teal)
- Background: `#F9FAFB` (Gray-50)
- Success: Green-600
- Danger: Red-600
- Warning: Yellow-600

### Typography:
- System font stack
- Tailwind default sans-serif

### Components:
- Cards with hover effects
- Tables with striped rows
- Forms with validation states
- Buttons with loading states
- Empty states with CTAs

---

## 🧪 TESTING

### Manual Testing Checklist:

**Authentication:**
- [ ] Login with correct credentials
- [ ] Login with wrong credentials
- [ ] Logout
- [ ] Access protected route without auth (should redirect)
- [ ] Session persistence across page reloads

**Dashboard:**
- [ ] Stats display correctly
- [ ] All navigation links work
- [ ] Quick actions work

**E-books:**
- [ ] List view loads
- [ ] View e-book in frontend (new tab)
- [ ] Add new form displays
- [ ] All form fields accessible

---

## 📖 USER GUIDE

### How to Login:
1. Navigate to `https://academos.or.id/admin`
2. If not logged in, redirected to `/admin/login`
3. Enter credentials (default: admin@academos.or.id / admin123)
4. Click "Login"
5. Redirected to dashboard

### How to Add E-book:
1. From dashboard, click "E-books" card or "Add E-book" quick action
2. Click "Add New E-book" button
3. Fill in required fields (marked with *)
4. Upload cover image (optional for now)
5. Add tags (comma-separated)
6. Click "Publish" (currently shows alert - DB integration needed)

### How to Logout:
1. Click "Logout" button in top right
2. Redirected to login page

---

## 🐛 KNOWN ISSUES

1. **Sessions reset on server restart** - Need persistent storage
2. **No actual CRUD operations** - Need database integration
3. **Image upload not functional** - Need file upload implementation
4. **No validation** - Need form validation (client & server)
5. **No error handling** - Need proper error messages
6. **No loading states** - Need loading indicators

---

## 📅 ROADMAP

### Phase 1: Foundation (✅ COMPLETED - Jan 5, 2026)
- [x] Authentication system
- [x] Login/Logout pages
- [x] Dashboard
- [x] E-books list view
- [x] E-books add form (UI only)

### Phase 2: Database Integration (Next Week)
- [ ] Setup Prisma + PostgreSQL
- [ ] Create database schema
- [ ] Migrate existing data
- [ ] Implement CRUD API routes
- [ ] Connect forms to API

### Phase 3: Full CRUD (Week 2)
- [ ] E-books: Create, Read, Update, Delete
- [ ] Articles: Create, Read, Update, Delete
- [ ] Events: Create, Read, Update, Delete
- [ ] Image upload system

### Phase 4: Content Pages (Week 3)
- [ ] Belajar page editor
- [ ] Penelitian page editor
- [ ] Penerbitan page editor
- [ ] Team page editor
- [ ] History timeline editor

### Phase 5: Advanced Features (Week 4+)
- [ ] Search & filters
- [ ] Pagination
- [ ] Bulk operations
- [ ] Export data (CSV/JSON)
- [ ] Import data
- [ ] User roles & permissions
- [ ] Activity logs
- [ ] Analytics dashboard

---

## 💻 DEVELOPER NOTES

### File Structure:
```
/src
  /app
    /admin                    # Admin panel routes
      page.tsx                # Dashboard
      login/
        page.tsx              # Login page
      ebooks/
        page.tsx              # E-books list
        new/
          page.tsx            # Add new e-book
        edit/
          [id]/
            page.tsx          # Edit e-book (TODO)
    /api
      /admin
        login/
          route.ts            # Login API
        logout/
          route.ts            # Logout API
        ebooks/
          route.ts            # E-books CRUD API (TODO)
  /lib
    auth.ts                   # Authentication utilities
    prisma.ts                 # Prisma client (TODO)
```

### Environment Variables Needed:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/academos"

# Session (for production)
SESSION_SECRET="your-secret-key-here"

# Image Upload (if using Cloudinary)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Base URL
NEXT_PUBLIC_BASE_URL="https://academos.or.id"
```

---

## 📞 SUPPORT

For questions or issues:
- Email: studiomalaka@gmail.com
- Phone: 081382605030

---

**Admin Panel v1.0**  
**Rumah Aletheia - PT Academos Pustaka Demokrasi**  
**Last Updated: January 5, 2026**
