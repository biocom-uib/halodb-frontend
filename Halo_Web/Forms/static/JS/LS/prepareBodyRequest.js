function prepareBodyRequest(step, source = null) {
  const koma=localStorage.getItem("koma")
  const ID_FORM = "Form_".concat(step);
  const RAW_DATA = JSON.parse(localStorage.getItem(ID_FORM));

  let result = {};

  // 1. Recorremos y procesamos los campos
  RAW_DATA.fields
    .filter(item => item.id)
    .forEach(item => {
      // Fecha
      if (item.type === "date") {
        const dateObj = item.value ? new Date(item.value) : new Date();
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        result[item.id] = `${day}/${month}/${year}`;
        return;
      }

      // Hora
      if (item.type === "time") {
        const timeObj = item.value ? new Date(`1970-01-01T${item.value}`) : new Date();
        const hours = String(timeObj.getHours()).padStart(2, '0');
        const minutes = String(timeObj.getMinutes()).padStart(2, '0');
        const seconds = String(timeObj.getSeconds()).padStart(2, '0');
        result[item.id] = `${hours}:${minutes}:${seconds}`;
        return;
      }

      // Otros tipos
      result[item.id] = item.value;
    });

  // Añadir source_id si existe
  if (step!="Sample" && step=="0") {
    result["source_id"] = source;
    result["sequence"]=koma;
    result["koma"]=koma;
  }


  return JSON.stringify(result, null, 2);
}
