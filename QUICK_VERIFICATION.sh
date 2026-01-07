#!/bin/bash

echo "🔍 QUICK SYSTEM VERIFICATION"
echo "=============================="
echo ""

# 1. PM2 Status
echo "1️⃣  PM2 Process Status:"
pm2 status academos --no-daemon 2>/dev/null | grep "academos" || echo "❌ PM2 not running"
echo ""

# 2. Website Accessibility
echo "2️⃣  Website Accessibility:"
if curl -s -o /dev/null -w "%{http_code}" https://academos.or.id | grep -q "200"; then
    echo "✅ Website accessible (200 OK)"
else
    echo "❌ Website not accessible"
fi
echo ""

# 3. API Health
echo "3️⃣  API Health Check:"
stats=$(curl -s https://academos.or.id/api/public/stats)
if echo "$stats" | grep -q "articles"; then
    echo "✅ API working"
    echo "$stats" | jq -r '"   - Articles: \(.articles.total), E-books: \(.ebooks.total), Events: \(.events.total)"'
else
    echo "❌ API not responding"
fi
echo ""

# 4. Database Connection
echo "4️⃣  Database Content:"
cd /home/aletheia
result=$(npx prisma db execute --stdin 2>&1 <<'SQL'
SELECT 
  (SELECT COUNT(*) FROM "Article") as articles,
  (SELECT COUNT(*) FROM "Ebook") as ebooks,
  (SELECT COUNT(*) FROM "Event") as events,
  (SELECT COUNT(*) FROM "NewsletterSubscriber") as subscribers,
  (SELECT COUNT(*) FROM "ContactMessage") as messages;
SQL
)
if echo "$result" | grep -q "Successfully"; then
    echo "✅ Database connected"
else
    echo "❌ Database connection failed"
fi
echo ""

# 5. Email Configuration
echo "5️⃣  Email Configuration:"
if grep -q "RESEND_API_KEY=re_" /home/aletheia/.env; then
    echo "✅ Resend API key configured"
else
    echo "❌ Resend API key not found"
fi
echo ""

# 6. Recent Logs
echo "6️⃣  Recent Activity (Last 5 logs):"
pm2 logs academos --lines 5 --nostream 2>/dev/null | tail -5
echo ""

# Summary
echo "=============================="
echo "✨ Verification Complete!"
echo ""
echo "📊 Quick Stats:"
curl -s https://academos.or.id/api/public/stats | jq -r '
"   Articles: \(.articles.total) (Views: \(.articles.totalViews), Likes: \(.articles.totalLikes))",
"   E-books: \(.ebooks.total) (Views: \(.ebooks.totalViews), Downloads: \(.ebooks.totalDownloads))",
"   Events: \(.events.total) (Upcoming: \(.events.upcoming), Completed: \(.events.completed))"
'
echo ""
echo "🔗 URLs:"
echo "   Website: https://academos.or.id"
echo "   Admin: https://academos.or.id/admin"
echo "   API Stats: https://academos.or.id/api/public/stats"
