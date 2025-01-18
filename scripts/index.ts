(() => {
  function removeLink(link: HTMLAnchorElement) {
    link.style.setProperty('display', 'none', 'important');
  }

  function handleURLChange() {
    const currentURL = window.location.href;

    if (
      currentURL.includes('reels') ||
      currentURL.includes('explore')
    ) {
      window.history.back();
    }
  }

  window.addEventListener('popstate', handleURLChange);

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    handleURLChange();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    handleURLChange();
  };

  handleURLChange();

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
})();
