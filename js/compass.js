var Compass = {
	init: function () {
		$.mobile.loading('show');
		navigator.compass.getCurrentHeading(Compass.onSuccess, Compass.onError);
	},
	onSuccess: function (heading) {
		$.mobile.loading('hide');
		$('#heading').html(heading.magneticHeading);
		navigator.notification.alert("Compass success, heading: " + heading.magneticHeading, null, 'Uh oh!');
	},
	onError: function (compassError) {
		$.mobile.loading('hide');
		navigator.notification.alert("Compass error: " + compassError.code, null, 'Uh oh!');
	}
};
