/*
LocalStoreData: Stores form inputs values in actual session to avoid "trash inputs" in DB
*/

function LocalStoreData() {
  const cardForm = document.getElementById("cardForm");
  const inputList = cardForm.getElementsByTagName("input");
  const textareaList = cardForm.getElementsByTagName("textarea");
  const selectList = cardForm.getElementsByTagName("select");
  setInputValues(
    Array.from(inputList).concat(
      Array.from(textareaList),
      Array.from(selectList)
    )
  );
}

function setInputValues(list) {
  let i, item;
  if (list.length > 0) {
    for (i in list) {
      item = list[i];
      localStorage.setItem(item.id, item.value);
    }
  }
}
