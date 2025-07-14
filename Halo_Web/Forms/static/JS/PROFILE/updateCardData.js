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
        else if(parsedObject.span=="invited"){
            const btnContainer=document.createElement("div")
            const acceptBtn=document.createElement("button")
            const declineBtn=document.createElement("button")
            
            btnContainer.id=element.id
            btnContainer.className="container d-flex justify-content-between"

            acceptBtn.innerHTML='Accept <i class="bi bi-check-square-fill"></i>'
            declineBtn.innerHTML='Refuse <i class="bi bi-x-square-fill"></i>'

            acceptBtn.className="btn btn-success"
            declineBtn.className="btn btn-danger"

            acceptBtn.addEventListener("click",async()=>{
                await uploadOperation(null,null,`/group/accept/${element.group_id}`)
            })
            declineBtn.addEventListener("click",async()=>{
                await uploadOperation(null,null,`/group/decline/${element.group_id}`)
            })

            btnContainer.appendChild(acceptBtn)
            btnContainer.appendChild(declineBtn)

            body.appendChild(btnContainer)
        }
        
    }
}