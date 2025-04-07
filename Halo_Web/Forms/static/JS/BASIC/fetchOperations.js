const URL_DICC={
    "static":"/secure-static/",
    "GET":"api/get/"
}
async function fetchSecureFile(type,param) {
    
    fetch(URL_DICC[type].concat(param))
        .then(response => {
            if (!response.ok) {
                throw new Error("Archivo no encontrado");
            }
            return response.text();
        })
        .then(data => {
            return JSON.parse(data);
        })
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });
}


