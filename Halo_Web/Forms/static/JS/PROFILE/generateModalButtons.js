/**
 * Generate a container with a link inside a container
 * @param {string} name - Link name 
 * @param {string} href - Path to go
 * @returns 
 */
function generateModalButton(name,href){
    let colors
    if(COLOR_DICT[name])
        colors=COLOR_DICT[name].split(" ")
    const container=document.createElement("div")
    const button=document.createElement("a")
    container.classList.add('col')
    if(colors)
        button.classList.add('btn',colors[0],colors[1])
    button.href=generatePath(href)
    button.innerText=name
    button.addEventListener("click",()=>{
        localStorage.setItem("koma",name)})

    container.appendChild(button)
    return container
}