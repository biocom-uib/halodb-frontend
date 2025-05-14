/**
 * Works as a API GET call. Returns data from the External API & from the static files
 * @param {string} type - Type of API call.
 * @param {string} param - Specific API path
 * @returns {*} The result of the API call  
 */

async function fetchSecureFile(type, param) {
    //const url= type === "GET" ? generatePath(URL_DICC[type]) + encodeURIComponent(param) : generatePath(URL_DICC[type]) + param
    const url= generatePath(URL_DICC[type]) + param
    const response = await fetch(url);

    if (!response.ok) 
        throw new Error("fetchOperation failed!. Reason:"+response.message);
    
    const RESPONSE = await (response.text());
    
    if(type==="static")
        return RESPONSE
    
    const PARSED_RESPONSE=JSON.parse(RESPONSE)

    return PARSED_RESPONSE.message ? PARSED_RESPONSE.message : PARSED_RESPONSE
    
}

