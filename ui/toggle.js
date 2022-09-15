class Toggle {
  constructor(visible) {
    this.content = document.createElement("span");
    this.content.className = "pz-toolbar-button";
    this.content.id = "beegrid-button-toggle";
    this.content.ariaRoleDescription = "presentation";
    this.content.textContent = `bee-grid ${visible ? "ON" : "OFF"}`;
  }
}