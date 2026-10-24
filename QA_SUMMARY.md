# QA summary — All 16 resources enabled

## Passed (local test)

- 16 unique resource IDs, 16 unique HTTPS destination strings; all 16 entries have `published:true`.
- All supplied link strings are byte-for-byte unchanged from the prior reviewed ZIP (including Pictory `https://pictory.ai?ref=shannon45` and affiliate tracking/timestamp parameters).
- `previewMode:false`; no preview banner, test-link labels, or "Not yet featured" badges in the public-style rendering.
- Page initially displays **all 16 resource cards**. The four category filters each show four cards; choosing **Create content** displays Content That Attracts with its affiliate disclosure.
- Search finds Pictory (one result), an impossible search shows the helpful empty state, and reset displays 16 cards.
- Six affiliate disclosures render before resource links. Affiliate attributes in `app.js` remain `noopener noreferrer sponsored nofollow`.
- Checked at 320, 390, 768, and 1440 pixel viewport widths. No horizontal overflow; no JavaScript page errors during these local browser tests.
- Pictory link attribute remains exactly `https://pictory.ai?ref=shannon45`.
- Workspace, logo and about image assets are preserved; about portrait loaded when scrolled into view.
- JavaScript syntax checks passed (`node --check`).
- `index.html` retains pre-launch `noindex,nofollow` robots meta tag. No deployment performed.

## Still a manual check before launch

- **Not independently verified:** all 16 external destinations should be opened and their current offer terms checked. The user's Pictory referral code attribution was previously confirmed by the user; the other affiliate attribution dashboards were not independently verified here.
- Confirm that free/paid labels match the currently available products and plans.
- Verify real-device accessibility, keyboard use and VoiceOver/screen reader behavior.
- Once the final Netlify URL exists, add the canonical URL and absolute HTTPS social-sharing image URLs.
- Remove `noindex,nofollow` only once a public indexed launch is approved and all checks are complete.

## Intentional decisions

- All resources can be browsed right away, regardless of whether their related Alicia Builds Online video has premiered.
- The featured starting resource remains Faceless Path Matchmaker.
- The initial filter is now **All 16 resources**, so Content That Attracts and every other resource are visible immediately. Visitors can still narrow by category.
- Related YouTube watch URLs remain empty rather than guessed.
- No weekly `published` flag updates are needed.

## Content That Attracts visibility fix — checked
- The card already existed in the data and the URL was not missing.
- Verified live execution of the self-contained browser preview: **16** cards on initial load; **Content That Attracts** present once, in Create content; Skool URL and affiliate disclosure and `rel="noopener noreferrer sponsored nofollow"` verified.
- Create content: 4 cards; Find my direction: 4 cards; searching `Content That Attracts` returns one match even after changing categories.
- No browser JavaScript errors in this preview test.
- Tested viewport widths 320, 390, 768, 1440 pixels: no horizontal scrolling overflow.
- JavaScript syntax checks passed. No links, prices, or images changed.
- This is a local preview test, not a verification of external destination availability or affiliate dashboard tracking.
