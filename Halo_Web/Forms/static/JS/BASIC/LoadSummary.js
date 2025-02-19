/*
CHANGE: Add "type" in JSON LS
*/

function LoadSummary(){
    const TABS=document.getElementById("Tabs")
    STEPS_NAME.forEach(
        (item) =>TABS.appendChild(
                                document.createElement("a").id=item))

    TABS.children.forEach(
        (item)=>item.innerText=item.id);
        item.addEventListener("click",LoadData(item.id))
}

function LoadSummaryData(id){
    const LS_ID="Form_".concat(id)
    const DATA=JSON.stringify(localStorage.getItem(LS_ID))
    const DATA_CARD=document.getElementById("SummaryCardData")

    //Delete previous content in DATA_CARD
    DATA_CARD.innerHTML=""

    let row,title,value,container_title,container_value
    //Create the containers to show all pairs of Forms_X stored in LS
    DATA.forEach((pair)=>{
        container_title=document.createElement("div")
        container_title.classList.add("col")

        title=document.createElement("p");
        title.innerText=pair.id

        container_title.append(title)

        container_title=document.createElement("div")
        container_title.classList.add("col")

        value=document.createElement("p");
        value.innerText=pair.value

        container_value.append(value)
        
        row=document.createElement("div")
        row.classList.add("row")

        row.append(container_title)
        row.append(container_value)

        DATA_CARD.append(row)

    }
)
}