/*Gobal DOM change listener that control every template change*/
document.addEventListener("DOMContentLoaded",()=>{
  if (document.getElementById("profileSamples")) {
    loadProfileData();
  }
  if (document.getElementById("step-by-step")){
    setFormsEnv()
  }
  if(document.getElementById("SummaryCardNav")){
    initSummary()
  }   
  /*TO DO: Create a Sample View with OpenStreet Map */
  const sampleForm=document.getElementById("sampleForm")
  if(sampleForm){
    sampleForm.addEventListener("submit", (event) => {
      event.preventDefault();
      SEQUENCES.forEach(element => {
        document.getElementById("komaChooser").appendChild(generateModalButton(element,"/Forms"))
        //EXP_LIST.appendChild(GenerateNavItems(element,element))
        });
      LocalStoreData("Sample",true,sampleForm)
      uploadOperation("Sample") 
    });
  }
} );
