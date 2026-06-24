# My Blog

![App Preview](https://imgix.cosmicjs.com/c15a3660-6fb3-11f1-9fe4-c3c0e360b7c2-autopilot-photo-1526772662000-3f88f10405ff-1782295325882.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive blog built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). My Blog showcases posts with featured images, tags, authors, and categories — all powered by your existing Cosmic content structure.

## Features

- 📝 **Posts** with featured images, excerpts, rich content, and tags
- 👤 **Author profiles** with bios, avatars, and website links
- 🏷️ **Category pages** to browse posts by topic
- 🎨 Modern, clean, responsive design with Tailwind CSS
- ⚡ Server-rendered with Next.js App Router for great performance
- 🖼️ Optimized images via imgix
- 🔍 SEO-friendly metadata on every page

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3baae81cb6e88b74abf826&clone_repository=6a3babb81cb6e88b74abf853)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js 18+)
- A Cosmic account and bucket with `posts`, `authors`, and `categories` object types

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (these are provided automatically when cloning in Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with related authors and categories
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .depth(1)
```

## Cosmic CMS Integration

This app reads content directly from your Cosmic bucket using the [Cosmic SDK](https://www.cosmicjs.com/docs). It uses the `depth` parameter to resolve connected objects (authors and categories) in a single query, and the imgix integration for fast, optimized images.

Object types used:
- **posts** — title, excerpt, content, featured_image, tags, author, category
- **authors** — name, bio, avatar, website
- **categories** — name, description

## Deployment Options

### Vercel
1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add your `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify
1. Push your code to a Git repository
2. Import the project into [Netlify](https://netlify.com)
3. Add your environment variables in Site Settings
4. Deploy
<!-- README_END -->