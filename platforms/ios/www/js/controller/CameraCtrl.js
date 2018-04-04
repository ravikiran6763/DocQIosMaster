DoctorQuickApp.controller('CameraCtrl', function ($scope, $rootScope, $cordovaCamera, $ionicLoading, $localStorage,cameraService) {
console.log(window.localStorage.user);
	$scope.takePhoto = function () {
	                  var options = {
	                    quality: 75,
	                    destinationType: Camera.DestinationType.DATA_URL,
	                    sourceType: Camera.PictureSourceType.CAMERA,
	                    allowEdit: true,
	                    encodingType: Camera.EncodingType.JPEG,
	                    targetWidth: 300,
	                    targetHeight: 300,
	                    popoverOptions: CameraPopoverOptions,
	                    saveToPhotoAlbum: false
	                };

	                    $cordovaCamera.getPicture(options).then(function (imageData) {
	                        $rootScope.imgURI = "data:image/jpeg;base64," + imageData;

	                    }, function (err) {
	                        // An error occured. Show a message to the user
	                    });

	                }

	                $scope.choosePhoto = function () {
	                  var options = {
	                    quality: 75,
	                    destinationType: Camera.DestinationType.DATA_URL,
	                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
	                    allowEdit: true,
	                    encodingType: Camera.EncodingType.JPEG,
	                    targetWidth: 300,
	                    targetHeight: 300,
	                    popoverOptions: CameraPopoverOptions,
	                    saveToPhotoAlbum: false
	                };

	                    $cordovaCamera.getPicture(options).then(function (imageData) {
	                        $rootScope.imgURI = "data:image/jpeg;base64," + imageData;

													$state.go('app.patient_profile')
	                    }, function (err) {
	                        // An error occured. Show a message to the user
	                    });
											alert(window.localStorage.user);
	                }



})
