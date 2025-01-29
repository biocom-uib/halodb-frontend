/*
Si cultured-> selected value=isolate, show ccsu
SI typn=FALSE -> show otyp, block txnt,type
 */
function culturedValueDependence(){
    var culturedValue=document.getElementById("cult").value;
    var selectKoma=document.getElementById("koma");
    var ccsuInput=document.getElementById("ccsu");

    if(culturedValue){
        selectKoma.innerHTML=`<div class="col-sm-8">
        <option value="ISOLATE">Isolate</option></div>`;
    }
    else{
        selectKoma.innerHTML=`    
        <div class="col-sm-8">
            <select class="form-select" id="koma">
                <option value="METAGENOME">Metagenome</option>
                <option value="METATRANSCRIPTOME">Metatranscriptome</option>
                <option value="METAVIROME">Metavirome</option>
                <option value="GENOME PROCARIOTA">Genome Procariota</option>
                <option value="GENOME VIRUS">Genome Virus</option>
                <option value="PROTEOMICS">Proteomics</option>
                <option value="SINGLE CELL GENOMICS">Single Cell Genomics</option>
                <option value="PLASMID">Plasmid</option>
            </select>
        </div>`;
    }
    ccsuInput.disabled=!culturedValue;
}

function typnValueDependence(){
    var typnValue=document.getElementById("typn").value;
    var otypInput=document.getElementById("otyp");
    var txntInput=document.getElementById("txnt");
    var typeInput=document.getElementById("type");
    
    otypInput.disabled=!typnValue;
    txntInput.disabled=typnValue;
    typeInput.disabled=typnValue;
}