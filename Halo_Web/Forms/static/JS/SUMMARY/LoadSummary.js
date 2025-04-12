/*
CHANGE: Add "type" in JSON LS
*/
const TABS=document.getElementById("Tabs")

function LoadSummary(){
    
    if(!TABS){
        return false
    }

    return true;
}

function LoadSummaryData(id){
    const LS_ID="Form_".concat(id)
    const DATA=JSON.parse(localStorage.getItem(LS_ID)).fields
    const DATA_CARD=document.getElementById("SummaryCardData")

    //Delete previous content in DATA_CARD
    DATA_CARD.innerHTML=""
     //Create the containers to show all pairs of Forms_X stored in LS
    DATA.forEach((pair)=>DATA_CARD.append(GenerateSummaryRow(pair)))
}

function initSummary(){
    const LIST_STEPS=JSON.parse(localStorage.getItem("StepsNameList"))
    LIST_STEPS.forEach(
        (item) =>{
            const ID=LIST_STEPS.indexOf(item)
            TABS.appendChild(GenerateNavItems(item,ID))
        }
        )
    const BUTTONS=Array.from(TABS.getElementsByClassName("nav-link"))
    BUTTONS.forEach((item)=>
        item.addEventListener("click",()=>{LoadSummaryData(item.id)}))
} 
