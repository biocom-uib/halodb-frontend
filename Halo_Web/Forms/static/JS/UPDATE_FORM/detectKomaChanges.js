function ChangeKoma(idx, name) {
  /*
    1. Borrar SVGs
    2. CamBiar el color del Card
    3. LoadNext
    */
  const KOMA_LABEL = document.getElementById("komaLabel");
  KOMA_LABEL.innerText = "Kind of Material: " + name;
  deleteSteps();
  changeColors(cardForm.classList, CARD_COLORS[idx]);
  localStorage.setItem("maxStepDone", 0);
  STEPS_NAME=STEPS_NAME.slice(0,3)
}
