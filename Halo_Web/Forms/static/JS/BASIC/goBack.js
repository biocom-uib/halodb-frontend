/*
1. Cargar formulario antiguo
1.1 Si el formulario es ==3, borrar path y names de los forms asociados al koma
2. Retornar los valores de cada campo
3. Actualizar step-by-step
*/
async function goBack(step) {
  const ACT_STEP = localStorage.getItem("actualStep");
  if (ACT_STEP == step) {
    return;
  } else if (step == -1) {
    step = ACT_STEP - 1;
  }
  localStorage.setItem("actualStep", step);
  await LoadNextForm(step);
  RecoverFieldsData();
  RemoveStep(step, ACT_STEP);
  document.getElementById("submit").innerText="Next"
  document.getElementById("Etapa").innerHTML = STEPS_NAME[step];
}
