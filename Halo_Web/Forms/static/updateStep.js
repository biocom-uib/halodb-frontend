function updateStep() {
  var Etapa = document.getElementById("Etapa");
  if (Etapa.innerHTML === "Sample") Etapa.innerHTML = "Metada";
  fetch("/static/HTML/Others/SVG_Index.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("step-by-step").innerHTML = data;
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}
