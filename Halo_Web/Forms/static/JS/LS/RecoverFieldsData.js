async function RecoverFieldsData() {
    const cardForm = document.getElementById("cardForm");
    const inputList = Array.from(cardForm.getElementsByTagName("input"));
    const textareaList = Array.from(cardForm.getElementsByTagName("textarea"));
    const selectList = Array.from(cardForm.getElementsByTagName("select"));
    const simpleItem = inputList.concat(textareaList);
    var item, i, storedValue;
    for (i in simpleItem) {
      item = simpleItem[i];
      storedValue = localStorage.getItem(item.id);
      item.value = storedValue;
    }
    for (i in selectList) {
      item = selectList[i];
      storedValue = localStorage.getItem(item.id);
      document.getElementById(item.id).value = storedValue;
    }
  }