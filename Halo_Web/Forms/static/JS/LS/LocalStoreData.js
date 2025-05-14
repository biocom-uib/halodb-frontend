/**
 * Store the actual form data in LocalStorage in JSONStiring form
 * @param {*} step - Actual step. Used as a part of ID
 * @param {boolean} isSample - Helps to detect if it's a sample or a sequence step
 * @param {HTMLFormElement} form - Form element
 */

function LocalStoreData(step="Sample",isSample=false,form=null) {
  const cardForm = isSample ? form : document.getElementById("cardForm");
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

/**
 * Transforms all inputs values into JSON objects 
 *  @param {Array} list - List of inputs values
 *  @returns {Array} List with all the values with JSON structure 
 */
function setInputValues(list) {
  let i,
    item,
    result = [];
  if (list.length > 0) {
    for (i in list) {
      item = list[i];
      localStorage.setItem(item.id, item.value);
      //Case when item is Select Type
      if(item.tagName=="SELECT"){
        result.push({ id: item.id, value: item.value, tagName: item.tagName, type:item.type, options:JSON.stringify(getOptionsName(item)) });
      }
      else if(item.type==="file"){
        result.push({id: item.id, value: item.value, tagName: item.tagName, type:item.type, file:item.files[0]})
      }
      else{
        result.push({ id: item.id, value: item.value, tagName: item.tagName, type:item.type });
      }
    }
  }
  return result;
}

/**
 * Process all the options form Select item and convert into a list of JSON items 
 * @param {HTMLSelectElement} item - Select item
 * @returns {Array} List with options in JSON form 
*/

function getOptionsName(item){
  let list=[];
  Array.from(item.options).forEach((item)=>{
    list.push({text:item.text,value:item.value})
  })
  return list;
}