async function loadUserKomaData(koma){
    const SEQUENCE_STEPS=await fetchSecureFile("GET","query/sequence/"+koma)
            const experimentContainer=document.getElementById("expContainer")
        experimentContainer.innerHTML=""
    //Append a sampleCard for each sample
    SEQUENCE_STEPS.forEach(async seq_step => {
        const EXP_ID="row_"+seq_step
        const experimentHeader=document.createElement("h1")
        const experimentContent=document.createElement("div")
        
        experimentHeader.innerText=seq_step
        experimentContent.classList.add('row', 'd-flex', 'justify-content-between', 'w-100' ,'row-cols-1' ,'row-cols-md-3' ,'g-4')

        experimentContent.id=EXP_ID
        experimentContainer.appendChild(experimentHeader)
        experimentContainer.appendChild(experimentContent)

        const USER_EXPERIMENTS= await fetchSecureFile("GET","user/list/"+seq_step)
        let first=true
        USER_EXPERIMENTS.forEach(experiment=>{
            if(experiment.koma==koma){
                console.log("Experiment Found: "+JSON.stringify(experiment, null, 2))
                addSampleCard(experiment,EXP_ID)  
            }
        })    
    });
}