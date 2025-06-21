/**
 * @module UPDATE_FORM
 */

const modifyDict={
    GENOME:(koma)=>
        hideGenomeFieldsDict[koma] && showListFields(hideGenomeFieldsDict[koma],false),
    "RAW READS":(koma)=>
        showRRFieldsDict[koma] && showListFields(showRRFieldsDict[koma],true),
    "TRIMMED READS":(koma)=>
        hideTRFieldsDict[koma] && showListFields(hideTRFieldsDict[koma],false)

}

const hideGenomeFieldsDict={
    "GENOME VIRUS": ["txnt","sixteensr","seqdepth","dnae","tems",
                                            "phsa","sals","emet","elac","temo","teml",
                                            "temh","phop","phhi","salo","sall","salw",
                                            "path","extr"]
}

const hideTRFieldsDict={
    METATRANSCRIPTOME:["coverage"]
}

const showRRFieldsDict={
    METAGENOME:["gsiz","sfrac","meca"],
    METATRANSCRIPTOME:["meca"],
    METAVIROME:["meca"],
    PLASMID:["meca"]
}
/**
 * Depending on the show value, hide/show all inputs values that apperas in the list 
 * @param {Array} list 
 * @param {boolean} show 
 */
function showListFields(list,show){
    list.forEach(element => {
    const parent=document.getElementById(element).parentElement
    const condition=!show & parent
    condition ? parent.setAttribute('hidden',null)
                : parent.hasAttribute('hidden') ? parent.removeAttribute('hidden')
                : parent.parentElement.removeAttribute('hidden')
    });
}