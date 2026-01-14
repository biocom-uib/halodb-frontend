/**
 * @module DATA
 */

/**
 * Works as a API POST call. Returns data from the External API & from the static files
 * @param {string} table - Objective where make the call.
 * @returns {*} The result of the API call  
 */
async function uploadOperation(table,id=null,route="upload") {
    const STATIC_STEPS=["Sample","Profile"]
    const step= STATIC_STEPS.includes(table) ? table:localStorage.getItem("actualStep")
    const header ={"Content-Type": "application/json"}
    const path= route ==="upload" ? "/upload/"+table : route
    let post_body
    let configs={headers: header,method:"POST"}
    if (id ||table=="Sample"){
        post_body=prepareBodyRequest(step,id,table==="PREDICTED GENES") 
        configs={ headers: header,method:"POST",body: post_body}
    }

    let response = await fetch(generatePath(path),configs);

    if (!response.ok) {
        configureModal("Unexpected Error!",`Your ${table} could'nt be registered in`+
            " HaloFilesDB. Try it later and if this errors persist, please"+
            " contact with an adminstrator",false)
        return -1;
    }

    const RESPONSE = await (response.text());
    const PARSED_RESPONSE=JSON.parse(RESPONSE)

    const stepID= route==="upload" ? await getLastId(table) : id
    const forms=document.getElementById("cardForm")
     if(forms)
        uploadFile(forms,stepID,table)
    return PARSED_RESPONSE.message ? PARSED_RESPONSE.message : PARSED_RESPONSE        
}
/**
 * Upload Files into backend DB
 * @param {HTMLFormElement} forms 
 * @param {Number} id 
 * @param {String} table 
 */
function uploadFile(forms,id,table){
    const inputFiles=forms.querySelectorAll('input[type="file"]')
    inputFiles.forEach(async element => {
        if(element.files.length>0){
        const formData=new FormData()
        formData.append('sequence',localStorage.getItem('koma'))
        formData.append('file',element.files[0])
        formData.append('fName',element.files[0].name)
        response = await fetch(generatePath("/api/put_file/"+table+"/"+id+"/"+element.id),{
            method:"POST",
            body: formData
        })
        } 
    });
}

/**
 * Works as a API POST call. Returns data from the External API & from the static files
 * @param {string} table - Objective where make the call.
 * @returns {*} The result of the API call  
 */
async function updateStep(table,id,fields) {

    const path= generatePath(`/api/put/${table}/${id}`) 
    const bodyRequest=updateBodyRequest(fields)
    let response = await fetch(path,{
        headers: {"Content-Type": "application/json"},
        method:"POST",
        body: bodyRequest
        }
    );

    if (!response.ok) {
        configureModal("Unexpected Error!",`Your ${table} couldn't be updated in`+
            " HaloFilesDB. Try it later and if this errors persist, please"+
            " contact with an administrator",false)
        return -1;
    }

    const RESPONSE = await (response.text());
    const PARSED_RESPONSE=JSON.parse(RESPONSE)
    return PARSED_RESPONSE.message ? PARSED_RESPONSE.message : PARSED_RESPONSE        
}

async function getLastId(table){
    const response=await fetchSecureFile("GET",`user/list/${table}/`)
    return response[response.length-1].id
}   