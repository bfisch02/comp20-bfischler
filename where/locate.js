google.maps.event.addDomListener(window, 'load', load_map);

function load_map() 
{
	var mapOptions = 
	{
    	zoom: 13,
    	center: new google.maps.LatLng(42.39674, -71.121815),
    	mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	redline_info();
}

function redline_info()
{
	try 
	{
  		request = new XMLHttpRequest();
	}
	catch (ms1) 
	{
  		try 
  		{
    		request = new ActiveXObject("Msxml2.XMLHTTP");
  		}
  		catch (ms2) 
  		{
    		try 
    		{
      			request = new ActiveXObject("Microsoft.XMLHTTP");
    		}
    		catch (ex) 
    		{
      			request = null;
    		}
 		}
	}
	if (request == null) 
	{
  		alert("Error creating request object --Ajax not supported?");
	}
	request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	request.send(null);
	request.onreadystatechange=add_markers;	
}
	
function add_markers() {
	var tImg = 'tSubway2.jpg';
	var img1;
	var img2;
	var str;
	if (request.readyState == 4) 
	{	
		str = request.responseText;
		str = JSON.parse(str);
		make_array();	
		for (i = 0; stations[i]; i++)
		{
			for (j = 0; str[j]; j++)
			{
				if (j==0)
				{
					contentString="";
				}
				if (stations[i].platformKey1 == str[j].PlatformKey)
				{
					if (contentString=="")
					{
						contentString =
						'<div id="content">' + '<span class="title">' +
						stations[i].stationName + '</span></br></br>' + 
						"<span class='miniTitle'>Northbound: </span>" + "</br>" + 
						"<span class='label'>Time: </span>" + str[j].Time + "<span class='label'> Status: </span>" + str[j].InformationType + '</br>';
					}
					else
					{
						contentString+="<span class='label'>Time: </span>" + str[j].Time + "<span class='label'> Status: </span>" + str[j].InformationType + '</br>';
					}
				}
			}
			for (j = 0; str[j]; j++)
			{
				if (j==0) 
				{
					if (contentString!="")
						contentString+="</br><span class='miniTitle'>Southbound: </span>" + "</br>";
				}
				if (stations[i].platformKey2 == str[j].PlatformKey)
				{
					if (contentString=="")
					{
						contentString =
						'<div id="content">' + '<span class="title">' +
						stations[i].stationName + '</span></br></br>' + 
						"<span class='miniTitle'>Southbound: </span>" + "</br>" + 
						"<span class='label'>Time: </span>" + str[j].Time + "<span class='label'> Status: </span>" + str[j].InformationType + '</br>';
					}
					else
					{
						
						contentString+="<span class='label'>Time: </span>" + str[j].Time + "<span class='label'> Status: </span>" + str[j].InformationType + '</br>';
		
					}
				}
			}	
			infowindow = new google.maps.InfoWindow({
				position: new google.maps.LatLng(stations[i].latitude, stations[i].longitude),
    			content: contentString
    		});
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(stations[i].latitude, stations[i].longitude),
				title: stations[i].stationName,
				icon: tImg 
				});
			marker.setMap(map);
			bindWindow(marker, contentString, infowindow);
	
			if (i>0 && i!=17) {
			subwayPath = new google.maps.Polyline({
				path: [new google.maps.LatLng(stations[i-1].latitude, stations[i-1].longitude),
				new google.maps.LatLng(stations[i].latitude, stations[i].longitude)],
				strokeColor: "#FF0000",
				strokeOpacity: 1.0,
				strokeWeight: 5 });
				subwayPath.setMap(map);		
			}
			else if (i == 17) {
			subwayPath = new google.maps.Polyline({
				path: [new google.maps.LatLng(stations[12].latitude, stations[12].longitude),
				new google.maps.LatLng(stations[i].latitude, stations[i].longitude)],
				strokeColor: "#FF0000",
				strokeOpacity: 1.0,
				strokeWeight: 5 });
				subwayPath.setMap(map);	
			}
		}
		navigator.geolocation.getCurrentPosition(findMe);
		Waldo_Carmen();
	}
	
}	

function findMe(my_pos) {
	var my_lat = my_pos.coords.latitude;
	var my_long = my_pos.coords.longitude;
	var meImg = 'Brett.jpg';
	var min_length = my_distance(my_lat, my_long, stations[0].latitude, stations[0].longitude);
	var shortest = 0;
	
	var my_marker = new google.maps.Marker({
		position: new google.maps.LatLng(my_lat, my_long),
		title: "My location",
		icon: meImg });
	my_marker.setMap(map);				
	
	for (i = 1; stations[i]; i++)
	{
		if (my_distance(my_lat, my_long, stations[i].latitude, stations[i].longitude)<min_length) {
			min_length = my_distance(my_lat, my_long, stations[i].latitude, stations[i].longitude);
			shortest = i;
		}
	}
	
	var contentString =
		'<div id="content">' + '<span class="title">Brett Fischler </span></br>' + 
		'<span class="label">Latitude: </span>' + my_lat + '</br>' +
		'<span class="label">Longitude: </span>' + my_long + '</br>' +
		'<span class="label">Closest Station: </span>' + stations[shortest].stationName + '</br>' +
		'<span class="label">Distance: </span>' + min_length + '</br>' +
		'   miles';
		
	infowindow = new google.maps.InfoWindow({
		position: new google.maps.LatLng(my_pos.coords.latitude, my_pos.coords.longitude),
    	content: contentString})	
	bindWindow(my_marker, contentString, infowindow);

}

function my_distance(my_lat, my_long, other_lat, other_long)
{
	var R = 6371*.621371; // mi
	var lat1 = my_lat;
	var lon1 = my_long;
	var lat2 = other_lat;
	var lon2 = other_long;
	var dLat = (lat2-lat1)*Math.PI/180;
	var dLon = (lon2-lon1)*Math.PI/180;
	lat1 = lat1*Math.PI/180;
	lat2 = lat2*Math.PI/180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

function bindWindow(marker, contentString, infowindow)
{
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
}

function Waldo_Carmen()
{
	try 
	{
  		request = new XMLHttpRequest();
	}
	catch (ms1) 
	{
  		try 
  		{
    		request = new ActiveXObject("Msxml2.XMLHTTP");
  		}
  		catch (ms2) 
  		{
    		try 
    		{
      			request = new ActiveXObject("Microsoft.XMLHTTP");
    		}
    		catch (ex) 
    		{
      			request = null;
    		}
 		}
	}
	if (request == null) 
	{
  		alert("Error creating request object --Ajax not supported?");
	}
	else {
		request.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
		request.send(null);
		request.onreadystatechange=callback2;
	}
}

function callback2() 
{
	var img1;
	var img2;
	var str;
	if (request.readyState == 4) 
	{
		navigator.geolocation.getCurrentPosition(find_hidden)	
	}	
}
	
function find_hidden(pos)
{
	var my_lat = pos.coords.latitude;
	var my_long = pos.coords.longitude;
	try 
	{
		str = request.responseText;
		str = JSON.parse(str);
		if (str[0].name == "Waldo") 
		{
			img1 = 'Waldo.jpg';
		}
		else if (str[0].name == "Carmen Sandiego") 
		{
			img1 = 'Carmen.jpg';
		}
		var contentString =
			'<div id="content">' + '<span class="title">' + str[0].name + '</span></br>' +
			'<span class="label">Distance: </span>' + my_distance(my_lat, my_long, str[0].loc.latitude, str[0].loc.longitude)
			+ '</br>' + 'miles';
		infowindow = new google.maps.InfoWindow({
    		content: contentString
    	});
    	marker = new google.maps.Marker({
			position: new google.maps.LatLng(str[0].loc.latitude, str[0].loc.longitude),
			title: "Secret Location 1",
			icon: img1
		});
		marker.setMap(map);
		bindWindow(marker, contentString, infowindow);
	}
	catch(error) 
	{
		alert("Couldn't find anyone");
	}
	try 
	{
		if (str[1].name == "Waldo") 
		{
			img2 = 'Waldo.jpg';
		}
		else if (str[1].name == "Carmen Sandiego") 
		{
			img2 = 'Carmen.jpg';
		}
		var contentString =
			'<div id="content">' + '<span class = "title">' + str[1].name + '</span></br>' +
			'<span class="label">Distance: </span>' + my_distance(my_lat, my_long, str[1].loc.latitude, str[1].loc.longitude)
			+ '</br>' + 'miles';
		infowindow = new google.maps.InfoWindow({
    		content: contentString
    	});
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(str[1].loc.latitude, str[1].loc.longitude),
			title: "Secret Location 2",
			icon: img2
		});
		marker.setMap(map);			
		bindWindow(marker, contentString, infowindow);
	}
	catch(error) 
	{
	}
}

function make_array()
{
	stations = 
	[
		{"platformKey1":"RALEN","platformKey2":"NONE","stationName":"ALEWIFE","latitude":42.395428,"longitude":-71.142483},
		{"platformKey1":"RDAVN","platformKey2":"RDAVS","stationName":"DAVIS","latitude":42.39674,"longitude":-71.121815},
		{"platformKey1":"RPORN","platformKey2":"RPORS","stationName":"PORTER","latitude":42.3884,"longitude":-71.119149},
		{"platformKey1":"RHARN","platformKey2":"RHARS","stationName":"HARVARD","latitude":42.373362,"longitude":-71.118956},
		{"platformKey1":"RCENN","platformKey2":"RCENS","stationName":"CENTRAL","latitude":42.365486,"longitude":-71.103802},
		{"platformKey1":"RKENN","platformKey2":"RKENS","stationName":"KENDALL","latitude":42.36249079,"longitude":-71.08617653},
		{"platformKey1":"RMGHN","platformKey2":"RMGHS","stationName":"CHARLES MGH","latitude":42.361166,"longitude":-71.070628},
		{"platformKey1":"RPRKN","platformKey2":"RPRKS","stationName":"PARK","latitude":42.35639457,"longitude":-71.0624242},
		{"platformKey1":"RDTCN","platformKey2":"RDTCS","stationName":"DOWNTOWN CROSSING","latitude":42.355518,"longitude":-71.060225},
		{"platformKey1":"RSOUN","platformKey2":"RSOUS","stationName":"SOUTH STATION","latitude":42.352271,"longitude":-71.055242},
		{"platformKey1":"RBRON","platformKey2":"RBROS","stationName":"BROADWAY","latitude":42.342622,"longitude":-71.056967},
		{"platformKey1":"RANDN","platformKey2":"RANDS","stationName":"ANDREW","latitude":42.330154,"longitude":-71.057655},
		{"platformKey1":"RJFKN","platformKey2":"RJFKS","stationName":"JFK","latitude":42.320685,"longitude":-71.052391},
		{"platformKey1":"RSAVN","platformKey2":"RSAVS","stationName":"SAVIN HILL","latitude":42.31129,"longitude":-71.053331},
		{"platformKey1":"RFIEN","platformKey2":"RFIES","stationName":"FIELDS CORNER","latitude":42.300093,"longitude":-71.061667},
		{"platformKey1":"RSHAN","platformKey2":"RSHAS","stationName":"SHAWMUT","latitude":42.29312583,"longitude":-71.06573796},
		{"platformKey1":"NONE","platformKey2":"RASHS","stationName":"ASHMONT","latitude":42.284652,"longitude":-71.064489},
		{"platformKey1":"RNQUN","platformKey2":"RNQUS","stationName":"NORTH QUINCY","latitude":42.275275,"longitude":-71.029583},
		{"platformKey1":"RWOLN","platformKey2":"RWOLS","stationName":"WOLLASTON","latitude":42.2665139,"longitude":-71.0203369},
		{"platformKey1":"RQUCN","platformKey2":"RQUCS","stationName":"QUINCY CENTER","latitude":42.251809,"longitude":-71.005409},
		{"platformKey1":"RQUAN","platformKey2":"RQUAS","stationName":"QUINCY ADAMS","latitude":42.233391,"longitude":-71.007153},
		{"platformKey1":"NONE","platformKey2":"RBRAS","stationName":"BRAINTREE","latitude":42.2078543,"longitude":-71.0011385}
	];
}