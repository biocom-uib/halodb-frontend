/**
 * @module UPDATE_FORM
 */

/**
 * Remove or add the Source selects following the step choosen
 * @param {Number} step 
 */
async function updateSourceSelectors(step){
    const sourceCont=document.getElementById("sourceSelectors")
    const actSelectors=sourceCont.querySelectorAll(".col")
    //Case 1: We are going back in the sequence
    if(actSelectors.length-1>step){
        let diff=actSelectors.length-1-step
        while (diff>0){
            sourceCont.removeChild(sourceCont.lastChild)
            diff--
        }
    //Case 2: We are going forward in the sequence
    }else if(actSelectors.length-1<step){
        let diff=step-actSelectors.length+1
        let first=true
        while (diff>0){
            const stepName=STEPS_NAME[step-diff]
            //Get the Parent Node to asociate the evento to update all sequence flow
            const previousSelect=document.getElementById(first ? "sourceSample":`select_${stepName}`)
            const newSourceSelect=await newSourceSelector(stepName,previousSelect.value)
            sourceCont.appendChild(newSourceSelect)
            //Important! whitouth this, the selected source may has any consistence in BD!
            previousSelect.addEventListener("change",()=>{
                updateSourceOptions(newSourceSelect.querySelector("select"),previousSelect.value,stepName)
            })
            diff=diff-1
            first=false
        }
    }
}
/**
 * Return a container with a new Source Selector
 * @param {String} stepName 
 * @param {Number} sourceValue - Actual Parent node value
 * @returns HTMLDivElement with a select inside
 */
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

/**
 * Update Options elements of a select following source line
 * @param {HTMLSelectElement} select 
 * @param {Number} sourceId - Actual Parent node value
 * @param {String} stepName 
 */
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