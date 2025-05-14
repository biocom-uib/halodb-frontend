/**
 * Manage all DOMContentLoaded Events in the differents views
*/

function init(){
  const profileElement=document.getElementById("profileSamples")
  const formsElement=document.getElementById("step-by-step")
  const summaryElement=document.getElementById("SummaryCardNav")
  const sampleElement=document.getElementById("sampleForm")

  //Helps to identify the env we are working at
  if(localStorage.getItem("env")===null)
    localStorage.setItem("env",HOST_DICC[window.location.hostname])

  if (profileElement) 
    loadProfileData()
  
  if (formsElement)
    setFormsEnv()
  
  if(summaryElement)
    initSummary()

  if(sampleElement)
    initSample(sampleElement)

  /*TO DO: Create a Sample View with OpenStreet Map */

}
document.addEventListener("DOMContentLoaded",init);
