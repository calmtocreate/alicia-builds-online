# Content That Attracts — visibility correction

The link was not missing from the data. It has already been included as resource `content-that-attracts` in the `content` category, with `published:true`, affiliate disclosure and original URL:
`https://www.skool.com/cta/about?ref=2a33380564d348469a92c6cba8f052c1`

## Why it appeared missing
The page initialized with `defaultCategory: "direction"` which meant only four direction resources showed when the resource shelf loaded. Content That Attracts required clicking **Create content**, **View all**, or searching for its title.

## Fix
Changed default category to `all` so the 16 resources load by default and changed the filter label to `All 16 resources`. Visitors can still narrow by the four category buttons. No URLs or affiliate flags changed.

## Test instructions
1. Load the website. Verify `All 16 resources` is selected and the shelf shows 16 cards.
2. Scroll/search the shelf for `Content That Attracts`. Verify the card, its disclosure, and original Skool referral link are visible.
3. Select `Create content`. Verify 4 cards: quiz, Pictory, Content That Attracts, AI Video Bootcamp.
4. Select `Find my direction`; verify 4 cards. Return to `All 16 resources`.
5. Confirm `noindex,nofollow` remains until actual launch and the OG image URL needs the final absolute domain.
