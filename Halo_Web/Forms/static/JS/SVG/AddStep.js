function AddStep() {
  fetch(`${STATIC_BASE_URL}/HTML/Others/SVG_Active.html`)
    .then((response) => response.text())
    .then((data) => {
      
      let step = Number(localStorage.getItem("actualStep"));
      let stepName = STEPS_NAME[step];

      var container = document.getElementById("step-by-step");
      container.insertAdjacentHTML("beforeend", data);

      // Obtener el último SVG añadido de forma más precisa
      var svgs = container.querySelectorAll("svg");
      var svg = svgs[svgs.length - 1];
      svg.setAttribute("height", 200); // Cambia el color a rojo

      svg.id = `SVG_${step}`;
      svg.children[1].innerHTML = `\n    ${step + 1}\n  `;
      svg.children[2].innerHTML = `\n${stepName}\n  `;
      svg.children[2].setAttribute("text-anchor", "middle");
      svg.children[2].setAttribute("x", "50%");
      if(stepName.includes(" ")){
        const parts=stepName.split(" ")
        svg.children[2].innerHTML = `\n${parts[0]}\n `;
        svg.appendChild(appendTextSVG())
        svg.children[3].innerHTML = `\n${parts[1]}\n `;
        svg.children[3].setAttribute("text-anchor", "middle");
        svg.children[3].setAttribute("x", "50%");
      }
      // Asignar el evento al SVG con el paso correspondiente
      svg.addEventListener("click", () => goBack(step));
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}


function appendTextSVG() {
  const SVG_TEXT = document.createElementNS("http://www.w3.org/2000/svg", "text"); // Crear un elemento SVG correctamente
  SVG_TEXT.setAttribute("fill", "#000000");
  SVG_TEXT.setAttribute("font-size", "13"); // Se agrega un tamaño de fuente
  SVG_TEXT.setAttribute("font-family", "Verdana");
  SVG_TEXT.setAttribute("x", "15");
  SVG_TEXT.setAttribute("y", "125");
  SVG_TEXT.textContent = "Hola Mundo"; // Agregar contenido de texto

  return SVG_TEXT;
}