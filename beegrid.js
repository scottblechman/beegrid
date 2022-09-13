(() => {

  // Injection guard
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const distribution = createDistribution();
  const grid = new Grid(distribution);

  const wordList = document.querySelector(".sb-wordlist-pag");
  wordList.append(grid.grid);
})();