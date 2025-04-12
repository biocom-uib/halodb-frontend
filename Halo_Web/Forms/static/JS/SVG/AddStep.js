async function AddStep() {
  const DATA = await fetchSecureFile("static","Others/SVG_Active.html")
  const CONTAINER=document.getElementById("step-by-step")
  CONTAINER.insertAdjacentHTML("beforeend", DATA.message);
  // Obtener el último SVG añadido de forma más precisa
  var svgs = CONTAINER.querySelectorAll("svg");
  var svg = svgs[svgs.length - 1];
  configureSVG(svg)
}
