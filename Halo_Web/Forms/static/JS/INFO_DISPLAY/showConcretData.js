function showData(table,id){
    /**
     * 1. Make API call
     * 2. Display Status information
     * 3. Displlay <STEP> Data
     * 4. Display Map coordenates
     */
}

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

NOT_DISPLAY_DATA=["shared_by_group","shared_by_others","group_id","group_relation","group_name","id","access_mode","project_id","is_public","user_id"]

async function initInfoDisplay(){
    PARENT_NODES=[]
    const params=window.location.pathname.slice('/halophile/infoDisplay/'.length).split("/")
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

async function displayStepInformation(id,table) {
    if (table==="SAMPLE"){
        localStorage.removeItem("koma")
    }
    const lastParent=PARENT_NODES[PARENT_NODES.length-1]
    const stepDataContainer=document.getElementById("stepDataContainer")
    stepDataContainer.innerHTML=""
    const stepList=await fetchSecureFile("GET",`user/list/${table}`)
    const resultado = stepList.find(obj => obj.id == id);
    const PARSED=Object.entries(resultado)
    PARSED.forEach(([key,value]) =>{
        const stepData=document.getElementById(key)
        if(stepData){
            const realValue= INFO_DISPLAY[key] ? INFO_DISPLAY[key](value) : value
            stepData.innerText=realValue
        }else
            generateInputRO(key,value,stepDataContainer)               
    })
    if(document.getElementById("koma"))
        localStorage.setItem("koma",document.getElementById("koma").value)
    PARENT_NODES.push({id:id,table:table,UID:table==="SAMPLE" ? resultado.name : generarClasificador(lastParent.id,id,table)})
    showLeafNode(PARENT_NODES[PARENT_NODES.length-1]) 
}

function generateInputRO(key,value,stepDataContainer){
    if (NOT_DISPLAY_DATA.includes(key))
        return
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
    stepDataContainer.appendChild(container)
}