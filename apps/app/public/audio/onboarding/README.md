# Ki Onboarding Audio Files

This directory contains audio files for the Ki onboarding experience. The audio enhances the conversational flow and creates an intimate, welcoming atmosphere.

## Directory Structure

```
public/audio/onboarding/
├── README.md                    # This file
├── welcome/                     # Welcome and introduction sounds
│   ├── ki-greeting.mp3         # "I'm Ki. What's your name?"
│   ├── name-response.mp3       # Response after user provides name
│   └── welcome-response.mp3    # Welcome message personalization
├── steps/                       # Audio for each onboarding step
│   ├── step-1-name.mp3         # Step 1: Name collection
│   ├── step-2-age.mp3          # Step 2: Age collection  
│   ├── step-3-location.mp3     # Step 3: Location collection
│   ├── step-4-relationship.mp3 # Step 4: Relationship status
│   ├── step-5-duration.mp3     # Step 5: Relationship length
│   ├── step-6-goals.mp3        # Step 6: Relationship goals
│   ├── step-7-partner.mp3      # Step 7: Partner invitation
│   ├── step-8-completion.mp3   # Step 8: Completion message
│   └── step-9-final.mp3        # Step 9: Final transition
└── transitions/                 # Transition and feedback sounds
    ├── thinking.mp3            # Brief pause/thinking sound
    ├── positive-feedback.mp3   # Positive response sound
    ├── gentle-prompt.mp3       # Gentle encouragement
    └── completion-chime.mp3    # Success/completion sound
```

## Audio Guidelines

### File Format Requirements
- **Format**: MP3 (preferred) or WAV
- **Quality**: 44.1kHz, 128kbps minimum
- **Duration**: Keep individual clips under 10 seconds for responsiveness
- **Volume**: Normalized to prevent jarring transitions

### Voice Characteristics
- **Tone**: Warm, conversational, empathetic
- **Pace**: Calm and unhurried 
- **Style**: Natural, not robotic or overly formal
- **Gender**: Consider neutral or multiple voice options

### Usage in Components

Audio files are referenced in the onboarding component using the public path:

```typescript
// Example usage in Ki Onboarding component
const playAudio = (audioFile: string) => {
  const audio = new Audio(`/audio/onboarding/${audioFile}`);
  audio.play();
};

// Play welcome greeting
playAudio('welcome/ki-greeting.mp3');

// Play step-specific audio
playAudio('steps/step-1-name.mp3');

// Play transition sounds
playAudio('transitions/thinking.mp3');
```

### Naming Convention
- Use kebab-case for filenames
- Include step number or category prefix
- Be descriptive about the content
- Use consistent file extensions

### Audio Content Mapping

#### Welcome Sequence
1. **ki-greeting.mp3**: "I'm Ki. What's your name?"
2. **name-response.mp3**: "Nice to meet you, [Name]!"
3. **welcome-response.mp3**: "I'm here to help you and your partner connect more deeply."

#### Step-by-Step Audio
1. **step-1-name.mp3**: Initial name collection prompt
2. **step-2-age.mp3**: Age collection with context
3. **step-3-location.mp3**: Location for personalization
4. **step-4-relationship.mp3**: Relationship status inquiry
5. **step-5-duration.mp3**: How long you've been together
6. **step-6-goals.mp3**: What you hope to achieve
7. **step-7-partner.mp3**: Inviting your partner to join
8. **step-8-completion.mp3**: Wrapping up onboarding
9. **step-9-final.mp3**: Transition to main experience

#### Transition Sounds
- **thinking.mp3**: Brief pause while "processing"
- **positive-feedback.mp3**: Encouraging response
- **gentle-prompt.mp3**: Subtle encouragement to continue
- **completion-chime.mp3**: Success notification

## Implementation Notes

### Accessibility
- Provide captions or text alternatives
- Allow users to skip or replay audio
- Respect user audio preferences

### Performance
- Preload critical audio files
- Use appropriate compression
- Implement graceful fallbacks for audio failures

### User Experience
- Audio should enhance, not replace text
- Provide visual indicators when audio is playing
- Allow users to control playback speed/volume

## Adding New Audio Files

1. Place files in the appropriate subdirectory
2. Follow the naming convention
3. Update this README if adding new categories
4. Test audio playback in the onboarding component
5. Ensure files are optimized for web delivery

## Testing Audio Integration

```bash
# Navigate to Ki platform
cd submodules/product/ki-platform

# Start development server to test audio
pnpm dev

# Visit onboarding page
# http://localhost:3001/onboarding
```