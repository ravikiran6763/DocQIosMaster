
DoctorQuickApp.controller('patientProfileCtrl', function($scope,$interval,$ionicHistory,$rootScope,$cordovaEmailComposer,$ionicPlatform,$state,$window,$ionicConfig,$localStorage,$timeout, $ionicLoading ,$http,$base64, $ionicPopup, LoginService,patientProfileDetailsService,$cordovaCamera,cameraService,IonicClosePopupService) {

// /DoctorQuickApp.controller('patientProfileCtrl', function($scope,$rootScope,$state,$ionicConfig,$localStorage,$ionicLoading, $interval,$http, $ionicPopup, LoginService,patientProfileDetailsService,$cordovaCamera,cameraService) {

	$rootScope.headerTxt="Profile";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	console.log($state.current.name);

	$scope.loginData={};
	$rootScope.patient=window.localStorage.user;
	// console.time('Timer1');
	$ionicLoading.show({
		templates:'<ion-spinner></ion-spinner>',
		showBackdrop:true
	});
	$scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);


	patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
		if(response){
			$ionicLoading.hide();
		}
		window.localStorage['patientDetails'] = angular.toJson(response);
		$scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
		console.log($scope.patient_details);
	}).catch(function(error){
	console.log('failure data', error);
	})

	// debugger;
	var msg='raaa';
	console.todo = function(msg) {
	console.log(' % c % s % s % s', 'color: yellow; background - color: black;', '–', msg, '–');
}
console.todo('RAVI');
	$scope.patientProfileImage = angular.fromJson($window.localStorage['patientProfileImage']);

	$scope.updatePatientEmail=function(){
		// $ionicHistory.nextViewOptions({
		// 		disableBack: true,
		// 		disableAnimate: true,
		// });
		$state.go('app.changeEmail_patient');
	// 	patientProfileDetailsService.updateEmail(window.localStorage.user).then(function(response){
	// 		$scope.patient_email=response;
	// 		console.log($scope.patient_email);
	// 		console.log($scope.patient_email);
  //
	// }).catch(function(error){
	// console.log('failure data', error);
	// })

}

// console.timeEnd('Timer1');
$scope.register = function() {
 console.log('Ionic Push: Registering user');

 $scope.accptNotifications=true;
 $scope.rejectNotifications=false;
 // Register with the Ionic Push service.  All parameters are optional.

};
	function updatedPIc(){

		patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
			$scope.patient_details=response;
			$ionicLoading.hide();
			console.log($scope.patient_details);

	}).catch(function(error){
	console.log('failure data', error);
	})

	}


				$scope.termsAndCond=function(){
					// console.log('clicked');
					$scope.termsPopup = $ionicPopup.show({
						title: 'Terms Of Use',
						template: '<div ><p style="color:#fff; margin: -21px 0 0 15px; ">Please try again if the problem persists call us directly.</p></div><div style="position: absolute; margin-top: 0vh; margin-bottom: 0; top: 0px;left: 0;  border-radius: 22px; font-size: 8vw; color: teal; text-align: end; padding: 7px;" ng-controller="patientProfileCtrl" ng-Click="closethis();">X</div>'+
						'<div class="terms-content">'+
						'<li>Use of the Site. DoctorQuick Private Limited. (“DoctorQuick”, “we”, “us”, or “our”) operates the website located at www.doctorquick.com and other related websites and mobile applications with links to these Terms of Use (collectively, the “Site”). We offer online telehealth services (the “Services”) enabling our members (“Members”) to report their health history and engage healthcare professionals (“Treating Providers”) to obtain medical and healthcare services (“Services”). By accessing and using the Site, you agree to be bound by these Terms of Use and all other terms and policies that appear on the Site. If you do not wish to be bound by any of these Terms of Use, you may not use the Site or the Services.</li>'+
						'<br><li>Use of the Site. DoctorQuick Private Limited. (“DoctorQuick”, “we”, “us”, or “our”) operates the website located at www.doctorquick.com and other related websites and mobile applications with links to these Terms of Use (collectively, the “Site”). We offer online telehealth services (the “Services”) enabling our members (“Members”) to report their health history and engage healthcare professionals (“Treating Providers”) to obtain medical and healthcare services (“Services”). By accessing and using the Site, you agree to be bound by these Terms of Use and all other terms and policies that appear on the Site. If you do not wish to be bound by any of these Terms of Use, you may not use the Site or the Services.</li>'+

						'</div>',
						// templateUrl: "views/app/viewdoctor_profile.html",
						cssClass: 'termsPopup',
						scope: $scope,
						// buttons: [
						// 	{ text: 'Cancel' },
						// 	{
						// 	text: '<b>Agree</b>',
						// 	type: 'button-positive',
						//
						// 	},
						// ]
					});
					$scope.closethis = function()
					{
					$scope.termsPopup.close();
					};

				}

				$scope.changeProfilePhoto = function() {
					var options = {
						quality: 75,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: Camera.PictureSourceType.CAMERA,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 300,
						targetHeight: 300,
						popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: true
				};

						$cordovaCamera.getPicture(options).then(function (imageData) {
								$rootScope.imgURI = "data:image/jpeg;base64," + imageData;

								var imageUploadData ={
									image:$rootScope.imgURI,
									patientPhone:$rootScope.patient
								}
								$window.localStorage['patientProfileImage'] = JSON.stringify([{
									image: $rootScope.imgURI,
								}]);
								console.log($rootScope.imgURI);

								patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
									console.log(response);
									window.localStorage['patientDetails'] = angular.toJson(response);
								}).catch(function(error){
								console.log('failure data', error);
								})

								cameraService.uploadPicture(imageUploadData).then(function(response){
									$scope.uploadedData=response;
									console.log($scope.uploadedData);
									// $ionicLoading.hide();
									 // $window.location.reload();
									return $state.transitionTo($state.current, {}, {reload: true}).then(function() {
	 								$scope.hideContent = true;
	 								return $timeout(function() {
	 								return $scope.hideContent = false;
	 								}, 1);
	 								});
									 $scope.$on('$ionicView.afterEnter', function (event, viewData) {
								 	  $timeout(function() {
								 	    $ionicNavBarDelegate.align('center');
								 	  }, 100);
								 	});
								//
								// $scope.reload = function() {
								//
								// };


							}).catch(function(error){
							console.log('failure data', error);
							})

						}, function (err) {
								// An error occured. Show a message to the user
						});


				}


				// $ionicPlatform.onHardwareBackButton(function(e) {
				// 		console.log('close popup');
				//   },400);


			$scope.changePhoto = function() {
							// console.trace('trace');

							var confirmPopup = $ionicPopup.confirm({
							title: 'Upload Profile Picture',
							template:' <center>Choose From</center>',
							cssClass: 'inviteReviewPopup',
							scope: $scope,
							buttons: [
							{
										text: 'Camera',
										type: ' button-assertive',
										onTap: $scope.takePhoto = function () {
																		var options = {
																			quality: 75,
																			destinationType: Camera.DestinationType.DATA_URL,
																			sourceType: Camera.PictureSourceType.CAMERA,
																			allowEdit: true,
																			encodingType: Camera.EncodingType.JPEG,
																			targetWidth: 300,
																			targetHeight: 300,
																			popoverOptions: CameraPopoverOptions,
																			saveToPhotoAlbum: true
																	};

																			$cordovaCamera.getPicture(options).then(function (imageData) {
																					$rootScope.imgURI = "data:image/jpeg;base64," + imageData;

																					var imageUploadData ={
																						image:$rootScope.imgURI,
																						patientPhone:$rootScope.patient
																					}
																					$window.localStorage['patientProfileImage'] = JSON.stringify([{
																					  image: $rootScope.imgURI,
																					}]);
																					console.log($rootScope.imgURI)
																					cameraService.uploadPicture(imageUploadData).then(function(response){
																						$scope.uploadedData=response;
																						console.log($scope.uploadedData);
																						// $ionicLoading.hide();
																						 $window.location.reload();
																					$scope.reload = function() {
																					return $state.transitionTo($state.current, $stateParams, {reload: true}).then(function() {
																					$scope.hideContent = true;
																					return $timeout(function() {
																					return $scope.hideContent = false;
																					}, 1);
																					});
																					};


																				}).catch(function(error){
																				console.log('failure data', error);
																				})

																			}, function (err) {
																					// An error occured. Show a message to the user
																			});

																	}
							},
							{
												text: 'Gallery',
												type: 'button-royal',
												onTap: $scope.choosePhoto = function () {
												var options = {
												quality: 100,
												destinationType: Camera.DestinationType.DATA_URL,
												sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
												allowEdit: true,
												encodingType: Camera.EncodingType.JPEG,
												targetWidth: 300,
												targetHeight: 300,
												correctOrientation:false,
												// popoverOptions: CameraPopoverOptions,
												popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
												mediaType:0,
												saveToPhotoAlbum: false
												};

												$cordovaCamera.getPicture(options).then(function (imageData) {
													console.log(imageData);
														$rootScope.imgURI = "data:image/jpeg;base64," + imageData;
											// 	var options1 = {
											// 	uri: $rootScope.imgURI,
											// 	// folderName: "Protonet Messenger",
											// 	quality: 100,
											// 	width: 1280,
      								// 	height: 1280,
											// 	// base64: true
											// };
                      //
											// 	window.ImageResizer.resize(options1,
											// 	function(image) {
											// 		console.log(image);
											// 	// success: image is the new resized image
											// 	}, function() {
											// 		console.log('failed to resize');
											// 	// failed: grumpy cat likes this function
											// 	});
														// $rootScope.imgURI = imageData;

														// $scope.encoded = $base64.decode($rootScope.imgURI);
														// console.log($scope.encoded);

														// var resizebase64 = require('resize-base64');
														// console.log($rootScope.imgURI);
														// var  img = resizebase64(imageData, 300, 300);
														// console.log(img);
														var imageUploadData ={
															image:$rootScope.imgURI,
															patientPhone:$rootScope.patient
														}
														$window.localStorage['patientProfileImage'] = JSON.stringify([{
														  image: $rootScope.imgURI,
														}]);
														cameraService.uploadPicture(imageUploadData).then(function(response){
															$scope.uploadedData=response;
															console.log($scope.uploadedData);
															// $ionicLoading.hide();
															$scope.reload = function() {
															return $state.transitionTo($state.current, $stateParams, {reload: false}).then(function() {
															$scope.hideContent = true;
															return $timeout(function() {
															return $scope.hideContent = false;
															}, 1);
															});
															};
													}).catch(function(error){
													console.log('failure data', error);
													})

												}, function (err) {
														// An error occured. Show a message to the user
												});

												}
							},

							]
							});

							IonicClosePopupService.register(confirmPopup);

			};


			patientProfileDetailsService.emailVerification(window.localStorage.user).then(function(response){




				$rootScope.email=response;
				if($rootScope.email == 1){
					$rootScope.emailVerified = false;
					$rootScope.Verified = false;

				}
				if($rootScope.email == 2){
					$rootScope.emailVerified = true;
					$rootScope.Verified = true;

				}

				$ionicLoading.hide();
				console.log($scope.email);



			}).catch(function(error){
			console.log('failure data', error);
			})

});
