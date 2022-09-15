class List {
  constructor(distribution) {
    this.list = this.createList(distribution.twoLetterList);
  }

  createList(letterList) {
    let list = document.createElement("ul");
    list.className = "beegrid-list";
    let firstLetter = null;
    let line = "";

    for (const [key, value] of Object.entries(letterList)) {
      if (!firstLetter) {
        firstLetter = key.substring(0, 1);
      }

      if (key.substring(0, 1) !== firstLetter) {
        let letter = document.createElement("li");
        letter.textContent = line;
        list.appendChild(letter);

        firstLetter = key.substring(0, 1);
        line = "";
      } else {
        line = `${line}\t${key}-${value}`;
      }
    }

    return list;
  }
}
