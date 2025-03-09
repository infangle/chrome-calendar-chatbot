chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openPopup") {
        chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
    }
});
