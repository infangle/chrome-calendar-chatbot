chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
});
