/**
 * @module FORMS_BEHAIVOUR
 */

/**
 * Configurates an intruced Modal to show it as a Save Modal
 * @param {HTMLElement} modal 
 */
function configureSaveModal(modal){
    if(!modal.hasAttribute("data-ready")){
        const modalBody=modal.querySelector(".modal-body")
        const container=document.createElement("div")
        const saveBtn=document.createElement("button")
        const message=document.createElement("p")
        message.innerText="Choose if you want to create a new register o modify the last one inserted"
        container.className="container d-flex justify-content-end align-items-end"
        const modifyBtn=document.createElement("button")
        
        saveBtn.innerText="Save"
        saveBtn.className="btn btn-primary"
        saveBtn.setAttribute("data-clicked",0)
        saveBtn.setAttribute("data-bs-dismiss","modal")
        saveBtn.addEventListener("click",()=>{
            saveData(true)
            modifyBtn.removeAttribute("hidden")
        })    
        modifyBtn.innerText="Modify"
        modifyBtn.className="btn btn-primary"
        modifyBtn.setAttribute("data-bs-dismiss","modal")
        modifyBtn.addEventListener("click",()=>{
            saveData(false)
        })
        container.appendChild(message)
        container.appendChild(saveBtn)
        container.appendChild(modifyBtn)
        modalBody.appendChild(container)
        modal.setAttribute("data-ready",null)
    }   
}

/**
 * Configurates an intruced Modal to show it as a Next Modal
 * @param {HTMLElement} modal 
 */
function configureNextModal(modal){
    if(!modal.hasAttribute("data-ready")){
        const modalBody=modal.querySelector(".modal-body")
        const container=document.createElement("div")
        const saveBtn=document.createElement("button")
        const message=document.createElement("p")
        message.innerText="Choose if you want to create a new register o modify the last one inserted"
        container.className="container d-flex justify-content-end align-items-end"
        const modifyBtn=document.createElement("button")
        
        saveBtn.innerText="Save"
        saveBtn.className="btn btn-primary"
        saveBtn.setAttribute("data-clicked",0)
        saveBtn.setAttribute("data-bs-dismiss","modal")
        saveBtn.addEventListener("click",()=>{
            saveData(true)
            FormEventManagement()
        })    
        modifyBtn.innerText="Go Next"
        modifyBtn.setAttribute("hidden",null)
        modifyBtn.className="btn btn-primary"
        modifyBtn.setAttribute("data-bs-dismiss","modal")
        modifyBtn.addEventListener("click",()=>{
            FormEventManagement()
        })
        container.appendChild(message)
        container.appendChild(saveBtn)
        container.appendChild(modifyBtn)
        modalBody.appendChild(container)
        modal.setAttribute("data-ready",null)
    }   
}