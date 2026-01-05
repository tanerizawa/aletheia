# Cloudinary Setup Guide

## Overview
This project uses Cloudinary for image hosting, optimization, and CDN delivery. All uploaded images (ebook covers, event photos, article images) are stored and served through Cloudinary.

## Why Cloudinary?

✅ **CDN Delivery** - Fast image loading worldwide
✅ **Auto Optimization** - WebP format, quality adjustment
✅ **Transformations** - Resize, crop, compress on-the-fly
✅ **No Server Storage** - Images stored externally
✅ **Free Tier** - 25GB storage, 25GB bandwidth/month

## Setup Instructions

### 1. Create Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Verify your email

### 2. Get Credentials

After login, go to Dashboard:

1. Copy **Cloud Name**
2. Copy **API Key**
3. Copy **API Secret**

### 3. Configure Environment Variables

Add to `.env` file:

```bash
# Cloudinary (Image Upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"
```

⚠️ **Important**: Replace placeholders with your actual credentials!

### 4. Folder Structure

Images are organized by type:
- `academos/ebooks/covers` - E-book cover images
- `academos/articles/images` - Article featured images
- `academos/events/photos` - Event photos

Cloudinary will auto-create folders on first upload.

## Usage

### In Admin Panel

1. **Add New E-book**:
   - Go to `/admin/ebooks/new`
   - Use "Cover Image" upload button
   - Or paste URL manually

2. **Edit E-book**:
   - Go to `/admin/ebooks/edit/[id]`
   - Upload new image or keep existing

### API Endpoints

**Upload Image:**
```bash
POST /api/admin/upload
Content-Type: multipart/form-data

Body:
- file: [image file]
- folder: "academos/ebooks/covers"

Response:
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "academos/ebooks/covers/xyz123",
  "width": 800,
  "height": 1200,
  "format": "jpg",
  "size": 245678
}
```

**Delete Image:**
```bash
DELETE /api/admin/upload
Content-Type: application/json

Body:
{
  "publicId": "academos/ebooks/covers/xyz123"
}

Response:
{
  "success": true,
  "result": "ok"
}
```

## Features

### Auto Optimization
- Max width: 1200px
- Quality: Auto (based on content)
- Format: Auto (WebP when supported)

### File Validation
- Type: Images only (JPG, PNG, GIF, WebP)
- Size: Max 5MB
- Server-side verification

### Permissions
- **ADMIN**: Upload + Delete
- **EDITOR**: Upload only
- **VIEWER**: No access

## Troubleshooting

### "Upload failed" Error
- Check credentials in `.env`
- Verify Cloudinary account is active
- Check file size (<5MB)

### Images not loading
- Check if `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set correctly
- Verify URL format: `https://res.cloudinary.com/{cloud_name}/...`

### 401 Unauthorized
- Make sure you're logged in to admin panel
- Check session is valid

### 403 Forbidden
- VIEWER role cannot upload images
- Contact ADMIN to upgrade role

## Migration from URLs

If you have existing images via URL:

1. **Option A**: Keep using URLs
   - ImageUpload component has manual URL input
   - No migration needed

2. **Option B**: Re-upload to Cloudinary
   - Download images
   - Upload via admin panel
   - Update database entries

## Limits (Free Tier)

- Storage: 25GB
- Bandwidth: 25GB/month
- Transformations: 25 credits/month
- Images: ~10,000 images

💡 **Tip**: Monitor usage at [Cloudinary Dashboard](https://cloudinary.com/console)

## Production Checklist

- [ ] Add real Cloudinary credentials to production `.env`
- [ ] Test upload in staging environment
- [ ] Verify CDN delivery (check network tab)
- [ ] Set up backup strategy (Cloudinary has auto-backup)
- [ ] Configure custom CNAME (optional, e.g., `images.academos.or.id`)

## Security

✅ Server-side authentication (only logged-in users)
✅ Role-based access control
✅ File type validation
✅ File size limits
✅ API keys in environment variables (not exposed to client)

⚠️ **Never commit `.env` file to Git!**

## Resources

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Node.js SDK](https://cloudinary.com/documentation/node_integration)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Upload API](https://cloudinary.com/documentation/upload_images)
