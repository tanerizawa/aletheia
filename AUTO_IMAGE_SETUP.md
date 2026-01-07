# Auto Image Generation Setup

## Overview
Sistem auto-generate cover untuk buku dan artikel menggunakan **Unsplash API** - sumber foto berkualitas tinggi gratis.

## Features
- 🎨 **Auto-generate** cover buku berdasarkan judul
- 📸 **High-quality images** dari Unsplash (3 pilihan)
- ☁️ **Auto-upload** ke Cloudinary setelah dipilih
- 🆓 **Free** - 50 requests/hour (cukup untuk penggunaan normal)
- ✅ **Legal** - Compliant dengan Unsplash API guidelines

---

## Setup Unsplash API

### 1. Create Unsplash Account
1. Kunjungi https://unsplash.com/join
2. Daftar dengan email atau Google account

### 2. Create Application
1. Pergi ke https://unsplash.com/oauth/applications
2. Klik **"New Application"**
3. Accept Terms & Guidelines
4. Fill application details:
   - **Application name**: Rumah Aletheia Admin
   - **Description**: Library management system for auto-generating book covers and article images
   - **Website**: https://academos.or.id

### 3. Get Access Key
Setelah aplikasi dibuat, copy **Access Key** dari dashboard

### 4. Add to Environment Variables
Edit `/home/aletheia/.env`:

```env
UNSPLASH_ACCESS_KEY="YOUR_ACCESS_KEY_HERE"
```

**⚠️ Important**: 
- Jangan commit file `.env` ke git
- Access key bersifat rahasia
- Free tier limit: **50 requests/hour**

---

## Usage in Admin Panel

### For E-books (Add/Edit)

Tambahkan component di form:

```tsx
import AutoImageSelector from '@/components/AutoImageSelector';

// In your component
const [coverUrl, setCoverUrl] = useState('');

// In JSX
<AutoImageSelector
  title={bookTitle}
  type="book"
  keywords={['philosophy', 'democracy']} // Optional
  onImageSelect={(url) => setCoverUrl(url)}
/>
```

### For Articles (Add/Edit)

```tsx
<AutoImageSelector
  title={articleTitle}
  type="article"
  keywords={category ? [category] : []}
  onImageSelect={(url) => setFeaturedImage(url)}
/>
```

### For Events

```tsx
<AutoImageSelector
  title={eventTitle}
  type="event"
  onImageSelect={(url) => setEventImage(url)}
/>
```

---

## API Endpoints

### 1. Generate Images
**POST** `/api/admin/auto-image`

**Body**:
```json
{
  "title": "Democracy and Freedom",
  "type": "book",
  "keywords": ["politics", "philosophy"]
}
```

**Response**:
```json
{
  "success": true,
  "images": [
    {
      "id": "abc123",
      "url": "https://images.unsplash.com/photo-...",
      "thumb": "https://images.unsplash.com/photo-...?w=400",
      "description": "Books on shelf",
      "author": "John Doe",
      "authorLink": "https://unsplash.com/@johndoe",
      "downloadLocation": "https://api.unsplash.com/photos/..."
    }
  ],
  "query": "Democracy and Freedom book cover library"
}
```

### 2. Upload to Cloudinary
**PUT** `/api/admin/auto-image`

**Body**:
```json
{
  "unsplashUrl": "https://images.unsplash.com/photo-...",
  "downloadLocation": "https://api.unsplash.com/photos/.../download",
  "folder": "ebooks"
}
```

**Response**:
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/drf578wtu/image/upload/...",
  "publicId": "rumah-aletheia/ebooks/xyz789",
  "width": 1200,
  "height": 630
}
```

---

## How It Works

### 1. Search Algorithm
```
User Input: "Thinking, Fast and Slow"
Type: book

Generated Query: "Thinking, Fast and Slow book cover library"
```

Query optimization berdasarkan tipe:
- **Book**: `{title} + "book cover library"`
- **Article**: `{title} + "abstract minimal"`
- **Event**: `{title} + "event community"`

### 2. Image Selection
- API returns 3 best matches
- User selects favorite
- Click triggers:
  1. Unsplash download endpoint (API requirement)
  2. Upload to Cloudinary with transformations
  3. Return final URL

### 3. Cloudinary Transformations
```javascript
{
  width: 1200,
  height: 630,
  crop: 'fill',
  gravity: 'auto',      // Smart cropping
  quality: 'auto:good', // Optimal compression
  fetch_format: 'auto'  // WebP when supported
}
```

---

## Best Practices

### Keywords Tips
✅ **Good Keywords**:
- Specific topics: "democracy", "philosophy", "education"
- Visual concepts: "library", "books", "reading"
- Mood: "minimal", "modern", "classic"

❌ **Avoid**:
- Too generic: "good", "nice", "beautiful"
- Technical: "ISBN", "publisher"

### API Limits
- **Free Tier**: 50 requests/hour
- **Demo/Development**: 50 requests/hour
- **Production**: Apply for higher limit at https://unsplash.com/developers

### Attribution
**REQUIRED by Unsplash**:
- Credit photographer name
- Link to photographer profile
- Link to Unsplash (already implemented in component)

---

## Troubleshooting

### "No images found"
**Cause**: Search query too specific or no results
**Solution**: Component automatically fallback to random image with type keyword

### "Failed to upload to Cloudinary"
**Cause**: Cloudinary credentials invalid
**Solution**: Check `.env` file, verify Cloudinary dashboard

### "Rate limit exceeded"
**Cause**: >50 requests in 1 hour
**Solution**: 
- Wait 1 hour for reset
- Or manually upload image
- Or apply for production access key

### Images not loading
**Cause**: CORS or network issues
**Solution**: Images load from Unsplash CDN, check browser console

---

## Example Integration

### Complete E-book Form with Auto-Image

```tsx
'use client';

import { useState } from 'react';
import AutoImageSelector from '@/components/AutoImageSelector';

export default function AddEbookPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverUrl: '',
    // ... other fields
  });

  return (
    <form>
      {/* Title Input */}
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Book Title"
      />

      {/* Author Input */}
      <input
        type="text"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        placeholder="Author Name"
      />

      {/* Auto Image Generator */}
      <AutoImageSelector
        title={formData.title}
        type="book"
        keywords={[formData.author]}
        onImageSelect={(url) => setFormData({ ...formData, coverUrl: url })}
      />

      {/* Preview */}
      {formData.coverUrl && (
        <div>
          <img src={formData.coverUrl} alt="Cover preview" />
        </div>
      )}

      {/* Submit */}
      <button type="submit">Save E-book</button>
    </form>
  );
}
```

---

## Cost Analysis

### Unsplash (Free Forever)
- ✅ Unlimited downloads
- ✅ 50 API requests/hour (free tier)
- ✅ No attribution fee
- ✅ Commercial use allowed

### Cloudinary
- Already configured
- Images stored in your account
- Transform & optimize included

### Total Cost
**$0/month** for normal usage (<50 images/hour)

---

## Alternative Options

### If Unsplash limits are reached:

1. **Pexels API** (Similar to Unsplash)
   - Free tier: 200 requests/hour
   - Setup: https://www.pexels.com/api/

2. **Pixabay API** (More generous limits)
   - Free tier: 5000 requests/hour
   - Setup: https://pixabay.com/api/docs/

3. **Manual Upload** (Always available)
   - Traditional file upload to Cloudinary
   - No API limits

---

## Next Steps

1. ✅ Setup Unsplash Access Key
2. ⏳ Integrate `AutoImageSelector` in e-book form
3. ⏳ Integrate in article form
4. ⏳ Test with real book titles
5. ⏳ Monitor API usage in Unsplash dashboard

**Questions?** Check Unsplash docs: https://unsplash.com/documentation
