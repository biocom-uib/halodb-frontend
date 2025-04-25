function prepareBodyRequest(step, source = null) {
  const ID_FORM = "Form_".concat(step);
  const RAW_DATA = JSON.parse(localStorage.getItem(ID_FORM));

  let tempFields = {};

  // 1. Recorremos y procesamos los campos
  const filteredData = RAW_DATA.fields
    .filter(item => item.id)
    .map(item => {
      // Guardamos todos los valores temporalmente
      tempFields[item.id] = item.value;

      // Fecha
      if (item.type === "date") {
        const dateObj = item.value ? new Date(item.value) : new Date();
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return {
          id: item.id,
          value: `${day}/${month}/${year}`
        };
      }

      // Hora
      if (item.type === "time") {
        const timeObj = item.value ? new Date(`1970-01-01T${item.value}`) : new Date();
        const hours = String(timeObj.getHours()).padStart(2, '0');
        const minutes = String(timeObj.getMinutes()).padStart(2, '0');
        const seconds = String(timeObj.getSeconds()).padStart(2, '0');
        return {
          id: item.id,
          value: `${hours}:${minutes}:${seconds}`
        };
      }

      return {
        id: item.id,
        value: item.value
      };
    });

  // 2. Construimos el objeto final
  const result = filteredData.reduce((acc, item) => {
    // Concatenar ssizeunit + ssizetype_u
    if (item.id === "ssizeunit") {
      acc["ssizeunit"] = item.value + (tempFields["ssizetype_u"] || "");
    } else if (item.id !== "ssizetype_u") {
      acc[item.id] = item.value;
    }
    return acc;
  }, {});

  return JSON.stringify(result, null, 2);
}
