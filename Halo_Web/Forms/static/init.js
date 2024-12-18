const STEPS_NAME = ["Sample", "Meta"];
document.addEventListener("DOMContentLoaded", () => {
  fetch("/static/HTML/Others/SVG_Active.html")
    .then((response) => response.text())
    .then((data) => {
      localStorage.setItem("actualStep", 1);
      document.getElementById("step-by-step").innerHTML = data;
      //document.getElementById("step-by-step").id = "step_1";
      var container = document.getElementById("step-by-step");
      var svg = container.childNodes[0];
      svg.children[1].innerHTML =
        "\n    " + localStorage.getItem("actualStep") + "\n  ";
      //pREUBA DE COLOR
      //svg.children[0].attributes["fill"].value = "grey";
      //svg.children[0].attributes["stroke"].value = "grey";

      svg.children[2].innerHTML =
        "\n" + STEPS_NAME[localStorage.getItem("actualStep") - 1] + "\n  ";
      svg.children[2].attributes["x"].value = "25";
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
});
