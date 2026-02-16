/**
 * @module INFO_DISPLAY
 */

let PARENT_NODES

/**
 * Initalize the infoDispllay Page Basic Data
 */
async function initInfoDisplay(){
    PARENT_NODES=[]

    /** Get the id and table from the URL. The URL has the format /infoDisplay/{table}/{id} */
    const params=window.location.pathname.slice(generatePath('/infoDisplay/').length).split("/")
    /** remove trailing empty element if the URL ends with a slash */

    //const table=params[params.length-2].toUpperCase()
    //const id=params[params.length-1]
    const table=params[0].toUpperCase()
    const id=params[1]
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
    else
        // TODO: change this endpoint to get the specific object instead of the whole list. This is a temporal solution to avoid make another API call to get the object information, since we already have the list in the filter page.
         // stepList=await fetchSecureFile("GET",`user/list/${table}/`)
        stepList=await fetchSecureFile("GET", `${table}/${id}`)

    //updateStepDataContainer(Object.entries(stepList.find(obj => obj.id == id)),table,id)

    updateStepDataContainer(Object.entries(stepList.SAMPLE), table, id)

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

function generateReadonlyItemPicker(key, value, readonly = true, url = '') {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.innerText = paramDict[key] || key;
    label.setAttribute("for", key);
    label.className = "form-label";

    const mount = document.createElement("div");
    mount.id = `${key}-readonly-widget`;

    const rawList = Array.isArray(value)
        ? value
        : (value ? String(value).split(",").map(item => item.trim()).filter(Boolean) : []);

    const normalized = rawList.map(item => {
        if (item && typeof item === "object") {
            const id = item.id ?? item.keyword ?? item.label ?? item.description ?? "";
            const text = item.label ?? item.keyword ?? item.description ?? id;
            return { id: String(id), label: String(text) };
        }
        return { id: String(item), label: String(item) };
    });

    const selected = normalized.map(item => item.id);

    container.appendChild(label);
    container.appendChild(mount);

    if (typeof ItemPicker === "undefined") {
        const fallback = document.createElement("input");
        fallback.setAttribute("readonly", null);
        fallback.className = "form-control";
        fallback.value = normalized.map(item => item.label).join(", ");
        container.appendChild(fallback);
        return container;
    }

    const picker = new ItemPicker(mount, {
        options: normalized,
        values: selected,
        multiple: true,
        readonly: true,
        collapsed: true,
        allowCreate: false
    });
    mount._itempicker = picker;
    return container;
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
        keywords: (list) => Array.isArray(list) ? list.join(", ") : (list || "")

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

    /**
     * La intenció de tot això és donar valor als camps a partir de les dades recollides.
     *
     * Si el camp té una funció de format dins de INFO_DISPLAY, s'aplica aquesta funció al valor abans de mostrar-lo. Si no, es mostra el valor tal qual.
     * A més, només es mostren els camps que no estan inclosos a NOT_DISPLAY_DATA. Per als camps que són fitxers (definits a FILE_INPUTS), en lloc de mostrar el valor directament, es genera un botó de descàrrega utilitzant la funció generateInputRO amb un objecte que conté l'id i la taula corresponent.
     *
     * Tot això s'ha de redissenyar. El servidor ja dona les dades que s'han de mostrar, així que no cal aplicar formats específics ni tenir una llista de camps a no mostrar. Hauríem de confiar en el servidor per proporcionar les dades correctes i només mostrar-les tal com són, o aplicar formats genèrics
     * si és necessari (per exemple, per a dates o coordenades). Això simplificaria molt el codi i evitaria problemes de manteniment a llarg termini.
     *
     * Només s'ha de revisar alguns camps. I fer que siguin de només lectura inicialment, perquè es suposa que
     * les dades es mostren tal com són i no s'han de modificar. Si es volen modificar, s'ha de fer a través d'un
     * botó d'edició que permeti canviar els camps a editables, i després guardar els canvis al servidor.
     */

    objectiveData.forEach(([key,value]) =>{
        let object=null
        const editBtn=document.getElementById("editBtn")
        if(key==="access_mode" && value==="readwrite")
            editBtn.removeAttribute("hidden")
        const stepData=document.getElementById(key)
        if(stepData)
            stepData.innerText = INFO_DISPLAY[key] ? INFO_DISPLAY[key](value) : value  
        if(!NOT_DISPLAY_DATA.includes(key)){
             if (key==="keywords"){
                stepDataContainer.appendChild(generateReadonlyItemPicker(key, value, true, ''))

             } else {
                 if (FILE_INPUTS.includes(key) && value)
                     object = {"id": id, "table": table}
                 if (key === "lati" || key === "long")
                     value = INFO_DISPLAY[key](value)
                 stepDataContainer.appendChild(generateInputRO(key, value, object))

                 INFO_DISPLAY[key]?.(value)
             }
        }

    })
}
