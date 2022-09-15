class List {
  constructor(distribution) {
    this.list = this.createList(distribution.twoLetterList);
  }

  createList(letterList) {
    let list = document.createElement("ul");
    list.className = "beegrid-list";

    for (const [key, value] of Object.entries(letterList)) {
      let letter = document.createElement("li");
      letter.textContent = `${key} - ${value}`;
      list.appendChild(letter);
    }

    return list;
  }
}
