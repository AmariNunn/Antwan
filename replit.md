# Antwon Harris Portfolio Website

A modern redesign of Antwon Harris's personal portfolio website, built as a sleek, dynamic, and professional site with smooth interactions and clean visual hierarchy.

## Overview

This is a portfolio website for Antwon Harris, a professional motivational speaker and coach who specializes in education. The site features:

- Modern dark theme with vibrant accent colors
- Smooth Framer Motion animations
- Responsive design across all devices
- Contact form for booking inquiries

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Express.js, TypeScript
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **State Management**: TanStack Query

## Pages

1. **Home** (`/`) - Hero section, media features, services, video gallery, organizations, testimonials, CTA
2. **Student-Athletes** (`/student-athlete`) - Programs for college athletes
3. **Students** (`/students`) - Self-Equity program and DISC assessment info
4. **Contact** (`/contact`) - Booking form and about information

## Design System

### Colors
- Primary: #4A9EFF (vibrant blue)
- Accent: #FFD700 (gold)
- Background: #0A0A0A (deep black)
- Foreground: #E5E5E5 (off-white)
- Card: #141414 (charcoal)

### Fonts
- Sans: Inter
- Serif: Playfair Display

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)

## Running the Application

The app runs on port 5000 with the `npm run dev` command which starts both the Vite dev server for the frontend and the Express server for the backend.

## Deployment

The site is designed to be deployed on Netlify as a static site. Key considerations:
- **Shop products** are hardcoded in the frontend (not fetched from API) for Netlify compatibility
- Product images in `/public/images/` and `/attached_assets/` are included in the build
- No backend required for the Shop page

## Recent Changes

- Shop page products moved to static data for Netlify deployment compatibility
- Fixed carousel animation errors with mount checks
- Media logos consolidated into Organizations section
- Premium product modals with rotating testimonials and social proof
- Initial build with modern dark theme design
- All four pages implemented with full content
- Contact form with validation and API integration
- Framer Motion animations throughout
- Responsive navigation with mobile menu
