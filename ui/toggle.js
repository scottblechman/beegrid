class Toggle {
  constructor(visible) {
    this.content = document.createElement("span");
    this.content.className = "pz-toolbar-button";
    this.content.id = "beekeeper-button-toggle";
    this.content.ariaRoleDescription = "presentation";
    this.content.textContent = `BeeKeeper ${visible ? "ON" : "OFF"}`;
  }
}