/**
 * Configure a modal item to allow add new users to a group
 * @param {number} group_id 
 * @param {string} groupName 
 */
async function configureGroupModal(group_id,groupName){
    const modal=await generateModal()
    const label=document.createElement("label")
    const select=document.createElement("ul")
    const USER_LIST=await fetchSecureFile("GET","public/users/")
    const modalBody=modal.querySelector(".modal-body")

    const link=document.createElement("button")

    select.style.overflowY="scroll"
    select.style.maxHeight="30dvh"
    select.className="list-group"
    link.className="btn btn-success mt-3"
    link.href="#"
    link.innerText="Send invitation"
    label.setAttribute("for","userSelector")
    select.id="userSelector"
    modalBody.appendChild(label)
    modalBody.appendChild(select)
    modalBody.appendChild(link)
    label.innerText="Select users to invite"
    USER_LIST.forEach(user=>{
        const optionContainer=document.createElement("li")
        const info=document.createElement("label")
        const checkOption=document.createElement("input")    
        checkOption.type="checkbox"
        checkOption.setAttribute("data-group",group_id)
        checkOption.id=user.uid
        checkOption.className="form-check-input"
        info.className="form-check-lable ps-1"
        info.setAttribute("for",user.uid) 
        info.innerText=user.email

        optionContainer.className="list-group-item"
        optionContainer.appendChild(checkOption)
        optionContainer.appendChild(info)
        select.appendChild(optionContainer)
    })
    const myModal = new bootstrap.Modal(modal)
    myModal.show()

    link.addEventListener("click",()=>{
        const optionsList=document.querySelectorAll("li")
        optionsList.forEach(listItem=>{
            const check=listItem.querySelector("input[type='checkbox']")
            if(check.checked){
                const mail=listItem.querySelector("label").innerText
                const uid=check.id
                console.log(`User ${mail} with ${uid} invited to group ${group_id}`)
                uploadOperationV2("group_invite",
                    {
                    "groupId":group_id,
                    "userMail":mail,
                    "groupName":groupName,
                    "uid":uid
                    },
                    false)
            }
        })
    })

}