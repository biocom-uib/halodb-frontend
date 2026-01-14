/**
 * @module UPDATE_FORM
 */

/**
 * Check all select items looking for that ones that appear in COMPL_TABLES
 * @param {Array} selectList 
 */
function getSelectedItems(selectList){
    const descriptionType={
        keywords:(item)=>item.keyword,
        hkgenes:(item)=>item.gene
    }
    const COMPL_TABLES=["temperature","ph","salinity","method","dna","assembly","sequencing","binning","oxygen","fraction","target","keywords","hkgenes"]
    selectList.forEach(async element => {
        if(element.name && COMPL_TABLES.includes(element.name)){
            element.className="form-select"
            const DATA=await fetchSecureFile("GET","public/query/"+element.name)
            
            DATA.forEach(item=>{
                const pair=Object.entries(item)
                let option=document.createElement("option");               
                option.value=item.id;
                option.innerText=descriptionType[element.name] 
                                        ? descriptionType[element.name]?.(item)
                                        : item.description
                element.appendChild(option)
            })
        }
    });
}


/**
 * Check all select items looking for that ones that appear in COMPL_TABLES
 * @param {string} listname
 */
function getValuesForItemList(listname){
    const elementList = [{name: listname}];

    const COMPL_TABLES=["temperature","ph","salinity","method","dna","assembly","sequencing","binning","oxygen","fraction","target","keywords","hkgenes"]
    elementList.forEach(async element => {
        if(element.name && COMPL_TABLES.includes(element.name)){
            const DATA=await fetchSecureFile("GET","public/query/"+element.name);

            document.getElementById(listname).itemPicker.setOptions(DATA);
        }
    });
}
