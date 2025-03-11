/*
  LoadNextForm: Update form inputs fields 
*/
async function LoadNextForm(step) {
  const IS_LAST = step > 2 && step == (STEPS_NAME.length - 1);
  const PATH="https://bioinfo.uib.es/halophile/static/HTML/Forms/Experiments/".concat(STEPS_NAME[step],".html")
  await fetch(PATH)
    .then((response) => response.text())
    .then((data) => {
      const cardForm = document.getElementById("cardForm");
      const goBackButton = document.getElementById("goBack");

      cardForm.innerHTML = data;
      
      if (IS_LAST) 
        isLastChanges();
      
      goBackButton.style.visibility = step == 0 ? "hidden" : "Visible";

      if (step == 2) {
        const KOMA = document.getElementById("koma");
        KOMA.addEventListener("change", () =>
          ChangeKoma(KOMA.selectedIndex, KOMA.value)
        );
      }
    })
    .catch((error) => console.error("Error loadFixedForms: ", error));
}
