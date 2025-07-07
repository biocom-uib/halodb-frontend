/**
 * @module SAMPLE
 */

/**
 * Adjust the modal body to show the Kind of Materials Options to follow the flux
 * @param {HTMLElement} modal -Modal HTMLElement
 */
function generateKomaModalBody(modal){
    modal.querySelector("h1").innerText="Select Kind of Material"
    const modalBody=modal.querySelector(".modal-body")
    const container=document.createElement("div")
    container.id="komaChooser"
    container.className="row d-flex justify-content-evenly w-100 row-cols-1 row-cols-md-4 g-2"
    generateSequenceItems(container)
    modalBody.appendChild(container)
}

/**
 * Introduce Sequences buttons in an specific container
 * @param {HTMLElement} container 
 */
function generateSequenceItems(container){
        SEQUENCES.forEach(element => {
            container.appendChild(generateModalButton(element,"/Forms/"))
        }); 
}