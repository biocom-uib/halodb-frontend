function RemoveStep(step) {
  const SVG_ID = "SVG_".concat(step);
  const COLOR = "green";
  var stepByStep = document.getElementById("step-by-step");
  stepByStep.childNodes.splice(stepByStep.childNodes.length - 2);
  //Updatear Color al length-2 to green color
  UpdateColor();
}
