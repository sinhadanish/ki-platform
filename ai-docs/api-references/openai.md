# OpenAI API Reference

## Overview
OpenAI provides the core conversational AI and text analysis capabilities for Ki platform.

## Models Used

### GPT-4 Turbo
- **Purpose**: Main conversational AI for relationship counseling
- **Model**: `gpt-4-turbo-preview`
- **Context Window**: 128k tokens
- **Cost**: $0.01/1k input tokens, $0.03/1k output tokens

### GPT-3.5 Turbo
- **Purpose**: Quick responses and pattern analysis
- **Model**: `gpt-3.5-turbo`
- **Context Window**: 16k tokens
- **Cost**: $0.0005/1k input tokens, $0.0015/1k output tokens

## Key Endpoints

### Chat Completions
```typescript
const response = await openai.chat.completions.create({
  model: "gpt-4-turbo-preview",
  messages: [
    {
      role: "system",
      content: "You are Ki, an empathetic relationship AI counselor..."
    },
    {
      role: "user", 
      content: userMessage
    }
  ],
  temperature: 0.7,
  max_tokens: 2000,
  stream: true
});
```

### Embeddings
```typescript
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: conversationText,
  encoding_format: "float"
});
```

## Streaming Implementation
```typescript
// Real-time streaming for conversational responses
for await (const chunk of response) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    // Send chunk to client via WebSocket
    websocket.send(content);
  }
}
```

## Function Calling
```typescript
const tools = [
  {
    type: "function",
    function: {
      name: "analyze_relationship_pattern",
      description: "Analyze recurring patterns in relationship conflicts",
      parameters: {
        type: "object",
        properties: {
          pattern_type: {
            type: "string",
            enum: ["communication", "time", "intimacy", "family", "finances"]
          },
          frequency: { type: "number" },
          emotional_intensity: { type: "number" }
        }
      }
    }
  }
];
```

## Authentication & Rate Limits
- API Key: `process.env.OPENAI_API_KEY`
- Rate Limits: 10,000 TPM for GPT-4, 90,000 TPM for GPT-3.5
- Organization ID: `process.env.OPENAI_ORG_ID`

## Cost Optimization Strategies
1. Use GPT-3.5 for quick responses and pattern recognition
2. Reserve GPT-4 for complex relationship counseling
3. Implement intelligent context truncation
4. Cache common responses and patterns
5. Use function calling to reduce token usage