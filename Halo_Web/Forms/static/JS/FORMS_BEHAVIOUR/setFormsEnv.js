/*
  init: Set up necessary records, like actStep and the inital SVG
*/

async function setFormsEnv() {
    //Initialize steps values
    localStorage.setItem("actualStep", 0);
    localStorage.setItem("maxStepDone", 0);

    //Choose KOMA sequence
    const sequences=await fetchSecureFile("GET","sequences")
    STEPS_NAME=sequences[localStorage.getItem("koma")]

    //Load the first Experiment Forms
    ChangeKoma()
    LoadNextForm(0);
    //Associate the goBackEvent to the button "Go Back"
    //Add SVG to step-by-step guide
    AddStep();
    document.getElementById("goBack").addEventListener("click", () =>
      goBack(localStorage.getItem("actualStep") - 1)
    );
    //Add main event manager to the form element
    document.getElementById("mainForm").addEventListener("submit", (event) => {
      event.preventDefault();
      FormEventManagement();
    });
    //Init the Sample Selector
    setSampleSelector()
  }
  