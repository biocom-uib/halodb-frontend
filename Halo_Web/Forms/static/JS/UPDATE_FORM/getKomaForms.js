async function getKomaForms() {
  var path_list = [];
  var step_list = [];

  try {
    const response = await fetch("\\static\\JSON\\komaSteps.json"); // Espera la respuesta de fetch
    const data = await response.text(); // Espera la conversión a texto

    const PARSED_DATA = JSON.parse(data);
    const KOMA = localStorage.getItem("koma"); // Obtén el "koma" de localStorage
    const KOMA_DATA = PARSED_DATA.experiments.find(
      (exp) => exp.koma.toUpperCase() === KOMA
    );

    const EXP_STEPS = KOMA_DATA.steps;
    const PATH = PARSED_DATA.path;

    // Rellena las listas con datos
    for (let idx in EXP_STEPS) {
      let step = EXP_STEPS[idx];
      let completePath = PATH.concat(step.path);

      path_list.push(completePath);
      step_list.push(step.name);
    }

    return [path_list, step_list];
  } catch (error) {
    console.error("Error en getKomaForms:", error);
  }
}
