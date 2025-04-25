async function addSampleCard(element,rowId){
    const CARD=await fetchSecureFile("static","Profile/ProjectCard.html")
    const ROW=document.getElementById(rowId)
    
    let container=document.createElement("div")
    container.classList.add("col")
    
    ROW.prepend(container);
    container.innerHTML=CARD
    container.id=element.id
    
    updateCardData(container,element)
    container.addEventListener("click",()=>{fillSampleCard(element,configureModal(container,"sampleModal"))})
    
}

async function updateCardData(container,element){
    let card_data
    if(element.koma){
        const sample_list=await fetchSecureFile('GET','user/list/sample/')
        card_data=sample_list.find(item => item.id === element.source_id);
    }
    else{
        card_data=element
    }
    container.getElementsByTagName("h5")[0].innerHTML=card_data.name
    container.getElementsByTagName("p")[0].innerHTML=card_data.stype
    container.getElementsByTagName("span")[0].innerHTML=card_data.updated
} 

function configureModal(container,id){
    const MODAL=document.getElementById(id)
    container.setAttribute("data-bs-target", `#${MODAL.id}`);
    container.setAttribute("data-bs-toggle","modal")

    return MODAL.id
}