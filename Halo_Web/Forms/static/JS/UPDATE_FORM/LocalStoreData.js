/*
LocalStoreData: Stores form inputs values in actual session to avoid "trash inputs" in DB
*/

function LocalStoreData(step) {
  var form = document.getElementById("Sample");
  //Obtenemos el formulario Sample y sus campos inputs
  var inputs = form.getElementsByTagName("input");
  //Los campos select se tratan por separado,
  /*
  var select = form.getElementsByTagName("select")[0];
  var unidad = select[select.selectedIndex].value;
  //Guardamos la pareja key-value en LS
  localStorage.setItem(select.name, unidad);
  */
  for (var value of inputs) {
    if (value.type != "submit" && (value.type != "radio" || value.checked)) {
      if (value.type == "radio") {
        localStorage.setItem("ssizetype", value.value);
      } else {
        localStorage.setItem(value.name, value.value);
      }
    }
  }
  /*
  for (var id of TEST) {
    console.log("Almacenado como " + id + ":" + localStorage.getItem(id));
  }
  */
}
