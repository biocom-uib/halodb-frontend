/**
 * Fill sampleModal with element data
 * @param {HTMLElement} element - Element that conatins displayable data
 * @param {HTMLElement} container -
 * @param {HTMLElement} sampleModal 
 */

function fillSampleCard(element,container,sampleModal){
  sessionStorage.setItem("source_id",element.id)
  const modalBody=sampleModal.querySelector(".modal-body")
  
  
  sampleModal.querySelector("h1").innerText="Sample Data"
  container.setAttribute("data-bs-target", `#${sampleModal.id}`);
  container.setAttribute("data-bs-toggle","modal")

  const nextButton=sampleModal.querySelector(".btn-primary")
  nextButton.innerText="Go to Experiment"
  nextButton.style.display="block"
  nextButton.setAttribute("data-bs-toggle","modal")
  nextButton.setAttribute("data-bs-target",`#chooseKoma`)
  //Delete previous content
  modalBody.innerHTML=""
  //Configure classes(Maybe can be removed)
  modalBody.appendChild(fillDataContainer(element))     
}

