/**
 * @module PROFILE
 */

/**
 * Initialize the basic data when is loaded "Profile" view
 */
async function loadProfileData(){
    //Returns an array of SAMLPLEs in message field
    const DATA= await fetchSecureFile("GET","user/list/sample/")
    restoreStorage()
    //Append a sampleCard for each sample
    DATA.filter(item=>item.name).forEach(element => {
        if(element.shared_by_group>0)
            addSampleCard(element,"sharedSamples",null,"sharedSample")
        else if (element.owned>0)
            addSampleCard(element,"profileSamples",null,"sample")

    });
    const userGroups=await fetchSecureFile("GET","user/list/groups/")
    userGroups.forEach(element => {
        addSampleCard(element,"groupContainer",null,"group")
    })
    //Make a dict with only the source id and its name
    const sampleUserDict = Object.fromEntries(
        DATA.map(item => [item.id, item.name])
    );
    //Keep it in session memory
    sessionStorage.setItem("userSamples",JSON.stringify(sampleUserDict))
    allowEditProfileData()

}

/**
 * Add evento to edit profile
 */
function allowEditProfileData(){
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
        insertedData && showToast("Profile Updated Successfully!","success")
        profileForm.querySelectorAll("input").forEach(input=>{
            input.setAttribute("readonly",null)
            })
        profileForm.querySelector(".btn-success").setAttribute("hidden",null)
    })
}