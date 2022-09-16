/** Class representing a 2-letter list.
 * The list shows the number of answers starting with a specific 
 * two-letter combination.
 */
class TwoLetterList {
  /**
   * Creates a two-letter list.
   * @param {Object} distribution - answer distribution
   */
  constructor(distribution) {
    this.list = this.createList(sortDictByKeys(distribution.twoLetterList));
  }

  /**
   * Adds a line to the 2-letter list as an <li> element.
   * @param {Object} list - <ul> element 
   * @param {string} line - totals for starting letters
   */
  addLine(list, line) {
    let letter = document.createElement('li');
    letter.className = 'beekeeper-list-line';
    letter.textContent = line;
    list.appendChild(letter);
  }

  /**
   * Builds a 2-letter list as a <ul> element.
   * @param {Object} letterList - dictionary of number of answers with a given 2-letter prefix
   * @returns letter list
   */
  createList(letterList) {
    let list = document.createElement('ul');
    list.className = 'beekeeper-list';
    let firstLetter = '';
    let line = '';

    /**
     * Build lines for each starting letter, then move on after reaching the
     * next starting letter.
     */
    for (const [key, value] of Object.entries(letterList)) {
      const keyFirstLetter = key.substring(0, 1);
      if (!firstLetter) {
        firstLetter = keyFirstLetter;
      }

      if (keyFirstLetter !== firstLetter) {
        this.addLine(list, line);

        firstLetter = key.substring(0, 1);
        line = `${key.toLocaleUpperCase()}-${value}`;
      } else {
        line = `${line}\t${key.toLocaleUpperCase()}-${value}`;
      }
    }

    this.addLine(list, line);

    return list;
  }
}
