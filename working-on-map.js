var myLat = 0;
var myLng = 0;

var map;
var marker;
var myMarker;
var infowindow;
var messagewindow;

var chicago = {lat: 41.881832, lng: -87.623177};
var boston = {lat: 42.361145, lng: -71.057083};
var nyc = {lat: 40.730610, lng: -73.935242};
var minneapolis = {lat: 44.986656, lng: -93.258133};
var fort_lauderdale = {lat: 26.018896, lng: -80.34618};
var cambridge = {lat: 42.365248, lng: -71.105015};
var pawtucket = {lat: 41.880809, lng: -71.383667};

var artists = [
{position: chicago, name: "NoName", artist_id: "auditory", marker: null},
{position: {lat: 42.347186, lng: -71.095737}, name: "Michael Christmas", artist_id: "auditory", marker: null},
{position: chicago, name: "Saba", artist_id: 'auditory', marker: null},
{position: minneapolis, name: "Leslie Barlow", artist_id: "visual", marker: null},
{position: boston, name: "Rene Dongo", artist_id: "visual", marker: null},
{position: {lat: 42.34273, lng: -71.053725}, name: "Artists for Humanity", artist_id: "visual", marker: null},
{position: fort_lauderdale, name: "Maya Theresia", artist_id: "visual", marker: null},
{position: cambridge, name: "Saraswathi Jones", artist_id: "auditory", marker: null},
{position: {lat: 42.368633,lng:  -71.10934}, name: "David Sun Kong", artist_id: "visual", marker: null},
{position: pawtucket, name: "Chachi Carvalho", artist_id: "auditory", marker: null}]


function initMap() {
  var california = {lat: 37.4419, lng: -122.1419};
  map = new google.maps.Map(document.getElementById('map'), {
    center: boston,
    zoom: 7,
    //markArtists()
    //getMyLocation();
  });

  infowindow = new google.maps.InfoWindow({
    content: document.getElementById('form')
  });

  messagewindow = new google.maps.InfoWindow({
    content: document.getElementById('message')
  });

  google.maps.event.addListener(map, 'click', function(event) {
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });


    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  });
}

function markArtists() {
	var visual_icon = {
		url: 'paintbrush.png',
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(17,34),
		scaledSize: new google.maps.Size(30,30)
	};
	var auditory_icon = {
		url: 'music_icon.png',
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(17,34),
		scaledSize: new google.maps.Size(20,30)
	};
	var artistInfo = new google.maps.InfoWindow();
	for(i=0; i< (artists.length); i++) {
		if(artists[i].artist_id == "visual") {
			marker = new google.maps.Marker({
				position: artists[i].position,
				title: artists[i].name,
				map: map,
				icon: visual_icon
			});
		} else if (artists[i].artist_id == "auditory") {
			marker = new google.maps.Marker({
				position: artists[i].position,
				title: artists[i].name,
				map: map,
				icon: auditory_icon
			});
		} else {
			marker = new google.maps.Marker({
			position: artists[i].position,
			title: artists[i].name,
			map: map,
			});
		}
		artists[i].marker = marker;
		marker.setMap(map);
		
		google.maps.event.addListener(marker, 'click', function() {
			artistInfo.setContent(this.title);
			artistInfo.open(map, this);
		});
	}
}

function getMyLocation() {
	if (navigator.geolocation) {
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

function renderMap() {
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	mapMe();
	//nearMe(myLat, myLng);

}

function mapMe() {
	var myIcon = {
		url: 'flower_icon.png',
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(17,34),
		scaledSize: new google.maps.Size(30,30)
	};
	myMarker = new google.maps.Marker({
		position: me,
		title: "You're Here!",
		icon: myIcon,
	});
	myMarker.setMap(map);
	var infowindow = new google.maps.InfoWindow();
	google.maps.event.addListener(myMarker, 'click', function() {
		infowindow.setContent(myMarker.title);
		infowindow.open(map, myMarker);
	});
}

function saveData() {
  var name = escape(document.getElementById('name').value);
  var address = escape(document.getElementById('address').value);
  var type = document.getElementById('type').value;
  var latlng = marker.getPosition();
  var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
            '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

  downloadUrl(url, function(data, responseCode) {

    if (responseCode == 200 && data.length <= 1) {
      infowindow.close();
      messagewindow.open(map, marker);
    }
  });
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function doNothing () {
}
