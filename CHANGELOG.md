# Change log — All-resources edition

Starting point: `alicia_builds_online_resource_hub_week2_featured.zip` from the most recent reviewed website version.

## Changed
- `resources.js`: set the 14 formerly withheld resource entries to `published:true`; all 16 are enabled.
- `resources.js`: set `previewMode:false` to use the clean public-style presentation (no preview banner).
- `resources.js`: updated configuration comments; kept featured resource and default category unchanged.
- `index.html`: revised dormant preview notice wording and no-search-results text so they no longer promise weekly activations.
- Refreshed README, link manifest and QA documentation; removed obsolete release-by-week QA instructions.

## Unchanged
- All 16 resource URLs, IDs, descriptions, categories, offer type labels, and affiliate flags.
- `app.js` including exact Pictory URL handling and accessible link labels.
- `styles.css`, `netlify.toml`, and every avatar/brand image.
- Hero, portrait and social image alt text mentioning Alicia as an illustrated avatar.
- Default category remains `direction`: gentle first impression; use All resources to show every card.
- All `videoUrl` entries remain blank: no published YouTube URLs were supplied.
- The temporary `noindex,nofollow` meta tag is still present pending launch approval.

No hosting or deployment was performed.

## Resource visibility correction (Content That Attracts)
- Content That Attracts was **already present** in `resources.js`, with `published:true`, the owner's original Skool referral URL, and affiliate disclosure. It was not visible on initial load because the previous default filter was `direction`.
- Set `SITE_CONFIG.defaultCategory` to `all`; the resource shelf now shows **all 16** entries on initial load.
- Updated the static initial pressed state of the filters and labeled the inclusive filter `All 16 resources`.
- Updated the resource-shelf introductory text and documentation.
- No resource card was added, removed, duplicated, repriced, or relinked; no original art, affiliate attribute, or deployment setting was changed.
