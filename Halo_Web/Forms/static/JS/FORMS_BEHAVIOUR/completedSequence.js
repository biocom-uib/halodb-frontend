/**
 * @module FORMS_BEHAIVOUR
 */

/**
 * Changes realized when the las sequence form is submited
 * @param {Number} ACT_STEP - Actual Step of sequence 
 */

function completedSequence(ACT_STEP){
    localStorage.setItem("StepsNameList",JSON.stringify(STEPS_NAME))
    LocalStoreData(ACT_STEP);
    window.location.assign(generatePath("/Profile/"));
}