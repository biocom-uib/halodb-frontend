async function addSampleCard(element){
    const CARD=await fetchSecureFile("static","Profile/ProjectCard.html")
    const ROW=document.getElementById("profileSamples")
    
    let container=document.createElement("div")
    container.classList.add("col")
    
    ROW.prepend(container);
    container.innerHTML=CARD
    container.id=element.id
    
    updateCardData(container,element)
    fillSampleCard(element,configureModal(container,element))
}

function updateCardData(container,element){
    container.getElementsByTagName("h5")[0].innerHTML=element.name
    container.getElementsByTagName("p")[0].innerHTML=element.stype
    container.getElementsByTagName("span")[0].innerHTML=element.updated
}

function configureModal(container){
    const MODAL=document.getElementById("exampleModal")
    
    MODAL.id='modal-'+container.id

    container.setAttribute("data-bs-target", `#${MODAL.id}`);
    container.setAttribute("data-bs-toggle","modal")

    return MODAL.id
}