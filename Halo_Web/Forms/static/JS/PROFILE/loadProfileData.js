async function loadProfileData(){
    //Returns an array of SAMLPLEs in message field
    const DATA= await fetchSecureFile("GET","user/list/sample")
    //Append a sampleCard for each sample
    DATA.forEach(element => {
        addSampleCard(element,"profileSamples")
    });

    //Make a dict with only the source id and its name
    const sampleUserDict = Object.fromEntries(
        DATA.map(item => [item.id, item.name])
    );
    //Keep it in session memory
    sessionStorage.setItem("userSamples",JSON.stringify(sampleUserDict))

    const EXP_LIST=document.getElementById("myExperimentsList")
    SEQUENCES.forEach(element => {
        document.getElementById("komaChooser").appendChild(generateModalButton(element,"/Forms"))
        EXP_LIST.appendChild(GenerateNavItems(element,element))
        });
    const BUTTONS=Array.from(EXP_LIST.getElementsByClassName("nav-link"))
    BUTTONS.forEach((item)=>
        item.addEventListener("click",()=>{loadUserKomaData(item.id)}))
    komaModelChooserEvent()
}