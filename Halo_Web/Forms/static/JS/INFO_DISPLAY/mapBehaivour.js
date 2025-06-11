function initMap(lat,lon){
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
        document.getElementById("doiCont").hasAttribute('hidden') ? document.getElementById("doiCont").removeAttribute('hidden') : document.getElementById("doiCont").setAttribute('hidden',null)})   
}

