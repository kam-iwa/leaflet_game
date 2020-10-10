let mapa = L.map('mapa', {
    center : [52.19109722, 19.35527778],
    minZoom : 6,
    zoom : 6,
    maxZoom : 6,
    dragging : false,
    zoomControl : false
});

let baza = L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {});
baza.addTo(mapa);

let xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('GET','https://nominatim.openstreetmap.org/search?q=Poland&format=geojson&limit=1&polygon_geojson=1');
xhr.send();

xhr.addEventListener('load', function(){
    if (xhr.status === 200){
        let granice = L.geoJSON();
        granice.addData(xhr.response);
        granice.addTo(mapa);
    }
});

let miasta = [
    ['Warszawa', 52.232222,21.008333],
    ['Kraków', 50.061389, 19.938333],
    ['Łódź', 51.776667, 19.454722],
    ['Wrocław', 51.11, 17.022222],
    ['Poznań', 52.408333, 16.934167],
    ['Gdańsk', 54.3475, 18.645278],
    ['Szczecin', 53.438056, 14.542222],
    ['Bydgoszcz', 53.125, 18.011111],
    ['Lublin', 51.248056, 22.570278],
    ['Białystok', 53.135278, 23.145556],
    ['Katowice', 50.264167, 19.023611],
    ['Toruń', 53.022222, 18.611111],
    ['Kielce', 50.874167, 20.633333],
    ['Rzeszów', 50.033611, 22.004722],
    ['Olsztyn', 53.773056, 20.476111],
    ['Zielona Góra', 51.939722, 15.505],
    ['Opole', 50.664722, 17.926944],
    ['Gorzów Wielkopolski', 52.730833, 15.238333]
];

let przycisk = document.getElementById('nastepne_pytanie');
let reset = document.getElementById('reset_gry');
let tekst_nazwa_miasta = document.getElementById('tekst_nazwa_miasta');
let nazwa_miasta = document.getElementById('nazwa_miasta');
let tekst_wynik = document.getElementById('tekst_wynik');
let tekst_pkt = document.getElementById('tekst_punkty');

let marker = L.marker([0,0]);
marker.addTo(mapa);


przycisk.addEventListener('click', function(){

    let numer = Math.floor(Math.random() * miasta.length);
    tekst_nazwa_miasta.textContent = 'Wylosowane miasto do odgadnięcia położenia : ';
    tekst_wynik.textContent = '';
    punkty = Number(tekst_pkt.textContent);
    nazwa_miasta.textContent = miasta[numer][0];

    mapa.addEventListener('click', function(event){
        let wspolrzedne_klik = event.latlng;
        let wspolrzedne_miasto = L.latLng(miasta[numer][1], miasta[numer][2]);
        marker.setLatLng(wspolrzedne_miasto);
        let dystans = wspolrzedne_klik.distanceTo(wspolrzedne_miasto) / 1000;
        tekst_wynik.textContent = 'Odległość od klikniętego miejsca do rzeczywistego położenia : '+dystans+' km';
        if(dystans < 50){
            punkty += Math.floor(50 - dystans);
            tekst_pkt.textContent = punkty;
        }

    });

});

reset.addEventListener('click', function(){
    window.location.reload();
})

