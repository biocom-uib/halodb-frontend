/**
 * Manage all DOMContentLoaded Events in the differents views
*/

libraries=["https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"]

function init(){
  libraries.forEach(link=>loadCSS(link))
  const headerBtn=document.getElementById("headerBtn")
  const profileElement=document.getElementById("profileSamples")
  const formsElement=document.getElementById("step-by-step")
  const summaryElement=document.getElementById("SummaryCardNav")
  const sampleElement=document.getElementById("sampleForm")
  const infoDisplayElement=document.getElementById("map")

  //Helps to identify the env we are working at
  if(localStorage.getItem("env")===null)
    localStorage.setItem("env",HOST_DICC[window.location.hostname])

  if (profileElement){
    loadProfileData()
    headerBtn.innerText="Log Out"
    headerBtn.href="/"
  } 
    
  
  if (formsElement){
    setFormsEnv()
    headerBtn.innerText="Go Back"
    headerBtn.href=generatePath("/profile")
  }
    
  
  if(summaryElement){
    initSummary()
    headerBtn.innerText="Go Back"
    headerBtn.href=generatePath("/profile")
  }

  if(sampleElement){
    initSample(sampleElement)
    headerBtn.innerText="Go Back"
    headerBtn.href=generatePath("/profile")
  }

  if(infoDisplayElement){
    initInfoDisplay()
    headerBtn.innerText="Go Back"
    headerBtn.href=generatePath("/profile")
  }

}
document.addEventListener("DOMContentLoaded",init)


function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}
