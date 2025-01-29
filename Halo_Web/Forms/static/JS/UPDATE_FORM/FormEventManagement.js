function FormEventManagement() {
  var form = document.getElementById("Sample");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    var step = localStorage.getItem("actualStep");
    PassActiveToCompleted();
    if (step<3){
      loadFixedForms(step - 1);
    }else if (step == 3){
      getKomaForms();
    }
    
    localStorage.setItem("actualStep", Number(step) + 1);
    AddNewStep();
  });
}
