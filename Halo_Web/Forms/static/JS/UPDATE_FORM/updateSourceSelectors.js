async function updateSourceSelectors(step){
    const sourceCont=document.getElementById("sourceSelectors")
    const actSelectors=sourceCont.querySelectorAll(".col")
    //Remove list
    if(actSelectors.length-1>step){
        let diff=actSelectors.length-1-step
        while (diff>0){
            sourceCont.removeChild(sourceCont.lastChild)
            diff--
        }
    }else if(actSelectors.length-1<step){
        let diff=step-actSelectors.length+1
        let first=true
        while (diff>0){
            const stepName=STEPS_NAME[step-diff]
            const previousSelect=document.getElementById(first ? "sourceSample":`select_${stepName}`)
            const newSourceSelect=await newSourceSelector(stepName,previousSelect.value)
            sourceCont.appendChild(newSourceSelect)
            previousSelect.addEventListener("change",()=>{
                updateSourceOptions(newSourceSelect.querySelector("select"),previousSelect.value,stepName)
            })
            diff=diff-1
            first=false
        }
    }
}

async function newSourceSelector(stepName,sourceValue){
    const selectId=`select_${stepName}`
    const container=document.createElement("div")
    const label=document.createElement("label")
    const select=document.createElement("select")

    container.className="col"

    label.setAttribute("for",selectId)
    label.innerText=stepName
    
    select.id=selectId
    select.className="form-select"

    await updateSourceOptions(select,sourceValue,stepName)

    container.appendChild(label)
    container.appendChild(select)

    return container
}

async function updateSourceOptions(select,sourceId,stepName){
    while(select.firstChild){
        select.removeChild(select.firstChild)
    }
    const matchedSteps=await filterExperiments(sourceId,null,stepName)
    matchedSteps.forEach(element => {
        const option=document.createElement("option")
        option.value=element
        option.innerText=generarClasificador(sourceId,element,stepName)
        select.appendChild(option)
        select.dispatchEvent(new Event('change'))
    });

}