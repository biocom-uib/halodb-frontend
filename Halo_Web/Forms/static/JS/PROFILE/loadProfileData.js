async function loadProfileData(){
    //Returns an array of SAMLPLEs in message field
    const DATA= await fetchSecureFile("GET","user/list/sample")
    const CARD=await fetchSecureFile("static","Profile/ProjectCard.html")
    const ROW=document.getElementById("profileSamples")

    let container
    //Append a sampleCard for each sample
    DATA.forEach(element => {
        container=document.createElement("div")
        container.classList.add("col")
        ROW.prepend(container);
        container.innerHTML=CARD
        const NAME=container.getElementsByTagName("h5")[0]
        const DESC=container.getElementsByTagName("p")[0]
        const UPD=container.getElementsByTagName("span")[0]

        NAME.innerHTML=element.name
        DESC.innerHTML=element.stype
        UPD.innerHTML=element.updated

        const ID=element.id

        container.id=ID
        
        container.addEventListener("click",()=>{console.log("Load sumary of sample "+ID)})
        
        
        //Modify with each sample main info
    });

}