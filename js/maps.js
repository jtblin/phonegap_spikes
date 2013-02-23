function Map () {
}
/**
 * Display the map showing the user position or the latter and the car position
 */
Map.displayMap = function(userPosition) {
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

}

/**
 * Request the address of the retrieved location
 */
Map.requestLocation = function (position) {
	new google.maps.Geocoder().geocode({
				'location': new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
			},
			function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					position.updateAddress(results[0].formatted_address);
					Map.displayInfo(position);
				}
			}
	);
}
Map.displayInfo = function (position) {
	$('#lat').html(position.coords.latitude);
	$('#lng').html(position.coords.longitude);
	$('#addr').html(position.address);
}
