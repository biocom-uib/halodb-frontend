const URL_DICC = {
    "static": "/secure-static/",
    "GET": "api/get/"
};

async function fetchSecureFile(type, param) {
    try {
        const response = await fetch(URL_DICC[type] + param);

        if (!response.ok) {
            throw new Error("Archivo no encontrado");
        }

        const data = await response.text();
        return JSON.parse(data);
        
    } catch (error) {
        console.error("Error al cargar el archivo:", error);
        return null; // o lanza de nuevo si quieres que el error se maneje arriba
    }
}
