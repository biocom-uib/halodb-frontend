function formMetadata(step) {
  var form = document.getElementById("contenedor");
  form.innerHTML = "";
  fetch(HTML_EXPERIMENT_FOMRS[step])
    .then((response) => response.text())
    .then((data) => {
      form.innerHTML = data;
      FormEventManagement();
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}
