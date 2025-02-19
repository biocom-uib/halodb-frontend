/*
  LoadNextForm: Update form inputs fields 
*/
async function LoadNextForm(step,IS_LAST) {
  await fetch(STATIC_FOMRS_PATH[step])
    .then((response) => response.text())
    .then((data) => {
      

      const cardForm = document.getElementById("cardForm");
      const submitButton = document.getElementById("submit");
      const goBackButton = document.getElementById("goBack");

      cardForm.innerHTML = data;
      if (IS_LAST) {
        const icon = document.createElement("i");
        icon.classList.add("bi", " bi-floppy");
        submitButton.innerText = "Save";
        submitButton.appendChild(icon);
        submitButton.removeEventListener("submit");
        submitButton.addEventListener("submit",()=>window.location.assign("/Summary"))
        submitButton.role = "link";
      }
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
