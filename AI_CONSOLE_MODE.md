# AI Console Mode

## Overview
AI Console Mode is a global feature toggle that highlights AI-powered areas of the Interact platform. When enabled, it provides visual feedback to users showing which parts of the interface leverage AI capabilities.

## Usage

### 1. The Toggle
The AI Console Mode toggle is located in the top-right header, next to other utility controls. It's a pill-shaped button that shows:
- **OFF**: Gray with a subtle dot indicator
- **ON**: Blue with a bright dot and blue background

### 2. Wrapping AI-Enhanced Components

To highlight any component when AI Console Mode is active, wrap it with `AiHighlight`:

```tsx
import { AiHighlight } from "@/components/AiHighlight";

export const MyAiComponent = () => {
  return (
    <AiHighlight showBadge>
      <Card>
        {/* Your AI-powered content */}
      </Card>
    </AiHighlight>
  );
};
```

**Props:**
- `showBadge` (optional): Shows a small "AI" badge in the top-right corner when mode is ON
- `className` (optional): Additional classes to apply to the wrapper

### 3. Using the Context Directly

If you need custom logic based on AI Console Mode state:

```tsx
import { useAiConsoleMode } from "@/context/AiConsoleModeContext";

export const MyComponent = () => {
  const { isAiConsoleMode, toggleAiConsoleMode } = useAiConsoleMode();

  return (
    <div className={isAiConsoleMode ? 'special-ai-styling' : ''}>
      {/* Your content */}
    </div>
  );
};
```

## Visual Effects

When AI Console Mode is **ON**, highlighted components get:
- Subtle blue ring with offset
- Soft shadow with blue tint
- Optional "AI" badge
- Enhanced glow on the AI Navigation Orb

When **OFF**, all components appear exactly as they did before - no visual changes.

## Examples of AI-Enhanced Features

Current components using AI highlighting:
- **AI Navigation Orb**: Enhanced ring and brighter glow
- **My Open Campaigns**: Shows AI badge (potential for AI-powered insights)
- Any future Harmonizer or AI analysis panels

## Adding to New Components

To add AI Console Mode support to a new component:

1. Import `AiHighlight`
2. Wrap your component
3. Optionally add the `showBadge` prop

```tsx
import { AiHighlight } from "@/components/AiHighlight";

export const HarmonizerPanel = () => {
  return (
    <AiHighlight showBadge className="rounded-lg">
      <div className="p-6">
        {/* Harmonizer content */}
      </div>
    </AiHighlight>
  );
};
```

That's it! The component will automatically respond to AI Console Mode state.
