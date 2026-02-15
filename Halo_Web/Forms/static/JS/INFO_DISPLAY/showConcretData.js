/**
 * @module INFO_DISPLAY
 */

let PARENT_NODES

/**
 * Initalize the infoDispllay Page Basic Data
 */
async function initInfoDisplay(){
    PARENT_NODES=[]

    //const params=window.location.pathname.slice(generatePath('/infoDisplay/').length).split("/")

    /** Get the id and table from the URL. The URL has the format /infoDisplay/{table}/{id} */
    const params=window.location.pathname.split("/")
    /** remove trailing empty element if the URL ends with a slash */
    if(params[params.length-1]=="")
        params.pop()
    const table=params[params.length-2].toUpperCase()
    const id=params[params.length-1]
    const doiCont=document.querySelector(".modal-body")
    const doiAdd=doiCont.querySelector("button")
    const doiInput=doiCont.querySelector("input[type='text']")
    const doiList=doiCont.querySelector("ul")
    const doiSaveBtn=document.querySelector(".modal-footer").querySelector(".btn-success")

    await displayStepInformation(id,table)
    document.getElementById("midZone").querySelector("span").innerText=table
    document.getElementById("expBtn").addEventListener("click",async ()=>{
        const element=await generateModal()
        generateKomaModalBody(element)
        document.querySelector('main').appendChild(element);
        const myModal = new bootstrap.Modal(element);
        myModal.show();
    })
    const lat=document.getElementById("lati").value;
    const long=document.getElementById("long").value;

    if(lat && long)
        initMap(calculateLat(lat),
                calculateLon(long));

    localStorage.setItem("sampleSrc",id);

    doiAdd.addEventListener("click",()=>{
        const li=document.createElement("li")
        li.innerText=doiInput.value
        doiList.appendChild(li)
    })

    doiSaveBtn.addEventListener("click",()=>{
        let list=[]
        doiList.querySelectorAll("li").forEach(item=>list.push(item.innerText))
        const updateBody=
        [    {id:"is_public",value:"1"},
            {id:"dois",value:list}
        ]
        const actualNode=PARENT_NODES.pop()
        updateStep(actualNode.table,actualNode.id,updateBody)
        displayStepInformation(actualNode.id,actualNode.table)
    })
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
    let stepList
    if(window.location.pathname.includes("public"))
        stepList=await getFilterList(table)
    else // TODO: change to query only the table with the id provided `${table}/${id}`
        stepList=await fetchSecureFile("GET",`user/list/${table}/`)

    updateStepDataContainer(Object.entries(stepList.find(obj => obj.id == id)),table,id)

    if(!koma && document.getElementById("koma"))
        localStorage.setItem("koma",document.getElementById("koma").value)
    const parentNode={
        id:id,
        table:table,
        UID:table==="SAMPLE" ? document.getElementById("name").value 
                            : generarClasificador(lastParent.id,id,table)
    }
    PARENT_NODES.push(parentNode)
    showLeafNode(PARENT_NODES[PARENT_NODES.length-1])
    updateInfoDipslayBtn(PARENT_NODES) 
}
/**
 * Returns an Read Only input container 
 * @param {String} key 
 * @param {Object} value 
 * @returns Container with read-only input wiht his specific label & value
 */
function generateInputRO(key,value,object=null){
    const container=document.createElement("div")
    const label=document.createElement("label")
    let input=document.createElement("input")

    label.innerText=paramDict[key]
    label.setAttribute("for",key)
    label.className="form-label"


    
    if(object){
        input=document.createElement("button")
        addDownloadBtn(key,object.id,object.table,input)
        input.className="btn btn-primary"
        container.className="d-flex justify-content-between align-items-center"
    }else{
        input.setAttribute("readonly",null)
        input.value=value
        input.className="form-control"
    }
    input.id=key

    container.appendChild(label)
    container.appendChild(input)
    
    return container
}


/**
 * Create/Fill Step information with fetched data
 * @param {Array} objectiveData
 */
function updateStepDataContainer(objectiveData,table,id){
    const INFO_DISPLAY={
        is_public:(value)=>{
            const container=document.getElementById("public").parentElement
            if (value=="0"){
                const span=container.querySelector("span")
                span.style.color="red"
                return "NO"
            }else{
                container.parentElement.querySelector("button").setAttribute("hidden",null)
                return "YES"
            }

        },
        public:(value)=> {
            const container=document.getElementById("public").parentElement
            if (value=="0"){
                container.parentElement.querySelector("button").removeAttribute("hidden")
                const span=container.querySelector("span")
                span.style.color="red"
                return "NO"
            }else
                return "YES"

        },
        created: (raw)=>raw.replace('T',' '),
        updated: (raw)=>{
            if(!window.location.pathname.includes("public"))
                document.getElementById("updated").removeAttribute("hidden")
            raw.replace('T',' ')},
        owned: (value)=>{
            if(value==1) 
                return "You"
            else{
                document.getElementById("publishBtn").setAttribute("hidden",null)
                return "Others"
            }
        },
        user_id:async(value)=>{
            const owned=document.getElementById("owned")
            const userList=await fetchSecureFile("GET","public/users/")
            const owners=userList.filter(user=>user.id==value)
            owned.innerText=owners[0].name.concat(" ",owners[0].surname)
            return 0
        },
        lati: (raw) => {
            // const view = document.getElementById("lati_view")
            if (raw) {
            //    view.value=formatLatLon(raw, true);
                return formatLatLon(raw, true);
            }
        },
        long: (raw) => {
            // const view = document.getElementById("long_view")
            if (raw) {
            //    view.value=formatLatLon(raw, false);
            }
            return formatLatLon(raw, false);
        },
        // TODO: keywords and hkgenes should be fetch from the server.
    }
    const FILE_INPUTS=["rreads","rreads2","treads","assembled","pgenes"]

    const NOT_DISPLAY_DATA=["shared_by_group",
                    "shared_by_others",
                    "group_id",
                    "group_relation",
                    "group_name",
                    "id",
                    "access_mode",
                    "project_id",
                    "is_public",
                    "owned",
                    "public",
                    "updated",
                    "user_id"]

    const stepDataContainer=document.getElementById("stepDataContainer")
    stepDataContainer.innerHTML=""

    objectiveData.forEach(([key,value]) =>{
        let object=null
        const editBtn=document.getElementById("editBtn")
        if(key==="access_mode" && value==="readwrite")
            editBtn.removeAttribute("hidden")
        const stepData=document.getElementById(key)
        if(stepData)
            stepData.innerText = INFO_DISPLAY[key] ? INFO_DISPLAY[key](value) : value  
        if(!NOT_DISPLAY_DATA.includes(key)){
             if(FILE_INPUTS.includes(key) && value)
                object={"id":id,"table":table}
             if (key==="lati" || key==="long")
                value=INFO_DISPLAY[key](value)
            stepDataContainer.appendChild(generateInputRO(key,value,object))}
       
        INFO_DISPLAY[key]?.(value)               
    })
}