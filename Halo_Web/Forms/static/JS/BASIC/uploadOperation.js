async function uploadOperation(table) {
    try {
        const response = await fetch("/upload/"+table,{
            method:"POST",
            body: prepareBodyRequest(table)
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
