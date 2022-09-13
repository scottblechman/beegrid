class Grid {
  constructor(distribution) {
    this.grid = document.createElement("table");
    this.grid.className = "beegrid-table";

    this.createHeader(distribution.range.lowest, distribution.range.highest);
  }

  createHeader(low, high) {
    let values = [''];
    for (let i = low; i <= high; i++) {
      values = values.concat(i);
    }
    values = values.concat('Σ');
    
    const header = this.createRow(values);
    header.className = "beegrid-table-header";
    this.grid.appendChild(header);
  }

  createRow(values) {
    let row = document.createElement("tr");
    for (const el of values) {
      let cell = this.createCell(el);
      row.appendChild(cell);
    }
    return row;
  }

  createCell(el) {
    let cell = document.createElement("td");
    cell.textContent = el;
    return cell;
  }
}
