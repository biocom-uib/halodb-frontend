/**
 * Works as a API POST call. Returns data from the External API & from the static files
 * @param {string} table - Objective where make the call.
 * @returns {*} The result of the API call  
 */
const FNAME_DICC={
    "rreads":"rrname",
    "treads":"trname",
    "pgenes":"pgenesname",
    "assembled":"assname"
}
async function uploadOperation(table,id=null,route="upload") {

    const step= table==="Sample" ? table:localStorage.getItem("actualStep")-1 
    const post_body=prepareBodyRequest(step,id) 
    const header ={"Content-Type": "application/json"}

    const path= route ==="upload" ? "/upload/"+table : route
    
    let response = await fetch(generatePath(path),{
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

    const RESPONSE = await (response.text());
    const PARSED_RESPONSE=JSON.parse(RESPONSE)

    const stepID=PARSED_RESPONSE.message.step.id
    const forms=document.getElementById("cardForm")
     if(forms)
        uploadFile(forms,stepID,table)
    return PARSED_RESPONSE.message ? PARSED_RESPONSE.message : PARSED_RESPONSE        
}

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