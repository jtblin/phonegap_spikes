var PGS = PGS || {};

PGS.Map = {
	init: function () {
		$.mobile.loading('show');
		navigator.geolocation.getCurrentPosition(PGS.Map.geolocationSuccess, PGS.Map.geolocationError, PGS.Map.geolocationOptions);
	},
	geolocationSuccess: function (location) {
		var position = new Position(new Coords(
				location.coords.latitude,
				location.coords.longitude,
				location.coords.accuracy
		));
		$.mobile.loading('hide');
		PGS.Map.displayInfo(position);
		// Update the saved position to set the address name
		PGS.Map.requestLocation(position);
		PGS.Map.displayMap(location, null);
	},
	geolocationError: function (error) {
		navigator.notification.alert(
				'Unable to retrieve your position. Is your GPS enabled?',
				function () {
					alert("Unable to retrieve the position: " + error.message);
				},
				'Error'
		);
		$.mobile.loading('hide');
		$.mobile.changePage('index.html');
	},
	requestLocation: function (position) {
		/*
		 * Request the address of the retrieved location
		 */
		var geocoder = new google.maps.Geocoder();
		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		geocoder.geocode({'latLng': latLng}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				position.updateAddress(results[0].formatted_address);
				PGS.Map.displayInfo(position);
			}
		});
	},
	displayMap: function(userPosition) {
		/*
		 * Display the map showing the user position
		 */
		var userLatLng = null;
		if (userPosition != null)
			userLatLng = new google.maps.LatLng(userPosition.coords.latitude, userPosition.coords.longitude);
		var options = {
			zoom: 20,
			disableDefaultUI: true,
			streetViewControl: true,
			center: userLatLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById('map'), options);
		var marker = new google.maps.Marker({
			position: userLatLng,
			map: map,
			title: 'Your position'
		});

		marker.setIcon('images/user-marker.png');
		var circle = new google.maps.Circle({
			center: userLatLng,
			radius: userPosition.coords.accuracy,
			map: map,
			fillColor: '#70E7FF',
			fillOpacity: 0.2,
			strokeColor: '#0000FF',
			strokeOpacity: 1.0
		});
		map.fitBounds(circle.getBounds());
	},
	displayInfo: function (position) {
		$('#lat').html(position.coords.latitude);
		$('#lng').html(position.coords.longitude);
		$('#addr').html(position.address);
	},
	geolocationOptions: {
		timeout: 15 * 1000, // 15 seconds
		maximumAge: 10 * 1000, // 10 seconds
		enableHighAccuracy: true
	}
};
