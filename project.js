var mylat;
var mylng;

var map;
var myMarker;

var brooklyn = {lat: 40.6782, lng: -73.9442};
var harlem = {lat: 40.8116, lng: -73.9465};
var nyc = {lat: 40.730610, lng: -73.935242};
var queens = {lat: 40.7282, lng: -73.7949};
var bronx = {lat: 40.8448, lng: -73.8648};
var harlem2 = {lat: 40.7957, lng: -73.9389};
var littleitaly = {lat: 40.7191, lng: -73.9973};

//Coming Soon Locations
// var chicago = {lat: 41.8781, lng: -87.6298};
// var los_angeles = {lat: 34.0522, lnh: -118.2437};
// var boston = {lat: 42.3601, lng: -71.0589};
// var houston = {lat: 29.7604, lng: -95.3698};

var artists = [
{position: brooklyn, name: "Norah Jones", artist_id: "auditory", marker: null, content: "https://www.youtube.com/embed/lbjZPFBD6JU"},
{position: nyc, name: "Saba", artist_id: 'auditory', marker: null, content: "https://www.youtube.com/embed/_6ZsSWlcEDo"},
{position: queens, name: "Deem Spencer", artist_id: "auditory", marker: null, content: "https://www.youtube.com/embed/DczN8W_Agu8"},
{position: harlem, name: "Dave East", artist_id: "auditory", marker: null, content: "https://www.youtube.com/embed/RhXt_y0lMC4"},
{position: bronx, name: "A Boogie", artist_id: "auditory", marker: null, content: "https://www.youtube.com/embed/fUtlqtdn1Xo"},
{position: littleitaly, name: "Leeky Bandz", artist_id: "auditory", marker: null, content: "https://www.youtube.com/embed/ZbC58CBdM88"},
{position: harlem2, name: "Sheck Wes", artist_id: "auditory", marker: null, content: "https://www.youtube.com/embed/VWoIpDVkOH0"}]

// coming soon locations
// var CSloc = [
// {position: brooklyn, name: "Norah Jones", artist_id: "auditory", marker: null},
// {position: nyc, name: "Saba", artist_id: 'auditory', marker: null},
// {position: queens, name: "Deem Spencer", artist_id: "auditory", marker: null},
// {position: harlem, name: "Dave East", artist_id: "auditory", marker: null},
// {position: bronx, name: "A Boogie", artist_id: "auditory", marker: null},
// {position: harlem2, name: "Sheck Wes", artist_id: "auditory", marker: null},
// {position: littleitaly, name: "Leeky Bandz", artist_id: "auditory", marker: null},
// {position: chicago, name: "More Locations Coming Soon", artist_id: "auditory", marker: null},
// {position: los_angeles, name: "More Locations Coming Soon", artist_id: "auditory", marker: null},
// {position: boston, name: "More Locations Coming Soon", artist_id: "auditory", marker: null},
// {position: houston, name: "More Locations Coming Soon", artist_id: "auditory", marker: null}]

/*
function initMap() {
	getMyLocation();
	var myOptions = {zoom: 10, center: nyc, mapTypeId: google.maps.MapTypeId.ROADMAP}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	markArtists();
}*/


//Maya's version of initMap
function initMap() {
	getMyLocation();
	var myOptions = { zoom: 7, center: nyc, mapTypeId: google.maps.MapTypeId.ROADMAP}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	markArtists();
	

}

//Maya's version of mark artists
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
		/*
		var modal = '<div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body">' +
		'<h2 class="modal-title"></h2><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    	+ '<iframe width="100%" height="350" src="" frameborder="0" allowfullscreen></iframe></div></div></div></div>';

		var content = '<button class="btn btn-success btn-sm video data-video="' + artists[i].content + 
		'" data-toggle="modal" data-target="' + 'proj.html/#videoModal data-name="' + artists[i].name + '">' + artists[i].name + '</button>' 
		+ modal; */
		var content = document.getElementById(artists[i].name);
		//var content = content_tmp;
		//var new_btn = document.getElementById('btn-fix');
		
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
				icon: auditory_icon,
				content: content
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
			artistInfo.setContent(this.content);
			
			artistInfo.open(map, this);
			map.panTo(this);
			addBtn(this);
			/*new_btn.innerHTML = '<button class="btn btn-success btn-sm video data-video="' + this.content + 
			'" data-toggle="modal" data-target="' + 'proj.html/#videoModal data-name="' + this.name + '">' + this.name + '</button>';
			*/
		});
	}
}

function addBtn(marker) {
	var new_btn = document.getElementById('btn-fix');
	new_btn.innerHTML = '<button class="btn btn-success btn-sm video data-video="' + marker.content + 
			'" data-toggle="modal" data-target="' + 'proj.html/#videoModal data-name="' + marker.title + '">' + marker.title + '</button>';
}


/*
// Mark artists
// takes in user position to map them
function markArtists(mypos) {
	
	//map user
	mapMe();

	for(i=0; i < (artists.length); i++) {
		
		
		//add info window content
		var content = '<h1 id="infoArtist"> '+artists[i].name+' </h1>'+
					'<iframe id="artistVideo" width="560" height="315" src= "'+
					artists[i].content +
					'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		

		
		//add infowindow
		artistInfoWindow = addInfoWindow(content);	
		

		//create marker
		var marker = addMarker(artists[i]);
		marker.setMap(map);

		// On click open event window
		marker.addListener('click', openlistener(map, marker));	
		//Currently the event window starts as opened, clicking is unresponsive.
	}


}*/

/*
// Adds a marker for the artist
// takes in artist
// Returns marker
function addMarker(artist){
	var auditory_icon = {
		url: 'music_icon.png',
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(17,34),
		scaledSize: new google.maps.Size(20,30)
	};
	if (artist.artist_id == "auditory") {
		var marker = new google.maps.Marker({
			position: artist.position,
			title: artist.name,
			map: map,
			icon: auditory_icon,
			content: artist.content
		});

	} else {
		marker = new google.maps.Marker({
		position: artist.position,
		title: artist.name,
		map: map,
		});
	}
	//Return marker
	return marker;
}*/
/*
//adds infowindow 
// returns infowindow
function addInfoWindow(content){
	var infoWindow = new google.maps.InfoWindow({content: content})
	return infoWindow;
}*/

//Gets User's location
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


//Renders user onto the map
function renderMap() {
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(nyc);
	mapMe(me);
	//nearMe(myLat, myLng);

}


//Maps the User
function mapMe(pos) {
	var myIcon = {
		url: 'flower_icon.png',
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(17,34),
		scaledSize: new google.maps.Size(30,30)
	};
	myMarker = new google.maps.Marker({
		position: pos,
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
/*
//opens listener
function openlistener(map, marker){
	artistInfoWindow.open(map, marker);
}
*/

//for modal operations
/*
  	$(function() {
      $(".video").click(function () {
        var theModal = $(this).data("target"),
        videoSRC = $(this).attr("data-video"),
        videoSRCauto = videoSRC;
        $(theModal + ' iframe').attr('src', videoSRCauto);

        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', '');
        });
        
      });
  	});
  	$('#videoModal').on('hidden.bs.modal', function (e) {
  	$('#videoModal').find('iframe').attr('src', '');
  	});
  	
    $(document).ready(function () {
 		$('#videoModal').on('show.bs.modal', function (event) { // id of the modal with event
   		var button = $(event.relatedTarget) // Button that triggered the modal
   		var name = button.data('name') // Extract info from data-* attributes
   		//var location = button.data('location')
   
   		var title = 'Music Video from ' + name

   
   		// Update the modal's content.
   		var modal = $(this)
   		modal.find('.modal-title').text(title)
   		});
   	}); */
/* For consideration:
	 - How are we going to categorize artists? Currently: visual vs. auditory, but could be more specific?
	 - What information do we want in the infoWindows?
	 	For the artist?...medium, blurb about work, link to their twitter, link to tweet "Just visited xyz exhibition!"
	 		or link to tweet "Vibing out to xyz in [city]", link to their spotify profile...
	 	For the user?
	 - Not on map:
	 	When click infoWindow on map, redirect to artist's page that displays random visual art of artist clicked, or
	 	a sample porfolio of their art, and/or starts playing sample music from artist clicked...
	 		How would this work?
	 			- Maybe a dynamic web page --> skeleton html, js used to fill in the info with the relevant artist
	 				- 1 template for visual, 1 for auditory
	 - In general: how is the user going to interact with the page?
	 	Getting directions to GO to a location? (this would only make sense for artists with stuff displayed in
	 		exhibitions/at a physical location)
	 	Interactions alluded to earlier:
	 		Listening to sample music, Looking through sample portfolio
	 - Please add any brainstorming/ideas y'all have, as well as suggestions as to how they will be implemented, that way we
	 	can go through them and incorporate them into our plan of action moving forward!
*/
