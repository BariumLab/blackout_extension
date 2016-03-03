// Saves options to chrome.storage
function save_options() {
  var words = document.getElementById('keywords').value;
  chrome.storage.sync.set({
    keywords: words,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value keywords = 'none'.
  chrome.storage.sync.get({
    keywords: 'none',
  }, function(items) {
    document.getElementById('keywords').value = items.keywords;
  });
}

// Allows list to be edited.
function remove_from_list(){

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
