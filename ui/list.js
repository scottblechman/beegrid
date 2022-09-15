class List {
  constructor(distribution) {
    this.list = this.createList(distribution.twoLetterList);
  }

  addLine(list, line) {
    let letter = document.createElement("li");
    letter.className = "beegrid-list-line";
    letter.textContent = line;
    list.appendChild(letter);
  }

  createList(letterList) {
    let list = document.createElement("ul");
    list.className = "beegrid-list";
    let firstLetter = "";
    let line = "";

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
