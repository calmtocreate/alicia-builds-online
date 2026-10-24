# Alicia Builds Online — Start Here (all 16 resources featured)

A lightweight, static, mobile-first resource directory. No framework, build command, email collection, or tracking scripts.

## Important status
- **Every one of the 16 resources is enabled** (`published:true`).
- **Preview mode is OFF** (`previewMode:false`): the visitor sees a regular resource page, with no preview banner.
- The starting shelf defaults to **All 16 resources**, so none is hidden behind an initial category filter. The four pathway buttons and resource filters help visitors narrow the list. Search looks across all categories.
- No resource URL or referral parameter has been rewritten.
- **The page is NOT indexed yet:** `index.html` still contains `<meta name="robots" content="noindex,nofollow">` until the owner approves a public launch. Setting `previewMode:false` does not publish the site.
- No public video URLs were supplied: `videoUrl` fields are intentionally blank.
- Six affiliate resources have per-card disclosures; affiliate links open in new tabs with `sponsored nofollow` attributes.
- Avatar image alt text calls Alicia an **illustrated avatar**, as requested.

## Files
- `index.html`: page layout, metadata, image alt text.
- `styles.css`: responsive styling and Calm to Create brand colors.
- `resources.js`: link catalog and settings; all 16 already enabled.
- `app.js`: search, category filtering, safe external links, accessibility behavior.
- `assets/`: four supplied visuals optimized for the website + icon files.
- `netlify.toml`: static publish root and basic security headers.
- `CLAUDE_ALL_RESOURCES_QA_PROMPT.txt`: QA instructions.
- `LINKS_AND_QA.md`: link manifest for review.
- `QA_SUMMARY.md`: checks and remaining manual tasks.
- `CHANGELOG.md`: changes to the prior Week 2 featured package.

## Preview locally
Extract the ZIP. Open `index.html` in a browser or start a static web server in that directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. The page is configured as a public-style view, so there is no warning banner. No resources are hidden, but **only the four Direction resources appear in the shelf initially**. Click **All resources** to see all 16.

## When you're ready to go live
1. Manually open all 16 destinations and verify pricing/free-versus-paid claims, availability, brand ownership, and each relevant affiliate dashboard attribution.
2. Confirm that the Pictory code `shannon45` and all other affiliate destinations are correct. Alicia previously confirmed the Pictory code and its dashboard attribution.
3. Verify the page on a real mobile device, keyboard, and with VoiceOver or another screen reader.
4. Publish the files in a GitHub repository and connect the repository to Netlify. The static site has **no build command**; its publish directory is the repository root.
5. Once the final site URL is known, add a canonical URL and replace relative `og:image` and `twitter:image` metadata with the *absolute HTTPS URL* of the social image in `index.html`.
6. Once everything is ready for public search, **remove** the temporary `noindex,nofollow` meta tag and review indexing preferences. Keep it during private staging.
7. Add the public address to the YouTube profile as **Start Here | Tools & Resources**.

**Nothing has been deployed or made public as part of this package.**

## Easy maintenance (optional, not weekly)
All 16 resources are already on. You only need to edit `resources.js` if you want to change an offer, its URL, description, or add a related YouTube video. No release-calendar maintenance is required.

Use HTTPS destinations only. Keep explicit commission disclosures close to affiliate links. Never substitute a direct vendor URL for a referral URL unless the owner instructs you to.
