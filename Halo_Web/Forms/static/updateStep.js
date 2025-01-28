function updateStep() {
  var Etapa = document.getElementById("Etapa");
  var SBS = document.getElementById("step-by-step");
  if (Etapa.innerHTML === "Sample") Etapa.innerHTML = "Metada";
  fetch("/static/HTML/Others/SVG_Active.html")
    .then((response) => response.text())
    .then((data) => {
      SBS.innerHTML = SBS.data;
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}
