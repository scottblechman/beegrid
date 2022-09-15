function setGrid() {
  const distribution = createDistribution();
  const grid = new Grid(distribution);
  const list = new List(distribution);

  const board = document.querySelector(".sb-controls");
  const table = document.querySelector(".beegrid-table");
  const listNode = document.querySelector(".beegrid-list");

  if (!table) {
    board.append(grid.grid);
  } else {
    table.replaceWith(grid.grid);
  }

  if (!listNode) {
    board.append(list.list);
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