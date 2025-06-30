/**
 * Update the InfoDisplay information of associated steps
 * @param {Array} PARENT_NODES 
 */
function updateInfoDipslayBtn(PARENT_NODES){
    let STEPS_NAME
    const updateBtn=document.querySelector(".btn-secondary")
    const sampleInfo=document.getElementById("stepDataContainer")
    const saveBtn=document.getElementById("saveBtn")
    updateBtn.addEventListener("click",()=>{
        
        const inputList=sampleInfo.querySelectorAll("input")
        inputList.forEach(input=>{
            input.removeAttribute("readonly")
        })
        saveBtn.removeAttribute("hidden")
        saveBtn.addEventListener("click",async ()=>{
            if (localStorage.getItem("koma"))
                STEPS_NAME=await getSequenceSteps(localStorage.getItem("koma"))
            const actStep=PARENT_NODES.length
            const actNode=PARENT_NODES[actStep-1]
            const table=actStep==1 ? "Sample" : STEPS_NAME[actStep - 2]
            let fieldList={}
            inputList.forEach(item=>{
                value=item.type=="checkbox"?item.checked:item.value
                if(inputTypeFormat[item.type])
                    value=inputTypeFormat[item.type]?.(item,[])
                if(value)
                    fieldList[item.id]=value})
            updateExperiment(table,actNode.id,fieldList)
            inputList.forEach(input=>{
                input.setAttribute("readonly",null)
            })
            saveBtn.setAttribute("hidden",null)
        })
    })
}