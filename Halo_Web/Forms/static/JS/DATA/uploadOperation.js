/**
 * Works as a API POST call. Returns data from the External API & from the static files
 * @param {string} table - Objective where make the call.
 * @returns {*} The result of the API call  
 */
async function uploadOperation(table,id=null) {

    const step= table==="Sample" ? table:localStorage.getItem("actualStep")-1 
    const post_body=prepareBodyRequest(step,id) 
    const header ={"Content-Type": "application/json"}
    
    const response = await fetch(generatePath("/upload/"+table),{
        headers: header,
        method:"POST",
        body: post_body
        }
    );

    if (!response.ok) {
        configureModal("Unexpected Error!","Youre sampled could'nt be registered in"+
            " HaloFilesDB. try it later and if this errors persist, please"+
            " contact with an adminstrator",false)
        return;
    }
    const forms=document.getElementById("cardForm")
/**
 *     if(forms){
        const inputFiles=forms.querySelectorAll('input[type="file"]')
        inputFiles.array.forEach(async element => {
           if(element.files.length>0){
            const response = await fetch(generatePath("/upload/"+table+"/"+step.id+"/"+element.id),{
            headers: header,
            method:"POST",
            body: {"file":element.files[0]}
            })
           } 
        });
     }*/

    const RESPONSE = await (response.text());
    const PARSED_RESPONSE=JSON.parse(RESPONSE)

    const stepID=PARSED_RESPONSE.message.step.id
    
    return PARSED_RESPONSE.message ? PARSED_RESPONSE.message : PARSED_RESPONSE

        
}
