/**
 * @module FORMS_BEHAIVOUR
 */

/**
 * Configure the Sample selector in Sequences forms
 */
async function setSampleSelector(){
    const DATA= await fetchSecureFile("GET","user/list/sample/")
    //Make a dict with only the source id and its name
    const sourceSelector=document.querySelector('select')
    sourceSelector.innerHTML=''

    DATA.forEach(item=>{
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        sourceSelector.appendChild(option);
    })

    sourceSelector.value=sessionStorage.getItem("source_id")

    sourceSelector.addEventListener("change",()=>{
        const ACT_STEP=localStorage.getItem("actualStep")
        ACT_STEP == 0 ? localStorage.setItem("sampleSrc", sourceSelector.value) :
                        source_list[ACT_STEP - 1] = sourceSelector.value;
        })
    
    sourceSelector.selectedIndex = [...sourceSelector.options].findIndex(
        option => option.value === localStorage.getItem("sampleSrc"));
}