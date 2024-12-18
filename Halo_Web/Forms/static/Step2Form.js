function formMetadata() {
  var form = document.getElementById("contenedor");
  form.innerHTML = "";
  fetch("/templates");
}
