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
  fetch(STATIC_FOMRS_PATH[step])
    .then((response) => response.text())
    .then((data) => {
      form.innerHTML = data;
      FormEventManagement();
    })
    .catch((error) => console.error("Error loadFixedForms: ", error));
}
