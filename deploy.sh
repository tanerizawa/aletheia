#!/bin/bash
# Deployment script for Academos.or.id
# This script handles building and deploying the Next.js app with standalone output

set -e  # Exit on error

echo "🚀 Starting deployment for Academos.or.id..."

# Step 1: Build the application
echo "📦 Building Next.js application..."
npm run build

# Step 2: Copy static files to standalone output
# Next.js standalone does NOT copy these automatically
echo "📁 Copying static assets to standalone output..."
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
mkdir -p .next/standalone/.next/server
cp .next/server/middleware-manifest.json .next/standalone/.next/server/ 2>/dev/null || true
cp .next/server/middleware-build-manifest.js .next/standalone/.next/server/ 2>/dev/null || true

echo "✅ Static files copied successfully"

# Step 3: Restart PM2
echo "🔄 Restarting PM2 process..."
pm2 restart academos || pm2 start

# Step 4: Save PM2 config
echo "💾 Saving PM2 configuration..."
pm2 save

echo "✨ Deployment complete!"
echo ""
echo "📊 PM2 Status:"
pm2 status
