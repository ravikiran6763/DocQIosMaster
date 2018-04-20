// APP
DoctorQuickApp.controller('diagnosisCtrl', function($scope,$state,$rootScope,$stateParams,$ionicConfig,$localStorage,testresultbydoctor){

		$scope.toggle = true;
		$rootScope.headerTxt="Diagnosis";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.hideSideMenu = false;
		$rootScope.showBadge=false;
		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;
		// $rootScope.prescription={};
		if($rootScope.chekDiag === false){
			$rootScope.val= "";
			$rootScope.prescription.diagnosisforpatient="";
		}


		$scope.clear=function()
		{
				$rootScope.prescription.diagnosisforpatient="";
				$rootScope.chekDiag=false;
				$rootScope.val= "";
		}
})

DoctorQuickApp.controller('patientTestsCtrl', function($scope,$state,$rootScope,$stateParams,$ionicConfig,testresultbydoctor) {

		$rootScope.user={};
		$scope.notes = {};
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$scope.toggle = true;
		$rootScope.headerTxt="Test Recommended";
		$rootScope.showBackBtn=true;
		$rootScope.hideSideMenu = false;

		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;

		// $rootScope.prescription={};
		if($rootScope.chekTests === false){
			$rootScope.testVal= "";
			$rootScope.prescription.checkedTests="";
		}
		$scope.clear=function()
		{
				$rootScope.prescription.checkedTests="";
				$rootScope.chekTests=false;
				$rootScope.testVal= "";

		}

})

DoctorQuickApp.controller('medicationCtrl', function($scope,$rootScope, $stateParams,$state,$ionicConfig,testresultbydoctor) {

		$scope.toggle = true;
		$rootScope.headerTxt="Medication";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$rootScope.hideSideMenu = false;
		$scope.medication={};

		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;
		// $rootScope.prescription={};
		if($rootScope.chekMedi === false){
			$rootScope.mediVal = "";
			$rootScope.prescription.medicationforpatient="";
		}


		$scope.clear=function()
		{
			$rootScope.prescription.medicationforpatient="";
			$rootScope.chekMedi=false;
			$rootScope.mediVal = "";
		}

})


DoctorQuickApp.controller('sendPrescriptionCtrl', function($scope,$rootScope,$stateParams,$localStorage,$timeout,$window, $ionicConfig) {
  $scope.toggle = true;
	$rootScope.headerTxt="Prescription";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	alert($stateParams.reqPat);

})

DoctorQuickApp.controller('SearchCtrl', function($scope,$rootScope,$stateParams,$localStorage,$timeout,$window, $ionicConfig) {
  $scope.toggle = true;
	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	$rootScope.specialdata=null;
	$rootScope.genderdata= null;
	$rootScope.statusdata=null;
	$rootScope.languagedataselected=null;

	$rootScope.specialityList.sex = "";
	$rootScope.specialityList.search = "";
	$rootScope.specialityList.stat = "";
	$rootScope.specialityList.language = "";

	var specialitywise = "";
	var catwise = "";
	var genderwise = "";
	var languagewise = "";

	// alert($stateParams.reqPat);

})


DoctorQuickApp.controller('specilityListCtrl', function($scope,$rootScope,$state,$stateParams,$localStorage,$timeout,$window,$interval, $ionicConfig) {
	$rootScope.headerTxt="Medical Speciality";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.showSubPatients=false;

	$scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);
	console.log($scope.specialitiesList);

	// alert($stateParams.reqPat);
	$scope.specialityDetailsNew=function(index,id){
 	 console.log(id);
 	 // $ionicLoading.show({
 	 //   template:'<ion-spinner></ion-spinner>'
 	 // })
 	 window.localStorage.SpecilityIndex=index;
 	 window.localStorage.SpecilityId=id;
 	 // $interval(CheckOnlineDocs, 2000);

 	 $state.go("app.specialityDetailsNew");

  }
})

DoctorQuickApp.controller('doc_customercareCtrl', function($scope,$rootScope, $ionicConfig) {
  $scope.toggle = true;
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

})
DoctorQuickApp.controller('updateDoctorDetailsCtrl', function($scope,$state,$rootScope,$ionicPopup,$cordovaToast, $ionicConfig,$localStorage,$ionicLoading,doctorServices, IonicClosePopupService) {
				$scope.toggle = true;
				$rootScope.headerTxt="Profile";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;
				$rootScope.showDocStatus=false;

				doctorServices.doctorEmailVerification(window.localStorage.user).then(function(response){
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

				$scope.emailToUpdate={};
				$scope.updateDoctorEmail = function(){
							$ionicLoading.show({
								template:'<ion-spinner></ion-spinner>'
							})
							console.log($scope.emailToUpdate.email);
							console.log($scope.emailToUpdate.verify);

							if(!$scope.emailToUpdate.email || !$scope.emailToUpdate.verify){
										// alert('empty');
										$ionicLoading.hide();

										window.plugins.toast.showWithOptions({
										message: "Enter a valid email id",
										duration: "short", // 2000 ms
										position: "bottom",
										styling: {
										opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
										backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
										textColor: '#ffffff', // Ditto. Default #FFFFFF
										textSize: 13, // Default is approx. 13.
										cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
										horizontalPadding: 16, // iOS default 16, Android default 50
										verticalPadding: 12 // iOS default 12, Android default 30
										}
										});
							}
							else if($scope.emailToUpdate.email != $scope.emailToUpdate.verify){
								$ionicLoading.hide();

								console.log('toast here');
								window.plugins.toast.showWithOptions({
								message: "Check your mail id",
								duration: "short", // 2000 ms
								position: "bottom",
								styling: {
								opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
								backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
								textColor: '#ffffff', // Ditto. Default #FFFFFF
								textSize: 13, // Default is approx. 13.
								cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
								horizontalPadding: 16, // iOS default 16, Android default 50
								verticalPadding: 12 // iOS default 12, Android default 30
								}
								});

							}
							else if($scope.emailToUpdate.email === $scope.emailToUpdate.verify){
							var emailDetails={
							newMail:$scope.emailToUpdate.email,
							phone:window.localStorage.user
							}
							console.log('verified');
							doctorServices.updateDoctorEmail(emailDetails).then(function(response){

							$rootScope.emailSent=response;
							if(response === 'MailSent'){
								$ionicLoading.hide();
							var confirmPopup = $ionicPopup.confirm({
								// title: 'DoctorQuick',
								template: '<center>Click the link in the email sent to you to complete your registration process</center>',
								// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
								cssClass: 'videoPopup',
								scope: $scope,
								buttons: [
									{
										text: 'OK',
										type: 'button-assertive',
										onTap: function(e) {
										console.log('offline');
										$scope.emailToUpdate.email='';
										$scope.emailToUpdate.verify='';
										// $state.go("templates.doc_profile");
										}
									},
								]
							});
							IonicClosePopupService.register(confirmPopup);

							}
							console.log($rootScope.emailSent);
							}).catch(function(error){
							console.log('failure data', error);
							})
							}
							else{
							console.log('check the mail id');
							}


				};

				$scope.sendVerificationMailToDoc = function(){
						$ionicLoading.show({
							template:'<ion-spinner></ion-spinner>'
						})
						console.log('send mail');
						doctorServices.sendVerificationMailToDoc(window.localStorage.user).then(function(response){

						if(response === 'MailSent'){
							$ionicLoading.hide();
						console.log('toast here');
						var confirmPopup = $ionicPopup.confirm({
						// title: 'DoctorQuick',
						template: '<center>Click the link in the email sent to you to complete your registration process</center>',
						// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
							{
								text: 'OK',
								type: 'button-assertive',
								onTap: function(e) {
								console.log('offline');
								// $state.go("templates.doctor_home");
								}
							},
						]
						});
						IonicClosePopupService.register(confirmPopup);

						}
						$rootScope.emailSent=response;
						console.log($rootScope.emailSent);
						}).catch(function(error){
						console.log('failure data', error);
						})
				};


})

DoctorQuickApp.controller('updatePatientDetailsCtrl', function($scope,$state,$rootScope,$ionicLoading,$ionicPopup,$cordovaToast, $ionicConfig,$localStorage,patientProfileDetailsService,IonicClosePopupService) {
				$scope.toggle = true;
				$rootScope.headerTxt="Profile";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;
				$rootScope.showDocStatus=false;

				console.log('update controller active');
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

				$scope.sendVerificationMail = function(){
				console.log('send mail');
				$ionicLoading.show({
					template:'<ion-spinner></ion-spinner>'
				})
				patientProfileDetailsService.sendVerificationMail(window.localStorage.user).then(function(response){

				$rootScope.emailSent=response;
				if(response){
					$ionicLoading.hide();
				var confirmPopup = $ionicPopup.confirm({
						// title: 'DoctorQuick',
						template: '<center>Click the link in the email sent to you to complete your registration process</center>',
						// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
						{
							text: 'OK',
							type: 'button-assertive',
							onTap: function(e) {
							// $state.go("app.patient_profile");
							}
						},
						]
				});
				IonicClosePopupService.register(confirmPopup);

				}
				console.log($rootScope.emailSent);
				}).catch(function(error){
				console.log('failure data', error);
				})
				};


				$scope.emailToUpdate={};
				$scope.updateEmail = function(){
					$ionicLoading.show({
						template:'<ion-spinner><ion-spinner>'
					})
				console.log($scope.emailToUpdate.email);
				console.log($scope.emailToUpdate.verify);

				if(!$scope.emailToUpdate.email || !$scope.emailToUpdate.verify){
									$ionicLoading.hide();
								// alert('empty');
								window.plugins.toast.showWithOptions({
								message: "Enter a valid email id",
								duration: "short", // 2000 ms
								position: "bottom",
								styling: {
								opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
								backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
								textColor: '#ffffff', // Ditto. Default #FFFFFF
								textSize: 13, // Default is approx. 13.
								cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
								horizontalPadding: 16, // iOS default 16, Android default 50
								verticalPadding: 12 // iOS default 12, Android default 30
								}
								});
				}
				else if($scope.emailToUpdate.email != $scope.emailToUpdate.verify){
								$ionicLoading.hide();

								console.log('toast here');
								window.plugins.toast.showWithOptions({
								message: "Check your mail id",
								duration: "short", // 2000 ms
								position: "bottom",
								styling: {
								opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
								backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
								textColor: '#ffffff', // Ditto. Default #FFFFFF
								textSize: 13, // Default is approx. 13.
								cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
								horizontalPadding: 16, // iOS default 16, Android default 50
								verticalPadding: 12 // iOS default 12, Android default 30
								}
								});

				}
				else if($scope.emailToUpdate.email === $scope.emailToUpdate.verify){
				console.log('verified');
				var mailData={
				newMail:$scope.emailToUpdate.email,
				phone:window.localStorage.user
				}
				patientProfileDetailsService.updateEmail(mailData).then(function(response){

							$rootScope.emailSent=response;
							if(response){
							// alert('sent');
							$ionicLoading.hide();
							var confirmPopup = $ionicPopup.confirm({
									// title: 'DoctorQuick',
									template: '<center>Click the link in the email sent to you to complete your registration process</center>',
									// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
									cssClass: 'videoPopup',
									scope: $scope,
									buttons: [
										{
											text: 'OK',
											type: 'button-assertive',
											onTap: function(e) {
											console.log('offline');
											$scope.emailToUpdate={};

												// $state.go("app.patient_profile",{reload:false});
											}
										},
									]
							});
							IonicClosePopupService.register(confirmPopup);

							}
							console.log($rootScope.emailSent);
				}).catch(function(error){
				console.log('failure data', error);
				})
				}

				// An email confiramtion link to your email address has been sent. Click the link in that email to complete  registering your email. Make suure to check your spam box in case it got filtered
				else{
				console.log('check the mail id');
				}


				};


})

DoctorQuickApp.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};
	$scope.doSignUp = function(){
		$state.go('app.patient_home');
	};
})
//newly added for DQ
DoctorQuickApp.controller('DocRegController', function($scope,$rootScope, $state,data) {
			//alert('hello');
			$scope.doc={};
			$scope.reg_doc=function(){
				data.doctor_reg($scope.doc.doc_fname,$scope.doc.doc_mname,$scope.doc.doc_lname);

			}
			$rootScope.showBackBtn=true;


})

DoctorQuickApp.controller('reviewCtrl', function($scope,$rootScope, $ionicConfig) {

		$scope.toggle = false;
	 	$rootScope.headerTxt="Invite Reviews";
		$rootScope.showBackBtn=true;
		$rootScope.checkedValue = false;
		$rootScope.showBadge=false;
		$rootScope.showDocStatus=false;


})

// DoctorQuickApp.controller('myconsultationsCtrl', function($scope,$rootScope,$ionicConfig, $http) {
// 	$rootScope.headerTxt="My Consultations";
// 	$rootScope.showBackBtn=true;
// 	$rootScope.checkedValue = false;
//
// })
//
// DoctorQuickApp.controller('patientCareCtrl', function($scope,$rootScope,$ionicConfig, $http) {
// 	$rootScope.headerTxt="Customer Care";
// 	$rootScope.showBackBtn=true;
// 	$rootScope.checkedValue = false;
//
// })

DoctorQuickApp.controller('termsCtrl', function($scope,$rootScope, $ionicConfig) {
	$scope.toggle = true;
	$rootScope.headerTxt="Terms Of Use";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

})

DoctorQuickApp.controller('splashCtrl',function($rootScope,$timeout,$ionicLoading,$localStorage,$interval,$window,$scope,$state,$ionicHistory,LoginService){
	$timeout(function(){
	// console.log(window.localStorage.doctororpatient);

		$ionicLoading.show({
		template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
		});
		if(window.localStorage.doctororpatient === 'patient'){
				// $state.go('app.patient_home',{}, {location: "replace", reload: false})//for browser login
				window.plugins.OneSignal.getIds(function(ids){
				//document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
				//document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
				console.log(JSON.stringify(ids['userId']));
				$scope.playerId=JSON.stringify(ids['userId']);
				console.log($scope.playerId);
				var updatePlayer ={
					palyerId:$scope.playerId,
					userNum:window.localStorage.user,
					user:'patient'
				}
				console.log(updatePlayer);
				LoginService.updatePlayer(updatePlayer).then(function(response){
				console.log(response);
				})
				});
				$scope.deviceAndroid = ionic.Platform.isAndroid();
				console.log($scope.deviceAndroid);
				var uname1 = "greet+"+window.localStorage.user;
				var pw1 = "DQ_patient";
				if($scope.deviceAndroid === true){

											var success = function(message)
											{
												$ionicLoading.hide().then(function(){
											  console.log("The loading indicator is now hidden");
											  // alert('loggedin');
											  $ionicHistory.nextViewOptions({
											  disableAnimate: true,
											  disableBack: true
											  });
											  $interval.cancel(loginStatus);
											  $state.go('app.patient_home', {}, {location: "replace", reload: false});
											  });
											}
											var failure = function()
											{
											alert("Error calling Hello Plugin");
											}
											hello.login(uname1,pw1,success, failure);

											$timeout( function(){
											console.log('interval started');
											$interval(checkNewMessages,1000);

											}, 3000);
											var username = "greet+"+window.localStorage.user;
											var password = "DQ_patient";
											function checkNewMessages()
											{
											  var success = function(message)
											  {
											    $rootScope.unreadchatforpatient = message;
											    console.log($scope.unreadchatforpatient);
											  }

											  var failure = function()
											  {
											    console.log("Error calling Hello Plugin");
											    //console.log(‘error’);

											  }
											    hello.unreadchatfromusers(username,password,success, failure);
											}
				}
				else{

									$ionicLoading.show({
									template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
									});
									var success = function(message)
									{
									console.log(message);
									$scope.iosLoggin=message;

									}
									var failure = function()
									{

									alert("Error calling Hello Plugin");

									}

									// $state.go('app.patient_home');//for browser login
									hello.login(uname1,pw1,success, failure);

									$timeout( function(){
									console.log('interval started');
									$interval($rootScope.loginInterval,2000,1);
									// $interval(checkNewMessages,2000);

									}, 10000 );

									var username = "greet+"+window.localStorage.user;
									var password = "DQ_patient";
									function checkNewMessages()
									{
									var success = function(message)
									{
									$rootScope.unreadchatforpatient = message;
									console.log($scope.unreadchatforpatient);
									}

									var failure = function()
									{
									console.log("Error calling Hello Plugin");
									//console.log(‘error’);

									}
									hello.unreadchatfromusers(username,password,success, failure);
									}



									$rootScope.loginInterval = function() {
									var success = function(message)
									{
									// alert(message);
									$ionicLoading.hide().then(function(){
									console.log("The loading indicator is now hidden");
									// alert('loggedin');
									$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
									});
									$interval.cancel($rootScope.loginInterval);
									$state.go('app.patient_home', {}, {location: "replace", reload: false});
									});

									}

									var failure = function()
									{
									alert("Error Occurred While Loggin in to DoctoQuick");
									}
									hello.loginstatus(success,failure);
									}

				}

		}
		else if(window.localStorage.doctororpatient === 'doctor'){
				window.plugins.OneSignal.getIds(function(ids) {
				$scope.playerId=JSON.stringify(ids['userId']);
				// console.log($scope.playerId);
				var updatePlayer ={
				palyerId:$scope.playerId,
				userNum:window.localStorage.user,
				user:'doctor'
				}
				console.log(updatePlayer);
				LoginService.updatePlayer(updatePlayer).then(function(response){
				console.log(response);
				})
				});
				$scope.deviceAndroid = ionic.Platform.isAndroid();
				console.log($scope.deviceAndroid);
				var uname1 = "greet+"+window.localStorage.user;
				var pw1 = "DQ_doctor";
				if($scope.deviceAndroid === true){

									var success = function(message)
									{
										// alert(message);
										$ionicLoading.hide().then(function(){
									  console.log("The loading indicator is now hidden");
									  // alert('loggedin');
									  $ionicHistory.nextViewOptions({
									  disableAnimate: true,
									  disableBack: true
									  });
									  $interval.cancel(loginStatus);
									  $state.go('templates.doctor_home', {}, {location: "replace", reload: false});
									  });
									// alert(message);
									}
									var failure = function()
									{
									alert("Error calling Hello Plugin");
									}

									hello.login(uname1,pw1,success, failure);

									$timeout( function(){
									console.log('interval started');
									$interval(checkNewMessages,1000);

									}, 3000);
									var username = "greet+"+window.localStorage.user;
									var password = "DQ_doctor";
									function checkNewMessages()
									{
									var success = function(message)
									{
									$rootScope.unreadchatforpatient = message;
									console.log($scope.unreadchatforpatient);
									}

									var failure = function()
									{
									console.log("Error calling Hello Plugin");
									//console.log(‘error’);

									}
									hello.unreadchatfromusers(username,password,success, failure);
									}
				}
				else{

										$ionicLoading.show({
										template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
										});
										var success = function(message)
										{
										// alert(message);
											$scope.iosLoggin=message;
											window.localStorage.iosLogin=$scope.iosLoggin;

										}
										var failure = function()
										{

											alert("Error calling Hello Plugin");

										}

										// $state.go('app.patient_home');//for browser login
										// $state.go('app.patient_home');//for browser login
										hello.login(uname1,pw1,success, failure);

										$timeout( function(){
										console.log('interval started');
										$interval(loginStatus,2000,1);
										}, 10000 );

										function loginStatus() {
										var success = function(message)
										{
												// alert(message);
												$ionicLoading.hide().then(function(){
												console.log("The loading indicator is now hidden");
												// alert('loggedin');
												$ionicHistory.nextViewOptions({
												disableAnimate: true,
												disableBack: true
												});
												$interval.cancel(loginStatus);

												$state.go('templates.doctor_home', {}, {location: "replace", reload: false});
												});

										}

										var failure = function()
										{
											alert("Error Occurred While Loggin in to DoctoQuick");
										}
										hello.loginstatus(success,failure);
										}

				}

		}
		else{
				$ionicLoading.hide();
				$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
				});
				$state.go('auth.loginNew',{}, {location: "replace", reload: false})
		}
	},0);
	$ionicHistory.clearHistory();
})

DoctorQuickApp.controller('callAccptCtrl', function($scope,$rootScope, $stateParams,$ionicConfig,$localStorage,$ionicLoading,patientrequesttodoctor) {
   	$scope.toggle = true;
	 	$rootScope.headerTxt="Call";
		$rootScope.showBackBtn=true;
		$rootScope.checkedValue = false;
		$rootScope.showNotification=false;

		var docpatphno = {
		accpetcode : "1",
		doctorphno : window.localStorage.user,
		patientphno : window.localStorage.reqPat,
		reqId:window.localStorage.reqId
		}
		console.log(docpatphno);
		patientrequesttodoctor.accpetedbydoctor(docpatphno).then(function(response){
			$scope.reqAccpted=response;
			$ionicLoading.hide();
			console.log($scope.reqAccpted);

		}).catch(function(error){
			console.log('failure data', error);
		});
});
