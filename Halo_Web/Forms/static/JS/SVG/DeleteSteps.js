function deleteSteps() {
  const LAST_SVG = 3 * 2; //3 primeros steps fijos

  const STEP_BY_STEP = document.getElementById("step-by-step");
  let i = STEP_BY_STEP.childNodes.length;

  for (; i > LAST_SVG; i = i - 2) {
    STEP_BY_STEP.removeChild(STEP_BY_STEP.lastChild);
    STEP_BY_STEP.removeChild(STEP_BY_STEP.lastChild);
  }
}
