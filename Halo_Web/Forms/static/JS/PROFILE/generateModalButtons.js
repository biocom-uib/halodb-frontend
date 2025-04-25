function generateModalButton(name,href){
    let colors
    if(COLOR_DICT[name])
        colors=COLOR_DICT[name].split(" ")
    const container=document.createElement("div")
    const button=document.createElement("a")
    container.classList.add('col')
    if(colors)
        button.classList.add('btn',colors[0],colors[1])
    button.href=href
    button.innerText=name

    container.appendChild(button)
    return container
}