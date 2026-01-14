
function get_input_field(key, value, the_list) {
    let found = null
    the_list.forEach(item => {if (item[key] === value) found = item})
    return found;
}

/**
 * Update the InfoDisplay information of associated steps
 * @param {Array} PARENT_NODES 
 */
function updateInfoDipslayBtn(PARENT_NODES){
    let STEPS_NAME
    const updateBtn=document.querySelector(".btn-secondary")
    const sampleInfo=document.getElementById("stepDataContainer")
    const saveBtn=document.getElementById("saveBtn")
    updateBtn.addEventListener("click",async ()=>{
        if (localStorage.getItem("koma"))
            STEPS_NAME=await getSequenceSteps(localStorage.getItem("koma"))
        const actStep=PARENT_NODES.length
        const actNode=PARENT_NODES[actStep-1]
        const table=actStep==1 ? "Sample" : STEPS_NAME[actStep - 2]

        const tableForm=await fetchSecureFile("static",`Forms/${table}.html`)
        const auxForm=document.createElement("div")
        auxForm.innerHTML=tableForm

        const inputList=Array.from(sampleInfo.querySelectorAll("input,select"))
        const formsField=Array.from(auxForm.querySelectorAll("input,select"))
        const newInputs=formsField.filter(item=>item.type!="file")

        inputList.forEach(input=>{
            input.removeAttribute("readonly")
        })
        newInputs.forEach(input=>{
            if(!document.getElementById(input.id)){
                const container=document.createElement("div")
                const label=document.createElement("label")
                let hiddenAssociatedInput = null;
                label.setAttribute("for",input.id)
                label.innerText=paramDict[input.id]
                container.appendChild(label)
                container.appendChild(input)
                if (input.id === "lati" || input.id === "long") {
                    container.setAttribute("type", "hidden");
                }
                sampleInfo.appendChild(container)
            }
            if(input.tagName=="SELECT"){
                const actInput=document.getElementById(input.id)
                const inputContainer=actInput.parentNode
                inputContainer.removeChild(actInput)
                inputContainer.appendChild(input)
            }

        })
        // Process and reorganize lati, long inputs
        // Get latitude and longitude inputs
        const latiInput = document.getElementById("lati");
        const longInput = document.getElementById("long");
        // Get their parent container
        if (latiInput && longInput) {
            const parentLatiContainer = latiInput.parentNode;
            const parentLongContainer = longInput.parentNode;
            // Get the views equivalent inputs
            const lati_viewInput = document.getElementById("lati_view");
            const long_viewInput = document.getElementById("long_view");
            // Get their parent container
            const parentLati_viewContainer = lati_viewInput.parentNode;
            const parentLong_viewContainer = long_viewInput.parentNode;
            const grandParentLati_viewContainer = parentLati_viewContainer.parentNode;
            const grandParentLong_viewContainer = parentLong_viewContainer.parentNode;
            let valueLati = latiInput.value;
            let valueLong = longInput.value;
            lati_viewInput.value = valueLati;
            long_viewInput.value = valueLong;
            latiInput.value = calculateLat(valueLati);
            longInput.value = calculateLon(valueLong);
            latiInput.setAttribute("type", "hidden");
            longInput.setAttribute("type", "hidden");
            parentLatiContainer.appendChild(lati_viewInput);
            parentLongContainer.appendChild(long_viewInput);
            // Append lati and long to
            // Remove the original inputs from the DOM
            grandParentLati_viewContainer.removeChild(parentLati_viewContainer);
            grandParentLong_viewContainer.removeChild(parentLong_viewContainer);
        }

        getSelectedItems(sampleInfo.querySelectorAll("select"))
        saveBtn.removeAttribute("hidden")
        saveBtn.addEventListener("click",async ()=>{
            const completeInputList=Array.from(sampleInfo.querySelectorAll("input,select"))
            updateStep(table,actNode.id,completeInputList)
            inputList.forEach(input=>{
                input.setAttribute("readonly",null)
            })
            saveBtn.setAttribute("hidden",null)
        })
    })
}