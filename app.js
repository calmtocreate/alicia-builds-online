/* Minimal accessible resource shelf; no dependencies, trackers, forms, or data collection. */
(() => {
  "use strict";
  const config = window.SITE_CONFIG || { previewMode: true };
  const items = Array.isArray(window.RESOURCE_ITEMS) ? window.RESOURCE_ITEMS : [];
  const categories = {
    direction: "Find my direction",
    content: "Create content",
    selling: "Create & sell",
    systems: "Work with clarity",
    all: "All resources"
  };
  const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
  const filterButtons = Array.from(document.querySelectorAll(".filter"));
  const grid = document.getElementById("resourceGrid");
  const searchInput = document.getElementById("search");
  const statusLabel = document.getElementById("resultsLabel");
  const emptyState = document.getElementById("emptyState");
  const resourcesHeading = document.getElementById("resources-heading");
  const featured = items.find(item => item.id === config.featuredResourceId);

  const validLink = value => {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const supplied = value.trim();
      const url = new URL(supplied);
      // Return the URL exactly as supplied so referral codes are never rewritten.
      return url.protocol === "https:" ? supplied : null;
    } catch { return null; }
  };
  // "published" controls the PUBLIC directory, not whether a private preview may test its URL.
  const ready = item => item.published === true && Boolean(validLink(item.resourceUrl));
  const previewLink = item => config.previewMode && Boolean(validLink(item.resourceUrl));
  const publicItems = config.previewMode ? items : items.filter(ready);

  /* Friendly warnings for whoever edits resources.js. Open the browser console (Developer Tools) to see them. */
  (function checkResources() {
    const seen = new Set();
    items.forEach((item, i) => {
      const name = item.id || `item #${i + 1}`;
      if (!item.id) console.warn(`[resources.js] ${name} has no id.`);
      else if (seen.has(item.id)) console.warn(`[resources.js] Duplicate id "${item.id}". Each id must be unique.`);
      seen.add(item.id);
      if (!has(categories, item.category) || item.category === "all")
        console.warn(`[resources.js] "${name}" has an unknown category "${item.category}". Use direction, content, selling, or systems.`);
      if (item.published === true && !validLink(item.resourceUrl))
        console.warn(`[resources.js] "${name}" is published but its resourceUrl is not a valid https:// link, so it stays hidden on the live site.`);
      if (item.videoUrl && !validLink(item.videoUrl))
        console.warn(`[resources.js] "${name}" has a videoUrl that is not a valid https:// link, so it is not shown.`);
    });
  })();

  function el(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  /* Visible text keeps its arrow; the accessible name says what opens, without reading the arrow aloud. */
  function safeExternal(url, text, cssClass, spokenName, isAffiliate = false) {
    const link = el("a", cssClass, text);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer" + (isAffiliate ? " sponsored nofollow" : "");
    link.setAttribute("aria-label", spokenName + (isAffiliate ? ", affiliate link" : "") + " (opens in a new tab)");
    return link;
  }
  function comingSoon() {
    return el("span", "preview-button", "Link not supplied yet");
  }

  function renderFeatured() {
    const parent = document.querySelector(".featured-wrap");
    if (!featured || (!config.previewMode && !ready(featured))) {
      parent.hidden = true;
      return;
    }
    document.getElementById("featuredTitle").textContent = featured.title;
    document.getElementById("featuredDesc").textContent = featured.description;
    document.getElementById("featuredType").textContent = featured.type;
    const action = document.getElementById("featuredAction");
    action.replaceChildren();
    if (ready(featured) || previewLink(featured)) {
      action.appendChild(safeExternal(validLink(featured.resourceUrl),
        `${!ready(featured) ? "Test link: " : ""}Explore ${featured.title} ↗`,
        "btn btn-dark", `${!ready(featured) ? "Test link: " : ""}Explore ${featured.title}`, featured.isAffiliate));
    } else {
      action.appendChild(comingSoon());
    }
    const videoUrl = validLink(featured.videoUrl);
    const videoWrap = document.getElementById("featuredVideo");
    videoWrap.replaceChildren();
    if (videoUrl) videoWrap.appendChild(safeExternal(videoUrl, "Watch the related Alicia Builds Online video ↗", "secondary-link", `Watch the video about ${featured.title}`));
  }

  function card(item, number) {
    const article = el("article", "resource-card");
    const top = el("div", "resource-card-top");
    const badgeClass = item.isAffiliate ? "affiliate" : /paid/i.test(item.type) ? "paid" : "";
    top.append(el("span", "resource-badge " + badgeClass, item.type));
    const serial = el("span", "card-serial", String(number).padStart(2, "0"));
    serial.setAttribute("aria-hidden", "true");
    top.append(serial);
    article.appendChild(top);
    if (config.previewMode && !item.published) {
      article.append(el("span", "draft-status", "Not yet featured on the channel"));
    }
    article.append(el("h3", "", item.title));
    article.append(el("p", "resource-desc", item.description));
    const why = el("div", "resource-why");
    why.append(el("strong", "", "Why I'm sharing it"));
    why.append(el("span", "", item.why));
    article.appendChild(why);
    /* Disclosure sits BEFORE the link so visitors read it before clicking. */
    if (item.isAffiliate) article.append(el("p", "resource-disclosure", "Affiliate link: I may earn a commission if you purchase or sign up through it."));
    const actions = el("div", "resource-actions");
    const link = validLink(item.resourceUrl);
    if ((ready(item) || previewLink(item)) && link) {
      actions.appendChild(safeExternal(link,
        ready(item) ? "Explore resource ↗" : "Test resource link ↗",
        "resource-link", ready(item) ? `Explore resource: ${item.title}` : `Test resource link: ${item.title}`, item.isAffiliate));
    } else {
      actions.appendChild(comingSoon());
    }
    const videoLink = validLink(item.videoUrl);
    if (videoLink) actions.appendChild(safeExternal(videoLink, "Watch related video ↗", "resource-video", `Watch the video about ${item.title}`));
    article.appendChild(actions);
    return article;
  }

  const inCategory = (cat) => publicItems.filter(item => cat === "all" || item.category === cat);

  /* On the live site, start on "All resources" if the default topic has nothing published yet. */
  let category = has(categories, config.defaultCategory) ? config.defaultCategory : "direction";
  if (!config.previewMode && inCategory(category).length === 0) category = "all";

  function visibleItems() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    return inCategory(category).filter(item =>
      !query || [item.title, item.description, item.why, item.type, categories[item.category]].join(" ").toLocaleLowerCase().includes(query)
    );
  }

  function render() {
    const filtered = visibleItems();
    grid.replaceChildren();
    filtered.forEach((item, idx) => grid.appendChild(card(item, idx + 1)));
    emptyState.hidden = filtered.length > 0;
    const phrase = filtered.length === 1 ? "resource" : "resources";
    statusLabel.textContent = `${categories[category] || "Resources"} · ${filtered.length} ${phrase}${searchInput.value.trim() ? " matching your search" : ""}`;
    filterButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === category));
    });
  }
  function selectCategory(next, fromPathCard) {
    category = has(categories, next) ? next : "all";
    searchInput.value = "";
    render();
    if (fromPathCard) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("resources").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      /* Move keyboard and screen-reader focus to the shelf the visitor just chose. */
      resourcesHeading.focus({ preventScroll: true });
    }
  }

  document.getElementById("previewNotice").hidden = !config.previewMode;
  document.getElementById("year").textContent = new Date().getFullYear();
  filterButtons.forEach(btn => btn.addEventListener("click", () => selectCategory(btn.dataset.filter, false)));
  document.querySelectorAll("[data-path]").forEach(btn =>
    btn.addEventListener("click", () => selectCategory(btn.dataset.path, true))
  );
  /* Searching looks across every topic, so a match is never hidden behind the wrong tab. */
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() && category !== "all") category = "all";
    render();
  });
  document.getElementById("resetSearch").addEventListener("click", () => selectCategory("all", false));
  renderFeatured();
  render();
})();
