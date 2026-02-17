/**
 * @module BASIC
 */

/**
 * Adjust the path used in static files with the actual environment
 * @param {*} path URL we want to use
 * @returns Adjusted URL
 */
function generatePath(path){
    const hostEnv = HOST_DICC[window.location.hostname] || "DEV";
    if (hostEnv === "DEV") {
        return path;
    }

    const currentEnv = localStorage.getItem("env") || hostEnv;
    return currentEnv === "PROD" ? "/halofiles" + path : path;
}
