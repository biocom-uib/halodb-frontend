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
        const formsField=Array.from(auxForm.querySelectorAll("input"))
        const newInputs=formsField.filter(item=>item.type!="file")

        inputList.forEach(input=>{
            input.removeAttribute("readonly")
        })
        newInputs.forEach(input=>{
            console.log(input.id)
            if(!document.getElementById(input.id)){
                const container=document.createElement("div")
                const label=document.createElement("label")
                label.setAttribute("for",input.id)
                label.innerText=paramDict[input.id]
                container.appendChild(label)
                container.appendChild(input)
                sampleInfo.appendChild(container)
            }

                
        })
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