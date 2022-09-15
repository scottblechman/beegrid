class Grid {
  constructor(distribution) {
    this.grid = this.createGrid(distribution);
  }

  createGrid(distribution) {
    let grid = document.createElement("table");
    grid.className = "beegrid-table";

    const header = this.createHeader(distribution.range.lowest, distribution.range.highest);
    grid.appendChild(header);

    const sortedCount = sortDictByKeys(distribution.letterCount);
    for (const [key, value] of Object.entries(sortedCount)) {
      const row = this.createLetterRow(key, value, distribution.range.lowest, distribution.range.highest);
      grid.appendChild(row);
    }

    const footer = this.createFooter(distribution.lengthTotals);
    grid.appendChild(footer);

    return grid;
  }

  createHeader(low, high) {
    let values = [""];
    for (let i = low; i <= high; i++) {
      values = values.concat(i);
    }
    values = values.concat("Σ");
    
    const header = this.createRow(values);
    header.className = "beegrid-table-header";
    return header;
  }

  createRow(values) {
    let row = document.createElement("tr");
    for (const [index, el] of values.entries()) {
      let cell = this.createCell(el);

      // Italicize the combined total
      if (values[0] === "Σ:" && index === values.length - 1) {
        cell.id = "beegrid-table-total";
      }

      row.appendChild(cell);
    }

    return row;
  }

  createCell(el) {
    let cell = document.createElement("td");
    cell.textContent = el;
    cell.className = "beegrid-table-cell";
    return cell;
  }

  createLetterRow(letter, counts, low, high) {
    let values = [`${letter.toLocaleUpperCase()}:`];
    let total = 0;
    for (let i = low; i <= high; i++) {
      if (i in counts) {
        values = values.concat(counts[i]);
        total += counts[i];
      } else {
        values = values.concat("-");
      }
    }
    values = values.concat(total);
    return this.createRow(values);
  }

  createFooter(totals) {
    let values = ["Σ:"];
    let combinedTotal = 0;
    for (const total of Object.keys(totals)) {
      values = values.concat(totals[total]);
      combinedTotal += totals[total];
    }
    values = values.concat(combinedTotal);
    const footer = this.createRow(values);
    footer.className = "beegrid-table-footer";
    return footer;
  }
}
