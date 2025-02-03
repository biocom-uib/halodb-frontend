/*
  LoadNextForm: Update content of the form following the next rules:
    - SAMPLE -> METADATA
    - METADATA -> EXPERIMENT
    - EXPERIMENT -> RAW_READS
    - EXPERIMENT -> PEPTIDES
*/
async function loadFixedForms(step) {
  var form = document.getElementById("contenedorForm");
  form.innerHTML = "";
  await fetch(STATIC_FOMRS_PATH[step])
    .then((response) => response.text())
    .then((data) => {
      form.innerHTML = data;
      FormEventManagement();
      const goBackBtn = document.getElementById("goBack");
      if (goBackBtn) {
        goBackBtn.addEventListener("click", goBack);
      } else {
        console.log("Botón goBack no encontrado.");
      }
      if (step == 0) {
        goBackBtn.hidden = true;
      }
      var last = STEPS_NAME.length - 1;
      if (step > 2 && step == last) {
        document.getElementById("submit").value = "Save";
      }
    })
    .catch((error) => console.error("Error loadFixedForms: ", error));
}
