/**
 * @module FILTER
 */

/**
 * Set the basic parameters to filter template
 */
async function initFilter(){
    const sequences=fetchSecureFile("GET","public/sequences")
    localStorage.setItem("filterStep",0)
    setTextSearcher(document.getElementById("textFilterContainer"))
    setOffCanvasFilter("SAMPLE")
    showKomaSamples(sequences)
    document.getElementById("textFilterContainer").querySelector("button").addEventListener('click',()=>{
        filterSamples(document.getElementById("textFilterContainer").querySelector("input").value)
    })
}

/**
 * Configure textSearcher element
 * @param {HTMLElement} textSearcherContainer Container with @param {HTMLInputElement}
 */
function setTextSearcher(textSearcherContainer){
    const textSumbit=textSearcherContainer.querySelector("[type='button']")

    textSumbit.addEventListener("click",()=>{
        const textInput=textSearcherContainer.querySelector("input").value
        console.log(`Enviado formulario con ${textInput}`)})  
}

/**
 * Configure the OffCanvas filter
 * @param {String} table Name of the table to filter
 */
async function setOffCanvasFilter(table) {
    const LIST_FILE_NAMES=["rrname","rrname2","trname"]
    const filterContainer=document.getElementById("filtroOffcanvas")
    const filterBody=filterContainer.querySelector(".row")
    filterBody.innerHTML=""

    const aux=document.createElement("div")
    const DATA = fetchSecureFile("static",`Forms/${table}.html`)

    aux.innerHTML=DATA

    const inputList=aux.querySelectorAll("input")
    let filteredList=[...inputList].filter(element => element.type!="file" && !LIST_FILE_NAMES.includes(element.id))
    const selectItems=aux.querySelectorAll("select")
    getSelectedItems(selectItems)
    const completeList=filteredList.concat([...selectItems])
    completeList.forEach(element => {
        const container=document.createElement("div")
        container.className="col"

        const label=document.createElement("label")
        label.setAttribute("for",element.id)
        label.innerText=paramDict[element.id]

        container.appendChild(label)
        container.appendChild(element)
        filterBody.prepend(container)
    });
}
/**
 * Show Koma containers in filter template
 * @param {Array} sequences List of sequences
 */
function showKomaSamples(sequences){    
        const resultContianer=document.getElementById("results").querySelector(".row")
        generateSequenceItems(resultContianer)
        const list=resultContianer.querySelectorAll(".col")
        list.forEach(element =>{
            const btnData=element.querySelector("a")
            const container=document.createElement("div")
            const msg=document.createElement("p")
            const title=document.createElement("h4")
            
            //msg.innerText=`Amount of experiments: ${getKomaExperimentsNumber(title.innerText)}`
            element.className="col "
            container.className="container d-flex h-100 justify-content-center "+ btnData.className
            title.innerText=btnData.innerText
            
            element.addEventListener("click",()=>{
                STEPS_NAME=sequences[title.innerText]
                //updateFilterPage(title.innerText)
                setOffCanvasFilter(STEPS_NAME[localStorage.getItem("filterStep")])
                localStorage.setItem("filterStep",Number(localStorage.getItem("filterStep"))+1)
            })

            element.removeChild(element.firstChild)
            container.appendChild(title)
            container.appendChild(msg)
            element.appendChild(container)
        })
}

/**
 * Returns number of table elements
 * @param {String} table 
 * @returns number of elements in table
 */
async function getKomaExperimentsNumber(table){
    const DATA=fetchSecureFile("GET",`public/raw reads`)
    const FILTER= DATA.filter(element => element.sequence==table)
    return FILTER.length
}

/**
 * Updates the filter fields with new table information
 * @param {String} table 
 */
async function updateFilterPage(table){
    const resultContianer=document.getElementById("results")
    const DATA= fetchSecureFile("GET",`public/${table}`)
    const experimentList=document.createElement("ul")
    setOffCanvasFilter(koma)
    resultContianer.removeChild(resultContianer.firstChild)
    DATA.forEach(element=>{
        const listItem=document.createElement("li")
        const link=document.createElement("a")

        link.href=generatePath(`/infoDisplay/raw reads/${element.id}`)
        link.innerText=`${generarClasificador(element.src_id,element.id,table)}`
        listItem.appendChild(link)
        experimentList.appendChild(listItem)
    })
    resultContianer.appendChild(experimentList)
}

async function filterSamples(inputText) {
    const list=await fetchSecureFile('get',"public/sample")
    const results = [];
    const lowerInput = inputText.toLowerCase();

    for (const item of list) {
        if (item.name && item.name.toLowerCase().includes(lowerInput)) {
        results.push(item);
        }
    }
    return results
}