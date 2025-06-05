/**
 *  Set up necessary records, like actStep and the inital SVG
 */
 
let steps_sources_id

async function setFormsEnv() {

  steps_sources_id=[]

  const goBackBtn=document.getElementById("goBack")
  const formElement=document.getElementById("mainForm")
  const sequences=await fetchSecureFile("GET","sequences")

  //Initialize steps values
  localStorage.setItem("actualStep", 0);
  localStorage.setItem("maxStepDone", 0);

  //Choose KOMA sequence
  STEPS_NAME=sequences[localStorage.getItem("koma")]

  
  ChangeKoma()
  //Load the first Experiment Forms
  await LoadNextForm(0);
  //Add SVG to step-by-step guide
  AddStep();
  //Associate the goBackEvent to the button "Go Back"
  goBackBtn.addEventListener("click", () =>
    goBack(localStorage.getItem("actualStep") - 1)
  );
  //Add main event manager to the form element
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    FormEventManagement();
  });
  document.getElementById("saveButton").addEventListener('click',()=>saveData())
  //Init the Sample Selector
  setSampleSelector()
  //Add fileName detect event
  addFileInputEvent();
  }
  