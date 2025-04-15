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
      LocalStoreData("Sample",true,sampleForm)
      prepareBodyRequest("Sample")
    });
  }
} );
