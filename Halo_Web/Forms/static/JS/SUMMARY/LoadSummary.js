/**
 * @module SUMMARY
 */

/**
 * Generate a Summary Card for each step of the seceunce
 * @param {Number} id 
 */
function LoadSummaryData(id){
    const LS_ID="Form_".concat(id)
    const DATA=JSON.parse(localStorage.getItem(LS_ID)).fields
    const DATA_CARD=document.getElementById("SummaryCardData")

    //Delete previous content in DATA_CARD
    DATA_CARD.innerHTML=""
     //Create the containers to show all pairs of Forms_X stored in LS
    DATA.forEach((pair)=>DATA_CARD.append(GenerateSummaryRow(pair)))
}

/**
 * Begin summary content configuration
 */
function initSummary(){
    const LIST_STEPS=JSON.parse(localStorage.getItem("StepsNameList"))
    LIST_STEPS.forEach((item) =>{
            const ID=LIST_STEPS.indexOf(item)
            TABS.appendChild(GenerateNavItems(item,ID))
        }
    )
    TABS.querySelectorAll(".nav-link").forEach((item)=>
        item.addEventListener("click",()=>{LoadSummaryData(item.id)}))
} 

/**
 * Return nav link to the selected Sequence step
 * @param {String} name 
 * @param {Number} id 
 * @returns {HTMLLIElement} new nav item
 */
function GenerateNavItems(name,id){
    const li=document.createElement("li");
    const btn=document.createElement("button")
    li.classList.add("nav-item")
    btn.classList.add("nav-link")
    btn.id=id
    btn.innerText=name;
    btn.role="button"
    li.appendChild(btn);
    return li
}

/**
 * Returns a new Summary Row contianer
 * @param {HTMLElement} field 
 * @returns {HTMLDivElement} Summary row
 */
function GenerateSummaryRow(field){
    const typeSwitch={
        "select-one":(field)=>{
            value = field.id == "koma" ? value=document.createElement("span")
                                    : value=document.createElement("span")
            field.id != "koma" ? generateOptions(value,JSON.parse(field.options))
                                : value.innerText=field.value
        },
        "radio":(field) =>value.classList.add("form-check-input")
    }
    const row=document.createElement("div")
    const container_title=document.createElement("div")
    const container_value=document.createElement("div")
    const title=document.createElement("label");
    var value=document.createElement("input");

    row.classList.add("row")
    container_title.classList.add("col")
    container_value.classList.add("col")
    
    title.innerText=field.id
    title.classList.add("col-form-label")
    typeSwitch[field.type] ? typeSwitch[field.type](field) 
                            : value.classList.add("form-control")

    value.id=field.id
    value.name=field.id
    value.value=field.value
    value.tagName=field.tagName
    value.type=field.type



    container_title.append(title)
    container_value.append(value)
    
    row.append(container_title)
    row.append(container_value)
    return row;
}

/**
 * Generate Options for a select item
 * @param {HTMLSelectElement} select 
 * @param {Array} list 
 */
function generateOptions(select,list){
    var option;
    list.forEach(element => {
        option=document.createElement("option");
        option.value=element.value;
        option.innerText=element.text;
        select.appendChild(option)
    });
}