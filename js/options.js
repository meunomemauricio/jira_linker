/**
 * Options Panel
 */

/**
 * Display status message.
 *
 * @param message Message to be displayed.
 * @param timeout How long the message should be displayed.
 */
function updateStatus(message, timeout) {
  timeout = timeout || 750;
  var status = document.getElementById('status');
  status.textContent = message;
  setTimeout(function() {
    status.textContent = '';
  }, timeout)
}

/**
 * Saves options to chrome.storage
 */
function saveOptions() {
  var url = document.getElementById('url').value;
  var projectID = document.getElementById('projectID').value;

  var options = {
    url: url,
    projectID: projectID
  };

  chrome.storage.local.set(options, updateStatus('Options saved...'));
}

/**
 * Restore saved options and fill the input fields.
 */
function restoreOptions() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    url: '',
    projectID: ''
  }, function(items) {
    document.getElementById('url').value = items.url;
    document.getElementById('projectID').value = items.projectID;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);