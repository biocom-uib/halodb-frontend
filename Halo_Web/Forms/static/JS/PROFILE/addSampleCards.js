/**
 * @module PROFILE
 */

/**
 * Allows to create a card for each sample the user has
 * @param {Object} element 
 * @param {string} rowId 
 */
async function addSampleCard(element,rowId,experimentCard=null,type){
    //Get the base html from static files
    const CARD=await fetchSecureFile("static","Profile/ProjectCard.html")
    const ROW=document.getElementById(rowId)
    
    let container=document.createElement("a")
    container.classList.add("col")
    container.href=generatePath(`/infoDisplay/SAMPLE/${element.id}`)
    
    experimentCard ? ROW.append(container) : ROW.prepend(container);
    container.innerHTML=CARD
    container.id=element.id
    
    updateCardData(container,element,type)
    
}

