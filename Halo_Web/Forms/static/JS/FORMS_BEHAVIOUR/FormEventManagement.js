async function saveData(isNewRegister=true,id=null){

const ACT_STEP = localStorage.getItem("actualStep")
const srcId=sessionStorage.getItem("source_id")
LocalStoreData(ACT_STEP);
const stepId=localStorage.getItem(`step_${ACT_STEP}_last_id`)
const updatRoute=`/api/put/${STEPS_NAME[ACT_STEP]}/${stepId}`
const backend_response=await uploadOperation(STEPS_NAME[ACT_STEP],srcId, !isNewRegister ? updatRoute : "upload")
  if (backend_response.status=="success"){
    //Show toes message
    document.getElementById("step-by-step").scrollIntoView();
    localStorage.setItem(`step_${ACT_STEP}_last_id`,backend_response.step.id)
    return backend_response.step.id
  } 
  return -1
}



/**
 * Controll all the changes according to load next sequences forms and detect if there 
 * are more elements to show or not
 */
async function FormEventManagement() {
  const ACT_STEP = localStorage.getItem("actualStep")
  const MAX_STEP_DONE = localStorage.getItem("maxStepDone")
  const etapaLabel=document.getElementById("Etapa")
  const stepByStep=document.getElementById("step-by-step")

  const IS_LAST = ACT_STEP == (STEPS_NAME.length - 1);
  const NEXT_STEP = Number(ACT_STEP) + 1;
  const PROGRESS = MAX_STEP_DONE < NEXT_STEP;

  if(IS_LAST)
    completedSequence(STEPS_NAME)
  //Update actualStep value
  localStorage.setItem("actualStep",NEXT_STEP)
  //Update the step guide of last element
  UpdateColor("SVG_".concat(ACT_STEP), PAUSED_COLOR);
  //Store in LS last data
  LocalStoreData(ACT_STEP);

  //saveData(ACT_STEP,PROGRESS)
  if (!PROGRESS && saveResult>0){
    localStorage.setItem("actualStep",ACT_STEP)
    UpdateColor("SVG_".concat(ACT_STEP), ACTIVE_COLOR);
    return
  }
  
  localStorage.setItem("maxStepDone", NEXT_STEP);
  //Add step id at the list
  await AddStep();
  UpdateColor("SVG_" + NEXT_STEP, ACTIVE_COLOR);
  //Load next sequence form data
  await LoadNextForm(NEXT_STEP,IS_LAST)

 // document.querySelector(".modal-dialog").querySelectorAll("button")[1].setAttribute("hidden",null)

  source_list=await filterExperiments([],localStorage.getItem("koma"),STEPS_NAME[ACT_STEP])
  generateSourceSelect(document.querySelector('select'),source_list)
  
  etapaLabel.innerHTML = STEPS_NAME[NEXT_STEP];
  stepByStep.scrollIntoView();
}

