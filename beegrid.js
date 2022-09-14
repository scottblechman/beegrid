(() => {

  // Injection guard
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const distribution = createDistribution();
  const grid = new Grid(distribution);

  const wordList = document.querySelector(".sb-controls");
  if (!document.querySelector(".beegrid-table")) {
    wordList.append(grid.grid);
  }
})();