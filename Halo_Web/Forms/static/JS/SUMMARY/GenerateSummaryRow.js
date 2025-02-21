function GenerateSummaryRow(pair){
    console.log("GenerateSummaryRow: Recibed par = "+pair)
    const row=document.createElement("div")
    const container_title=document.createElement("div")
    const container_value=document.createElement("div")
    const title=document.createElement("p");
    const value=document.createElement("p");

    row.classList.add("row")
    container_title.classList.add("col")
    container_value.classList.add("col")
    
    title.innerText=pair.id
    value.innerText=pair.value

    container_title.append(title)
    container_value.append(value)
    
    row.append(container_title)
    row.append(container_value)
    return row;
}