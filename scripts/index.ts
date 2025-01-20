(() => {
  let lastUrl = window.location.href;

  function removeLink(link: HTMLAnchorElement) {
    link.style.setProperty('display', 'none', 'important');
  }

  function handleRemoveReelsAndExploreLinks() {
    const reelsLinks = document.querySelectorAll('a[href*="reels"]');
    const exploreLinks = document.querySelectorAll(
      'a[href*="explore"]'
    );

    const reelsLinksArray = Array.from(
      reelsLinks
    ) as HTMLAnchorElement[];

    const exploreLinksArray = Array.from(
      exploreLinks
    ) as HTMLAnchorElement[];

    [...reelsLinksArray, ...exploreLinksArray].forEach(removeLink);
  }

  function handleBlockReelsAndExploreNavigation() {
    const currentURL = window.location.href;

    const isReelsOrExplore =
      currentURL.includes('reels') || currentURL.includes('explore');

    if (currentURL !== lastUrl || isReelsOrExplore) {
      lastUrl = currentURL;
      if (isReelsOrExplore) {
        window.history.back();
      }
    }
  }

  // Initial setup
  handleRemoveReelsAndExploreLinks();

  // React to changes
  const observer = new MutationObserver(() => {
    handleRemoveReelsAndExploreLinks();
    handleBlockReelsAndExploreNavigation();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener(
    'popstate',
    handleBlockReelsAndExploreNavigation
  );

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    handleBlockReelsAndExploreNavigation();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    handleBlockReelsAndExploreNavigation();
  };
})();
