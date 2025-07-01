function generateMultipleSelector(list,container,element,type){
    const typeDict={
        group:{
            "atr1":element.group_id,
            "atr1":element.groupName
        }
    }
    const atributes=typeDict
    const select=document.createElement("ul")
    const link=document.createElement("button")
    select.style.overflowY="scroll"
    select.style.maxHeight="30dvh"
    select.className="list-group"
    link.className="btn btn-success mt-3"
    link.href="#"
    link.innerText="Send invitation"
    label.setAttribute("for","userSelector")
    select.id="userSelector"
    container.appendChild(label)
    container.appendChild(select)
    container.appendChild(link)
    label.innerText="Select users to invite"
    list.forEach(user=>{
        const optionContainer=document.createElement("li")
        const info=document.createElement("label")
        const checkOption=document.createElement("input")    
        checkOption.type="checkbox"
        checkOption.setAttribute("data-group",atributes.atr1)
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

    link.addEventListener("click",()=>{
        const optionsList=document.querySelectorAll("li")
        optionsList.forEach(listItem=>{
            const check=listItem.querySelector("input[type='checkbox']")
            if(check.checked){
                const mail=listItem.querySelector("label").innerText
                const uid=check.id
                uploadOperationV2(callSpecs.type,
                    {
                    "groupId":atributes.atr1,
                    "userMail":mail,
                    "groupName":atributes.atr1,
                    "uid":uid
                    },
                    false)
            }
        })
    })

    return select
}