/**
 * @module PROFILE
 */

/**
 * Generate a grid container. Each column will represent each step of entried koma
 * @param {String} koma - Kind of material selected
 */
async function loadUserKomaData(koma){

    const SEQUENCE_STEPS=await fetchSecureFile("GET","query/sequence/"+koma)
    const experimentContainer=document.getElementById("expContainer")
    experimentContainer.innerHTML=""
    //Append a sampleCard for each sample
    const cols= 4
    let source_list=[]
    
    for(const seq_step of SEQUENCE_STEPS) {
        const EXP_ID="cont_"+seq_step
        const stepTtl=document.createElement("h1")
        const stepContainer=document.createElement("div")
        const stepContentSelector=document.createElement("select")
        stepContentSelector.className="form-select stepSelect"
        
        stepContentSelector.addEventListener("change",()=>{
            if(stepContentSelector.value!="-1"){
                const url= `${seq_step}/${stepContentSelector.value}`
                fillStepData(generatePath(url),stepContainer,seq_step)
            }

        })

        stepTtl.innerText=seq_step
        stepContainer.className=`col-${cols} border`

        stepContainer.id=EXP_ID
        stepContainer.appendChild(stepTtl)
        stepContainer.appendChild(stepContentSelector)
        experimentContainer.appendChild(stepContainer)
        source_list=await filterExperiments(source_list,koma,seq_step)
        generateSourceSelect(stepContentSelector,source_list)
    }
}

/**
 * Filters the list of sequence step entried and returns the list of id according to this rules:
 *  - First Sequence Step: Check koma value
 *  - Default: Check if his source_id exist in previous step list 
 * @param {Array} source_id - List of previous validated ids (sources)
 * @param {String} koma - Kind of material selected
 * @param {String} seq_step - Actual sequence step
 * @returns {Array} List of filtered experiments
 */

async function filterExperiments(source_id,koma,seq_step) {
    const USER_EXPERIMENTS= await fetchSecureFile("GET","user/list/"+seq_step)
    let src_list=[]
    USER_EXPERIMENTS.forEach(experiment=>{
        const komaMatch=experiment.koma && experiment.koma==koma
        const srcIdMatch=checkSrcId(seq_step==="PREDICTED GENES",source_id,experiment)
        if(komaMatch || srcIdMatch) 
            src_list.push(experiment.id) 
    })
    return src_list   
}

/**
 * Evalute if the source id of a Sample is equals an input source_id
 * @param {boolean} isPredGens 
 * @param {Number} source_id 
 * @param {Object} experiment 
 * @returns {boolean} If inserted source_id is valid
 */
function checkSrcId(isPredGens,source_id,experiment){
return isPredGens ? (experiment.source_id_contigs==source_id || 
                                    experiment.source_id_genome==source_id || 
                                    experiment.source_id_single_cells==source_id || 
                                    experiment.source_id_plasmid==source_id ) : source_id==experiment.source_id 
}

/**
 * Add options element with the corresponding Array list
 * @param {HTMLSelectElement} select - Select item of the sequence
 * @param {Array} opciones - List of items 
 */
function generateSourceSelect(select,opciones){
    select.innerHTML=''
    let aux=document.createElement("option");
    aux.value="-1"
    select.appendChild(aux)
    opciones.forEach(opcion => {
        const optionElement = document.createElement("option");
        optionElement.value = opcion;
        optionElement.textContent = opcion;
        select.appendChild(optionElement);
    });
     
}



