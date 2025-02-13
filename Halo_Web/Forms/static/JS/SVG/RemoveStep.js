function RemoveStep(step, ACT_STEP) {
  UpdateColor("SVG_".concat(step), ACTIVE_COLOR);
  UpdateColor("SVG_".concat(ACT_STEP), PAUSED_COLOR);

  /*
  const LAST_SVG = (step + 1) * 2;
  
  var stepByStep = document.getElementById("step-by-step");
  let i = stepByStep.childNodes.length;
  
  for (; i > LAST_SVG; i = i - 2) {
    stepByStep.removeChild(stepByStep.lastChild);
    stepByStep.removeChild(stepByStep.lastChild);
  }
  */

  //Updatear Color al length-2 to green color
}
