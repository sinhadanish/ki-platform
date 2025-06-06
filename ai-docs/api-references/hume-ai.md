# Hume AI API Reference

## Overview
Hume AI provides emotional intelligence capabilities for Ki's voice processing and emotion detection features.

## Key Endpoints

### Voice Emotion Analysis
```typescript
// Hume Octave API for voice emotion detection
const humeClient = new HumeClient({
  apiKey: process.env.HUME_API_KEY,
});

// Stream voice emotion analysis
const voiceEmotion = await humeClient.empathicVoice.stream({
  audio: audioBuffer,
  model: 'octave',
  outputFormat: 'json'
});
```

### Text Emotion Analysis
```typescript
// Text-based emotion analysis
const textEmotion = await humeClient.expression.text({
  text: userMessage,
  models: ['emotion', 'personality']
});
```

## Authentication
- API Key required: `process.env.HUME_API_KEY`
- Rate limits: 1000 requests/minute
- WebSocket support for real-time streaming

## Response Format
```typescript
interface EmotionResponse {
  emotions: {
    name: string;
    score: number; // 0-1 confidence
  }[];
  prosody?: {
    pitch: number;
    rhythm: number;
    volume: number;
  };
}
```

## Integration Notes
- Use for real-time voice emotion detection during conflicts
- Combine with text sentiment for comprehensive emotional analysis
- Implement WebSocket for low-latency emotion streaming
- Cache results to optimize API usage costs

## Cost Optimization
- Batch short audio segments
- Use text analysis for initial screening
- Implement intelligent sampling during conversations