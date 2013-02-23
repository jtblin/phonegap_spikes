var PGS = PGS || {};

PGS.Image = {
	capture: function () {
		// Launch device camera application,
		// allowing user to capture one image
		navigator.camera.getPicture(PGS.Image.captureSuccess, PGS.Image.captureError, PGS.Image.captureOptions);
	},
	captureSuccess: function (imageUri) {
		$('#smallImage').attr('src', imageUri);
		$('#smallImage').removeClass('hide');
	},
	captureError: function (msg) {
		navigator.notification.alert(msg, null, 'Uh oh!');
	},
	captureOptions: function () {
		return { 
			quality : 75, 
		  destinationType : Camera.DestinationType.FILE_URI, 
		  sourceType : Camera.PictureSourceType.CAMERA, 
		  targetWidth: 120,
		  targetHeight: 120 
		};
	}
};

