# Ki Platform - Full Project Context Primer

## Project Overview

**Ki** is a relationship intelligence platform that transforms conflicts into connection through AI that understands both partners simultaneously. This is a Next.js monorepo built with Turborepo, focusing on empathetic AI conversation and relationship pattern recognition.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand for global state, React Context for auth/theme
- **Forms**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for sessions and real-time features
- **Authentication**: NextAuth.js or Clerk
- **Payments**: Stripe integration

### AI & ML
- **Primary LLM**: OpenAI GPT-4 for conversations
- **Emotion Analysis**: Hume AI for voice/text emotion detection
- **Memory**: Vector embeddings for semantic search
- **Voice**: Deepgram (STT) + Hume Octave (TTS)

### Infrastructure
- **Deployment**: Vercel for Next.js apps
- **Database Hosting**: Neon PostgreSQL
- **File Storage**: Vercel Blob for audio/media
- **Monitoring**: Sentry for error tracking

## Project Structure

```
/
├── apps/
│   ├── app/           # Main conversational interface
│   ├── web/           # Marketing website
│   ├── docs/          # Documentation site
│   └── api/           # Microservice API
├── packages/          # Shared packages
├── ai-docs/          # AI assistant memory and documentation
├── specs/            # Project specifications and requirements
└── .claude/          # Claude context and prompts
```

## Core Features

### 1. Conversational AI
- Real-time chat interface with streaming responses
- Emotional intelligence and empathetic responses
- Pattern recognition across conversation history
- Crisis detection and escalation protocols

### 2. Relationship Memory
- Long-term conversation context and user preferences
- Semantic search through conversation history
- Relationship pattern identification and insights
- Progress tracking and growth metrics

### 3. Dual-Partner Support (Future)
- Simultaneous processing of both partners
- Individual encrypted channels + shared spaces
- Voice-first interface for natural conflict resolution
- Real-time emotional state synchronization

## Key Architectural Principles

### 1. Privacy-First Design
- End-to-end encryption for sensitive conversations
- Individual user channels with selective sharing
- Zero-knowledge architecture where possible
- HIPAA-compliant data handling

### 2. Emotional Intelligence
- Multi-modal emotion detection (text + voice)
- Adaptive AI personality based on emotional state
- Emotional journey tracking and visualization
- Context-aware response generation

### 3. Scalable AI Architecture
- Multiple LLM provider support with fallbacks
- Intelligent context window management
- Cost-optimized API usage with caching
- Real-time processing with WebSocket/SSE

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Consistent component patterns using shadcn/ui
- Server Components by default, Client Components when needed

### Testing Strategy
- Vitest for unit and integration tests
- Playwright for end-to-end testing
- AI response quality testing
- Performance and load testing

### File Naming Conventions
- `kebab-case` for files and directories
- `PascalCase` for React components
- `camelCase` for functions and variables
- `SCREAMING_SNAKE_CASE` for constants

## API Patterns

### REST Endpoints
```typescript
// Standard CRUD operations
GET    /api/conversations
POST   /api/conversations
GET    /api/conversations/:id
PATCH  /api/conversations/:id
DELETE /api/conversations/:id

// Real-time features
GET    /api/conversations/:id/stream  # SSE
POST   /api/chat/message              # WebSocket alternative
```

### Response Formats
```typescript
// Standard API response
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  metadata?: {
    pagination?: PaginationInfo;
    timestamp: string;
  };
}

// Streaming AI responses
interface StreamChunk {
  type: 'content' | 'function_call' | 'error' | 'complete';
  content?: string;
  metadata?: Record<string, any>;
}
```

## Database Schema Key Tables

```sql
-- Users and authentication
users (id, email, name, partner_name, subscription_tier)
sessions (id, user_id, expires_at, data)

-- Conversations and messages
conversations (id, user_id, title, status, created_at)
messages (id, conversation_id, role, content, emotions, timestamp)

-- AI and insights
conversation_insights (id, conversation_id, type, content, confidence)
relationship_patterns (id, user_id, category, frequency, trend)
user_memory (id, user_id, type, content, embedding, relevance_score)
```

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."

# AI Services
OPENAI_API_KEY="sk-..."
HUME_API_KEY="..."
ANTHROPIC_API_KEY="..."

# Authentication
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="..."

# Payments
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Monitoring
SENTRY_DSN="..."
```

## Common Development Tasks

### Adding New Features
1. Create specification in `specs/features/`
2. Update API documentation if needed
3. Implement frontend components with TypeScript
4. Add backend API routes with proper validation
5. Include comprehensive tests
6. Update documentation

### AI Integration
1. Check `ai-docs/api-references/` for service documentation
2. Follow patterns in `ai-docs/patterns/`
3. Implement fallback strategies for reliability
4. Add cost optimization and rate limiting
5. Include emotion analysis where relevant

### Database Changes
1. Create Prisma migration
2. Update TypeScript types
3. Add data validation
4. Consider migration impact on existing data
5. Update backup and recovery procedures

## Quality Standards

### Code Quality
- 90%+ test coverage for business logic
- TypeScript strict mode with no `any` types
- Comprehensive error handling and logging
- Performance optimized (Core Web Vitals)

### AI Quality
- Empathetic and supportive conversation tone
- Accurate emotion detection and response
- Relevant pattern recognition and insights
- Crisis detection and appropriate escalation

### Security
- Input validation and sanitization
- Rate limiting on all endpoints
- Secure authentication and session management
- Regular security audits and penetration testing

This primer provides the essential context for understanding and contributing to the Ki platform. Refer to specific documentation in `ai-docs/` and `specs/` for detailed implementation guidance.