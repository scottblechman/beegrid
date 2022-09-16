/** Class representing a UI button to toggle visibility of hints. */
class EnabledButton {
  /**
   * Create a button as a <span> element.
   * @param {boolean} visible - read from localStorage, defaults to true.
   */
  constructor(visible) {
    this.content = document.createElement('span');
    this.content.className = 'pz-toolbar-button';
    this.content.id = 'beekeeper-button-toggle';
    this.content.ariaRoleDescription = 'presentation';
    this.content.textContent = `BeeKeeper ${visible ? 'ON' : 'OFF'}`;
  }
}
