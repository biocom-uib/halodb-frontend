/**
 * Adjust the path used in static files with the actual envior
 * @param {*} path URL we want to use
 * @returns Adjusted URL
 */
function generatePath(path){
    return localStorage.getItem("env")==="dev" ? path : "/halophile"+path
}