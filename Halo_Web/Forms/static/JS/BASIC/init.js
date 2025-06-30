/**
 * @module BASIC
 */

/**
 * Manage all DOMContentLoaded Events in the differents views
*/
function init(){
  const initActions={
  "filter":()=>initFilter(),
  "forms":()=> setFormsEnv(),
  "infoDisplay":()=> initInfoDisplay(),
  "profile":()=> loadProfileData() ,
  //project:()=>{},
  "summary":()=> initSummary() ,
  "usability":()=>initUsabilityForm(),
  "sample":()=> initSample()
  }
  const libraries=["https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"]
  const mainId=document.querySelector("main").id
  
  libraries.forEach(link=>loadCSS(link))
  //Helps to identify the env we are working at
  if(localStorage.getItem("env")===null)
    localStorage.setItem("env",HOST_DICC[window.location.hostname])
  initActions[mainId]?.()
  mainId!=="main" && updateHeaderBtn(mainId)
}

/**
 * Allows to load heavy stylesheet dynamically
 * @param {String} href  
 */
function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Change the btn header with a proper text & href
 * @param {Number} id 
 */
function updateHeaderBtn(id){
  const goLobbyList=["profile","filter","login","register"]
  const headerBtn=document.querySelector("header").querySelector(".btn")
  headerBtn.innerText= id=="profile" ? "Log Out" : "Go Back"
  headerBtn.href= goLobbyList.includes(id) ? generatePath("/") : generatePath("profile")
}




document.addEventListener("DOMContentLoaded",init)