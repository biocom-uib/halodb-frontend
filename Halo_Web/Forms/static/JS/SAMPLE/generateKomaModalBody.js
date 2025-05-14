/**
 * Adjust the modal body to show the Kind of Materials Options to follow the flux
 * @param {HTMLElement} modal -Modal HTMLElement
 */

function generateKomaModalBody(modal){
    modal.querySelector("h1").innerText="Select Kind of Material"
    const modalBody=modal.querySelector(".modal-body")
    modalBody.innerHTML='<div id="komaChooser" class="row d-flex justify-content-evenly w-100 row-cols-1 row-cols-md-2 g-2"></div>'
    const komaContainer=modalBody.querySelector("div")
    SEQUENCES.forEach(element => {
            komaContainer.appendChild(generateModalButton(element,"/Forms"))
        });   
}