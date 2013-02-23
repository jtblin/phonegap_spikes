var Compass = {
	init: function () {
		navigator.compass.getCurrentHeading(Compass.onSuccess, Compass.onError);
	},
	onSuccess: function (heading) {
		$('#heading').html(heading);
	},
	onError: function (message) {
		navigator.notification.alert(message, null, 'Uh Oh!');
	}
};
