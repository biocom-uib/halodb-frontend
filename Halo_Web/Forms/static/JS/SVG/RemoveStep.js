function RemoveStep(step) {
  const SVG_ID = "SVG_".concat(step);
  const COLOR = "green";
  var stepByStep = document.getElementById("step-by-step");
  stepByStep.removeChild(stepByStep.lastChild);
  stepByStep.removeChild(stepByStep.lastChild);
  //Updatear Color al length-2 to green color
  UpdateColor(SVG_ID, COLOR);
}
