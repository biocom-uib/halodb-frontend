/**
 * Generate a HTMLDivElement whith one row of entry data JSON
 * @param {JSON} data - JSON object 
 * @returns HTMLDivElement with data information
 */
function fillDataContainer(data){
    let keyCol,valCol
    const container=document.createElement("div")
    container.classList.add(
      "row", 
      "d-flex", 
      "justify-content-between", 
      "w-100", 
      "row-cols-1", 
      "row-cols-md-2", 
      "g-4",
      "stepContainer"
    );      
  //Add all element data into the Modal Card Body
  Object.entries(data).forEach(([key, value]) => {
      keyCol=document.createElement("div")
      keyCol.classList.add("col")
      keyCol.innerText=paramDict[key] ? paramDict[key] : key
      
      valCol=document.createElement("div")
      keyCol.classList.add("col")
      if(key=="public")
        valCol.innerText=value==1 ? "Yes" : "No"
      else if (value)
        valCol.innerText=value
      else
        valCol.innerText="None"

      container.append(keyCol)
      container.append(valCol)      
    });
    return container
}