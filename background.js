chrome.runtime.onInstalled.addListener(() => {
  console.log('WebRTC Toggle extension installed');
  
  // Initialize storage with default state
  chrome.storage.local.set({
    webrtcEnabled: true
  });
});

// Optional: Listen for privacy setting changes
chrome.privacy.network.webRTCIPHandlingPolicy.onChange.addListener((details) => {
  const isEnabled = details.value === 'default';
  
  // Update storage to reflect current state
  chrome.storage.local.set({
    webrtcEnabled: isEnabled
  });
  
  console.log('WebRTC policy changed to:', details.value);
});