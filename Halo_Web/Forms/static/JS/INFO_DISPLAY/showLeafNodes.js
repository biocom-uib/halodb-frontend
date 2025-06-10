async function showLeafNode(parentId,parentTable){
    const koma=localStorage.getItem("koma")
    const listContainer=document.getElementById("appendNodes").querySelector("ul")
    listContainer.innerHTML=""
    let matchElements,rawList,table
    //Showing Sample
    if (!koma){
        table=["raw reads","peptides"]
        const rawList_1=await fetchSecureFile("GET",`user/list/raw reads`)
        const rawList_2=await fetchSecureFile("GET",`user/list/peptides`)
        rawList=rawList_1.concat(rawList_2)
    }else{
        const stepName=localStorage.getItem("infStepName")
        const nextStep=stepList.indexOf(stepName)+1
        const stepList= await fetchSecureFile("GET",`sequences/${koma}`)
        table=stepList[nextStep]
        if(stepList.length<=nextStep)
            return -1
        rawList=await fetchSecureFile("GET",`user/list/${table}`)
    }
    matchElements = rawList.filter(obj => obj.source_id == parentId);
    matchElements.forEach(element => {
        const listElement=document.createElement("button")
        listElement.className="list-group-item"
        listElement.id=element.id
        listElement.innerText=element.id
        listContainer.appendChild(listElement)
        listElement.addEventListener("click",()=>{
            table.forEach(element =>{
                displayStepInformation(listElement.id,element)
                const parentButton=document.createElement("button")
                parentButton.className="list-group-item"
                parentButton.id=parentId
                parentButton.innerText=parentId
                parentButton.addEventListener("click",()=>{
                    displayStepInformation(parentButton.id,parentTable)

                })
                document.getElementById("appendParentNodes").querySelector("ul").appendChild(parentButton)
            })     
        })
    });
}