var Compass = {
	init: function () {
		$.mobile.loading('show');
		navigator.compass.getCurrentHeading(Compass.onSuccess, Compass.onError);
	},
	onSuccess: function (heading) {
		$.mobile.loading('hide');
		$('#heading').html(heading);
		navigator.notification.alert("Compass success.", null, 'Uh oh!');
	},
	onError: function (code) {
		$.mobile.loading('hide');
		navigator.notification.alert("Cannot get heading. Error: " + code, null, 'Uh oh!');
	}
};
