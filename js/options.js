/**
 * Options Panel
 */

let projectIds;

/**
 * Display status message.
 *
 * @param message Message to be displayed.
 * @param timeout How long the message should be displayed.
 */
function updateStatus(message, timeout) {
  timeout = timeout || 750;
  let status = document.getElementById('status');
  status.textContent = message;
  setTimeout(function() {
    status.textContent = '';
  }, timeout)
}

/**
 * Saves options to chrome.storage
 */
function saveOptions() {
  let url = document.getElementById('url').value;
  let options = {url: url, projectIds: projectIds};
  chrome.storage.local.set(options, updateStatus('Options saved...'));
}

/**
 * Restore saved options and fill the input fields.
 */
function restoreOptions() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    url: '',
    projectIds: []
  }, function(items) {
    document.getElementById('url').value = items.url;
    projectIds = items.projectIds;
    renderProjectIds();
  });
}

/**
 * Add a Project ID to the global list.
 */
function addProjectId() {
  let projectIdInput = document.getElementById('project-id');
  let value = projectIdInput.value.replace(/^\s+|\s+$/g, '');
  if (value) {
    if (projectIds.indexOf(value) > -1) {
      updateStatus('Project ID already present on the list.', 2000);
      return;
    }
    projectIds.push(value);
    projectIdInput.value = '';
    renderProjectIds();
    saveOptions();
  }
}

/**
 * Remove a Project ID from the list.
 */
function removeProjectId(event) {
  let index = event.srcElement.name;
  if (index > -1 && index < projectIds.length){
    projectIds.splice(index, 1);
    renderProjectIds();
    saveOptions();
  }
}

/**
 * Render the Project ID list.
 */
function renderProjectIds() {
  let listItems = [];
  projectIds.forEach(function(pId, idx){
    let removeLink = `<a href="#" class="remove-id" name="${idx}">X</a>`;
    listItems.push(`<li>${pId} - ${removeLink}</li>`);
  });
  let projectIdUl = document.getElementById('project-id-list');
  projectIdUl.innerHTML = listItems.join('');
  updateEventListeners();
}

/**
 * Add Event Listeners to the remove buttons.
 *
 * It's necessary to call this every time the list is rendered, to make sure
 * indexes are updated and new items are covered.
 */
function updateEventListeners() {
  Array.from(document.getElementsByClassName('remove-id')).forEach(function(el) {
    el.addEventListener('click', removeProjectId);
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('add-project-id').addEventListener('click', addProjectId);
