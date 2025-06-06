# Common Development Commands for Ki Platform

This file contains frequently used command sequences for Ki platform development.

## Project Setup Commands

### Initial Development Environment
```bash
# Clone and setup project
git clone [repository-url]
cd ki-platform
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with actual values

# Initialize database
pnpm db:generate
pnpm db:push
pnpm db:seed

# Start development servers
pnpm dev
```

### Testing Environment Setup
```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test:unit
pnpm test:integration
pnpm test:e2e

# Run tests with coverage
pnpm test:coverage

# Watch mode for development
pnpm test:watch
```

## Daily Development Workflow

### Feature Development
```bash
# Start new feature branch
git checkout main
git pull origin main
git checkout -b feature/[feature-name]

# Development cycle
pnpm dev                    # Start dev server
pnpm lint                   # Check code quality
pnpm type-check            # TypeScript validation
pnpm test:related          # Test affected files

# Commit changes
git add .
git commit -m "feat: implement [feature description]"
git push origin feature/[feature-name]
```

### Code Quality Commands
```bash
# Format and lint code
pnpm format                 # Prettier formatting
pnpm lint                   # ESLint checking
pnpm lint:fix              # Auto-fix linting issues

# TypeScript checking
pnpm type-check            # Check types across project
pnpm type-check:watch      # Watch mode for types

# Build verification
pnpm build                 # Production build
pnpm build:analyze         # Bundle analysis
```

## Database Operations

### Prisma Commands
```bash
# Schema changes
pnpm db:generate           # Generate Prisma client
pnpm db:push              # Push schema to database
pnpm db:migrate           # Create and run migration
pnpm db:reset             # Reset database and apply migrations

# Database inspection
pnpm db:studio            # Open Prisma Studio
pnpm db:introspect        # Introspect existing database
pnpm db:format            # Format schema file

# Seeding
pnpm db:seed              # Run database seeds
pnpm db:seed:reset        # Reset and reseed database
```

### Database Backup and Restore
```bash
# Backup database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
psql $DATABASE_URL < backup_file.sql

# Export specific table
pg_dump $DATABASE_URL -t table_name > table_backup.sql
```

## AI Service Integration

### OpenAI Integration Testing
```bash
# Test OpenAI API connection
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models

# Test conversation endpoint
pnpm test:ai:conversation

# Monitor AI API usage
pnpm monitor:ai:usage
```

### Hume AI Testing
```bash
# Test Hume emotion analysis
pnpm test:ai:emotion

# Test voice processing
pnpm test:ai:voice

# Check Hume API status
pnpm health:hume
```

## Deployment Commands

### Vercel Deployment
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

### Environment Management
```bash
# Add environment variable
vercel env add [VARIABLE_NAME]

# List environment variables
vercel env ls

# Pull environment variables
vercel env pull
```

## Monitoring and Debugging

### Application Monitoring
```bash
# View application logs
pnpm logs:app

# Monitor performance
pnpm monitor:performance

# Check error rates
pnpm monitor:errors

# Health check all services
pnpm health:check
```

### Database Monitoring
```bash
# Check database performance
pnpm monitor:db

# View slow queries
pnpm db:slow-queries

# Check connection pool
pnpm db:connections

# Database health
pnpm health:db
```

## Package Management

### Dependency Management
```bash
# Add new dependency
pnpm add [package-name]
pnpm add -D [package-name]      # Dev dependency
pnpm add -w [package-name]      # Workspace root

# Update dependencies
pnpm update                     # Update all
pnpm update [package-name]      # Update specific

# Remove dependency
pnpm remove [package-name]

# Check for outdated packages
pnpm outdated
```

### Workspace Management
```bash
# Run command in specific workspace
pnpm --filter @ki/app dev
pnpm --filter @ki/web build

# Add dependency to specific workspace
pnpm --filter @ki/app add react-query

# Build all packages
pnpm build

# Clean all node_modules
pnpm clean
```

## Security and Compliance

### Security Scanning
```bash
# Audit dependencies
pnpm audit

# Security vulnerability check
pnpm security:check

# License compliance
pnpm license:check

# HIPAA compliance check
pnpm compliance:hipaa
```

### Data Privacy Commands
```bash
# Encrypt sensitive data
pnpm encrypt:data

# Backup encryption keys
pnpm backup:keys

# Test data deletion
pnpm test:data-deletion
```

## Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
pnpm analyze:bundle

# Check unused code
pnpm analyze:unused

# Performance audit
pnpm audit:performance

# Lighthouse CI
pnpm lighthouse
```

### Database Optimization
```bash
# Analyze query performance
pnpm analyze:queries

# Optimize database indexes
pnpm db:optimize-indexes

# Vacuum database
pnpm db:vacuum
```

## Troubleshooting Commands

### Common Issues
```bash
# Clear all caches
pnpm clean:cache

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Reset TypeScript cache
rm -rf .next
pnpm type-check

# Debug build issues
pnpm build --debug
```

### Service Health Checks
```bash
# Check all services
pnpm health:all

# Database connectivity
pnpm health:db

# AI services
pnpm health:ai

# External APIs
pnpm health:external
```

## Git Workflow Commands

### Branch Management
```bash
# Update main branch
git checkout main
git pull origin main

# Clean up merged branches
git branch --merged | grep -v main | xargs -n 1 git branch -d

# Interactive rebase
git rebase -i HEAD~3

# Cherry pick commits
git cherry-pick [commit-hash]
```

### Release Commands
```bash
# Tag new release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Generate changelog
pnpm changelog

# Create release branch
git checkout -b release/v1.0.0
```

## Documentation Commands

### Generate Documentation
```bash
# Generate API docs
pnpm docs:api

# Generate component docs
pnpm docs:components

# Update README files
pnpm docs:readme

# Generate architecture diagrams
pnpm docs:diagrams
```

### Serve Documentation
```bash
# Serve docs locally
pnpm docs:serve

# Build and deploy docs
pnpm docs:deploy
```

## Custom Ki Platform Commands

### Conversation Testing
```bash
# Test conversation flow
pnpm test:conversation

# Simulate relationship scenarios
pnpm simulate:relationship

# Test emotion detection
pnpm test:emotions
```

### Data Management
```bash
# Export user conversations
pnpm export:conversations [user-id]

# Import test data
pnpm import:test-data

# Generate synthetic conversations
pnpm generate:test-conversations
```

These commands provide a comprehensive toolkit for Ki platform development, testing, and maintenance. Use them as building blocks for more complex development workflows.