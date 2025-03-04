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
      if(item.tagName=="SELECT"){
        result.push({ id: item.id, value: item.value, tagName: item.tagName, type:item.type, options:JSON.stringify(getOptionsName(item)) });
      }else if (item.type=="radio"){
        if(item.checked){
          result.push({ id: item.id, value: item.value, tagName: item.tagName, type:item.type });
        }
          
      }
      else{
        result.push({ id: item.id, value: item.value, tagName: item.tagName, type:item.type });
      }
    }
  }
  return result;
}

function getOptionsName(item){
  let list=[];
  Array.from(item.options).forEach((item)=>{
    list.push({text:item.text,value:item.value})
  })
  return list;
}