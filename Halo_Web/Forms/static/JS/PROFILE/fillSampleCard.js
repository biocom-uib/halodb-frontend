function fillSampleCard(element,modalID){
    const MODAL=document.getElementById(modalID)
    const MODAL_BODY=MODAL.getElementsByClassName("modal-body")[0]
    let keyCol,valCol
    MODAL_BODY.classList.add(
        "row", 
        "d-flex", 
        "justify-content-between", 
        "w-100", 
        "row-cols-1", 
        "row-cols-md-2", 
        "g-4"
      );      

    Object.entries(element).forEach(([key, value]) => {
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

        MODAL_BODY.append(keyCol)
        MODAL_BODY.append(valCol)

        
        
      });
      
}