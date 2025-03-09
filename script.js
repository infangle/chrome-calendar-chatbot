chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({ url: 'popup.html' });
});
