function setGrid() {
  const container = document.querySelector(".beegrid-container");
  
  if (getVisibility()) {
    const distribution = createDistribution();
    if (distribution.range.highest === 0) {
      // All words found
      return;
    }
    const grid = new Grid(distribution);
    const list = new List(distribution);

    const table = document.querySelector(".beegrid-table");
    const listNode = document.querySelector(".beegrid-list");

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

function toggleVisibility() {
  const visibility = getVisibility();
  setVisibility(!visibility);

  const toggleButton = document.querySelector("#beegrid-button-toggle");
  toggleButton.textContent = `bee-grid ${!visibility ? "ON" : "OFF"}`;
  
  setGrid();
}

(() => {

  // Injection guard
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  // Create UI container
  if (!document.querySelector(".beegrid-container")) {
    let container = document.createElement("div");
    container.className = "beegrid-container";

    const board = document.querySelector(".sb-controls-box");
    board.appendChild(container);
  }

  // Add menu item for settings
  if (!document.querySelector("#beegrid-button-toggle")) {
    const hintButton = document.querySelector(".pz-toolbar-button__hints");
    const toggle = new Toggle(getVisibility());
    toggle.content.addEventListener("click", toggleVisibility);
    hintButton.parentElement.insertBefore(toggle.content, hintButton.parentElement.firstElementChild);
  }

  const answerList = document.querySelector("ul");

  const config = {
    attributes: false, 
    childList: true, 
    characterData: false
  };
    
  const callback = mutations => {  
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        setGrid();
      }
    });
  }

  const observer = new MutationObserver(callback);
  observer.observe(answerList, config);

  setGrid();
})();