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

  if(IS_LAST){
    completedSequence(STEPS_NAME)
  }

  //Update actualStep value

  localStorage.setItem("actualStep",NEXT_STEP)

  //Update the step guide of last element
  UpdateColor("SVG_".concat(ACT_STEP), PAUSED_COLOR);
  //Store in LS last data
  LocalStoreData(ACT_STEP);
  const srcId=getSourceId(ACT_STEP)
  //if we progress, update maxStepDone, upload inserted data & add a new visual step 
  // element 
  if (PROGRESS) {
    localStorage.setItem("maxStepDone", NEXT_STEP);
    //First case: use sample id as source_id; Else, use previous step id returned from POST
    
    const backend_response=await uploadOperation(STEPS_NAME[ACT_STEP],srcId)
    //Add step id at the list
    steps_sources_id.push(backend_response.step.id)
    AddStep();
  }else{
    uploadOperation(`/api/put/${STEPS_NAME[ACT_STEP]}/${srcId}`,srcId)
    UpdateColor("SVG_" + NEXT_STEP, ACTIVE_COLOR);
  }

  //Load next sequence form data
  await LoadNextForm(NEXT_STEP,IS_LAST)
  
  etapaLabel.innerHTML = STEPS_NAME[NEXT_STEP];
  stepByStep.scrollIntoView();
}

function getSourceId(ACT_STEP){
  return ACT_STEP==0 ? sessionStorage.getItem("source_id") : steps_sources_id[ACT_STEP-1]
}
