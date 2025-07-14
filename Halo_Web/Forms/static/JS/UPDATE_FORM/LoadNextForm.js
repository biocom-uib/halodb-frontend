/**
 * @module UPDATE_FORM
 */

/**
 * Fetch the selected Forms & updated the events and necessary adjust
 * @param {Number} step 
 */
async function LoadNextForm(step) {
  const IS_LAST = step == (STEPS_NAME.length - 1);
  const DATA = await fetchSecureFile("static",`Forms/${STEPS_NAME[step]}.html`)
  const cardForm = document.getElementById("cardForm");
  const goBackButton = document.getElementById("goBack");
  const stepName=STEPS_NAME[step]
  const koma=localStorage.getItem("koma")
  cardForm.innerHTML = DATA;
  getSelectedItems(document.querySelectorAll("select")) 
  if (IS_LAST){
    const submitButton = document.getElementById("submit");
    submitButton.innerText="End Sequence"
    submitButton.className="btn btn-info"
  }
  
  if(stepName=="GENOME"){
    getMagnitudeCategories()
  }

  goBackButton.style.visibility = step == 0 ? "hidden" : "Visible";

  addFileInputEvent();
  modifyDict[stepName]?.(koma)

  updateSourceSelectors(step)
}
