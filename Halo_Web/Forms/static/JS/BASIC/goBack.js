/*
1. Cargar formulario antiguo
2. Retornar los valores de cada campo
3. Actualizar step-by-step
*/
function goBack(){
    const newStep=Number(localStorage.getItem("actualStep"))-1;
    localStorage.setItem("actualStep",newStep);
    LoadNextForm(newStep);
    RecoverFieldsData();
    RemoveStep();
}

/*
    Data of form x= "DataFormaStepX"
*/
function RecoverFieldsData(){
    var form=document.getElementById("Sample");
    var inputList=form.getElementsByTagName("input");
    var textareaList=form.getElementsByTagName("textarea");
    var selectList=form.getElementsByTagName("select");
    var item,storedValue;
    for(item in inputList){
        storedValue=localStorage.getItem(item.id);
        item.value=storedValue;
    }
    for(item in textareaList){
        storedValue=localStorage.getItem(item.id);
        item.value=storedValue;
    }
    for(item in selectList){
        storedValue=localStorage.getItem(item.id);
        item.options.namedItem(storedValue).selected=true;
    }
    
}