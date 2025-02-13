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
  }

  localStorage.setItem("actualStep", step);
  await loadFixedForms(step);
  RecoverFieldsData();
  RemoveStep(step, ACT_STEP);
  document.getElementById("Etapa").innerHTML = STEPS_NAME[step];
  if (step < 3) {
    const komaLabel = document.getElementById("komaLabel");
    const CARD = document.getElementById("cardForm");
    STEPS_NAME = STEPS_NAME.slice(0, 3);
    STATIC_FOMRS_PATH = STATIC_FOMRS_PATH.slice(0, 3);
    changeColors(CARD.classList, DEFULT_CARD_COLOR);
    komaLabel.dataset.selected = 0;
    komaLabel.innerText = "Koma:";
  }
}

async function RecoverFieldsData() {
  const cardForm = document.getElementById("cardForm");
  const inputList = Array.from(cardForm.getElementsByTagName("input"));
  const textareaList = Array.from(cardForm.getElementsByTagName("textarea"));
  const selectList = Array.from(cardForm.getElementsByTagName("select"));
  const simpleItem = inputList.concat(textareaList);
  var item, i, storedValue;
  for (i in simpleItem) {
    item = simpleItem[i];
    storedValue = localStorage.getItem(item.id);
    item.value = storedValue;
  }
  for (i in selectList) {
    item = selectList[i];
    storedValue = localStorage.getItem(item.id);
    document.getElementById(item.id).value = storedValue;
  }
}
