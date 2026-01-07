# 📦 Git Repository Setup

## Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Rumah Aletheia website - Production ready"

# Create main branch
git branch -M main
```

## Setup Remote Repository

### Option 1: GitHub

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/rumah-aletheia.git
git push -u origin main
```

### Option 2: GitLab

```bash
# Create repository on GitLab first, then:
git remote add origin https://gitlab.com/YOUR_USERNAME/rumah-aletheia.git
git push -u origin main
```

### Option 3: Bitbucket

```bash
# Create repository on Bitbucket first, then:
git remote add origin https://YOUR_USERNAME@bitbucket.org/YOUR_USERNAME/rumah-aletheia.git
git push -u origin main
```

## .gitignore Already Configured ✅

The following are already excluded from git:
- `node_modules/`
- `.next/`
- `.env*` (except `.env.example`)
- Build artifacts
- IDE files

## Recommended Git Workflow

### For Development:

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add: your feature description"

# Push to remote
git push origin feature/your-feature-name

# Merge to main via Pull Request
```

### For Production Updates:

```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Make changes, commit, and push
git add .
git commit -m "Update: description of changes"
git push origin main

# Auto-deploy will trigger (if using Vercel/Netlify)
```

## Commit Message Convention

Use clear, descriptive commit messages:

```bash
# Features
git commit -m "Add: newsletter subscription form"
git commit -m "Add: FAQ accordion component"

# Updates
git commit -m "Update: contact information"
git commit -m "Update: dependencies to latest versions"

# Fixes
git commit -m "Fix: mobile navigation menu toggle"
git commit -m "Fix: form validation error"

# Docs
git commit -m "Docs: update deployment guide"
git commit -m "Docs: add API documentation"
```

## Connect to Vercel

After pushing to Git:

1. **Via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

2. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

## Auto-Deployment Setup

With Vercel connected to Git:
- Push to `main` → Auto-deploy to production
- Push to other branches → Auto-deploy to preview URLs
- Pull Requests → Auto-deploy to preview URLs

## Protect Main Branch (Recommended)

On GitHub/GitLab, enable branch protection:
- Require pull request reviews
- Require status checks to pass
- Prevent force pushes
- Prevent deletion

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# Create and switch to new branch
git checkout -b branch-name

# View differences
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo all changes (DANGER)
git reset --hard HEAD

# View remote URLs
git remote -v

# Pull latest from main
git pull origin main

# Stash changes temporarily
git stash
git stash pop
```

## Next Steps

1. ✅ Initialize git repository
2. ✅ Create remote repository (GitHub/GitLab)
3. ✅ Push code to remote
4. ✅ Connect to Vercel for deployment
5. ✅ Configure domain (academos.or.id)

---

**Ready to push to Git!** 🚀
