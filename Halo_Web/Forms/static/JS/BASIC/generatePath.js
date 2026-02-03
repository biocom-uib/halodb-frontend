/**
 * @module BASIC
 */

/**
 * Adjust the path used in static files with the actual environment
 * @param {*} path URL we want to use
 * @returns Adjusted URL
 */
function generatePath(path){
    return localStorage.getItem("env")==="DEV" ? path : "/halofiles"+path
}