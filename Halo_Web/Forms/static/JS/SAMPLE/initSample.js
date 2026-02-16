/**
 * @module SAMPLE
 */

/**
 * Set up the Sample forms behaviour
 */
function ensureSampleItemPickers() {
    const keywordsWidget = document.getElementById("keywords-widget");
    const keywordsInput = document.getElementById("keywords");
    if (!keywordsWidget || !keywordsInput || typeof ItemPicker === "undefined") {
        return null;
    }

    if (keywordsWidget._itempicker) {
        return keywordsWidget._itempicker;
    }

    if (typeof ItemPicker.mount === "function") {
        return ItemPicker.mount(keywordsWidget, { hiddenInput: keywordsInput });
    }

    const picker = new ItemPicker(keywordsWidget, {
        hiddenInput: keywordsInput,
        options: [],
        values: [],
        multiple: true,
        collapsed: true,
    });
    keywordsWidget._itempicker = picker;
    return picker;
}

async function initSample(){
    const modalMsg={
        true:{title:"Sample uploaded successfully!",
                msg:"Your Sample has been registered in HaloFiles!",
                bool: true},
        false:{
            title:"Unexpected Error!",
            msg:"Your sample could not be registered in HaloFilesDB. Try it again later and if "
            +"this error persist, please contact with an administrator.",
            bool:false}
    }
    const sampleForm=document.querySelector("form")
    removeSteps()
    generateKomaModalBody(await generateModal())
    sampleForm.addEventListener("submit",async  (event) => {
        event.preventDefault();
        //Store the sample data in local (faster reload data)
        LocalStoreData("Sample",true,sampleForm)
        //Upload the data
        const insertedData=await uploadOperation("Sample")
        result=modalMsg[insertedData!=-1]
        configureModal(result.title,result.msg,insertedData!=-1)       
    });
    ensureSampleItemPickers();
    getSelectedItems(sampleForm.querySelectorAll("select"))
    getValuesForItemList("keywords");
    //const keywords_hidden = document.getElementById('keywords');

    //Change unit value label
    const ssizeunitSelect=document.getElementById("ssizeunit")
    ssizeunitSelect.addEventListener("change",()=>{
        document.getElementById("unityValue").innerText=ssizeunitSelect.value})
}
