/**
 * JIRA Linker Content Script.
 */

// Match Comments and Issue Title
const COMMENTS_SELECTOR = 'td.comment-body>p';
const TITLE_SELECTOR = 'span.js-issue-title';


/**
 * Retrieve Github comments and substitute occurrences of the project ID to a link
 */
function substituteIDs(url, projectIds) {
  let linkHTML = `<a target="_blank" href="${url}/$&">$&</a>`;
  projectIds.forEach(function (pId){
    let pattern = new RegExp(`${pId}-\\d+`, 'g');
    let title = document.querySelectorAll(TITLE_SELECTOR);
    title.forEach(function(match) {
      match.innerHTML = match.innerHTML.replace(pattern, linkHTML);
    });

    let comments = document.querySelectorAll(COMMENTS_SELECTOR);
    comments.forEach(function(match) {
      match.childNodes.forEach(function(textNode) {
        // Only substitute Text Nodes
        if (textNode.nodeType === 3) {
          // Create a temporary div element to render the new HTML link as proper nodes
          let temp = document.createElement('div');
          temp.innerHTML = textNode.data.replace(pattern, linkHTML);

          // Insert the new nodes on the parent and remove the original text node
          while (temp.firstChild) {
            textNode.parentNode.insertBefore(temp.firstChild, textNode);
          }
          textNode.parentNode.removeChild(textNode);
        }
      });

    });
  });
}

chrome.storage.local.get(['url', 'projectIds'], function(items) {
  if (items.projectIds && items.url) {
    substituteIDs(items.url, items.projectIds);
  }
});
