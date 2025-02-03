/*
1. Cargar formulario antiguo
1.1 Si el formulario es ==3, borrar path y names de los forms asociados al koma
2. Retornar los valores de cada campo
3. Actualizar step-by-step
*/
async function goBack() {
  const newStep = Number(localStorage.getItem("actualStep")) - 1;
  localStorage.setItem("actualStep", newStep);
  await loadFixedForms(newStep);
  RecoverFieldsData();
  RemoveStep(newStep);
  document.getElementById("Etapa").innerHTML = STEPS_NAME[newStep];
}

async function RecoverFieldsData() {
  var form = document.getElementById("Sample");
  var inputList = Array.from(form.getElementsByTagName("input"));
  var textareaList = Array.from(form.getElementsByTagName("textarea"));
  var selectList = Array.from(form.getElementsByTagName("select"));
  var item, idx, storedValue;
  for (idx in inputList) {
    item = inputList[idx];
    storedValue = localStorage.getItem(item.id);
    item.value = storedValue;
  }
  for (idx in textareaList) {
    item = textareaList[idx];
    storedValue = localStorage.getItem(item.id);
    item.value = storedValue;
  }
  for (idx in selectList) {
    item = selectList[idx];
    storedValue = localStorage.getItem(item.id);
    document.getElementById(item.id).value = storedValue;
  }
}
