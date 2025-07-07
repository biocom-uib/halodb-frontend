/**
 * @module PROFILE
 */

/**
 * Generate a container with a link inside a container
 * @param {string} name - Link name 
 * @param {string} href - Path to go
 * @returns {HTMLDivElement} container with a koma button
 */
function generateModalButton(name,href){
    let colors
    const container=document.createElement("div")
    const button=document.createElement("a")
    
    if(COLOR_DICT[name]) 
        colors=COLOR_DICT[name].split(" ")

    container.classList.add('col')
    button.className=`container flex-column h-100 justify-content-center btn ${colors[0]} ${colors[1]}`
    button.href=generatePath(href)
    button.innerText=name
    button.addEventListener("click",()=>{
        localStorage.setItem("koma",name)})

    container.appendChild(button)
    return container
}