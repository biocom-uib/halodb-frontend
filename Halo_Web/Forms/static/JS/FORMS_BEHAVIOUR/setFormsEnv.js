/**
 *  Set up necessary records, like actStep and the inital SVG
 */
let source_list
async function setFormsEnv() {

  const goBackBtn=document.getElementById("goBack")
  const saveBtn=document.getElementById("saveBtn")
  const formElement=document.getElementById("mainForm")
  const sequences=await fetchSecureFile("GET","sequences")

  //Initialize steps values
  localStorage.setItem("actualStep", 0);
  localStorage.setItem("maxStepDone", 0);

  //Choose KOMA sequence
  STEPS_NAME=sequences[localStorage.getItem("koma")]

  source_list=new Array(STEPS_NAME.lenght)

  
  ChangeKoma()
  //Load the first Experiment Forms
  await LoadNextForm(0);
  
  loadAllSteps()

  //Associate the goBackEvent to the button "Go Back"
  goBackBtn.addEventListener("click", () =>
    goBack(localStorage.getItem("actualStep") - 1)
  );
  saveBtn.addEventListener("click",()=>{
    if (!element.hasAttribute("data-set")){
      saveData(true)
      element.setAttribute("data-set",null)
    }else{
      const myModal = new bootstrap.Modal(element)
      configureSaveModal(element)
      myModal.show()
    }
  })
  //Add main event manager to the form element
  formElement.addEventListener("submit", async(event) => {
    event.preventDefault();
    FormEventManagement();
  });

  //Init the Sample Selector
  setSampleSelector()
  //Add fileName detect event
  addFileInputEvent();

  const element = await generateModal()
  }
  