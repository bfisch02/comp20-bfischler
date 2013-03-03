function load_map() {
	
	var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(42.39674, -71.121815),
    mapTypeId: google.maps.MapTypeId.ROADMAP
	}
  
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	add_markers();
}

function add_markers()
{
	make_array();
	
	for (i = 0; i < 41; i++)
	{
	marker = new google.maps.Marker({
					position: new google.maps.LatLng(stations[i].latitude, stations[i].longitude),
					title: stations[i].stationName
				});
				marker.setMap(map);
	}

	navigator.geolocation.getCurrentPosition(findMe);
	
	Waldo_Carmen();
	
}

function findMe(pos) {
	var lat = pos.coords.latitude;
	var long = pos.coords.longitude;
	var acc = pos.coords.accuracy;

	marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat, long),
					title: "My location"
				});
				marker.setMap(map);
}

function Waldo_Carmen()
{
		try {
  			request = new XMLHttpRequest();
		}

		catch (ms1) {
  			try {
    			request = new ActiveXObject("Msxml2.XMLHTTP");
  			}
  
  			catch (ms2) {
    			try {
      				request = new ActiveXObject("Microsoft.XMLHTTP");
    			}
    			catch (ex) {
      				request = null;
    			}
 			}
		}

		if (request == null) {
  			alert("Error creating request object --Ajax not supported?");
		}
		
		request.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
		request.send(null);
		request.onreadystatechange=callback;
		
		
	
}
	
function callback() {
	var img;
	var str;

	if (request.readyState == 4) {
		str = request.responseText;
		alert(str);
		str = JSON.parse(str);
		
		try {
		
		if (str[0].name = "Waldo") {
			alert("Good sign");
			img = 'http://www.manvswebapp.com/wp-content/uploads/2013/01/Waldo-image_approved.jpg';
		}
		
			marker = new google.maps.Marker({
					position: new google.maps.LatLng(str[0].loc.latitude, str[0].loc.longitude),
					title: "Secret Location 1",
					icon: img
				});
				marker.setMap(map);
		}
		
		catch(error) {
		alert("Couldn't find other");
		}
		
		try {
			marker = new google.maps.Marker({
					position: new google.maps.LatLng(str[1].loc.latitude, str[1].loc.longitude),
					title: "Secret Location 2",
					icon: img
				});
				marker.setMap(map);
		}
		
		catch(error) {
		alert("Couldn't find other");
		}
	}
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
}



