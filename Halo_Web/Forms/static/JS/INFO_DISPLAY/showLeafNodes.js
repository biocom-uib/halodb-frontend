async function showLeafNode(parent){
    const koma=localStorage.getItem("koma")
    const listContainer=document.getElementById("appendNodes").querySelector("ul")

    listContainer.innerHTML=""
    let table="raw reads"
    //Showing Sample
    if (koma){
        const stepName=parent.table
        const stepList= await fetchSecureFile("GET",`query/sequence/${koma}`)
        const nextStep=stepList.indexOf(stepName)+1
        table=stepList[nextStep]
        if(stepList.length<=nextStep)
            return -1
    }
    const rawList=await fetchSecureFile("GET",`user/list/${table}`)
    const matchElements = rawList.filter(obj => obj.source_id == parent.id);
    matchElements.forEach(element => {
        if (element.koma)
            table=element.koma==="PROTEOMICS" ? "PEPTIDES" : "RAW READS"
        const listElement=document.createElement("button")
        listElement.className="list-group-item"
        listElement.style.fontWeight="bold"
        listElement.id=element.id
        listElement.innerText=generarClasificador(parent.id,element.id,table).toUpperCase()
        listContainer.appendChild(listElement)
        listElement.addEventListener("click",()=>{
            displayStepInformation(listElement.id,table)
            updateParentList(parent)
        })
    });
}

function updateParentList(parent){
    const parentContainer=document.getElementById("appendParentNodes").querySelector("ul")
    parentContainer.innerHTML=""
    const parentButton=document.createElement("button")
    parentButton.className="list-group-item"
    parentButton.id=parent.id
    parentButton.innerText=parent.UID
    parentButton.addEventListener("click",()=>{
        let lastParent
        PARENT_NODES.pop()
        if(PARENT_NODES.length==1)
            lastParent=PARENT_NODES.pop()
        else{
            PARENT_NODES.pop()
            lastParent=PARENT_NODES[PARENT_NODES.length-1]
        }
        displayStepInformation(parent.id,parent.table)        
        updateParentList(lastParent)
    })
    parentContainer.appendChild(parentButton) 
}