/*
  init: Set up necessary records, like actStep and the inital SVG
*/

function setFormsEnv() {
    //Initialize steps values
    localStorage.setItem("actualStep", 0);
    localStorage.setItem("maxStepDone", 0);
    //Add SVG to step-by-step guide
    AddStep();
    //Load the first Experiment Forms
    LoadNextForm(0);
    //Associate the goBackEvent to the button "Go Back"
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
  