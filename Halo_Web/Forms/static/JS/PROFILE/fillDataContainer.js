/**
 * Generate a HTMLDivElement whith one row of entry data JSON
 * @param {JSON} data - JSON object 
 * @returns HTMLDivElement with data information
 */
const FILE_INPUTS=["rreads","rreads2","treads","assembled","pgenes"]
function fillDataContainer(data,table){
    let keyCol,valCol
    const container=document.createElement("div")
    container.classList.add(
      "row", 
      "d-flex", 
      "justify-content-between", 
      "w-100", 
      "row-cols-1", 
      "row-cols-md-4", 
      "g-4",
      "stepContainer"
    );  
    let id    
  //Add all element data into the Modal Card Body
  Object.entries(data).forEach(([key, value]) => {
      keyCol=document.createElement("div")
      keyCol.classList.add("col")
      keyCol.innerText=paramDict[key] ? paramDict[key] : key

      if(key=="id")
        id=value
      valCol=document.createElement("div")
      keyCol.classList.add("col")
      if(FILE_INPUTS.includes(key) && value)
        valCol.append(addDownloadBtn(key,id,table))
      else if(key=="public")
        valCol.innerText=value==1 ? "Yes" : "No"
      else if (value)
        valCol.innerText=value
      else
        valCol.innerText="None"

      container.append(keyCol)
      container.append(valCol)      
    });
    return container
}

function addDownloadBtn(item,id,table){
  const btn=document.createElement("button")
  btn.className="btn btn-primary"
  btn.addEventListener("click",async ()=>{
    try {
      const response = await fetch(generatePath(`/api/get_file/${table}/${id}/${item}/`));  // Cambia la URL según tu endpoint

      if (!response.ok) throw new Error("Error al descargar el archivo");

      const blob = await response.blob();

      // Intenta extraer el nombre del archivo desde Content-Disposition
      const disposition = response.headers.get("Content-Disposition");
      let fileName = "archivo.descargado";

      if (disposition && disposition.includes("filename=")) {
        const match = disposition.match(/filename="?([^\";]+)"?/);
        if (match && match[1]) fileName = match[1];
      }

      // Crear enlace temporal para forzar descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo descargar el archivo.");
    }
  })
  btn.innerText="Download"
  return btn
}