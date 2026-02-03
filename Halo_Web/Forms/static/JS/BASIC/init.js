/**
 * @module BASIC
 */

/**
 * Manage all DOMContentLoaded Events in the different views
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
  "sample":()=> initSample(),
  "register":()=>initRegister()
  }
  const libraries=["https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
              "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
            "https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.css"] 
  const mainId= document.querySelector("main").id
  
  libraries.forEach(link=>loadCSS(link))
  //Helps to identify the env we are working at
  if(localStorage.getItem("env")===null)
    localStorage.setItem("env",HOST_DICC[window.location.hostname]);

  if (mainId !== "login")
    initActions[mainId]?.();

  if(mainId === "index"){
    localStorage.clear()
    const searcherContainer=document.querySelector(".input-group")
    const button=searcherContainer.querySelector("button")
    const input=searcherContainer.querySelector("input")
    button.addEventListener('click',()=>window.location.href = input.value ?
                                                         generatePath(`/filter/${input.value}`)
                                                        :generatePath('/filter'));
  } else {
    updateHeaderBtn(mainId);
  }

  initDriver(mainId);
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
 * @param {String} id
 */
function updateHeaderBtn(id){
  const goLobbyList=["profile","filter","login","register"];
  const headerBtn=document.querySelector("header").querySelector(".btn");
  headerBtn.innerText= id=="profile" ? "Log Out" : "Go Back";
  // includes doesn't work well with some bundlers
  // headerBtn.href= goLobbyList.includes(id) ? generatePath("/") : generatePath("/profile")

  // test if id is in the goLobbyList array
  const found = goLobbyList.indexOf(id) !== -1;
  headerBtn.href = !found ? generatePath("/") : generatePath("/profile");

  if (id=="infoDisplay" && window.location.pathname.includes("public"))
     headerBtn.href=generatePath("/filter");
}

document.addEventListener("DOMContentLoaded",init);