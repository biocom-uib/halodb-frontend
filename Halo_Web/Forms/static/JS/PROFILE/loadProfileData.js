/**
 * Initialize the basic data when is loaded "Profile" view
 */
async function loadProfileData(){
    restoreStorage()
    const sampleModal=await generateModal()
    sampleModal.id="sampleModal"
    document.querySelector("main").appendChild(sampleModal)
    //Returns an array of SAMLPLEs in message field
    const DATA= await fetchSecureFile("GET","user/list/sample")
    //Append a sampleCard for each sample
    DATA.forEach(element => {
        addSampleCard(element,"profileSamples",sampleModal)
    });

    //Make a dict with only the source id and its name
    const sampleUserDict = Object.fromEntries(
        DATA.map(item => [item.id, item.name])
    );
    //Keep it in session memory
    sessionStorage.setItem("userSamples",JSON.stringify(sampleUserDict))

    const EXP_LIST=document.getElementById("myExperimentsList")

    const element=await generateModal();
    generateKomaModalBody(element);
    element.id="chooseKoma"
    document.querySelector('main').appendChild(element);
    const profileForm=document.getElementById("userDataForm")

document.getElementById("editProfile").addEventListener("click",()=>{
    profileForm.querySelectorAll("input").forEach(input=>{
        input.removeAttribute("readonly")
    })
    profileForm.querySelector(".btn-success").removeAttribute("hidden")

})

    profileForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        //Store the sample data in local (faster reload data)
        LocalStoreData("Profile",true,profileForm)
        //Upload the data
        const insertedData=await uploadOperation("Profile",null,"/api/put/user/")
        if (insertedData)
            showToast("Profile Updated Successfully!","success")
        profileForm.querySelectorAll("input").forEach(input=>{
        input.setAttribute("readonly",null)
    })
        profileForm.querySelector(".btn-success").setAttribute("hidden",null)
    })

}