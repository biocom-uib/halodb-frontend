/*
  init: Set up necessary records, like actStep and the inital SVG
*/

function init() {
  const STEP = 0;
  localStorage.setItem("actualStep", STEP);
  AddStep();
  loadFixedForms(STEP);
}

document.addEventListener("DOMContentLoaded", init);
