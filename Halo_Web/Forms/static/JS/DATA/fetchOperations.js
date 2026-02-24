/**
 * @module DATA
 */

/**
 * Works as an API GET call. Returns data from the External API & from the static files
 * @param {string} type - Type of API call.
 * @param {string} param - Specific API path
 * @returns {Array} The result of the API call  
 */
async function fetchSecureFile(type, param) {
    //const url= type === "GET" ? generatePath(URL_DICC[type]) + encodeURIComponent(param) : generatePath(URL_DICC[type]) + param
    const url= generatePath(URL_DICC[type]) + param
    const response = await fetch(url);

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`fetchOperation failed (${response.status}) at ${url} (final: ${response.url}) body: ${errorBody}`);
    }
    
    const RESPONSE = await (response.text());
    
    if(type==="static")
        return RESPONSE
    
    const PARSED_RESPONSE=JSON.parse(RESPONSE)

    return PARSED_RESPONSE.message ? PARSED_RESPONSE.message : PARSED_RESPONSE
    
}

