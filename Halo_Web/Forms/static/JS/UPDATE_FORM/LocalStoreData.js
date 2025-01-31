/*
LocalStoreData: Stores form inputs values in actual session to avoid "trash inputs" in DB
*/

function LocalStoreData() {
  var form = document.getElementById("Sample");
  var inputList = form.getElementsByTagName("input");
  var textareaList = form.getElementsByTagName("textarea");
  var selectList = form.getElementsByTagName("select");
  setInputValues(
    Array.from(inputList).concat(
      Array.from(textareaList),
      Array.from(selectList)
    )
  );
}

function setInputValues(list) {
  var indx, item;
  if (list.length > 0) {
    for (indx in list) {
      item = list[indx];
      localStorage.setItem(item.id, item.value);
    }
  }
}
