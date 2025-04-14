async function loadProfileData(){
    //Returns an array of SAMLPLEs in message field
    const DATA= await fetchSecureFile("GET","user/list/sample")
    //Append a sampleCard for each sample
    DATA.forEach(element => {
        addSampleCard(element)
    });

    //Make a dict with only the source id and its name
    const sampleUserDict = Object.fromEntries(
        DATA.map(item => [item.id, item.name])
    );
    //Keep it in session memory
    sessionStorage.setItem("userSamples",JSON.stringify(sampleUserDict))
}