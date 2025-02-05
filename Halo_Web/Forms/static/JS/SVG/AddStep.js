function AddStep() {
  fetch("/static/HTML/Others/SVG_Active.html")
    .then((response) => response.text())
    .then((data) => {
      let step = Number(localStorage.getItem("actualStep"));
      let stepName = STEPS_NAME[step];

      var container = document.getElementById("step-by-step");
      container.insertAdjacentHTML("beforeend", data); // Mejor que innerHTML +=

      // Obtener el último SVG añadido de forma más precisa
      var svgs = container.querySelectorAll("svg");
      var svg = svgs[svgs.length - 1];

      svg.id = `SVG_${step}`;
      svg.children[1].innerHTML = `\n    ${step + 1}\n  `;
      svg.children[2].innerHTML = `\n${stepName}\n  `;
      svg.children[2].setAttribute("x", "25");

      document.getElementById("Etapa").innerHTML = stepName;

      // Asignar el evento al SVG con el paso correspondiente
      svg.addEventListener("click", () => goBack(step));
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}
