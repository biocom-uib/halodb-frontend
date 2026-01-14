/**
 * @module SAMPLE
 */

/**
 * Set up the Sample forms behaviour
 */
async function initSample(){
    const modalMsg={
        true:{title:"Sample uploaded successfully!",
                msg:"Your Sample has been registred in HaloFiles!",
                bool: true},
        false:{
            title:"Unexpected Error!",
            msg:"Youre sampled could'nt be registered in HaloFilesDB. try it later and if"
            +"this errors persist, please contact with an adminstrator",
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
    getSelectedItems(sampleForm.querySelectorAll("select"))
    getValuesForItemList("keywords");
    //const keywords_hidden = document.getElementById('keywords');

    //Change unit value label
    const ssizeunitSelect=document.getElementById("ssizeunit")
    ssizeunitSelect.addEventListener("change",()=>{
        document.getElementById("unityValue").innerText=ssizeunitSelect.value})
}