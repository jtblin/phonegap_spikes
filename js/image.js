var Image = {
	capture: function () {
		// Launch device camera application,
		// allowing user to capture up to 3 images
		navigator.device.capture.captureImage(Image.captureSuccess, Image.captureError, {limit: 3});
	},
	captureSuccess: function (mediaFiles) {
		var i, len;
		for (i = 0, len = mediaFiles.length; i < len; i++) {
	//		uploadFile(mediaFiles[i]);
			$('#content').append('<p><span>full path:</span><span>' + mediaFiles[i].fullpath +  '</span></p>' +
					'<p><span>name:</span><span>' + mediaFiles[i].name +  '</span></p><br>');
		}
	},
	captureError: function (error) {
		var msg = 'An error occurred during capture: ' + error.code;
		navigator.notification.alert(msg, null, 'Uh oh!');
	}
};

