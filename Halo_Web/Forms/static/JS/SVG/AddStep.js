const PAUSED_COLOR = "grey";

const ACTIVE_COLOR = "green";
/**
 * Show all steps to actual koma
 */
async function loadAllSteps() {
  const stepByStepContainer=document.getElementById("step-by-step")
  //Fetch the SVG template
  const DATA = await fetchSecureFile("static","Others/SVG_Active.html")
  for (let i=0;i<STEPS_NAME.length;i++){
    //Insert the HTML behind the last element
    stepByStepContainer.insertAdjacentHTML("beforeend", DATA);
    var svgs = stepByStepContainer.querySelectorAll("svg");
    configureSVG(svgs[svgs.length - 1],i,STEPS_NAME[i])
  }
  UpdateColor("SVG_" + 0, ACTIVE_COLOR); 
}

/**
 * Set up an SVG element with his specific number & Secuence name
 * @param {SVGElement} svg
 * @param {Number} step Number of the step
 * @param {String} stepName Name of te step
 */
async function configureSVG(svg,step,stepName) {
  svg.id = `SVG_${step}`;
  svg.children[1].innerHTML = step+1;
  svg.children[2].innerHTML = stepName
  if(stepName.includes(" ")){
    const parts=stepName.split(" ")
    svg.children[2].innerHTML = parts[0];
    svg.children[3].innerHTML = parts[1];
  }
  // Asignar el evento al SVG con el paso correspondiente
  svg.addEventListener("click", () => goBack(step));
}
/**
 * Allows to modify the color of concret step
 * @param {*} id 
 * @param {*} color 
 */
function UpdateColor(id, color) {
  let svg = document.getElementById(id);
  svg.children[0].attributes["fill"].value = color;
  svg.children[0].attributes["stroke"].value = color;
}
