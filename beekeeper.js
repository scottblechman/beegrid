(() => {

  // Global guard variable, prevents running if the script is re-injected.
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Replaces UI components in the container with updated versions.
   * If hints are disabled, or all words are found, this is skipped and
   * existing components are removed from the container.
   * @todo change CSS visibility instead of removing elements
   */
  function rebuildUI() {
    const container = document.querySelector('.beekeeper-container');
    
    if (getVisibility()) {
      const distribution = createDistribution();
      if (distribution.range.highest === 0) {
        // All words found
        if (container !== null) {
          container.style.display = 'none';
        }
        return;
      }
      const grid = new LetterGrid(distribution);
      const list = new TwoLetterList(distribution);
  
      const table = document.querySelector('.beekeeper-table');
      const listNode = document.querySelector('.beekeeper-list');
  
      if (!table) {
        container.appendChild(grid.grid);
      } else {
        table.replaceWith(grid.grid);
      }
  
      if (!listNode) {
        container.appendChild(list.list);
      } else {
        listNode.replaceWith(list.list);
      }
    } else {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }
  }
  
  /** 
   * Toggles whether hints are displayed or hidden.
   * The updated value is saved to localStorage, and the UI is rebuilt.
   * @todo change CSS visibility instead of removing elements
   */
  function toggleVisibility() {
    const visibility = getVisibility();
    setVisibility(!visibility);
  
    const toggleButton = document.querySelector('#beekeeper-button-toggle');
    toggleButton.textContent = `BeeKeeper ${!visibility ? 'ON' : 'OFF'}`;
    
    rebuildUI();
  }

  // Create UI container
  if (!document.querySelector('.beekeeper-container')) {
    let container = document.createElement('div');
    container.className = 'beekeeper-container';

    const board = document.querySelector('.sb-controls-box');
    board.appendChild(container);
  }

  // Add EnabledButton to the game's toolbar
  if (!document.querySelector('#beekeeper-button-toggle')) {
    const hintButton = document.querySelector('.pz-toolbar-button__hints');
    const toggle = new EnabledButton(getVisibility());
    toggle.content.addEventListener('click', toggleVisibility);
    // Make the button the first element of the toolbar
    hintButton.parentElement.insertBefore(toggle.content, hintButton.parentElement.firstElementChild);
  }

  /* Rebuild the hint UI when a new word is found,
   * by listening for changes to the word list.
   */
  const answerList = document.querySelector('ul');
  const config = {
    attributes: false, 
    childList: true, 
    characterData: false
  };
  const callback = mutations => {  
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        rebuildUI();
      }
    });
  }
  const observer = new MutationObserver(callback);
  observer.observe(answerList, config);

  rebuildUI();
})();
