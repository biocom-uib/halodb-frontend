/**
 * @module UPDATE_FORM
 */

/**
 * Check all select items looking for that ones that appear in COMPL_TABLES
 * @param {Array} selectList 
 */
function getSelectedItems(selectList){
    const COMPL_TABLES=["temperature","ph","salinity","method","dna","assembly","sequencing","binning","oxygen","fraction","target"]
    selectList.forEach(async element => {
        if(element.name && COMPL_TABLES.includes(element.name)){
            element.className="form-select"
            const DATA=await fetchSecureFile("GET","public/query/"+element.name)
            
            DATA.forEach(item=>{
                let option=document.createElement("option");               
                option.value=item.id;
                option.innerText=item.description
                element.appendChild(option)
            })
        }
    });
}
