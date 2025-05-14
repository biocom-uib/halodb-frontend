/**
 * Insert & show informative modal about Sample insert. If the Sample has been uploaded
 * correctly, they would show a confirmation msg and allow to select a sequence
 * @param {string} ttl - Tittle of the modal
 * @param {string} msg - Main content of the Modal
 * @param {boolean} success - reflex if the uploaded has been succesfull
 */
async function configureModal(ttl,msg,success){
    
    const element = await generateModal()
    
    const modalTtl=element.getElementsByClassName("modal-title")[0]
    const modalMsg=element.getElementsByClassName("modal-body")[0]
    const modalFooterBtns=element.getElementsByClassName("modal-footer")[0].getElementsByTagName("button")
    //element.id=modalId
    modalTtl.innerText=ttl

    modalMsg.innerText=msg

    if (success){
        modalFooterBtns[0].innerText="Insert another Sample"
        modalFooterBtns[1].style.display="block"
        modalFooterBtns[1].innerText="Use for Experiments"
        modalFooterBtns[1].addEventListener("click",()=>{
            modalFooterBtns[1].style.display="none"
            generateKomaModalBody(element)
        })
    }
       
    document.querySelector('main').appendChild(element);
    const myModal = new bootstrap.Modal(element);
    myModal.show();
    
}

