# Image Assets Structure

Created directory structure for future image uploads:

```
public/
└── images/
    ├── ebooks/
    │   └── covers/          # E-book cover images
    ├── articles/
    │   └── covers/          # Article cover images
    └── events/
        ├── covers/          # Event cover images
        └── photos/          # Event photo documentation
```

## Usage Guide

### E-book Covers
- Path: `/images/ebooks/covers/`
- Naming: Use ebook ID (e.g., `ebook-001.jpg`)
- Recommended: 400x600px, JPG/PNG
- Update `src/data/ebooks.ts` coverImage field

### Article Covers
- Path: `/images/articles/covers/`
- Naming: Use slug (e.g., `literasi-digital.jpg`)
- Recommended: 1200x630px (social media optimal), JPG/PNG
- Update `src/data/articles.ts` coverImage field

### Event Photos
- Path: `/images/events/photos/`
- Naming: Descriptive (e.g., `diskusi-sapiens-1.jpg`)
- Recommended: 1920x1080px or 1280x720px, JPG
- Update `src/data/events.ts` photos array

## Next Steps

1. Upload actual images to these directories
2. Update data files to point to actual image paths
3. Test image loading in production
4. Optimize images (use tools like imagemin, sharp)
5. Consider using Next.js Image component for optimization

## Current Status

✅ Directory structure created
⏳ Awaiting image uploads
⏳ Currently using emoji placeholders in UI
