/**
 * Initialize a map with the coordenates introducid
 * @param {Number} lat 
 * @param {Number} lon 
 */
function initMap(lat,lon){
    const doiCont=document.getElementById("doiCont")
    var map = L.map('map').setView([lat, lon], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var circle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    document.getElementById("addNotice").addEventListener("change",()=>{
        doiCont.hasAttribute('hidden') ? doiCont.removeAttribute('hidden') :
                                         doiCont.setAttribute('hidden',null)})   
}

