async function AddStep(step,stepName) {
  const DATA = await fetchSecureFile("static","Others/SVG_Active.html")
  const CONTAINER=document.getElementById("step-by-step")
  CONTAINER.insertAdjacentHTML("beforeend", DATA);
  // Obtener el último SVG añadido de forma más precisa
  var svgs = CONTAINER.querySelectorAll("svg");
  var svg = svgs[svgs.length - 1];
  configureSVG(svg,step,stepName)
}

async function loadAllSteps() {
for (let i=0;i<STEPS_NAME.length;i++){
  await AddStep(i,STEPS_NAME[i])
}
UpdateColor("SVG_" + 0, ACTIVE_COLOR); 
}