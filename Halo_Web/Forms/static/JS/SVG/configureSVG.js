function configureSVG(svg){
    let step = Number(localStorage.getItem("actualStep"));
    let stepName = STEPS_NAME[step];

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