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
    keywords: '',
  }, function(items) {
    document.getElementById('keywords').value = items.keywords;
  });
}

// Adds a filter word to the list.
var add_to_list = function () {
  var word = document.getElementById('newWord').value;

  // Creates new list item element.
  var list = document.getElementById('keywords');
  var item = document.createElement("li");

  // Adds the item as a checkbox to the list.
  item.innerHTML = '<input type="checkbox" />' + word;
  list.appendChild(item);
}

// Removes selected filter words from the list.
var remove_from_list = function () {
  // Get all items currently in the list.
  var list = document.getElementById('keywords');
  var items = Array.prototype.slice.call(list.childNodes);
  var item;

  // Remove all items that are checked within the list.
  while(item = items.pop()) {
    if(item.firstChild && item.firstChild.checked){
      list.removeChild(item);
    }
  }
}

// Add events to Html elements.
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add').addEventListener('click',
    add_to_list);
document.getElementById('remove').addEventListener('click',
    remove_from_list);
