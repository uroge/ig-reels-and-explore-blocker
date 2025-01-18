(() => {
  let lastUrl = window.location.href;

  function removeLink(link: HTMLAnchorElement) {
    link.style.setProperty('display', 'none', 'important');
  }

  function handleRemoveReelsAndExplore() {
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

  function handleURLChange() {
    const currentURL = window.location.href;

    if (currentURL !== lastUrl) {
      lastUrl = currentURL;
      if (
        currentURL.includes('reels') ||
        currentURL.includes('explore')
      ) {
        window.history.back();
      }
    }
  }

  // Initial setup
  handleRemoveReelsAndExplore();
  handleURLChange();

  // React to changes
  const observer = new MutationObserver(() => {
    handleRemoveReelsAndExplore();
    handleURLChange();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
