/**
 * @module FORMS_BEHAIVOUR
 */

/**
 * Allows to move backwards to an specific previous step.
 * @param {Number} step - New Logical Possition.
 */

async function goBack(step) {
  
  const etapaLabel=document.getElementById("Etapa")
  const ACT_STEP = localStorage.getItem("actualStep")
  
  //You can't go back to the same step
  if (ACT_STEP == step)
    return;
  UpdateColor("SVG_" + ACT_STEP, PAUSED_COLOR);
  step = step == -1 ? ACT_STEP - 1 : step
  //Update actualStep value
  localStorage.setItem("actualStep", step);

  await LoadNextForm(step);
  UpdateColor("SVG_" + step, ACTIVE_COLOR);
  //Fill the inputs with the previous values
  RecoverFieldsData();

  etapaLabel.innerHTML = STEPS_NAME[step];
  if(step==0)
    setSampleSelector()
  
  const modal=document.body.querySelector(".modal")
  if(modal){
    modal.removeAttribute("data-set")
  }
}

function hideFileFields(){
  try{
    const fileContainers=document.querySelectorAll('.fileContainer')
    const showFilesBtn=document.getElementById('showFiles')
    fileContainers.forEach(container =>container.setAttribute('hidden',null))
    showFilesBtn.addEventListener('click',()=>{
      fileContainers.forEach(container =>container.removeAttribute('hidden'))
      showFilesBtn.setAttribute('hidden',null)
    })
  }
  catch{}

}
