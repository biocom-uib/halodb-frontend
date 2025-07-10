/**
 * @module PROFILE
 */

/**
 * Set the element information to the card 
 * @param {HTMLElement} container 
 * @param {Object} element 
 */
async function updateCardData(container,element,type){
    const cardType={
        sample:{
            "h5":element.name,
            "p":element.stype,
            "span":element.updated
        },
        sharedSample:{
            "h5":element.name,
            "p":element.stype,
            "span":element.updated
        },
        group:{

            "h5":element.name,
            "p":element.description,
            "span":element.relation
        }
    }
    const parsedObject=cardType[type]
    container.querySelector("h5").innerText=parsedObject.h5
    container.querySelector("p").innerText=parsedObject.p
    container.querySelector("span").innerText=parsedObject.span
    if(type=="group"){
        container.href="#"
        const inviteBtn=document.createElement("btn")
        const body=container.querySelector(".card-body")
        inviteBtn.className="btn btn-info"
        inviteBtn.innerHTML=`Invite <i class="bi bi-send-fill"></i>`
        if(parsedObject.span=="owner"){
            inviteBtn.addEventListener("click",()=>{configureGroupModal(element.group_id,element.name)})
            body.appendChild(inviteBtn)}
        else if(parsedObject.span=="invite"){
            const accpetBtn=document.createElement("button")
            const declineBtn=document.createElement("button")
            
            accpetBtn.innerHTML='<i class="bi bi-check-square-fill"></i>'
            declineBtn.innerHTML='<i class="bi bi-x-square-fill"></i>'

            accpetBtn.className="btn btn-success"
            declineBtn.className="btn btn-danger"

            body.appendChild(accpetBtn)
            body.appendChild(declineBtn)
        }
        
    }
}