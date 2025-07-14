/**
 * @module FORMS_BEHAIVOUR
 */

/**
 * Send the data to be stored in the database
 * @param {boolean} isNewRegister 
 * @returns {Number}Inserted element ID 
 * @returns {Error} operations fail
 */
async function saveData(isNewRegister=true){
  const ACT_STEP = localStorage.getItem("actualStep")
  LocalStoreData(ACT_STEP)
  const srcSelector= ACT_STEP==0? "sourceSample" : `select_${STEPS_NAME[ACT_STEP-1]}`
  const srcId=document.getElementById(srcSelector).value
  const stepId=source_list[ACT_STEP]
  const updatRoute=`/api/put/${STEPS_NAME[ACT_STEP]}/${stepId}`
  const backend_response=await uploadOperation(STEPS_NAME[ACT_STEP],srcId, !isNewRegister ? updatRoute : "upload")


  
  if (backend_response.status!="success")
    return -1
  
  //const stepUID= isNewRegister ? generarClasificador(srcId,backend_response.step.id,STEPS_NAME[ACT_STEP]) : generarClasificador(srcId,stepId,STEPS_NAME[ACT_STEP])
  showFormsToast(STEPS_NAME[ACT_STEP],isNewRegister)
  document.getElementById("step-by-step").scrollIntoView();
  source_list[ACT_STEP]=backend_response.step.id
  return source_list[ACT_STEP]

}