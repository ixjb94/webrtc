document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('toggleBtn');
  const status = document.getElementById('status');

  // Get current WebRTC status
  function updateUI() {
    chrome.privacy.network.webRTCIPHandlingPolicy.get({}, function (details) {
      const isEnabled = details.value === 'default';

      if (isEnabled) {
        toggleBtn.textContent = 'Disable WebRTC';
        toggleBtn.className = 'toggle-btn enabled';
        status.textContent = 'WebRTC is currently enabled';
      } else {
        toggleBtn.textContent = 'Enable WebRTC';
        toggleBtn.className = 'toggle-btn disabled';
        status.textContent = 'WebRTC is currently disabled';
      }
    });
  }

  // Toggle WebRTC
  toggleBtn.addEventListener('click', function () {
    chrome.privacy.network.webRTCIPHandlingPolicy.get({}, function (details) {
      const isEnabled = details.value === 'default';
      const newPolicy = isEnabled ? 'disable_non_proxied_udp' : 'default';

      chrome.privacy.network.webRTCIPHandlingPolicy.set({
        value: newPolicy
      }, function () {
        if (chrome.runtime.lastError) {
          console.error('Error setting WebRTC policy:', chrome.runtime.lastError);
          status.textContent = 'Error occurred';
        } else {
          updateUI();
          // Store the current state
          chrome.storage.local.set({
            webrtcEnabled: !isEnabled
          });
        }
      });
    });
  });

  // Initialize UI
  updateUI();
});