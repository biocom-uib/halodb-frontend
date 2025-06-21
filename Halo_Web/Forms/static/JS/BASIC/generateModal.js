/**
 * @module BASIC
 */

/**
 * Generate a Modal element from "static/HTML/Others/modalBase"
 * @returns HTML Modal component
 */
async function generateModal(){
    const modalModel=await fetchSecureFile("static","Modal/modalBase.html")
    const template = document.createElement('template');
    template.innerHTML = modalModel;
    return template.content.firstElementChild;
}