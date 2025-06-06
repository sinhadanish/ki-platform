# Contributing to Ki Platform

Welcome to the Ki platform development team! This guide provides everything you need to know about contributing to our relationship intelligence platform.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [AI Development Practices](#ai-development-practices)
- [Documentation Standards](#documentation-standards)
- [Review Process](#review-process)
- [Release Process](#release-process)

## Getting Started

### Prerequisites

- **Node.js**: Version 18.17.0 or later
- **pnpm**: Version 8.0.0 or later
- **Git**: Version 2.40.0 or later
- **PostgreSQL**: Version 14.0 or later (for local development)
- **Redis**: Version 6.2.0 or later (for caching)

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ki-platform.git
   cd ki-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Initialize the database**
   ```bash
   pnpm db:generate
   pnpm db:push
   pnpm db:seed
   ```

5. **Start development servers**
   ```bash
   pnpm dev
   ```

### Project Structure

```
ki-platform/
├── apps/
│   ├── app/              # Main conversational interface
│   ├── web/              # Marketing website
│   ├── docs/             # Documentation site
│   └── api/              # Microservice API
├── packages/
│   ├── ui/               # Shared UI components
│   ├── auth/             # Authentication utilities
│   ├── database/         # Prisma schema and utilities
│   └── ai/               # AI service integrations
├── ai-docs/              # AI assistant documentation
├── specs/                # Project specifications
├── .claude/              # Claude context and prompts
└── docs/                 # Additional documentation
```

## Development Workflow

### Branch Naming Convention

```
feature/[feature-name]     # New features
bugfix/[issue-description] # Bug fixes
hotfix/[critical-fix]      # Critical production fixes
docs/[documentation-update] # Documentation changes
refactor/[code-improvement] # Code refactoring
```

### Feature Development Process

1. **Create Feature Branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/voice-interface
   ```

2. **Plan and Document**
   - Create or update specification in `specs/features/`
   - Update AI documentation in `ai-docs/` if needed
   - Plan implementation approach

3. **Implement Feature**
   - Follow code standards and conventions
   - Write tests alongside implementation
   - Update documentation as you go

4. **Test Thoroughly**
   ```bash
   pnpm test              # Unit and integration tests
   pnpm test:e2e          # End-to-end tests
   pnpm lint              # Code quality checks
   pnpm type-check        # TypeScript validation
   ```

5. **Create Pull Request**
   - Use the PR template
   - Include clear description and testing instructions
   - Link to relevant issues or specifications

### Daily Development Commands

```bash
# Start development
pnpm dev                   # Start all development servers

# Code quality
pnpm lint                  # ESLint checking
pnpm lint:fix             # Auto-fix linting issues
pnpm format               # Prettier formatting
pnpm type-check           # TypeScript validation

# Testing
pnpm test                 # Run all tests
pnpm test:watch           # Watch mode for testing
pnpm test:coverage        # Coverage report

# Database
pnpm db:studio            # Open Prisma Studio
pnpm db:reset             # Reset and reseed database
```

## Code Standards

### TypeScript Guidelines

```typescript
// Use strict TypeScript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

// ❌ Avoid
const user: any = getUserData();
```

### Component Patterns

```typescript
// ✅ Preferred component structure
interface ComponentProps {
  // Props definition with clear types
  user: User;
  onAction: (action: Action) => void;
  className?: string;
}

export function ComponentName({ user, onAction, className }: ComponentProps) {
  // State management
  const [state, setState] = useState<ComponentState>();
  
  // Effects and handlers
  useEffect(() => {
    // Side effects
  }, []);
  
  const handleAction = useCallback(() => {
    // Event handlers
  }, []);
  
  // Render
  return (
    <div className={cn("default-styles", className)}>
      {/* Component JSX */}
    </div>
  );
}
```

### API Route Patterns

```typescript
// ✅ Standard API route structure
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { validateRequest } from '@/lib/validation';
import { handleError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    // Authentication
    const user = await auth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Validation
    const body = await request.json();
    const validatedData = await validateRequest(body, schema);
    
    // Business logic
    const result = await processRequest(validatedData, user);
    
    // Response
    return NextResponse.json({
      data: result,
      success: true
    });
    
  } catch (error) {
    return handleError(error);
  }
}
```

### Database Patterns

```typescript
// ✅ Database access patterns
// Use Prisma with proper error handling
async function getUserConversations(userId: string): Promise<Conversation[]> {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1 // Latest message only
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
    
    return conversations;
  } catch (error) {
    logger.error('Failed to fetch user conversations', {
      userId,
      error: error.message
    });
    throw new DatabaseError('Unable to fetch conversations');
  }
}
```

### Error Handling

```typescript
// ✅ Comprehensive error handling
class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleError(error: unknown): NextResponse {
  if (error instanceof APIError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  
  logger.error('Unexpected error', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

## Testing Guidelines

### Test Structure

```typescript
// ✅ Test organization
describe('ConversationService', () => {
  beforeEach(() => {
    // Setup
  });
  
  afterEach(() => {
    // Cleanup
  });
  
  describe('createConversation', () => {
    it('should create a new conversation with valid data', async () => {
      // Arrange
      const userData = createMockUser();
      const conversationData = createMockConversationData();
      
      // Act
      const result = await conversationService.create(userData, conversationData);
      
      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBeTruthy();
      expect(result.userId).toBe(userData.id);
    });
    
    it('should throw error for invalid user', async () => {
      // Arrange
      const invalidUser = null;
      const conversationData = createMockConversationData();
      
      // Act & Assert
      await expect(
        conversationService.create(invalidUser, conversationData)
      ).rejects.toThrow('Invalid user');
    });
  });
});
```

### Testing AI Components

```typescript
// ✅ AI service testing
describe('AIOrchestrator', () => {
  const mockOpenAI = createMockOpenAI();
  const mockHume = createMockHume();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should generate empathetic response', async () => {
    // Arrange
    const userMessage = "I'm feeling frustrated with my partner";
    const expectedResponse = "I understand that frustration...";
    
    mockOpenAI.generateResponse.mockResolvedValue(expectedResponse);
    
    // Act
    const result = await aiOrchestrator.processMessage({
      content: userMessage,
      userId: 'test-user'
    });
    
    // Assert
    expect(result.content).toContain('understand');
    expect(result.emotions).toBeDefined();
    expect(mockOpenAI.generateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        message: userMessage,
        context: expect.any(Object)
      })
    );
  });
});
```

### E2E Testing

```typescript
// ✅ End-to-end test example
import { test, expect } from '@playwright/test';

test.describe('Conversation Flow', () => {
  test('user can start and complete a conversation', async ({ page }) => {
    // Login
    await page.goto('/sign-in');
    await page.fill('[data-testid=email]', 'test@example.com');
    await page.fill('[data-testid=password]', 'password123');
    await page.click('[data-testid=sign-in-button]');
    
    // Start conversation
    await page.goto('/app');
    await page.click('[data-testid=new-conversation]');
    
    // Send message
    await page.fill('[data-testid=message-input]', 'Hello Ki, I need help');
    await page.click('[data-testid=send-button]');
    
    // Verify AI response
    await expect(page.locator('[data-testid=ai-message]')).toBeVisible();
    await expect(page.locator('[data-testid=ai-message]')).toContainText('help');
  });
});
```

## AI Development Practices

### Prompt Engineering

```typescript
// ✅ Structured prompt management
const SYSTEM_PROMPTS = {
  empathetic_counselor: `
You are Ki, an empathetic AI relationship counselor. Your role is to:
- Listen with empathy and validate emotions
- Ask thoughtful, open-ended questions
- Provide gentle insights without being prescriptive
- Recognize patterns in relationship dynamics
- Maintain a warm, supportive tone

Guidelines:
- Always validate emotions before offering insights
- Use "I" statements to share observations
- Avoid giving direct advice; instead, help users discover solutions
- Be especially careful with sensitive topics
- If you detect crisis language, prioritize safety
`,
  
  pattern_analyzer: `
You are analyzing relationship conversation patterns. Focus on:
- Communication styles and frequency
- Emotional patterns and triggers
- Recurring themes and topics
- Growth indicators and positive changes
- Areas that might need attention

Provide insights that are:
- Specific and actionable
- Based on observed patterns
- Encouraging and growth-oriented
- Respectful of both partners
`
};
```

### AI Response Quality

```typescript
// ✅ Response validation
interface ResponseQuality {
  empathy: number;        // 0-1 scale
  relevance: number;      // 0-1 scale
  helpfulness: number;    // 0-1 scale
  safety: boolean;        // Crisis detection
}

async function validateAIResponse(
  userMessage: string,
  aiResponse: string,
  context: ConversationContext
): Promise<ResponseQuality> {
  // Implement quality checks
  const empathy = await measureEmpathy(aiResponse);
  const relevance = await measureRelevance(userMessage, aiResponse);
  const helpfulness = await measureHelpfulness(aiResponse, context);
  const safety = await checkSafety(aiResponse);
  
  return { empathy, relevance, helpfulness, safety };
}
```

### Cost Optimization

```typescript
// ✅ AI cost management
class AIUsageTracker {
  async trackUsage(
    userId: string,
    provider: string,
    tokens: number,
    cost: number
  ): Promise<void> {
    await prisma.aiUsage.create({
      data: {
        userId,
        provider,
        tokensUsed: tokens,
        cost,
        timestamp: new Date()
      }
    });
  }
  
  async checkQuota(userId: string): Promise<boolean> {
    const usage = await this.getMonthlyUsage(userId);
    const limit = await this.getUserLimit(userId);
    return usage.cost < limit;
  }
}
```

## Documentation Standards

### Code Documentation

```typescript
/**
 * Analyzes conversation patterns to identify relationship dynamics
 * 
 * @param conversations - Array of user conversations to analyze
 * @param timeframe - Time period for analysis (week, month, quarter)
 * @param options - Additional analysis options
 * @returns Promise resolving to relationship patterns and insights
 * 
 * @example
 * ```typescript
 * const patterns = await analyzeRelationshipPatterns(
 *   userConversations,
 *   'month',
 *   { includeEmotions: true }
 * );
 * ```
 */
async function analyzeRelationshipPatterns(
  conversations: Conversation[],
  timeframe: Timeframe,
  options: AnalysisOptions = {}
): Promise<RelationshipPattern[]> {
  // Implementation
}
```

### API Documentation

```yaml
# Update OpenAPI specs for all new endpoints
paths:
  /api/conversations/{id}/insights:
    get:
      summary: Get conversation insights
      description: Retrieve AI-generated insights for a specific conversation
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Conversation insights
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ConversationInsights'
```

### README Updates

Update relevant README files when:
- Adding new packages or dependencies
- Changing development setup process
- Adding new environment variables
- Modifying build or deployment process

## Review Process

### Pull Request Template

```markdown
## Description
Brief description of changes and motivation

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## AI Quality (if applicable)
- [ ] Response quality validated
- [ ] Cost impact assessed
- [ ] Fallback strategies tested
- [ ] Emotion detection accuracy verified

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements in production code
- [ ] TypeScript errors resolved
- [ ] Performance impact considered
```

### Review Criteria

**Code Quality**
- [ ] Follows TypeScript and React best practices
- [ ] Proper error handling and edge cases
- [ ] Performance considerations addressed
- [ ] Security implications reviewed

**AI Quality**
- [ ] Empathetic and appropriate responses
- [ ] Accurate emotion detection
- [ ] Cost-effective implementation
- [ ] Fallback strategies in place

**Testing**
- [ ] Adequate test coverage (>80% for new code)
- [ ] Tests are meaningful and thorough
- [ ] E2E tests for user-facing features
- [ ] AI response quality tests

**Documentation**
- [ ] Code is self-documenting
- [ ] Complex logic explained
- [ ] API changes documented
- [ ] User-facing changes documented

## Release Process

### Version Management

We use semantic versioning (semver):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

### Release Workflow

1. **Feature Freeze**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b release/v1.2.0
   ```

2. **Testing Phase**
   ```bash
   pnpm test:all              # All test suites
   pnpm build                 # Production build
   pnpm audit                 # Security audit
   pnpm performance:test      # Performance testing
   ```

3. **Documentation Update**
   - Update CHANGELOG.md
   - Update version numbers
   - Generate API documentation

4. **Production Deployment**
   ```bash
   git tag v1.2.0
   git push origin v1.2.0
   # Vercel automatically deploys tagged versions
   ```

5. **Post-Release Monitoring**
   - Monitor application metrics
   - Watch for error rates
   - Validate AI response quality
   - Check user feedback

### Hotfix Process

For critical production issues:

1. **Create Hotfix Branch**
   ```bash
   git checkout main
   git checkout -b hotfix/critical-security-fix
   ```

2. **Implement Fix**
   - Minimal, targeted changes only
   - Comprehensive testing
   - Security review if applicable

3. **Emergency Deployment**
   ```bash
   git tag v1.2.1
   git push origin v1.2.1
   ```

## Environment Variables

### Required Variables

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
VERCEL_ENV="development"
```

### Development Setup

```bash
# Copy and edit environment file
cp .env.example .env.local

# Generate secure secrets
openssl rand -base64 32  # For NEXTAUTH_SECRET
```

## Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
# Reset database connection
pnpm db:reset
pnpm db:generate
pnpm db:push
```

**TypeScript Errors**
```bash
# Clear TypeScript cache
rm -rf .next
pnpm type-check
```

**AI Service Issues**
```bash
# Test AI service connections
pnpm test:ai
pnpm health:ai
```

**Build Issues**
```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

### Getting Help

- **Documentation**: Check `ai-docs/` and `specs/` directories
- **Team Chat**: Use our development Slack channel
- **Issues**: Create GitHub issues for bugs or feature requests
- **Code Review**: Request review from team members

## Best Practices Summary

1. **Always write tests** for new functionality
2. **Document AI decisions** and prompt engineering choices
3. **Consider performance** impact of changes
4. **Validate AI quality** thoroughly
5. **Follow TypeScript** strict mode
6. **Use meaningful** commit messages
7. **Keep PRs focused** and reviewable
8. **Update documentation** alongside code changes
9. **Test across devices** and browsers
10. **Monitor production** impact after deployment

Thank you for contributing to Ki! Together, we're building technology that strengthens human relationships rather than replacing them.