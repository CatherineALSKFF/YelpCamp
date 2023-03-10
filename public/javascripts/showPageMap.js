mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: campgrounds.geometry.coordinates, // starting position [lng, lat]
zoom: 9, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl())

new mapboxgl.Marker()
.setLngLat(campgrounds.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset:25})
.setHTML(`<p>${campgrounds.title}</p><p class='text-muted'>${campgrounds.location}</p>`)) 
.addTo(map);