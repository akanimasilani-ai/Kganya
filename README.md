# Kganya Royal Funeral Services

A premium, production-ready digital funeral services platform for Kganya Royal Funeral Services (Pty) Ltd. Provides comprehensive funeral cover, claims management, catering services, and tombstone services with professional customer and administrator dashboards.

## 🎯 Overview

**Kganya Royal Funeral Services** is a full-stack Next.js application designed to:

- Allow customers to apply for funeral cover online
- Submit and track insurance claims
- Request catering and tombstone services
- Manage their profile and documents
- Enable administrators to manage applications, claims, and customer inquiries

**Technology Stack:**
- **Frontend & Backend:** Next.js 14 (App Router) + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js v5 with role-based access control
- **UI Components:** Tailwind CSS + custom components
- **Email:** Resend or SendGrid
- **Hosting:** Vercel + Render/Railway

## 📋 Project Structure

```
Kganya/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes (login, register)
│   ├── (public)/                 # Public pages (home, about, services, contact, faq)
│   ├── (customer)/               # Customer dashboard routes (protected)
│   │   ├── dashboard/
│   │   ├── applications/
│   │   ├── claims/
│   │   ├── documents/
│   │   ├── profile/
│   │   └── notifications/
│   ├── (admin)/                  # Admin dashboard routes (protected)
│   │   ├── dashboard/
│   │   ├── customers/
│   │   ├── applications/
│   │   ├── claims/
│   │   ├── services/
│   │   ├── documents/
│   │   ├── notifications/
│   │   ├── reports/
│   │   ├── audit-logs/
│   │   └── settings/
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── applications/         # Application CRUD
│   │   ├── claims/               # Claims CRUD
│   │   ├── documents/            # Document upload/management
│   │   ├── notifications/        # Notification endpoints
│   │   ├── catering/             # Catering enquiry endpoints
│   │   ├── tombstones/           # Tombstone enquiry endpoints
│   │   ├── admin/                # Admin-only endpoints
│   │   └── tracking/             # Public tracking endpoints
│   └── layout.tsx                # Root layout
│
├── components/                   # Reusable React components
│   ├── ui/                       # Core UI components (Button, Card, Form, etc.)
│   ├── auth/                     # Auth-related components
│   ├── navigation/               # Navigation components (Header, Sidebar, etc.)
│   ├── forms/                    # Form components
│   ├── dashboard/                # Dashboard-specific components
│   ├── admin/                    # Admin-specific components
│   └── shared/                   # Shared utility components
│
├── lib/                          # Utility functions and helpers
│   ├── auth.ts                   # NextAuth configuration
│   ├── db.ts                     # Database helpers
│   ├── validators/               # Zod validation schemas
│   ├── email.ts                  # Email service integration
│   ├── uploads.ts                # File upload handling
│   └── utils.ts                  # General utilities
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeding
│   └── migrations/               # Database migrations
│
├── public/                       # Static assets
│   ├── images/                   # Brand images, hero images
│   ├── icons/                    # Custom icons
│   └── uploads/                  # User-uploaded files (generated)
│
├── styles/                       # Global styles
│   ├── globals.css               # Tailwind directives
│   └── variables.css             # CSS variables
│
├── types/                        # TypeScript type definitions
│   └── index.ts
│
├── .env.example                  # Environment variables template
├── .gitignore
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/akanimasilani-ai/Kganya.git
cd Kganya
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `RESEND_API_KEY`: Email service API key

4. **Set up the database:**
```bash
npm run db:push
```

5. **Seed initial data (optional):**
```bash
npm run db:seed
```

6. **Start the development server:**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🔐 Features

### Public Features
- ✅ Homepage with hero section and trust indicators
- ✅ Service overview pages (Funeral Cover, Cash Payout, Catering, Tombstones)
- ✅ FAQ with categories and search
- ✅ Contact form
- ✅ Pricing and benefits information
- ✅ Application/Claim tracking (public, no login required)

### Customer Features
- ✅ User registration and login
- ✅ Customer dashboard with profile management
- ✅ Multi-step funeral cover application
- ✅ Submit claims with document upload
- ✅ Track applications and claims in real-time
- ✅ Request catering and tombstone services
- ✅ Document management (upload, view, download)
- ✅ Notification center
- ✅ Mobile-responsive interface

### Administrator Features
- ✅ Secure admin dashboard
- ✅ Customer management
- ✅ Application review and approval workflow
- ✅ Claim processing and status updates
- ✅ Document validation and management
- ✅ Service enquiry management
- ✅ Customer communication and notifications
- ✅ Audit logs and activity tracking
- ✅ Reports and analytics
- ✅ System settings and configuration

### Security Features
- ✅ Role-based access control (RBAC)
- ✅ Session-based authentication
- ✅ Password hashing and security
- ✅ CSRF protection
- ✅ Input validation and sanitization
- ✅ Document encryption for sensitive files
- ✅ Audit logging of all admin actions
- ✅ Privacy policy and data protection (POPIA compliant)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1024px+)
- Tablets (768px - 1023px)
- Mobile phones (320px - 767px)

All components use mobile-first design principles with Tailwind CSS breakpoints.

## 🎨 Brand Identity

**Color Palette:**
- **Primary:** Deep navy blue (#1e3a5f)
- **Secondary:** Subtle gold (#d4af37)
- **Neutral:** White backgrounds with soft shadows
- **Accents:** Professional grays and light blues

**Typography:**
- System font stack for excellent readability
- Generous spacing for elegant appearance
- Clear hierarchy with semantic HTML

**Design Principles:**
- Professional and trustworthy
- Compassionate and welcoming
- Simple and intuitive navigation
- Consistent visual language
- Accessible to all users

## 🔄 Key Workflows

### Funeral Cover Application
1. Customer selects cover option
2. Multi-step form collection (personal info, beneficiaries, documents)
3. Application submitted with reference number
4. Admin reviews and approves/declines
5. Customer notified of status
6. Active cover issued

### Claims Submission
1. Customer initiates claim
2. Provides claimant, deceased, and claim details
3. Uploads supporting documents
4. Claim submitted with reference number
5. Admin reviews and requests additional info if needed
6. Claim approved or declined
7. Customer notified and paid

### Service Requests (Catering/Tombstones)
1. Customer submits enquiry
2. Admin reviews and prepares quote
3. Customer receives quote
4. Negotiation if needed
5. Service completed
6. Customer notification

## 🗄️ Database Structure

**Core Entities:**
- **Users:** Customers, admins, and super admins
- **Profiles:** Extended customer information
- **Applications:** Funeral cover applications
- **Policies:** Active insurance policies
- **Claims:** Insurance claims
- **Documents:** File storage and management
- **Services:** Catering and tombstone enquiries
- **Audit Logs:** All system activity tracking

All entities use relationships to maintain data integrity and avoid duplication.

## 📧 Email Notifications

The application sends professional emails for:
- Registration confirmation
- Application submission and status changes
- Claim submission and status changes
- Document requests
- Service enquiry confirmations
- Support responses

Emails include:
- Kganya branding and logo
- Reference numbers
- Customer-specific details
- Clear calls to action
- Support contact information

**No sensitive information (passwords, tokens) is sent via email.**

## 🛡️ Privacy & Compliance

- **POPIA Compliance:** Privacy notice and consent management
- **Data Security:** Encrypted storage of sensitive data
- **Access Control:** Strict role-based permissions
- **Audit Trail:** Complete logging of all admin actions
- **Transparency:** Clear terms, conditions, and disclaimers
- **Contact Privacy:** No exposure of customer data in public areas

## 📊 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Recommended Hosting
- **Frontend:** Vercel (optimized for Next.js)
- **Database:** Render or Railway (PostgreSQL)
- **Email:** Resend or SendGrid
- **File Storage:** AWS S3 or local with CDN

## 🧪 Testing Checklist

Before going live, verify:

- [ ] All navigation links work
- [ ] User registration and email verification
- [ ] Login/logout functionality
- [ ] Application submission workflow
- [ ] Claim submission workflow
- [ ] Document upload and download
- [ ] Application tracking
- [ ] Admin dashboard access and permissions
- [ ] Email notifications send correctly
- [ ] Mobile responsiveness on all pages
- [ ] Form validation and error messages
- [ ] Success confirmations visible
- [ ] Empty states handled gracefully
- [ ] No console errors
- [ ] No broken images or missing assets
- [ ] Security headers present
- [ ] SSL/HTTPS working in production

## 📄 Legal Pages

Create or update these pages:
- Privacy Policy (POPIA compliance)
- Terms and Conditions
- Disclaimer
- Complaints Policy
- Cookie Policy

## 🤝 Support

For support or questions about the platform:
- Contact form on the website
- Email: support@kganya.local
- Phone: [Your contact number]
- Service hours: [Your business hours]

## 📝 License

This project is proprietary to Kganya Royal Funeral Services (Pty) Ltd.

## 🔔 Important Notes

1. **No Fake Data in Production:** Use realistic sample data only for development/testing
2. **Regulatory Compliance:** Ensure all financial services language is accurate and compliant
3. **Professional Appearance:** The site should look comparable to modern premium platforms
4. **Data Privacy:** Never expose customer information publicly
5. **Role-Based Access:** Strictly enforce permissions between customers and admins
6. **Audit Everything:** Log all administrative actions for compliance

---

**Version:** 1.0.0  
**Last Updated:** August 25, 2026  
**Status:** Initial Setup
