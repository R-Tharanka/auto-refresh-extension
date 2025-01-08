let refreshInterval;
let refreshCount = 0;
let maxRefreshes = 10;  // Default to 10 refreshes
let refreshTime = 5000;  // Default to 5 seconds
let isRefreshing = false;
let isPaused = false;  // New variable to track the pause state
let currentTabId = null; // To store the current tab ID

// Listen to commands from popup.js or elsewhere in the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "start") {
        // Set refresh time and count from message or default values
        refreshTime = message.time || 5000;
        maxRefreshes = message.count || 100;
        refreshCount = 0;
        isRefreshing = true;
        isPaused = false;

        // Get the active tab for refreshing
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length > 0) {
                let tab = tabs[0];
                currentTabId = tab.id;  // Save the current tab ID
                if (tab && tab.id && tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
                    refreshPage(tab);
                } else {
                    console.error("Tab is not valid for script execution.");
                }
            } else {
                console.error("No active tab found.");
            }
        });
    } else if (message.command === "stop") {
        // Stop refresh cycle and reset states
        isRefreshing = false;
        isPaused = false;
        clearInterval(refreshInterval);
        console.log("Refresh stopped.");
    } else if (message.command === "pause") {
        // Pause the refresh
        isPaused = true;
        console.log("Refresh paused.");
        clearInterval(refreshInterval);  // Stop the interval when paused
    } else if (message.command === "resume") {
        // Resume the refresh if it's paused
        if (isPaused) {
            isPaused = false;
            console.log("Resuming refresh...");
            // Restart the refresh logic from the same point (using currentTabId)
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                let tab = tabs[0];
                if (tab && tab.id === currentTabId) {
                    refreshPage(tab);
                }
            });
        } else {
            console.log("Refresh is either already running or finished.");
        }
    }
});

// Function to start refreshing the page
function refreshPage(tab) {
    if (isRefreshing && tab && tab.id) {
        refreshInterval = setInterval(() => {
            // Check if the refresh limit is reached
            if (refreshCount >= maxRefreshes) {
                clearInterval(refreshInterval);  // Stop the refresh cycle
                isRefreshing = false;
                console.log("Refresh limit reached");
            } else if (isPaused) {
                console.log("Refresh paused, not continuing.");
                clearInterval(refreshInterval);  // Stop the interval when paused
            } else {
                refreshCount++;
                console.log(`Refreshing... (${refreshCount}/${maxRefreshes})`);

                // Ensure tab is valid and ready before executing script
                if (tab.id && tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
                    setTimeout(() => {
                        try {
                            console.log("Executing script on tab:", tab.id);
                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                func: reloadPage
                            }).catch((error) => {
                                console.error("Error executing script:", error);
                            });
                        } catch (error) {
                            console.error("Error executing script:", error);
                        }
                    }, 500);  // Delay to ensure page is ready
                } else {
                    console.error("Tab URL is unsupported or not valid for script execution.");
                    clearInterval(refreshInterval);
                    isRefreshing = false;
                }
            }
        }, refreshTime);
    } else {
        console.error("Tab is undefined or invalid.");
    }
}

// Function to reload the page (executed on the tab)
function reloadPage() {
    if (document.readyState === "complete") {
        location.reload();
    } else {
        console.warn("Page not fully loaded yet.");
    }
}

// Clean up when tab is closed
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    if (tabId === currentTabId) {
        clearInterval(refreshInterval);  // Stop refresh when tab is closed
        refreshInterval = null;
        isRefreshing = false;
        console.log('Tab closed. Stopping refresh.');
    }
});
