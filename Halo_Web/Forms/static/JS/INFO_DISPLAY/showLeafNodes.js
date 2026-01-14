/**
 * @module INFO_DISPLAY
 */

/**
 * Generate a list of leaf nodes pending of a parent node
 * @param {Object} parent 
 * @returns -1 if error
 */
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
    let rawList
    if(window.location.pathname.includes("public"))
        rawList=await getFilterList(table)
    else
        rawList=await fetchSecureFile("GET",`user/list/${table.toLowerCase()}/`)
    const matchElements = rawList.filter(obj => getSourceid(obj) == parent.id);
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

/**
 * Shows only the actualls parent node of the most recent step
 * @param {Object} parent 
 */
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

function getSourceid(obj){
    const pgSources=["source_id_contigs","source_id_genome","source_id_single_cells","source_id_plasmid"]
    if ('source_id' in obj)
        return obj.source_id;

    for (const source of pgSources) {
        if (source in obj)
            return obj[source];
  }
}