var STEPS_NAME = ["EXPERIMENT"];

const CARD_COLORS = [
  "bg-primary text-white",
  "bg-secondary text-white",
  "bg-success text-white",
  "bg-danger text-white",
  "bg-warning text-dark",
  "bg-info text-white",
  "bg-dark text-white",
];

const DEFULT_CARD_COLOR = "bg-white text-dark";

const PAUSED_COLOR = "grey";

const ACTIVE_COLOR = "green";

/*
  init: Set up necessary records, like actStep and the inital SVG
*/

function setFormsEnv() {
  const STEP = 0;
  localStorage.setItem("actualStep", STEP);
  localStorage.setItem("maxStepDone", STEP);
  AddStep();
  LoadNextForm(STEP);
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
