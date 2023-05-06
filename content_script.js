function boldFirstHalf(element) {
  if (element.nodeType === Node.TEXT_NODE) {
    const words = element.textContent.split(' ');
    const boldedWords = words.map((word) => {
      const halfLength = Math.floor(word.length / 2);
      const firstHalf = word.slice(0, halfLength);
      const secondHalf = word.slice(halfLength);
      return `<b>${firstHalf}</b>${secondHalf}`;
    });
    const newHTML = boldedWords.join(' ');
    element.insertAdjacentHTML('beforebegin', newHTML);
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
