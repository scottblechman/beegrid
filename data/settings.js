function getVisibility() {
  if (!localStorage.getItem("beekeeper.visible")) {
    return true;  // default to visible
  }

  return localStorage.getItem("beekeeper.visible") === "true";
}

function setVisibility(visible) {
  localStorage.setItem("beekeeper.visible", `${visible === true ? "true" : "false"}`);
}
