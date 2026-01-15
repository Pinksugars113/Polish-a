# Design Guidelines: Add Polish Page with AI Auto-Fill

## Design Approach
**System-Based: Material Design 3 + Linear Aesthetics**
Combining Material Design's clear feedback patterns with Linear's refined typography and spacing. This blend provides excellent state management for AI processing while maintaining modern sophistication.

## Layout System

**Spacing Primitives:** Tailwind units of 3, 4, 6, 8, 12, 16, 24
**Container:** max-w-4xl centered, px-6 lg:px-8
**Vertical Rhythm:** py-12 for sections, space-y-8 for major groupings

## Typography Hierarchy

**Primary Font:** Inter (Google Fonts) - weights 400, 500, 600
**Headings:** 
- Page title: text-3xl font-semibold tracking-tight
- Section headers: text-lg font-medium
- Labels: text-sm font-medium
- Helper text: text-sm text-gray-600

## Core Components

### Image Upload Zone (Centerpiece)
**Initial State:**
- Large dropzone (min-h-64) with dashed border (border-2 border-dashed)
- Upload icon centered (size-16, using Heroicons cloud-arrow-up)
- Primary text: "Drop your image here or click to browse"
- Secondary text: "Supports JPG, PNG up to 10MB"
- Entire zone is clickable with subtle hover state (bg-gray-50 transition)

**With Image Preview:**
- Full uploaded image displayed with rounded-lg
- Small overlay controls in top-right corner with backdrop-blur-md background
- Replace and Remove buttons with icon-only design
- Image contained within aspect-video or aspect-square

### AI Analysis Feedback (Critical UX)
**Processing State:**
- Animated gradient border around image (use subtle border animation)
- Status card below image with blur backdrop (backdrop-blur-sm bg-white/80)
- Progress indicator: linear progress bar (h-1 rounded-full)
- Status text: "Analyzing image..." with animated dots
- Estimated time remaining: "~15 seconds"

**Success State:**
- Subtle green checkmark animation
- "Analysis complete" message with fade-in
- Smooth transition revealing auto-filled fields

### Auto-Fill Form Fields
**Field Group Layout:**
- Two-column grid on desktop (grid-cols-2 gap-6)
- Single column on mobile
- Each field shows AI-suggested value with distinct styling

**AI-Filled Field Treatment:**
- Light blue background (bg-blue-50) on filled fields
- Small "AI" badge in top-right of field (text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full)
- Fully editable - users can modify any suggestion
- Clear visual distinction from user-entered data

**Field Types:**
- Text inputs for name, brand, dimensions
- Textarea for description (min-h-24)
- Dropdown for category/type
- Number inputs for measurements with unit indicators

### Action Buttons
**Primary CTA:** "Add Polish to Collection"
- Full-width on mobile, auto width on desktop
- Positioned at bottom with sticky behavior (sticky bottom-0 py-6 bg-gradient-to-t from-white)
- Disabled state when no image uploaded

**Secondary Actions:**
- "Clear All" text button (left-aligned)
- "Save Draft" outlined button (if applicable)

## State Management

**Empty State:** Prominent upload zone, clear instructions
**Uploading:** Progress indicator, file size display
**Processing:** Animated border, status card, progress bar
**Complete:** Checkmark, pre-filled form, ready to submit
**Error State:** Red border on upload zone, clear error message with retry option

## Visual Enhancements

**Micro-interactions:**
- Smooth field highlighting on AI-fill (sequential fade-in with 100ms stagger)
- Success checkmark draw animation
- Subtle scale on button hover (scale-105)

**Card Design:**
- Upload zone and form sections in distinct cards with subtle shadow (shadow-sm)
- Rounded corners (rounded-xl)
- Clean separation with border-gray-200

## Images Section

**No Hero Image Required** - This is a functional application page focused on the upload interface.

**Placeholder Image for Empty State:**
- Illustrative icon showing image upload concept
- Use from Heroicons or similar: photo icon with upload arrow
- Displayed within the dropzone as visual guidance

**AI Processing Visual:**
- Optional: Small animated graphic showing "AI scanning" effect
- Can be abstract lines/dots animation overlaying the image during analysis
- Minimal, non-distracting

## Accessibility Notes
- Upload zone keyboard navigable (trigger on Enter/Space)
- Clear focus states on all interactive elements
- Screen reader announcements for AI processing status changes
- Alt text guidance for uploaded images
- Form validation with clear error messaging