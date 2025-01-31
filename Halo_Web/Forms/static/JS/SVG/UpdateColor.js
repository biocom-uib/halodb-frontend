function UpdateColor(id, color) {
  let svg = document.getElementById(id);
  svg.children[0].attributes["fill"].value = color;
  svg.children[0].attributes["stroke"].value = color;
}
