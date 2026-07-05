# PageSpeed Insights Bug Resolution Plan

Based on the new PageSpeed Insights reports and Next.js best practices, here is the updated plan to achieve a 100% Accessibility score and fix the critical Mobile Performance issues (specifically the enormous network payloads).

## User Review Required

> [!WARNING]
> **Video on Mobile:** To eliminate the 16MB network payload on mobile, I will disable the background video in `HeroSection` for mobile devices entirely (screens < 768px). Mobile users will see the cinematic glowing background instead. This is a Next.js best practice to save data and drastically improve mobile LCP and TTI. Please confirm you are okay with this!

> [!IMPORTANT]
> **Google Analytics:** You currently have both `@next/third-parties/google` and a custom `useGoogleAnalytics` hook. The official Next.js component automatically tracks pageviews, making your custom hook redundant. I will remove the custom hook to clean up unused JavaScript.

## Proposed Changes

### `src/components/HeroSection.tsx`

#### [MODIFY] HeroSection.tsx
- **Fix Network Payload (Performance)**: The video downloads multiple times and consumes 16MB of payload on mobile. I will use a `matchMedia` hook to **conditionally render the `<video>` only on desktop** (`min-width: 768px`). On mobile, it will render the existing cinematic radial wash (CSS only), which eliminates the network payload completely.
- **Fix Missing Captions (Accessibility)**: Add `aria-hidden="true"` to the `<video>` element to prevent screen readers from complaining about missing captions for a decorative video.

### `src/components/Footer.tsx`

#### [MODIFY] Footer.tsx
- **Fix Color Contrast (Accessibility)**: The giant "ZEBOTIX" watermark text (`text-zinc-900` on `bg-zinc-950`) has low contrast. I will add `aria-hidden="true"` to hide it from accessibility scanners since it is purely a decorative design element.

### `src/components/ProductsCarousel.tsx` & `src/app/solutions/page.tsx`

#### [MODIFY] ProductsCarousel.tsx
#### [MODIFY] page.tsx (Solutions)
- **Fix Identical Links (Accessibility)**: Multiple links say "Explore Solution". I will add dynamic `aria-label` attributes (e.g., `aria-label="Explore Custom Software Engineering Solution"`) to these links so they are unique for assistive technologies while keeping the visual text unchanged.

### `src/app/layout.tsx` & `src/hooks/useGoogleAnalytics.ts` & `src/components/GoogleAnalytics.tsx`

#### [MODIFY] layout.tsx
#### [DELETE] useGoogleAnalytics.ts
#### [DELETE] GoogleAnalytics.tsx
- **Reduce Unused JavaScript (Performance)**: Remove the redundant custom `GoogleAnalyticsTracker` and its hook. The official `<GoogleAnalytics gaId="..." />` from `@next/third-parties/google` is already present in `layout.tsx` and automatically handles route changes and pageviews according to Next.js best practices.

### `src/app/globals.css`

#### [MODIFY] globals.css
- **Avoid non-composited animations (Performance)**: Add a CSS rule to unset `scrollbar-color` on Radix accordion elements. The global `scrollbar-color` inherits down and prevents the browser from using composited animations when the accordion expands/collapses.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure no TypeScript or build errors are introduced.

### Manual Verification
- Verify the background video plays on desktop but is omitted on mobile devices.
- Verify `GoogleAnalytics` script is still injected correctly by Next.js.
- Ensure the build is clean and ready for deployment.
