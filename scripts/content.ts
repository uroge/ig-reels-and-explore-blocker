(() => {
  console.log('content script loaded');
  const body = document.querySelector('body');
  if (body) {
    body.style.backgroundColor = 'lightblue';
  }
})();
