/*
  LoadNextForm: Update form inputs fields 
*/
async function LoadNextForm(step) {
  const IS_LAST = step > 0 && step == (STEPS_NAME.length - 1);
  const DATA = await fetchSecureFile("static",`Forms/${STEPS_NAME[step]}.html`)
  const cardForm = document.getElementById("cardForm");
  const goBackButton = document.getElementById("goBack");
  cardForm.innerHTML = DATA;
  getSelectedItems(document.getElementsByTagName("select")) 
  if (IS_LAST) 
    isLastChanges()
      
  goBackButton.style.visibility = step == 0 ? "hidden" : "Visible";

  if (step == 0) {
    const KOMA = document.getElementById("koma");
    KOMA.addEventListener("change", () =>
      ChangeKoma(KOMA.selectedIndex, KOMA.value)
    );
  }
}
