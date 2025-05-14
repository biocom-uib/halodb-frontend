/**
 * Set up the Sample forms behaviour
 * @param {*} sampleForm -  Sample Form Element
 */

async function initSample(sampleForm){
    removeSteps()
    generateKomaModalBody(await generateModal())
    sampleForm.addEventListener("submit",async  (event) => {
        event.preventDefault();
        //Store the sample data in local (faster reload data)
        LocalStoreData("Sample",true,sampleForm)
        //Upload the data
        const insertedData=await uploadOperation("Sample")
        if (insertedData){
            configureModal("Sample uploaded successfully!","Your Sample has been registred in"+
                " HaloFiles!",true)
        }
    });
}