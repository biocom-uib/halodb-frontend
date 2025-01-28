document.addEventListener("DOMContentLoaded", () => {
  fetch("/static/HTML/Others/SVG_Active.html")
    .then((response) => response.text())
    .then((data) => {
      var step = 0;
      localStorage.setItem("actualStep", step);
      document.getElementById("step-by-step").innerHTML = data;
      var container = document.getElementById("step-by-step");
      var svg = container.childNodes[0];
      svg.id = SVG_ID[step];
      svg.children[1].innerHTML = "\n    " + (step + 1) + "\n  ";
      svg.children[2].innerHTML = "\n" + STEPS_NAME[step] + "\n  ";
      svg.children[2].attributes["x"].value = "25";
      FormEventManagement();
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
});
