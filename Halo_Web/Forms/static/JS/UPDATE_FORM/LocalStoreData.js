/*
LocalStoreData: Stores form inputs values in actual session to avoid "trash inputs" in DB
*/

function LocalStoreData(step) {
  const cardForm = document.getElementById("cardForm");
  const inputList = cardForm.getElementsByTagName("input");
  const textareaList = cardForm.getElementsByTagName("textarea");
  const selectList = cardForm.getElementsByTagName("select");
  const FORM_DATA = {
    stored: "false",
    changed: "false",
    fields: setInputValues(
      Array.from(inputList).concat(
        Array.from(textareaList),
        Array.from(selectList)
      )
    ),
  };
  localStorage.setItem("Form_".concat(step), JSON.stringify(FORM_DATA));
}

function setInputValues(list) {
  let i,
    item,
    result = [];
  if (list.length > 0) {
    for (i in list) {
      item = list[i];
      localStorage.setItem(item.id, item.value);
      result.push({ id: item.id, value: item.value });
    }
  }
  return result;
}
