async function saveData(isNewRegister=true){
const ACT_STEP = localStorage.getItem("actualStep")
const srcSelector= ACT_STEP==0? "sourceSample" : `selec_${STEPS_NAME[ACT_STEP-1]}`
const srcId=document.getElementById(srcSelector).value
LocalStoreData(ACT_STEP);
const stepId=source_list[ACT_STEP]
const updatRoute=`/api/put/${STEPS_NAME[ACT_STEP]}/${stepId}`
const backend_response=await uploadOperation(STEPS_NAME[ACT_STEP],srcId, !isNewRegister ? updatRoute : "upload")
  if (backend_response.status=="success"){
    const stepUID= isNewRegister ? generarClasificador(srcId,backend_response.step.id,STEPS_NAME[ACT_STEP]) : generarClasificador(srcId,stepId,STEPS_NAME[ACT_STEP])
    showFormsToast(stepUID,isNewRegister)
    document.getElementById("step-by-step").scrollIntoView();
    source_list[ACT_STEP]=backend_response.step.id
    return source_list[ACT_STEP]
  } 
  return -1
}