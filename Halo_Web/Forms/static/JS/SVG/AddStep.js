function AddStep() {
  fetch("/static/HTML/Others/SVG_Active.html")
    .then((response) => response.text())
    .then((data) => {
      let step = localStorage.getItem("actualStep");
      let stepName;
      if (step < 3) {
        stepName = STEPS_NAME[step];
      }
      var container = document.getElementById("step-by-step");
      container.innerHTML += data;
      var svg = container.childNodes[step * 2];
      svg.id = "SVG_".concat(step);
      svg.children[1].innerHTML = "\n    " + (Number(step) + 1) + "\n  ";
      svg.children[2].innerHTML = "\n" + STEPS_NAME[step] + "\n  ";
      svg.children[2].attributes["x"].value = "25";
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}
