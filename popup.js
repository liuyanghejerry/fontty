document.addEventListener('DOMContentLoaded', function() {
  var activateButton = document.querySelector('button');
  activateButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      alert('yay');
    });
  }, false);
}, false);