function FormEventManagement() {
  var form = document.getElementById("Sample");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    var step = localStorage.getItem("actualStep");
    PassActiveToCompleted();
    formMetadata(step);
    localStorage.setItem("actualStep", Number(step) + 1);
    AddNewStep();
  });
}
