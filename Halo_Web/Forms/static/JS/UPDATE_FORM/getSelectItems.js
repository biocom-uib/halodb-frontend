const COMPL_TABLES=["temperature","ph","salinity","method","dna","assembly","sequencing","binning","oxygen","fraction","target"]

function getSelectedItems(selectList){
    const SEL=Array.from(selectList)
    SEL.forEach(async element => {
        if(element.name && COMPL_TABLES.includes(element.name)){
            const DATA=await fetchSecureFile("GET","query/"+element.name)
            
            DATA.forEach(item=>{
                let option=document.createElement("option");
                
                option.value=item.id;
                option.innerText=item.description
                element.appendChild(option)
            })
        }
    });
}

document.addEventListener("DOMContentLoaded",()=>getSelectedItems(document.getElementsByTagName("select")));
