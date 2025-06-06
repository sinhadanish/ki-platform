# Feature Implementation Prompt Template

Use this template for implementing new features in the Ki platform.

## Prompt Structure

```
I need to implement [FEATURE_NAME] for the Ki platform. Here are the requirements:

**Feature Overview:**
[Brief description of what this feature does and why it's needed]

**User Stories:**
- As a [user type], I want [functionality] so that [benefit]
- [Additional user stories as needed]

**Technical Requirements:**
1. [Specific technical requirement 1]
2. [Specific technical requirement 2]
3. [Additional requirements...]

**Acceptance Criteria:**
- [ ] [Measurable acceptance criterion 1]
- [ ] [Measurable acceptance criterion 2]
- [ ] [Additional criteria...]

**Architecture Considerations:**
- Database changes: [Yes/No - if yes, describe]
- API endpoints: [List new endpoints needed]
- Frontend components: [List new components needed]
- Third-party integrations: [Any external services]
- Performance requirements: [Specific performance needs]

**Implementation Approach:**
Please implement this feature following Ki platform standards:

1. **Database Schema**: Create/update Prisma schema if needed
2. **API Layer**: Implement type-safe API routes with proper validation
3. **Frontend**: Build responsive React components using shadcn/ui
4. **AI Integration**: Include emotional intelligence where relevant
5. **Testing**: Add comprehensive unit and integration tests
6. **Documentation**: Update relevant docs and API specifications

**Code Style Requirements:**
- Use TypeScript strict mode
- Follow existing file naming conventions
- Implement proper error handling
- Add appropriate logging and monitoring
- Ensure mobile-responsive design
- Include accessibility features

**Quality Standards:**
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions
- Implement proper loading and error states
- Ensure consistent UI/UX with existing platform
- Add comprehensive test coverage

Please create a development plan, then implement the feature step by step, ensuring each component works correctly before moving to the next.
```

## Usage Examples

### Simple Feature Implementation
```
I need to implement user profile editing for the Ki platform. Here are the requirements:

**Feature Overview:**
Allow users to update their personal information including name, partner name, relationship status, and communication preferences.

**User Stories:**
- As a user, I want to edit my profile information so that Ki can provide more personalized relationship guidance
- As a user, I want to update my partner's name so that Ki uses the correct name in conversations

**Technical Requirements:**
1. Form validation for all input fields
2. Real-time updates without page refresh
3. Privacy controls for sharing information
4. Audit trail for profile changes

[Continue with rest of template...]
```

### Complex AI Feature Implementation
```
I need to implement emotional pattern visualization for the Ki platform. Here are the requirements:

**Feature Overview:**
Create interactive charts showing emotional patterns and trends across relationship conversations, helping users visualize their emotional journey.

**User Stories:**
- As a user, I want to see my emotional patterns over time so that I can understand my relationship dynamics better
- As a couple, we want to see how our emotions correlate during conversations

**Technical Requirements:**
1. Real-time emotion analysis integration with Hume AI
2. Interactive data visualization using Chart.js or D3.js
3. Time-series data storage and retrieval
4. Export functionality for insights sharing

[Continue with specific AI and visualization requirements...]
```

## Customization Guidelines

### For Different Feature Types

**UI/UX Features:**
- Emphasize responsive design and accessibility
- Include dark/light mode considerations
- Add animation and micro-interaction requirements

**AI/ML Features:**
- Specify AI service integrations (OpenAI, Hume, etc.)
- Include fallback strategies and error handling
- Add performance and cost optimization requirements

**Backend Features:**
- Detail API specification and validation
- Include security and privacy considerations
- Specify scalability and performance requirements

**Integration Features:**
- Document external service requirements
- Include authentication and rate limiting
- Add webhook and real-time update needs

## Success Criteria

A successful feature implementation should:

1. **Meet All Requirements**: Fulfill every technical and functional requirement
2. **Follow Platform Standards**: Consistent with existing code style and architecture
3. **Include Comprehensive Testing**: Unit, integration, and E2E tests as appropriate
4. **Maintain Performance**: No degradation in platform speed or reliability
5. **Enhance User Experience**: Improve platform usability and value proposition
6. **Support Scalability**: Design for future growth and feature expansion

## Post-Implementation Checklist

After implementing the feature:

- [ ] All acceptance criteria verified
- [ ] Tests passing and coverage adequate
- [ ] Documentation updated
- [ ] Code review completed
- [ ] Performance impact assessed
- [ ] Security review conducted
- [ ] Accessibility features tested
- [ ] Mobile responsiveness verified
- [ ] Error handling comprehensive
- [ ] Analytics and monitoring in place