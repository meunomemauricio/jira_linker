/**
 * JIRA Linker Content Script.
 */


/**
 * Retrieve Github comments and substitute occurrences of the project ID to a link
 */
function substituteIDs(url, projectID) {
  var pattern = new RegExp(projectID + '(-\d+)?', 'g');
  var linkHTML = '<a href="' + url + '$&">$&</a>';
  var matches = document.querySelectorAll('td.comment-body');
  for (i=0; i < matches.length; i++) {
    var comment = matches[i].innerHTML;
    matches[i].innerHTML = comment.replace(pattern, linkHTML);
  }
}

chrome.storage.local.get(['url', 'projectID'], function(items) {
  if (items.projectID && items.url) {
    substituteIDs(items.url, items.projectID);
  }
});
