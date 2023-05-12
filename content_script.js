function boldFirstHalf(element) {
  if (element.nodeType === Node.TEXT_NODE && !element.parentNode.closest('script, style, noscript')) {
    const words = element.textContent.split(' ');
    const boldedWords = words.map((word) => {
      const halfLength = Math.ceil(word.length / 2);
      const firstHalf = word.slice(0, halfLength);
      const secondHalf = word.slice(halfLength);
      return `<b>${firstHalf}</b>${secondHalf}`;
    });
    const newHTML = boldedWords.join(' ');
    const span = document.createElement('span');
    span.innerHTML = newHTML;
    element.parentNode.insertBefore(span, element);
    element.remove();
  } else {
    Array.from(element.childNodes).forEach((child) => boldFirstHalf(child));
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applyWordBolding') {
    boldFirstHalf(document.body);
  }
});
