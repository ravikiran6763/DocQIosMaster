'use strict';
DoctorQuickApp.service('cameraService', function ($http,$q, BASE_URL, API) {

 var userPhone;

	this.uploadPicture = function (uploadData) {
    console.log(uploadData);
		// userPhone = userDetails.userNum;
		var deferred = $q.defer();
		$http.post(BASE_URL.url + API.uploadImage,uploadData)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});
