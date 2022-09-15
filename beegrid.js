function setGrid() {
  const distribution = createDistribution();
  const grid = new Grid(distribution);
  const list = new List(distribution);

  const container = document.querySelector(".beegrid-container");
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
    console.log(hintButton);
    const toggle = new Toggle(true);
    hintButton.parentElement.insertBefore(toggle.content, hintButton.nextSibling);
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