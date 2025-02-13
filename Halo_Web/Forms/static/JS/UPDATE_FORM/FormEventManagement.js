async function FormEventManagement() {
  const ACT_STEP = localStorage.getItem("actualStep");
  const MAX_STEP_DONE = localStorage.getItem("maxStepDone");
  const NEXT_STEP = Number(ACT_STEP) + 1;
  const PROGRESS = MAX_STEP_DONE < NEXT_STEP;
  if (PROGRESS) {
    localStorage.setItem("maxStepDone", NEXT_STEP);
  }
  const SVG_ID = "SVG_".concat(ACT_STEP);
  const COLOR = "grey";
  UpdateColor(SVG_ID, COLOR);

  LocalStoreData();

  localStorage.setItem("actualStep", NEXT_STEP);
  if (NEXT_STEP == 3) {
    await gestionAsync();
  }
  loadFixedForms(NEXT_STEP);
  if (PROGRESS) {
    AddStep();
  } else {
    UpdateColor("SVG_" + NEXT_STEP, ACTIVE_COLOR);
  }
  document.getElementById("Etapa").innerHTML = STEPS_NAME[NEXT_STEP];

  document.getElementById("step-by-step").scrollIntoView();
}

async function gestionAsync() {
  const NEW_LIST_VALUES = await getKomaForms();
  STATIC_FOMRS_PATH = STATIC_FOMRS_PATH.concat(NEW_LIST_VALUES[0]);
  STEPS_NAME = STEPS_NAME.concat(NEW_LIST_VALUES[1]);
}
