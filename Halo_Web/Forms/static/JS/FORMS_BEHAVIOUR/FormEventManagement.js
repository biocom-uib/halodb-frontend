async function FormEventManagement() {

  const ACT_STEP = localStorage.getItem("actualStep");
  const MAX_STEP_DONE = localStorage.getItem("maxStepDone");
  const IS_LAST = ACT_STEP > 0 && ACT_STEP == (STEPS_NAME.length - 1);
  const NEXT_STEP = Number(ACT_STEP) + 1;
  const PROGRESS = MAX_STEP_DONE < NEXT_STEP;

  if(IS_LAST){
    localStorage.setItem("StepsNameList",JSON.stringify(STEPS_NAME))
    LocalStoreData(ACT_STEP);
    window.location.assign(`${STATIC_BASE_URL}Summary.html`);
    return;
  }

  if (PROGRESS) {
    localStorage.setItem("maxStepDone", NEXT_STEP);
  }

  UpdateColor("SVG_".concat(ACT_STEP), PAUSED_COLOR);
  LocalStoreData(ACT_STEP);

  localStorage.setItem("actualStep", NEXT_STEP);
  if (NEXT_STEP == 1) {
    const NEW_STEPS=await getKomaForms();
    STEPS_NAME = STEPS_NAME.concat(NEW_STEPS);
  }

  await LoadNextForm(NEXT_STEP,IS_LAST);
  addFileInputEvent();
  
  if (PROGRESS) {
    AddStep();
  } else {
    UpdateColor("SVG_" + NEXT_STEP, ACTIVE_COLOR);
  }
  
  document.getElementById("Etapa").innerHTML = STEPS_NAME[NEXT_STEP];
  document.getElementById("step-by-step").scrollIntoView();
}
