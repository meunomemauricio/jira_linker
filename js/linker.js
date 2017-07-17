/**
 * JIRA Linker Content Script.
 */


/**
 * Retrieve Github comments and substitute occurrences of the project ID to a link
 */
function substituteIDs(url, projectIds) {
  let linkHTML = `<a href="${url}/$&">$&</a>`;
  projectIds.forEach(function (pId){
    let pattern = new RegExp(`${pId}(-\\d+)?`, 'g');
    let matches = document.querySelectorAll('td.comment-body,span.js-issue-title');
    matches.forEach(function(match) {
      match.innerHTML = match.innerHTML.replace(pattern, linkHTML);
    });
  });
}

chrome.storage.local.get(['url', 'projectIds'], function(items) {
  if (items.projectIds && items.url) {
    substituteIDs(items.url, items.projectIds);
  }
});