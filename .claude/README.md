# Claude Context Directory

This directory contains reusable prompts, context primers, and configuration files specifically designed for Claude Code and other AI coding assistants working on the Ki platform.

## Directory Structure

- `context-primers/` - Scripts to quickly establish project context
- `prompts/` - Reusable prompt templates for common tasks
- `commands/` - Saved command sequences for complex operations
- `configs/` - AI assistant configuration files

## Context Priming

Context priming is the most critical component for effective AI coding assistance. These primers instantly load project understanding without overwhelming the AI with unnecessary files.

### Usage
```bash
# Load full project context
claude --prime-context .claude/context-primers/full-project.md

# Load feature-specific context
claude --prime-context .claude/context-primers/voice-interface.md
```

## Prompt Templates

Reusable prompts for common development tasks:
- Feature implementation
- Bug fixing
- Code review
- Testing
- Documentation

## Best Practices

1. **Selective Context**: Only include relevant files and information
2. **Clear Instructions**: Provide specific, actionable requirements
3. **Pattern Consistency**: Follow established coding patterns
4. **Quality Standards**: Include testing and documentation requirements

## Maintenance

- Update context primers when architecture changes
- Add new prompts for recurring development patterns
- Keep prompts specific to Ki platform requirements
- Document successful prompt patterns for reuse