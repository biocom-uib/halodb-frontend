function GenerateNavItems(name,id){
    const LI_ITEM=document.createElement("li");
    const LINK=document.createElement("button")
    LI_ITEM.classList.add("nav-item")
    LINK.classList.add("nav-link")
    LINK.id=id
    LINK.innerText=name;
    LINK.role="button"
    LI_ITEM.appendChild(LINK);
    return LI_ITEM
}