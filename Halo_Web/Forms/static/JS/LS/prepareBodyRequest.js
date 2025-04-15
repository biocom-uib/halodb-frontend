function prepareBodyRequest(step,source=null){
    let form=[]
    const ID_FORM="Form_".concat(step)
    const RAW_DATA=JSON.parse(localStorage.getItem(ID_FORM))
    const filteredData = RAW_DATA.fields
    .filter(item => item.id) // Excluye null y undefined
    .map(item => ({
      id: item.id,
      value: item.value
    }));
    const resultJSON = JSON.stringify(filteredData, null, 2);
    console.log(resultJSON);
}