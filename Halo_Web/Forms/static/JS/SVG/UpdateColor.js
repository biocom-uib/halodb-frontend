function PassActiveToCompleted() {
  let actualStep = localStorage.getItem("actualStep");
  let svg = document.getElementById(SVG_ID[actualStep]);
  svg.children[0].attributes["fill"].value = "grey";
  svg.children[0].attributes["stroke"].value = "grey";
}
