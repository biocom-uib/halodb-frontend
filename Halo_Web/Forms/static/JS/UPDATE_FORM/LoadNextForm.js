/*
  LoadNextForm: Update content of the form following the next rules:
    - SAMPLE -> METADATA
    - METADATA -> EXPERIMENT
    - EXPERIMENT -> RAW_READS
    - EXPERIMENT -> PEPTIDES
*/
function LoadNextForm(step) {
  var form = document.getElementById("contenedor");
  form.innerHTML = "";
  const EXP_FORMS=localStorage.getItem("ExpForm")
  fetch(EXP_FORMS[step])
    .then((response) => response.text())
    .then((data) => {
      form.innerHTML = data;
      FormEventManagement();
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}

function loadFixedForms(step){
  var form=document.getElementById("contenedorForm");
  form.innerHTML="";
  fetch(STATIC_FORMS[step]
    .then((response) => response.text())
    .then((data) =>{
      form.innerHTML = data;
      FormEventManagement();
    })
    .catch((error) =>console.error("Error loadFixedForms: ",error))
  )
}
