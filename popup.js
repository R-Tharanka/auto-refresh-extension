document.getElementById("startBtn").addEventListener("click", () => {
    const refreshTime = document.getElementById("refreshTime").value || 5000;
    const refreshCount = document.getElementById("refreshCount").value || 10;

    chrome.storage.sync.set({
        refreshTime: parseInt(refreshTime),
        refreshCount: parseInt(refreshCount),
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.runtime.sendMessage({
            command: "start",
            time: parseInt(refreshTime),
            count: parseInt(refreshCount),
        });

        document.getElementById("status").innerText = `Status: Refreshing (${refreshCount} times)`;
        document.getElementById("startBtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("pauseBtn").disabled = false;
    });
});

document.getElementById("stopBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "stop" });
    document.getElementById("status").innerText = "Status: Stopped";

    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("resumeBtn").disabled = true;
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "pause" });
    document.getElementById("status").innerText = "Status: Paused";

    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("resumeBtn").disabled = false;
});

document.getElementById("resumeBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "resume" });
    document.getElementById("status").innerText = "Status: Resumed";

    document.getElementById("pauseBtn").disabled = false;
    document.getElementById("resumeBtn").disabled = true;
});

// Feedback icon click handler
document.getElementById("feedbackIcon").addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("support.html") });
});

// Load settings from chrome storage on popup open
chrome.storage.sync.get(["refreshTime", "refreshCount"], (data) => {
    document.getElementById("refreshTime").value = data.refreshTime || 5000;
    document.getElementById("refreshCount").value = data.refreshCount || 10;
});
