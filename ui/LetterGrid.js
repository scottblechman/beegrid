/** Class representing a letter grid.
 * The grid shows the number of answers with a specific length and
 * starting letter.
 */
class LetterGrid {
  /**
   * Creates a letter grid.
   * @param {Object} distribution - answer distribution
   */
  constructor(distribution) {
    this.grid = this.createGrid(distribution);
  }

  /**
   * Builds a letter grid as a <table> element, based on the current game state.
   * @param {Object} distribution - answer distribution
   * @returns current letter grid
   */
  createGrid(distribution) {
    let grid = document.createElement('table');
    grid.className = 'beekeeper-table';

    const header = this.createHeader(distribution.range.lowest, distribution.range.highest, distribution.lengthTotals);
    grid.appendChild(header);

    // Display letters alphabetically
    const sortedCount = sortDictByKeys(distribution.letterCount);
    for (const [key, value] of Object.entries(sortedCount)) {
      const row = this.createLetterRow(key, value, distribution.range.lowest, distribution.range.highest, distribution.lengthTotals);
      grid.appendChild(row);
    }

    const footer = this.createFooter(distribution.lengthTotals);
    grid.appendChild(footer);

    return grid;
  }

  /**
   * Creates the table header displaying the word lengths.
   * @param {number} low - smallest word length
   * @param {number} high - highest word length
   * @param {Object} totals - dictionary of number of words per word length
   * @returns header row
   */
  createHeader(low, high, totals) {
    let values = [''];
    for (let i = low; i <= high; i++) {
      // Exclude lengths with no words left
      if (Object.keys(totals).includes(`${i}`)) {
        values = values.concat(i);
      }
    }
    values = values.concat('Σ');
    
    const header = this.createRow(values);
    header.className = 'beekeeper-table-header';
    return header;
  }

  /**
   * Creates a <tr> element representing an array of values.
   * @param {string[]} values - list of values to display 
   * @returns table row
   */
  createRow(values) {
    let row = document.createElement('tr');
    for (const [index, el] of values.entries()) {
      let cell = this.createCell(el);

      // Italicize the combined total
      if (values[0] === 'Σ:' && index === values.length - 1) {
        cell.id = 'beekeeper-table-total';
      }

      row.appendChild(cell);
    }

    return row;
  }

  /**
   * Creates a <td> element representing a specific value.
   * @param {string} el cell value
   * @returns table cell
   */
  createCell(el) {
    let cell = document.createElement('td');
    cell.textContent = el;
    cell.className = 'beekeeper-table-cell';
    return cell;
  }

  /**
   * Adds a row to the table for a specific letter.
   * @param {string} letter - starting letter
   * @param {number[]} counts - list of counts by word length for the respective letter
   * @param {number} low - smallest word length
   * @param {number} high - highest word length
   * @param {Object} totals - dictionary of number of words per word length
   * @returns table row
   */
  createLetterRow(letter, counts, low, high, totals) {
    let values = [`${letter.toLocaleUpperCase()}:`];
    let total = 0;
    for (let i = low; i <= high; i++) {
      if (Object.keys(totals).includes(`${i}`)) {
        if (i in counts) {
          values = values.concat(counts[i]);
          total += counts[i];
        } else {
          values = values.concat('-');
        }
      }
    }
    values = values.concat(total);
    return this.createRow(values);
  }

    /**
     * Creates the table footer displaying the totals for each word length.
     * @param {Object} totals - dictionary of number of words per word length
     * @returns footer row
     */
  createFooter(totals) {
    let values = ['Σ:'];
    let combinedTotal = 0;
    for (const total of Object.keys(totals)) {
      values = values.concat(totals[total]);
      combinedTotal += totals[total];
    }
    values = values.concat(combinedTotal);
    const footer = this.createRow(values);
    footer.className = 'beekeeper-table-footer';
    return footer;
  }
}
