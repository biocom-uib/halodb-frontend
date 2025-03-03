function isLastChanges(){
    const submitButton = document.getElementById("submit");
    const icon = document.createElement("i");
        icon.classList.add("bi", "bi-floppy");
        submitButton.innerText = "Save";
        submitButton.appendChild(icon);
}