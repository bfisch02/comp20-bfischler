function load_map()
{
var myLat = 0;
			var myLng = 0;
			var request = new XMLHttpRequest();
			var me = new google.maps.LatLng(myLat, myLng);
			var myOptions = {
						zoom: 13, // The larger the zoom number, the bigger the zoom
						center: me,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
			var map;
			var marker;
			var infowindow = new google.maps.InfoWindow();
			var places;

			function init()
			{
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				getMyLocation();
			}

			function getMyLocation()
			{
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
						renderMap();
					});
				}
				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			}

			function renderMap()
			{
				me = new google.maps.LatLng(myLat, myLng);

				// Update map and go there...
				map.panTo(me);

				// Create a marker
				marker = new google.maps.Marker({
					position: me,
					title: "Here I Am!"
				});
				marker.setMap(map);

				// Open info window on click of marker
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});

				// Calling Google Places API
				var request = {
					location: me,
					radius: '500',
					types: ['food']
				};
				service = new google.maps.places.PlacesService(map);
				service.search(request, callback);
			}

			// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
			function callback(results, status)
			{
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					alert("Got places back!");
					places = results;
					for (var i = 0; i < results.length; i++) {
						createMarker(results[i]);
					}
				}
			}

			function createMarker(place)
			{
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.close();
					infowindow.setContent(place.name);
					infowindow.open(map, this);
				});
				}



make_array();
}

function make_array()
{
stations = [
{"platformKey":"RALEN","stationName":"ALEWIFE","latitude":42.395428,"longitude":-71.142483},
{"platformKey":"RDAVN","stationName":"DAVIS","latitude":42.39674,"longitude":-71.121815},
{"platformKey":"RDAVS","stationName":"DAVIS","latitude":42.39674,"longitude":-71.121815},
{"platformKey":"RPORN","stationName":"PORTER","latitude":42.3884,"longitude":-71.119149},
{"platformKey":"RPORS","stationName":"PORTER","latitude":42.3884,"longitude":-71.119149},
{"platformKey":"RHARN","stationName":"HARVARD","latitude":42.373362,"longitude":-71.118956},
{"platformKey":"RHARS","stationName":"HARVARD","latitude":42.373362,"longitude":-71.118956},
{"platformKey":"RCENN","stationName":"CENTRAL","latitude":42.365486,"longitude":-71.103802},
{"platformKey":"RCENS","stationName":"CENTRAL","latitude":42.365486,"longitude":-71.103802},
{"platformKey":"RKENN","stationName":"KENDALL","latitude":42.36249079,"longitude":-71.08617653},
{"platformKey":"RKENS","stationName":"KENDALL","latitude":42.36249079,"longitude":-71.08617653},
{"platformKey":"RMGHN","stationName":"CHARLES MGH","latitude":42.361166,"longitude":-71.070628},
{"platformKey":"RMGHS","stationName":"CHARLES MGH","latitude":42.361166,"longitude":-71.070628},
{"platformKey":"RPRKN","stationName":"PARK","latitude":42.35639457,"longitude":-71.0624242},
{"platformKey":"RPRKS","stationName":"PARK","latitude":42.35639457,"longitude":-71.0624242},
{"platformKey":"RDTCN","stationName":"DOWNTOWN CROSSING","latitude":42.355518,"longitude":-71.060225},
{"platformKey":"RDTCS","stationName":"DOWNTOWN CROSSING","latitude":42.355518,"longitude":-71.060225},
{"platformKey":"RSOUN","stationName":"SOUTH STATION","latitude":42.352271,"longitude":-71.055242},
{"platformKey":"RSOUS","stationName":"SOUTH STATION","latitude":42.352271,"longitude":-71.055242},
{"platformKey":"RBRON","stationName":"BROADWAY","latitude":42.342622,"longitude":-71.056967},
{"platformKey":"RBROS","stationName":"BROADWAY","latitude":42.342622,"longitude":-71.056967},
{"platformKey":"RANDN","stationName":"ANDREW","latitude":42.330154,"longitude":-71.057655},
{"platformKey":"RANDS","stationName":"ANDREW","latitude":42.330154,"longitude":-71.057655},
{"platformKey":"RJFKN","stationName":"JFK","latitude":42.320685,"longitude":-71.052391},
{"platformKey":"RJFKS","stationName":"JFK","latitude":42.320685,"longitude":-71.052391},
{"platformKey":"RSAVN","stationName":"SAVIN HILL","latitude":42.31129,"longitude":-71.053331},
{"platformKey":"RSAVS","stationName":"SAVIN HILL","latitude":42.31129,"longitude":-71.053331},
{"platformKey":"RFIEN","stationName":"FIELDS CORNER","latitude":42.300093,"longitude":-71.061667},
{"platformKey":"RFIES","stationName":"FIELDS CORNER","latitude":42.300093,"longitude":-71.061667},
{"platformKey":"RSHAN","stationName":"SHAWMUT","latitude":42.29312583,"longitude":-71.06573796},
{"platformKey":"RSHAS","stationName":"SHAWMUT","latitude":42.29312583,"longitude":-71.06573796},
{"platformKey":"RASHS","stationName":"ASHMONT","latitude":42.284652,"longitude":-71.064489},
{"platformKey":"RNQUN","stationName":"NORTH QUINCY","latitude":42.275275,"longitude":-71.029583},
{"platformKey":"RNQUS","stationName":"NORTH QUINCY","latitude":42.275275,"longitude":-71.029583},
{"platformKey":"RWOLN","stationName":"WOLLASTON","latitude":42.2665139,"longitude":-71.0203369},
{"platformKey":"RWOLS","stationName":"WOLLASTON","latitude":42.2665139,"longitude":-71.0203369},
{"platformKey":"RQUCN","stationName":"QUINCY CENTER","latitude":42.251809,"longitude":-71.005409},
{"platformKey":"RQUCS","stationName":"QUINCY CENTER","latitude":42.251809,"longitude":-71.005409},
{"platformKey":"RQUAN","stationName":"QUINCY ADAMS","latitude":42.233391,"longitude":-71.007153},
{"platformKey":"RQUAS","stationName":"QUINCY ADAMS","latitude":42.233391,"longitude":-71.007153},
{"platformKey":"RBRAS","stationName":"BRAINTREE","latitude":42.2078543,"longitude":-71.0011385}
]

console.log (stations[0].stationName);
}