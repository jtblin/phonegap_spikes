function Position (coords, address) {
	this.updateAddress = function (address){
		this.address = address;
	}
	this.savePosition = function (coords) {
		this.coords = coords;
	}
	this.coords = coords;
	this.address = address;
}

function Coords (latitude, longitude, accuracy) {
	this.latitude = latitude;
	this.longitude = longitude;
	this.accuracy = accuracy;
}