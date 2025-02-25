chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
    // Removed automatic login prompt on installation
});

chrome.runtime.onStartup.addListener(() => {
    console.log("Extension Started");
    // Removed automatic login prompt on startup
});
  
  // Function to get OAuth token
  function getAuthToken() {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        console.error("Auth Error:", chrome.runtime.lastError);
        return;
      }
      console.log("OAuth Token:", token);
      fetchCalendarEvents(token); // Call function to interact with Google Calendar API
    });
  }
  
  // Function to fetch user's Google Calendar events
  function fetchCalendarEvents(token) {
    fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Google Calendar Events:", data);
    })
    .catch(error => console.error("Error fetching calendar events:", error));
  }
  
  // Trigger authentication when the extension icon is clicked
  chrome.action.onClicked.addListener(() => {
    getAuthToken();
  });

  // Check authentication state on popup open
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkAuth") {
      chrome.identity.getAuthToken({ interactive: false }, (token) => {
        sendResponse({ authenticated: !!token });
      });
      return true; // Required for async response
    }
  });
