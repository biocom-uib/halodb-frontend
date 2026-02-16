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
    const LABEL_BY_TABLE={
        keywords:"keyword",
        hkgenes:"gene"
    }

    const COMPL_TABLES=["temperature","ph","salinity","method","dna","assembly","sequencing","binning","oxygen","fraction","target","keywords","hkgenes"]
    elementList.forEach(async element => {
        if(element.name && COMPL_TABLES.includes(element.name)){
            const endpoint = "public/query/" + element.name;
            const DATA=await fetchSecureFile("GET", endpoint);
            const input=document.getElementById(listname)
            const widget=document.getElementById(`${listname}-widget`)
            let picker=widget?._itempicker || null
            if (!picker && widget && typeof ItemPicker !== "undefined" && typeof ItemPicker.mount === "function"){
                picker = ItemPicker.mount(widget, { hiddenInput: input || undefined })
            }
            if (!picker) return

            const labelKey=LABEL_BY_TABLE[element.name]
            const normalized=(DATA || []).map(item=>{
                if (typeof item === "string") {
                    return { id: null, label: item };
                }
                return {
                    id: item?.id ?? null,
                    label: labelKey ? item?.[labelKey] : (item?.description ?? item?.label)
                };
            }).filter(item=>item.label)

            picker.setOptions(normalized);
        }
    });
}
