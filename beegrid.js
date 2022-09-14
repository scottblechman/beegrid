(() => {

  // Injection guard
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const distribution = createDistribution();
  const grid = new Grid(distribution);

  const board = document.querySelector(".sb-controls");
  if (!document.querySelector(".beegrid-table")) {
    board.append(grid.grid);
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
        grid.recalculate();
      }
    });
  }

  const observer = new MutationObserver(callback);
  observer.observe(answerList, config);
})();