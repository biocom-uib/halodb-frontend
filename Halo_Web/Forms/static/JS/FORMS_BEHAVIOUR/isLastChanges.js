/**
 * Changes made in the forms button to indicate that is the end of the sequence
 */
function isLastChanges(){
    const submitButton = document.getElementById("submit");
    const icon = document.createElement("i");
    
    icon.classList.add("bi", "bi-floppy");
    submitButton.innerText = "Save";
    submitButton.appendChild(icon);
}