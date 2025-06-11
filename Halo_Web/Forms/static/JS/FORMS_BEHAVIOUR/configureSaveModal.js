function configureSaveModal(modal){
    if(!modal.hasAttribute("set")){
        const modalBody=modal.querySelector(".modal-body")
        const container=document.createElement("div")
        const saveBtn=document.createElement("button")
        const message=document.createElement("p")
        message.innerText="Choose if you wanna create a ner register or modify the las one inserted"
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
        modifyBtn.setAttribute("hidden",null)
        modifyBtn.className="btn btn-primary"
        modifyBtn.setAttribute("data-bs-dismiss","modal")
        modifyBtn.addEventListener("click",()=>{
            saveData(false)
        })
        container.appendChild(message)
        container.appendChild(saveBtn)
        container.appendChild(modifyBtn)
        modalBody.appendChild(container)
        modal.setAttribute("data-set",null)
    }   
}

function configureNextModal(modal){
    if(!modal.hasAttribute("set")){
        const modalBody=modal.querySelector(".modal-body")
        const container=document.createElement("div")
        const saveBtn=document.createElement("button")
        const message=document.createElement("p")
        message.innerText="Choose if you wanna create a ner register or modify the las one inserted"
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
        modal.setAttribute("data-set",null)
    }   
}