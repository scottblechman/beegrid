/**
 * Retrieves visibility flag from localStorage.
 * Defaults to true if the flag has not been saved yet.
 * @returns true if hints should be displayed
 */
function getVisibility() {
  if (!localStorage.getItem('beekeeper.visible')) {
    return true;  // default to visible
  }

  return localStorage.getItem('beekeeper.visible') === 'true';
}

/**
 * Saves visibility flag to localStorage.
 * @param {boolean} visible - true if hints should be displayed
 */
function setVisibility(visible) {
  localStorage.setItem('beekeeper.visible', `${visible === true ? 'true' : 'false'}`);
}
