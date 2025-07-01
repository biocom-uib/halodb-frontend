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
        inviteBtn.className="btn btn-primary"
        inviteBtn.innerText="Invite"
        if(parsedObject.span=="owner")
            inviteBtn.addEventListener("click",()=>{configureGroupModal(element.group_id,element.name)})
        body.appendChild(inviteBtn)
    }
}