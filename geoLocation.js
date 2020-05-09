    //define function to drag/drop an image
	function allowDrop(ev) {
		ev.preventDefault();
    }
	function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
	function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
	}
	//define function for user hits to browser
    function clickCounter() {
	    embedMap.style.visibility = "hidden";
		bt.style.visibility = "hidden";
		if (typeof(Storage) !== "undefined") {
			if (localStorage.clickcount) {
				localStorage.clickcount = Number(localStorage.clickcount)+1;
				if(localStorage.clickcount>=2){
					showPosition();
				}
			}
			else{
				localStorage.clickcount = 1;
			}
			/*document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";*/
		}
		else{
			document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
			}
	}
	//define function to get user location
	function showPosition() {
		/*document.getElementById("result1").innerHTML = "you clicked !!!";*/
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showMap);
		}
		else {
			alert("Sorry, your browser does not support HTML5 geolocation.");
		}
	}
	// Define function for displaying map
	function showMap(position) {
		bt.style.visibility = "visible";
		embedMap.style.visibility = "visible";
		// Get location data
		lat = position.coords.latitude;
		long = position.coords.longitude;
		var latlong = new google.maps.LatLng(lat, long);
		var myOptions = {
			center: latlong,
			zoom: 16,
			mapTypeControl: true,
			navigationControlOptions: {
				style:google.maps.NavigationControlStyle.SMALL
			}
		}
		var map = new google.maps.Map(document.getElementById("embedMap"), myOptions);
		var marker = new google.maps.Marker({ position:latlong, map:map, title:"You are here!" });
	}