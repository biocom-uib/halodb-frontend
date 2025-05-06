const URL_DICC = {
    "static": "/halophile/static/HTML/",
    "GET": "api/get/"
};

async function fetchSecureFile(type, param) {
    try {
        const response = await fetch(URL_DICC[type] + param);

        if (!response.ok) {
            throw new Error("Archivo no encontrado");
        }
        const RESPONSE = await (response.text());
        if(type==="static"){
            return RESPONSE
        }

        const PARSED_RESPONSE=JSON.parse(RESPONSE)
        if (PARSED_RESPONSE.token)
            sessionStorage.setItem("token",PARSED_RESPONSE.token)
        if(PARSED_RESPONSE.message)
            return PARSED_RESPONSE.message;
        else
            return PARSED_RESPONSE
        
    } catch (error) {
        console.error("Error al cargar el archivo:", error);
        return null; // o lanza de nuevo si quieres que el error se maneje arriba
    }
}
