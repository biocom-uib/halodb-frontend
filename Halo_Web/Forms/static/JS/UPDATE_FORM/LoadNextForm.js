/*
  LoadNextForm: Update form inputs fields 
*/
async function LoadNextForm(step) {
  const IS_LAST =   step == (STEPS_NAME.length - 1);
  const DATA = await fetchSecureFile("static",`Forms/${STEPS_NAME[step]}.html`)
  const cardForm = document.getElementById("cardForm");
  const goBackButton = document.getElementById("goBack");
  cardForm.innerHTML = DATA;
  getSelectedItems(document.getElementsByTagName("select")) 
  if (IS_LAST){
    const submitButton = document.getElementById("submit");
    submitButton.innerText="End Sequence"
    submitButton.className="btn btn-info"
  } 

  goBackButton.style.visibility = step == 0 ? "hidden" : "Visible";

  addFileInputEvent();
  if(modifyDict[STEPS_NAME[step]])
    modifyDict[STEPS_NAME[step]](localStorage.getItem('koma'))

  updateSourceSelectors(step)
}
