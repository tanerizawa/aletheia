require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'academos',
      script: 'npm',
      args: 'start',
      cwd: '/home/aletheia',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOSTNAME: '0.0.0.0',
        NEXT_PUBLIC_BASE_URL: 'https://academos.or.id',
        // Database
        DATABASE_URL: process.env.DATABASE_URL,
        // Resend Email
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        EMAIL_FROM: process.env.EMAIL_FROM,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        // Cloudinary
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        // Unsplash
        UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
        // Session
        SESSION_SECRET: process.env.SESSION_SECRET,
      }
    },
    // Development process with hot-reload/watch
    {
      name: 'academos-dev',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/aletheia',
      instances: 1,
      autorestart: true,
      // PM2 watch will restart the process on file changes. Next.js dev server already provides HMR,
      // but this helps when you want PM2 to manage the dev process and restart on config changes.
      watch: ['src', 'components', 'public', 'styles', 'scripts'],
      ignore_watch: ['node_modules', '.next'],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOSTNAME: '0.0.0.0'
      }
    }
  ]
};
