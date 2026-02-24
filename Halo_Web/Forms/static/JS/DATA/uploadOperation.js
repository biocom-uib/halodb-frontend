/**
 * @module DATA
 */

/**
 * Works as a API POST call. Returns data from the External API & from the static files
 * @param {string} table - Objective where make the call.
 * @returns {*} The result of the API call  
 */
async function uploadOperation(table, id=null, route="upload") {
    const STATIC_STEPS=["Sample","Profile"]
    const step= STATIC_STEPS.includes(table) ? table:localStorage.getItem("actualStep")
    const header ={"Content-Type": "application/json"}
    const normalizedRoute = typeof route === "string" ? route.trim() : ""
    const normalizedTable = typeof table === "string" ? table.replace(/^\/+|\/+$/g, "") : table
    const isUploadRoute = normalizedRoute.toLowerCase() === "upload"
    let path= isUploadRoute ? `/upload/${normalizedTable}/` : normalizedRoute;
    let post_body
    let configs={headers: header,method:"POST"}
    if (id || table==="Sample"){
        post_body=prepareBodyRequest(step,id,table==="PREDICTED GENES") 
        configs={ headers: header,method:"POST",body: post_body}
    }

    try {
        let response = await fetch(generatePath(path),configs);

        if (!response.ok) {
            configureModal("Unexpected Error!",`Your ${table} couldn't be registered in`+
                " HaloFilesDB. Try it later and if this errors persist, please"+
                " contact with an administrator",false)
            return -1;
        }

        const RESPONSE = await response.text();
        const PARSED_RESPONSE = JSON.parse(RESPONSE);

        const stepID= isUploadRoute ? await getLastId(table) : id
        const forms=document.getElementById("cardForm")
         if(forms)
            await uploadFile(forms,stepID,table)
        return PARSED_RESPONSE.message ? PARSED_RESPONSE.message : PARSED_RESPONSE
    } catch (error) {
        console.error(error);
        configureModal("Unexpected Error!",`Your ${table} couldn't be registered in`+
            " HaloFilesDB. Try it later and if this errors persist, please"+
            " contact with an administrator",false)
        return -1;
    }
}
/**
 * Upload Files into backend DB
 * @param {HTMLFormElement} forms 
 * @param {Number} id 
 * @param {String} table 
 */
async function uploadFile(forms,id,table){
    const inputFiles=forms.querySelectorAll('input[type="file"]')
    const uploadRequests = []

    inputFiles.forEach(element => {
        if (element.files.length > 0) {
            const formData=new FormData()
            formData.append('sequence',localStorage.getItem('koma'))
            formData.append('file',element.files[0])
            formData.append('fName',element.files[0].name)
            uploadRequests.push(
                fetch(generatePath("/api/put_file/"+table+"/"+id+"/"+element.id),{
                    method:"POST",
                    body: formData
                })
            )
        }
    })

    const uploadResults = await Promise.allSettled(uploadRequests)
    const hasUploadErrors = uploadResults.some(result =>
        result.status === "rejected" || (result.status === "fulfilled" && !result.value.ok)
    )

    if (hasUploadErrors) {
        configureModal("Unexpected Error!","Some files couldn't be uploaded. Please try again.",false)
    }
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
    if (!response || response.length === 0) {
        throw new Error(`No records found for table ${table}`)
    }
    return response[response.length-1].id
}   
