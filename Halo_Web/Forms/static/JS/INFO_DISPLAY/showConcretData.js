let PARENT_NODES

INFO_DISPLAY={
    public:(value)=> {
        const container=document.getElementById("public").parentElement
        if (value=="0"){
            const span=container.querySelector("span")
            span.style.color="red"
            return "NO"
        }else{
            container.querySelector("button").setAttribute("hidden",null)
            return "YES"
        }
    },
    created: (raw)=>raw.replace('T',' '),
    updated: (raw)=>raw.replace('T',' '),
    owned: (value)=>"You"
}

NOT_DISPLAY_DATA=["shared_by_group",
                    "shared_by_others",
                    "group_id",
                    "group_relation",
                    "group_name",
                    "id",
                    "access_mode",
                    "project_id",
                    "is_public",
                    "user_id"]
/**
 * Initalize the infoDispllay Page Basic Data
 */
async function initInfoDisplay(){
    PARENT_NODES=[]
    const params=window.location.pathname.slice(generatePath('/infoDisplay/').length).split("/")
    const table=params[0]
    const id=params[1]
    await displayStepInformation(id,table)
    document.getElementById("expBtn").addEventListener("click",async ()=>{
        const element=await generateModal()
        generateKomaModalBody(element)
        document.querySelector('main').appendChild(element);
        const myModal = new bootstrap.Modal(element);
        myModal.show();
    })
    const lat=document.getElementById("lati").value
    const long=document.getElementById("long").value
    initMap(lat,long)

    localStorage.setItem("sampleSrc",id)
}

/**
 * Insert into a form, the data of an specific table row
 * @param {Number} id 
 * @param {String} table 
 */
async function displayStepInformation(id,table) {
    const koma=localStorage.getItem("koma")
    if (table==="SAMPLE"){
        localStorage.removeItem("koma")
    }
    const lastParent=PARENT_NODES[PARENT_NODES.length-1]
    const stepDataContainer=document.getElementById("stepDataContainer")
    const stepList=await fetchSecureFile("GET",`user/list/${table}`)
    const PARSED = Object.entries(stepList.find(obj => obj.id == id));
    stepDataContainer.innerHTML=""
    PARSED.forEach(([key,value]) =>{
        const stepData=document.getElementById(key)
        stepData ?
            stepData.innerText= INFO_DISPLAY[key] ? INFO_DISPLAY[key](value) : value 
            : stepDataContainer.appendChild(!NOT_DISPLAY_DATA.includes(key) &&
                                                            generateInputRO(key,value))               
    })
    koma && localStorage.setItem("koma",document.getElementById("koma").value)
    const parenNode={
        id:id,
        table:table,
        UID:table==="SAMPLE" ? resultado.name 
                            : generarClasificador(lastParent.id,id,table)
    }
    PARENT_NODES.push(parenNode)
    showLeafNode(PARENT_NODES[PARENT_NODES.length-1]) 
}
/**
 * Returns an Read Only input container 
 * @param {String} key 
 * @param {Object} value 
 * @returns Container with read-only input wiht his specific label & value
 */
function generateInputRO(key,value){
    const container=document.createElement("div")
    const label=document.createElement("label")
    const input=document.createElement("input")

    label.innerText=paramDict[key]
    label.setAttribute("for",key)
    label.className="form-label"

    input.setAttribute("readonly",null)
    input.value=value
    input.className="form-control"
    input.id=key

    container.appendChild(label)
    container.appendChild(input)
    return container
}