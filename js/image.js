var Image = {
	capture: function () {
		// Launch device camera application,
		// allowing user to capture one image
		navigator.camera.getPicture(Image.captureSuccess, Image.captureError, {quality: 50});
	},
	captureSuccess: function (imageData) {
		$('#smallImage').attr('src', "data:image/jpeg;base64," + imageData);
		$('#smallImage').removeClass('hide');
	},
	captureError: function (msg) {
		navigator.notification.alert(msg, null, 'Uh oh!');
	}
};

