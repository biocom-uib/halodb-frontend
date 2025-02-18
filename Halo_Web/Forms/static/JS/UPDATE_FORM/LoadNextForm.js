/*
  LoadNextForm: Update form inputs fields 
*/
async function loadFixedForms(step) {
  await fetch(STATIC_FOMRS_PATH[step])
    .then((response) => response.text())
    .then((data) => {
      const IS_LAST = step > 2 && step == STEPS_NAME.length - 1;
      const KOMA = localStorage.getItem("koma");

      const cardForm = document.getElementById("cardForm");
      const submitButton = document.getElementById("submit");
      const goBackButton = document.getElementById("goBack");
      const komaLabel = document.getElementById("komaLabel");

      cardForm.innerHTML = data;
      submitButton.innerHTML = IS_LAST
        ? `Save<i class="bi bi-floppy"></i>`
        : "Next Step";
      goBackButton.style.visibility = step == 0 ? "hidden" : "Visible";
      if (komaLabel.dataset.selected == 0 && KOMA) {
        komaLabel.innerText += KOMA;
        komaLabel.dataset.selected = 1;
      }
      if (step == 2) {
        const KOMA = document.getElementById("koma");
        KOMA.addEventListener("change", () =>
          ChangeKoma(KOMA.selectedIndex, KOMA.value)
        );
      }
    })
    .catch((error) => console.error("Error loadFixedForms: ", error));
}
