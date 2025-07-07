/**
 * @module DATA
 */

/**
 * Change Date format to be compatible with BD
 * @param {Object} item Item to adapt
 * @param {Array} result list of Items 
 */
function generateFormatDate(item,result){
  const dateObj = item.value ? new Date(item.value) : new Date();
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  result[item.id] = `${day}/${month}/${year}`;
}
/**
 * Change Time format to be compatible with BD
 * @param {Object} item Item to adapt
 * @param {Array} result list of Items 
 */
function generateFormatTime(item,result){
  const timeObj = item.value ? new Date(`1970-01-01T${item.value}`) : new Date();
  const hours = String(timeObj.getHours()).padStart(2, '0');
  const minutes = String(timeObj.getMinutes()).padStart(2, '0');
  const seconds = String(timeObj.getSeconds()).padStart(2, '0');
  result[item.id] = `${hours}:${minutes}:${seconds}`;
}


const inputTypeFormat={
  date:(item,result)=>generateFormatDate(item,result),
  time:(item,result)=>generateFormatTime(item,result),
  checkbox:(item,result)=>result[item.id]=item.checked
}

const PREDICTED_GENES_ID_KEY={
  "CONTIGS":"source_id_contigs",
  "GENOME":"source_id_genome",
  "SINGLE CELL GENOMICS":"source_id_single_cells",
  "PLASMID":"source_id_plasmid"
}


/**
 * Gets data stored in LS & parse this information to be used as body request 
 * in DDBB used
 * @param {*} step - Actual step. Usually a Number (exception "Sample")
 * @param {*} source - Usually a number. Default value null
 * @returns JSON stringfy used as a body request
 */
function prepareBodyRequest(step, source = null, isPredictedGenes=false) {
  const koma=localStorage.getItem("koma")
  const ID_FORM = "Form_".concat(step);
  const RAW_DATA = JSON.parse(localStorage.getItem(ID_FORM));

  let result = {};

  // 1. Recorremos y procesamos los campos
  RAW_DATA.fields
    .filter(item => item.id)
    .forEach(item => {
      if(inputTypeFormat[item.type]){
        inputTypeFormat[item.type](item,result)
        return
      }
      if(item.value)
        result[item.id] = item.value;
    });

  // Añadir source_id si existe
  if (step!="Sample") {
    if(isPredictedGenes)
      result[PREDICTED_GENES_ID_KEY[STEPS_NAME[step-1]]]=source  
    result["source_id"] = source;
    result["sequence"]=koma;
    result["koma"]=koma;
  }


  return JSON.stringify(result, null, 2);
}

function updateBodyRequest(fields) {
  let result = {};
  const koma=localStorage.getItem("koma")
  // 1. Recorremos y procesamos los campos
  fields.filter(item => item.id).forEach(item => {
      if(!inputTypeFormat[item.type] && item.value)
        result[item.id] = item.value;
      inputTypeFormat[item.type]?.(item,result)
    });

  if (koma) {result["sequence"]=koma}


  return JSON.stringify(result, null, 2);
}

