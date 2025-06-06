# Debug Issue Prompt Template

Use this template for debugging and fixing issues in the Ki platform.

## Prompt Structure

```
I need help debugging [ISSUE_TYPE] in the Ki platform. Here's the issue details:

**Problem Description:**
[Clear description of what's not working as expected]

**Expected Behavior:**
[What should happen under normal circumstances]

**Actual Behavior:**
[What is actually happening, including error messages]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Step where issue occurs]

**Environment Details:**
- Component/Feature: [Which part of the platform]
- User Type: [Free/Premium user, specific user scenario]
- Browser/Device: [If frontend issue]
- API Endpoint: [If backend issue]
- Database Tables: [If data-related issue]

**Error Information:**
- Error Messages: [Exact error text]
- Console Logs: [Browser console or server logs]
- Stack Trace: [If available]
- Status Codes: [HTTP status codes if applicable]

**Debugging Approach:**
Please help me debug this issue systematically:

1. **Identify Root Cause**: Analyze the error and trace the issue source
2. **Reproduce Issue**: Understand the conditions that trigger the problem
3. **Impact Assessment**: Determine how this affects users and platform functionality
4. **Solution Strategy**: Propose fix approach with consideration for:
   - Platform stability and performance
   - User experience impact
   - Security implications
   - Backwards compatibility
5. **Implementation**: Provide step-by-step fix implementation
6. **Testing**: Suggest comprehensive testing approach
7. **Prevention**: Recommend measures to prevent similar issues

**Quality Requirements:**
- Maintain code quality and platform standards
- Ensure fix doesn't introduce new issues
- Add appropriate logging and monitoring
- Include regression tests
- Update documentation if needed

Please analyze this issue thoroughly and provide a complete debugging and resolution plan.
```

## Common Issue Categories

### Frontend Issues
```
**UI/UX Problems:**
- Component rendering issues
- Responsive design problems
- State management bugs
- Form validation failures
- Accessibility issues

**Performance Issues:**
- Slow page load times
- Memory leaks
- Inefficient re-renders
- Large bundle sizes

**Integration Issues:**
- API communication failures
- WebSocket connection problems
- Real-time update issues
- Authentication flows
```

### Backend Issues
```
**API Problems:**
- Endpoint errors and failures
- Database query performance
- Authentication and authorization
- Rate limiting issues

**Data Issues:**
- Inconsistent data states
- Migration problems
- Backup and recovery failures
- Data validation errors

**Service Integration:**
- AI service failures (OpenAI, Hume)
- Payment processing issues
- Email delivery problems
- External API timeouts
```

### AI-Specific Issues
```
**Conversation Quality:**
- Inappropriate AI responses
- Context loss during conversations
- Emotion detection inaccuracies
- Pattern recognition failures

**Performance Issues:**
- High API costs
- Slow response times
- Token limit exceeded
- Service reliability problems

**Integration Problems:**
- Fallback mechanism failures
- Model consistency issues
- Memory management problems
- Real-time processing delays
```

## Debugging Templates by Issue Type

### Performance Issue Template
```
I need help debugging a performance issue in the Ki platform:

**Problem**: [Page/feature] is loading slowly and affecting user experience
**Expected**: Load time under 2 seconds
**Actual**: Load time 8+ seconds

**Performance Metrics:**
- Time to First Byte: [X]ms
- Largest Contentful Paint: [X]ms
- First Input Delay: [X]ms
- Cumulative Layout Shift: [X]

**Potential Causes:**
- Large JavaScript bundles
- Inefficient database queries
- Unoptimized images/assets
- AI API response delays

Please analyze performance bottlenecks and provide optimization strategies.
```

### AI Response Quality Issue Template
```
I need help debugging AI response quality issues:

**Problem**: Ki is providing inappropriate or unhelpful responses during relationship conversations
**Expected**: Empathetic, relevant, and helpful guidance
**Actual**: Generic or insensitive responses

**Context Examples:**
- User Input: "[example user message]"
- Ki Response: "[problematic AI response]"
- Why Problematic: "[explanation of issues]"

**System Context:**
- AI Model: GPT-4/Claude
- Prompt Engineering: [current system prompt approach]
- Context Window: [current context management]
- Emotion Detection: [current emotion analysis results]

Please analyze conversation quality and suggest improvements to prompt engineering, context management, and response generation.
```

### Database Issue Template
```
I need help debugging a database-related issue:

**Problem**: [Specific database operation] is failing or performing poorly
**Expected**: [Expected database behavior]
**Actual**: [Current problematic behavior]

**Database Details:**
- Tables Affected: [table names]
- Query Performance: [slow queries identified]
- Data Integrity: [any consistency issues]
- Migration Status: [recent migration impacts]

**Error Messages:**
[Specific database error messages]

Please analyze database issues and provide solutions for query optimization, data integrity, and performance improvements.
```

## Debugging Methodology

### 1. Issue Triage
- **Severity**: Critical/High/Medium/Low
- **Impact**: Number of users affected
- **Urgency**: Time sensitivity for resolution
- **Complexity**: Estimated difficulty to resolve

### 2. Root Cause Analysis
- **Symptom Analysis**: What are the visible problems?
- **System Analysis**: Which components are involved?
- **Data Analysis**: What does the data tell us?
- **Timeline Analysis**: When did this issue start?

### 3. Solution Strategy
- **Quick Fix**: Immediate workaround if needed
- **Proper Fix**: Comprehensive solution addressing root cause
- **Prevention**: Long-term measures to prevent recurrence
- **Monitoring**: Enhanced observability for early detection

### 4. Testing Strategy
- **Regression Testing**: Ensure fix doesn't break existing functionality
- **Edge Case Testing**: Test boundary conditions and error scenarios
- **Performance Testing**: Verify fix doesn't impact performance
- **User Acceptance Testing**: Confirm issue resolution from user perspective

## Post-Debug Checklist

After resolving the issue:

- [ ] Root cause identified and documented
- [ ] Fix implemented and tested thoroughly
- [ ] Performance impact assessed
- [ ] Security implications reviewed
- [ ] Documentation updated
- [ ] Monitoring and alerting enhanced
- [ ] Team knowledge shared
- [ ] Prevention measures implemented
- [ ] User communication completed (if applicable)
- [ ] Post-mortem conducted (for critical issues)