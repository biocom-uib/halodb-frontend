/**
 * @module PROFILE
 */

/**
 * Set the element information to the card 
 * @param {HTMLElement} container 
 * @param {Object} element 
 */
async function updateCardData(container,element){
    let card_data
    if(element.koma){
        const sample_list=await fetchSecureFile('GET','user/list/sample/')
        card_data=sample_list.find(item => item.id === element.source_id);
    }
    else{
        card_data=element
    }
    container.querySelector("h5").innerText=card_data.name
    container.querySelector("p").innerText=card_data.stype
    container.querySelector("span").innerText=card_data.updated
}