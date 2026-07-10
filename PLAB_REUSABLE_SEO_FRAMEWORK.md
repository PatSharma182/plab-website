# PLab Productions Reusable SEO Framework

Use this framework when creating or updating static HTML pages for PLab Productions.

## Metadata Template

Place the page-specific metadata in the `<head>` before CSS files.

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#050505" />
<title>{{ Page Title }} | PLab Productions</title>
<meta name="description" content="{{ Page-specific description, 140-160 characters where possible. }}" />
<meta name="robots" content="{{ index, follow OR noindex, nofollow }}" />
<link rel="canonical" href="https://plabproductions.com/{{ page-slug }}.html" />
<meta property="og:title" content="{{ Page Title }} | PLab Productions" />
<meta property="og:description" content="{{ Page-specific social description. }}" />
<meta property="og:url" content="https://plabproductions.com/{{ page-slug }}.html" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="PLab Productions" />
<meta property="og:image" content="{{ Absolute image URL }}" />
<meta property="og:image:alt" content="{{ Natural description of the social share image }}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{{ Page Title }} | PLab Productions" />
<meta name="twitter:description" content="{{ Page-specific social description. }}" />
<meta name="twitter:image" content="{{ Absolute image URL }}" />
<meta name="twitter:image:alt" content="{{ Natural description of the social share image }}" />
<link rel="icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

Do not add a `keywords` tag unless there is a specific campaign reason. Modern search engines do not need it for ranking.

## Canonical Rules

- Use `https://plabproductions.com/` for the homepage.
- Use `https://plabproductions.com/{{ file-name }}.html` for static HTML pages unless server redirects are added and tested.
- Keep `canonical`, `og:url`, JSON-LD `url`, breadcrumbs, and `sitemap.xml` aligned.
- Use `noindex, nofollow` for private funnel steps, thank-you pages, booking confirmations, and in-progress screens.

## JSON-LD Base Graph

The homepage should carry the site-level `Organization`, `LocalBusiness`, and `WebSite` entities. Other pages can reference these stable IDs:

- `https://plabproductions.com/#organization`
- `https://plabproductions.com/#localbusiness`
- `https://plabproductions.com/#website`

Use this structure for future service pages:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://plabproductions.com/{{ page-slug }}.html#webpage",
      "name": "{{ Page Title }} | PLab Productions",
      "url": "https://plabproductions.com/{{ page-slug }}.html",
      "description": "{{ Page-specific description }}",
      "publisher": {
        "@id": "https://plabproductions.com/#organization"
      },
      "breadcrumb": {
        "@id": "https://plabproductions.com/{{ page-slug }}.html#breadcrumb"
      }
    },
    {
      "@type": "Service",
      "@id": "https://plabproductions.com/{{ page-slug }}.html#service",
      "name": "{{ Service Name }}",
      "serviceType": "{{ Service Type }}",
      "url": "https://plabproductions.com/{{ page-slug }}.html",
      "description": "{{ Service description }}",
      "provider": {
        "@id": "https://plabproductions.com/#localbusiness"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Brisbane"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Queensland"
        },
        {
          "@type": "Country",
          "name": "Australia"
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://plabproductions.com/{{ page-slug }}.html#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://plabproductions.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{ Page Name }}",
          "item": "https://plabproductions.com/{{ page-slug }}.html"
        }
      ]
    }
  ]
}
```

## VideoObject Template

Use `VideoObject` only for meaningful visible video content, not purely decorative looping background footage.

```json
{
  "@type": "VideoObject",
  "@id": "https://plabproductions.com/{{ page-slug }}.html#video-{{ video-slug }}",
  "name": "{{ Video Name }}",
  "description": "{{ Video description }}",
  "thumbnailUrl": "{{ Absolute thumbnail URL }}",
  "uploadDate": "YYYY-MM-DD",
  "embedUrl": "https://www.youtube.com/embed/{{ youtube-id }}",
  "contentUrl": "{{ Direct MP4/MOV URL, only for hosted video files }}",
  "publisher": {
    "@type": "Organization",
    "name": "PLab Productions",
    "url": "https://plabproductions.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/6912e94e10d69348d8e29d8e.png",
      "width": 512,
      "height": 512
    }
  },
  "duration": "PT1M30S",
  "potentialAction": {
    "@type": "WatchAction",
    "target": "{{ Watch URL }}"
  }
}
```

For YouTube videos, use `embedUrl`. For hosted video files, use `contentUrl`. Add `duration` only when it is known. Current upload dates use the closest known sitemap publication date when exact upload dates are unavailable.

## FAQPage Rules

Use `FAQPage` only when the questions and answers are visible on the page. Keep answers consistent with on-page copy.

## Review Rules

Use `Review` only when the page contains a visible, attributable review with the reviewed business or service clearly identified. Do not mark general testimonials as reviews unless the content meets Google rich result guidelines.

## Future Service Page Checklist

- One visible `<h1>`.
- Logical `h2` sections and `h3` cards/questions below them.
- Page-specific title, description, canonical, Open Graph, and Twitter metadata.
- `WebPage`, `Service`, `BreadcrumbList`, and visible `FAQPage` JSON-LD where appropriate.
- Complete `VideoObject` entries for meaningful visible videos.
- Descriptive image alt text for business, client, or video context.
- Contextual links to relevant service pages, Portfolio, Strategy Call, Quote, and Free Marketing Audit.
- Update `sitemap.xml` with the final canonical URL and `lastmod`.
