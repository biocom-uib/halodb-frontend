/**
 * Allows to move backwards to an specific previous step.
 * @param {Number} step - New Logical Possition.
 */

async function goBack(step) {
  
  const etapaLabel=document.getElementById("Etapa")
  const ACT_STEP = localStorage.getItem("actualStep")
  const submit=document.getElementById("submit")
  
  //You can't go back to the same step
  if (ACT_STEP == step)
    return;
  step = step == -1 ? ACT_STEP - 1 : step
  //Update actualStep value
  localStorage.setItem("actualStep", step);

  await LoadNextForm(step);
  //Fill the inputs with the previous values
  RecoverFieldsData();
  //Update the stp-by-step element
  RemoveStep(step, ACT_STEP);
  //Change submit button text(avoid check if its the last or not)
  submit.innerText="Save & Next"

  etapaLabel.innerHTML = STEPS_NAME[step];
}
