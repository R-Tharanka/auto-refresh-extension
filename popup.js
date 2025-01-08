document.getElementById("startBtn").addEventListener("click", () => {
    const refreshTime = document.getElementById("refreshTime").value || 5000;
    const refreshCount = document.getElementById("refreshCount").value || 10;

    // Save settings to chrome storage
    chrome.storage.sync.set({ refreshTime: parseInt(refreshTime), refreshCount: parseInt(refreshCount) });

    // Send message to background.js to start the refresh process
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.runtime.sendMessage({
            command: "start",
            time: parseInt(refreshTime),
            count: parseInt(refreshCount),
        });

        document.getElementById("status").innerText = `Status: Refreshing (${refreshCount} times)`;
        document.getElementById("startBtn").disabled = true;  // Disable the start button to prevent multiple clicks
        document.getElementById("stopBtn").disabled = false; // Enable the stop button
        document.getElementById("pauseBtn").disabled = false; // Enable the pause button
    });
});

document.getElementById("stopBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "stop" });
    document.getElementById("status").innerText = "Status: Stopped";

    document.getElementById("startBtn").disabled = false;  // Enable the start button
    document.getElementById("stopBtn").disabled = true;  // Disable the stop button
    document.getElementById("pauseBtn").disabled = true;  // Disable the pause button
    document.getElementById("resumeBtn").disabled = true; // Disable the resume button
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "pause" });
    document.getElementById("status").innerText = "Status: Paused";

    document.getElementById("pauseBtn").disabled = true;  // Disable the pause button
    document.getElementById("resumeBtn").disabled = false; // Enable the resume button
});

document.getElementById("resumeBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "resume" });
    document.getElementById("status").innerText = "Status: Resumed";

    document.getElementById("pauseBtn").disabled = false;  // Enable the pause button
    document.getElementById("resumeBtn").disabled = true;  // Disable the resume button
});

// Load settings from chrome storage on popup open
chrome.storage.sync.get(["refreshTime", "refreshCount"], (data) => {
    document.getElementById("refreshTime").value = data.refreshTime || 5000;
    document.getElementById("refreshCount").value = data.refreshCount || 10;
});
