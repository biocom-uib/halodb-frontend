function GenerateSummaryRow(field){
    console.log("GenerateSummaryRow: Recibed par = "+field)
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
    if(field.type=="select-one"){
        value=document.createElement("select")
        generateOptions(value,JSON.parse(field.options))
        value.children=JSON.parse(field.options)
    }
    else if(field.type=="radio"){
        value.classList.add("form-check-input")
    }
    else{
        value.classList.add("form-control")
    }

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

function generateOptions(item,list){
    var select;
    
    list.forEach(element => {
        console.log(element)
        select=document.createElement("option");
        select.value=element.value;
        select.innerText=element.text;
        item.appendChild(select)
    });
}