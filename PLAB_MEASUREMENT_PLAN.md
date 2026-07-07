# PLab Productions Measurement Plan

## 1. Measurement Architecture

Google Tag Manager is installed site-wide and should be the main routing layer for Google Analytics 4 tracking.

GA4 is configured through GTM. Website interactions should push clean `dataLayer` events, and GTM should listen for those events and send them to GA4.

Meta Pixel remains on-page for browser events. Meta Conversion API is handled through GoHighLevel workflows for server-side events.

Avoid duplicate tracking across GTM, Meta Pixel and GHL CAPI. If a browser event and server event track the same conversion, use event deduplication where possible or clearly decide which system owns that conversion.

## 2. Naming Convention

Use lowercase snake_case event names.

Examples:

- `audit_started`
- `quote_submitted`
- `strategy_call_clicked`
- `portfolio_video_play`

Rules:

- Marketing Audit events should start with `audit_`
- Quote funnel events should start with `quote_`
- Strategy call events should start with `strategy_`
- Portfolio events should start with `portfolio_`
- Service page events should start with `service_`
- Contact events should start with `contact_`

## 3. Marketing Audit Funnel Events

`audit_landing_view`

Triggered when `marketing-audit-start.html` loads.

`audit_started`

Triggered when someone clicks Start My Free Audit or Get My Free Marketing Audit.

`audit_submitted`

Triggered when `audit-in-progress.html` loads after survey submission.

`audit_completed`

Triggered when `marketing-audit-complete.html` loads.

`audit_review_view`

Triggered when `marketing-audit-review.html` loads.

`audit_call_booked`

Triggered when `marketing-audit-booking-confirmed.html` loads.

## 4. Quote Funnel Events

Planned events:

`quote_page_view`

Triggered when `quote.html` loads.

`quote_form_started`

Triggered when a visitor interacts with the GHL quote form, if technically possible.

`quote_submitted`

Triggered when `quote-thank-you.html` loads after quote form submission.

## 5. Strategy Call Events

Planned events:

`strategy_page_view`

Triggered when `strategy-call.html` loads.

`strategy_calendar_view`

Triggered when the calendar section or embedded calendar is viewed.

`strategy_call_clicked`

Triggered when someone clicks a Strategy Call CTA.

`strategy_call_booked`

Triggered when a future booking confirmation page loads or via GHL CAPI.

## 6. Homepage Events

Planned events:

`home_view`

Homepage loaded.

`home_build_momentum_clicked`

Build My Momentum CTA clicked.

`home_oneoff_project_clicked`

Start A One-Off Project CTA clicked.

`home_service_card_clicked`

A service/offer card CTA clicked.

`home_portfolio_clicked`

Portfolio CTA clicked.

`home_footer_contact_clicked`

Footer phone or email clicked.

## 7. Service Page Events

Service pages:

- `brand-story.html`
- `social-media-content.html`
- `testimonial-videos.html`

Planned events:

- `service_page_view`
- `service_primary_cta_clicked`
- `service_secondary_cta_clicked`
- `service_faq_opened`
- `service_video_clicked`
- `service_examples_viewed`

Recommended parameters:

- `service_name`
- `cta_text`
- `section_name`
- `video_title`
- `faq_question`

## 8. Portfolio Events

Planned events:

- `portfolio_page_view`
- `portfolio_video_open`
- `portfolio_video_play`
- `portfolio_video_25`
- `portfolio_video_50`
- `portfolio_video_75`
- `portfolio_video_complete`

Recommended parameters:

- `video_title`
- `video_category`
- `video_url`
- `page_path`

## 9. Contact Events

Planned events:

- `contact_phone_clicked`
- `contact_email_clicked`
- `contact_map_clicked`
- `footer_privacy_clicked`
- `footer_terms_clicked`

## 10. Recommended GA4 Key Events

Mark these as important conversions/key events in GA4 later:

- `audit_submitted`
- `audit_completed`
- `audit_call_booked`
- `quote_submitted`
- `strategy_call_booked`
- `contact_phone_clicked`
- `contact_email_clicked`

## 11. GTM Setup Notes

Current GTM setup:

Container:

`GTM-NKV4FMCR`

GA4 Measurement ID:

`G-XZ4L67E20B`

Current scalable audit setup:

- One custom trigger using regex for `audit_` events.
- One reusable GA4 Event tag using `{{Event}}` as the event name.
- This means future `audit_` events automatically send to GA4.

## 12. Implementation Pattern

Use this pattern for GA4/GTM events:

```js
window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  event: 'event_name_here',
  section_name: 'example_section',
  cta_text: 'example_cta'
});
```

## 13. Future Tools

Future tracking tools:

- Microsoft Clarity for heatmaps/session recordings.
- Google Ads conversion tracking.
- LinkedIn Insight Tag.
- Meta CAPI deduplication if browser and server events overlap.

## 14. Notes For Future Codex Tasks

Always check `PLAB_MEASUREMENT_PLAN.md` before adding tracking.

Do not invent new event names if an approved event already exists.

Use `dataLayer.push()` for GA4/GTM events.

Preserve existing Meta Pixel and GHL CAPI setup.

Avoid duplicate events.
