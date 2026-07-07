# PLab Productions Performance Notes

## Phase 7 Safe Changes

- Added `defer` to local non-critical JavaScript includes:
  - `assets/js/main.js`
  - `assets/js/momentum-framework.js`
- Left GTM, Meta Pixel and GoHighLevel scripts unchanged to preserve tracking, forms, surveys and calendars.
- Confirmed Google Fonts already uses `display=swap` in the Google Fonts URL.
- Confirmed below-the-fold images were already addressed in Phase 3A with `loading="lazy"` and `decoding="async"` where safe.
- Confirmed hero videos and above-the-fold visual assets were not lazy loaded.

## Review After Live Testing

### Large Video Assets

The site uses several hosted MP4/MOV background, hero and preview videos. These should be reviewed after deployment with Lighthouse, Chrome DevTools Network and real mobile testing.

Items to check:

- File size and transfer size for homepage hero video.
- File size and transfer size for service page hero videos.
- Whether below-the-fold looping videos should use `preload="metadata"` or deferred source loading in a future optimisation phase.
- Whether CDN caching headers are strong enough for repeat visits.

### YouTube Embeds

Most YouTube videos are represented as thumbnail cards or modal-loaded players, which is good for initial load. Continue checking:

- Whether any iframe is created before user intent.
- Whether thumbnail image sizes are appropriate.
- Whether modal YouTube embeds affect interaction latency on slower devices.

### GoHighLevel Embeds

GHL forms, surveys and calendars are conversion-critical and were intentionally not deferred or lazy-loaded.

Review after launch:

- Load time impact of quote form embed.
- Load time impact of strategy call calendar embed.
- Load time impact of marketing audit survey and review calendar embeds.
- Whether GHL embed scripts can be loaded after interaction on non-critical pages without hurting conversion.

### Google Fonts

Current setup:

- Preconnects are present for `fonts.googleapis.com` and `fonts.gstatic.com`.
- Google Fonts URL includes `display=swap`.
- Fonts remain Anton and Manrope.

Future checks:

- Confirm font loading does not cause visible layout shift.
- Consider self-hosting fonts only if Lighthouse and field data show Google Fonts as a meaningful bottleneck.

### Animation-Heavy Sections

The site uses premium animation-heavy sections including:

- Homepage hero and Momentum Framework.
- Homepage Services marketing engine.
- Testimonial marquee.
- Brand Story stacked use-case cards.
- Social Media phone mockup, content library and examples.
- Marketing Audit dashboard and progress animations.

Review after launch:

- Interaction to Next Paint (INP).
- Main-thread work on mobile.
- Battery/CPU impact from continuous animations.
- Whether additional `prefers-reduced-motion` coverage is needed.

### CSS And JavaScript

Future opportunities:

- Audit unused CSS after the site structure is final.
- Consider splitting page-specific CSS only if the single stylesheet becomes a measured bottleneck.
- Avoid minification until launch build/deployment process is clear.
- Keep tracking scripts stable while GA4/GTM/Meta/GHL conversion testing is in progress.

## Lighthouse And Core Web Vitals Checklist

Run after deployment on production URLs:

- Lighthouse mobile and desktop for every primary page.
- PageSpeed Insights for field and lab data.
- Chrome DevTools Network waterfall on mobile throttling.
- Check Largest Contentful Paint (LCP) on pages with hero video.
- Check Cumulative Layout Shift (CLS) on pages with embeds and video previews.
- Check Interaction to Next Paint (INP) on pages with modals, carousels and animated sections.

Primary pages to test:

- Homepage
- Brand Story Videos
- Social Media Content
- Testimonial Videos
- Portfolio
- Quote
- Strategy Call
- Marketing Audit Start

## Intentional Non-Changes

- Did not defer GTM or Meta Pixel.
- Did not defer GHL embed scripts.
- Did not change image URLs or video URLs.
- Did not compress, replace or remove assets.
- Did not remove animations.
- Did not minify CSS or JS.
- Did not change tracking, schema, forms, embeds, navigation, copy or visual styling.
