/*
  init: Set up necessary records, like actStep and the inital SVG
*/

function init() {
  const STEP = 0;
  localStorage.setItem("actualStep", STEP);
  localStorage.setItem("maxStepDone", STEP);
  AddStep();
  loadFixedForms(STEP);
  const goBackBtn = document.getElementById("goBack");
  goBackBtn.addEventListener("click", () =>
    goBack(localStorage.getItem("actualStep") - 1)
  );
  var form = document.getElementById("mainForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    FormEventManagement();
  });
}

document.addEventListener("DOMContentLoaded", init);
