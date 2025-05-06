async function uploadOperation(table) {
    try {
        let step= localStorage.getItem("actualStep") ? localStorage.getItem("actualStep")-1 : "Sample"
        const post_body=prepareBodyRequest(step,sessionStorage.getItem("source_id")) 
        const response = await fetch(`/halophile/upload/${table.toUpperCase()}`,{
             headers: {
                "Content-Type": "application/json"},
            method:"POST",
            body: post_body
        }
    );

    if (!response.ok) {
        throw new Error("Archivo no encontrado");
    }

    const RESPONSE = await (response.text());
    const PARSED_RESPONSE=JSON.parse(RESPONSE)
    if(PARSED_RESPONSE.message)
            return PARSED_RESPONSE.message;
    else
        return PARSED_RESPONSE
        
    } catch (error) {
        console.error("Error al cargar el archivo:", error);
        return null; // o lanza de nuevo si quieres que el error se maneje arriba
    }
}
