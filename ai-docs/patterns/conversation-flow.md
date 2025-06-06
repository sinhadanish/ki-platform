# Conversation Flow Patterns

## Core Conversation Architecture

### 1. Empathetic Listening Pattern
```typescript
interface ConversationState {
  phase: 'listening' | 'reflecting' | 'guiding' | 'summarizing';
  emotionalState: EmotionProfile;
  context: ConversationMemory;
  partnerPresent: boolean;
}

// Implementation pattern
const handleUserMessage = async (message: string, state: ConversationState) => {
  // 1. Emotion detection
  const emotion = await detectEmotion(message);
  
  // 2. Context retrieval
  const relevantMemory = await retrieveMemory(message, state.context);
  
  // 3. Response generation
  const response = await generateEmpathicResponse({
    message,
    emotion,
    memory: relevantMemory,
    phase: state.phase
  });
  
  return response;
};
```

### 2. Pattern Recognition Flow
```typescript
// Identify recurring relationship patterns
const identifyPattern = async (conversationHistory: Message[]) => {
  const patterns = await analyzePatterns({
    messages: conversationHistory,
    timeWindow: '30d',
    minOccurrences: 3
  });
  
  return patterns.map(pattern => ({
    type: pattern.category,
    frequency: pattern.occurrences,
    emotional_intensity: pattern.avgEmotionScore,
    triggers: pattern.commonTriggers,
    suggested_intervention: pattern.recommendedResponse
  }));
};
```

### 3. Crisis Detection Pattern
```typescript
const crisisKeywords = [
  'suicide', 'kill myself', 'end it all', 'not worth living',
  'violent', 'hurt them', 'physical', 'abuse'
];

const detectCrisis = (message: string, emotionScore: number) => {
  const hasKeywords = crisisKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
  
  const highEmotionalDistress = emotionScore > 0.8;
  
  if (hasKeywords || highEmotionalDistress) {
    return {
      level: hasKeywords ? 'critical' : 'elevated',
      escalationRequired: true,
      resources: getEmergencyResources()
    };
  }
  
  return { level: 'normal', escalationRequired: false };
};
```

## Response Generation Patterns

### 1. Empathic Response Structure
```typescript
interface EmpathicResponse {
  validation: string;      // "That sounds really difficult..."
  reflection: string;      // "It seems like you're feeling..."
  insight?: string;        // "I notice this is similar to..."
  guidance: string;        // "One approach might be..."
  followUp: string;        // "How does that resonate with you?"
}
```

### 2. Dual-Partner Processing
```typescript
const generateDualResponse = async (
  partnerAMessage: string,
  partnerBMessage: string,
  sharedContext: RelationshipMemory
) => {
  // Process each partner's perspective
  const responseA = await generateResponse({
    message: partnerAMessage,
    perspective: 'partner_a',
    sharedContext,
    privateContext: await getPrivateContext('partner_a')
  });
  
  const responseB = await generateResponse({
    message: partnerBMessage,
    perspective: 'partner_b', 
    sharedContext,
    privateContext: await getPrivateContext('partner_b')
  });
  
  // Generate shared insights
  const sharedInsight = await generateSharedInsight(
    partnerAMessage,
    partnerBMessage,
    sharedContext
  );
  
  return { responseA, responseB, sharedInsight };
};
```

## Memory Integration Patterns

### 1. Contextual Memory Retrieval
```typescript
const retrieveRelevantMemory = async (
  currentMessage: string,
  userId: string
) => {
  // Semantic search for relevant past conversations
  const embedding = await generateEmbedding(currentMessage);
  
  const relevantMemories = await vectorStore.query({
    vector: embedding,
    filter: { userId, type: 'conversation' },
    topK: 5
  });
  
  // Combine with recent conversation history
  const recentHistory = await getRecentMessages(userId, 10);
  
  return {
    semanticContext: relevantMemories,
    recentContext: recentHistory,
    patterns: await getRelationshipPatterns(userId)
  };
};
```

### 2. Memory Consolidation
```typescript
const consolidateMemory = async (conversationId: string) => {
  const conversation = await getConversation(conversationId);
  
  // Extract key insights
  const insights = await extractInsights(conversation.messages);
  
  // Update relationship patterns
  await updatePatterns(conversation.userId, insights);
  
  // Generate summary for long-term memory
  const summary = await generateSummary(conversation);
  
  await storeMemory({
    type: 'episodic',
    summary,
    insights,
    timestamp: new Date(),
    userId: conversation.userId
  });
};
```

## Error Handling Patterns

### 1. Graceful Degradation
```typescript
const handleAIFailure = async (message: string, fallbackLevel: number = 0) => {
  const fallbacks = [
    () => generateGPT4Response(message),
    () => generateGPT35Response(message),
    () => generateTemplateResponse(message),
    () => getHumanEscalationResponse()
  ];
  
  try {
    return await fallbacks[fallbackLevel]();
  } catch (error) {
    if (fallbackLevel < fallbacks.length - 1) {
      return handleAIFailure(message, fallbackLevel + 1);
    }
    throw error;
  }
};
```

### 2. Context Window Management
```typescript
const manageContextWindow = (messages: Message[], maxTokens: number) => {
  let totalTokens = 0;
  const prioritizedMessages: Message[] = [];
  
  // Always include system message and last few exchanges
  const systemMsg = messages.find(m => m.role === 'system');
  const recentMessages = messages.slice(-6);
  
  // Add important memories based on relevance scores
  const importantMemories = messages
    .filter(m => m.relevanceScore > 0.7)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Truncate to fit context window
  for (const msg of [systemMsg, ...importantMemories, ...recentMessages]) {
    if (totalTokens + msg.tokenCount <= maxTokens) {
      prioritizedMessages.push(msg);
      totalTokens += msg.tokenCount;
    }
  }
  
  return prioritizedMessages;
};
```