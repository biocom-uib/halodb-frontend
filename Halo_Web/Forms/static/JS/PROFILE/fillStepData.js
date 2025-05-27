/**
 * Show specific Step Data in his corresponding Step Container
 * @param {string} url - Sequence call to API 
 * @param {HTMLDivElement} stepContainer - Sequence container 
 */
async function fillStepData(url,seqContainer,seq_step){
    const stepInfo=await fetchSecureFile("GET",url)
    let container=seqContainer.querySelector("div")
    if (container)
        seqContainer.removeChild(container)  
    seqContainer.appendChild(fillDataContainer(stepInfo[seq_step],seq_step))
    
}