function bondWords(element) {
  if (element.nodeType === Node.TEXT_NODE) {
    const words = element.textContent.split(' ');
    const bondedWords = words.map((word) => {
      const halfLength = Math.floor(word.length / 2);
      return word.slice(0, halfLength) + word.slice(0, halfLength);
    });
    element.textContent = bondedWords.join(' ');
  } else {
    element.childNodes.forEach((child) => bondWords(child));
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applyWordBonding') {
    bondWords(document.body);
  }
});
