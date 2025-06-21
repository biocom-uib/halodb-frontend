/**
 * @module SUMMARY
 */

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