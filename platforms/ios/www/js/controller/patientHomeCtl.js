
DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope,$interval,$window, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, HardwareBackButtonManager,doctoronoffdetails,doctorServices,patientProfileDetailsService,myConsultationService,patientWalletServices,pingService) {

			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;
			$rootScope.hideSideMenu = true;



			window.localStorage.selectedSubPatient=0;
			HardwareBackButtonManager.disable();
			$ionicConfig.views.swipeBackEnabled(false);

			$scope.currentState=$ionicHistory.currentStateName();

			$ionicConfig.views.swipeBackEnabled(false);

			console.log($scope.currentState);
			$rootScope.goToConsultation = function ()
	    {
	      $state.go("app.my_consultations");
	    }
			$scope.medicalSpeciality = function(){
				$state.go('app.medical_speciality');
				$ionicLoading.hide();
			}

			// $window.location.reload();

			$scope.searchDoctors=function()
			{
					console.log('search clicked');
					$state.go('app.searchDoctors');

			}


			$timeout( function(){
	        console.log('interval started');
					console.log($localStorage.showConnecting);

	        if($localStorage.showConnecting === true){

						$timeout( function(){
						$rootScope.connectingMessage = 'Internet connection appears very slow'
					}, 60000 );
						$rootScope.connectingMessage = 'Connecting to DoctorQuick'
	          $ionicLoading.show({
	            template: '<ion-spinner></ion-spinner><br><br>{{connectingMessage}}',
							// duration:3000,
							noBackdrop: true
	          });

						// if(window.localStorage.networkType != 'None' || window.localStorage.networkType != 'Unknown' || window.localStorage.networkType != 'Ethernet'){
							$interval(availableInVsee,2000,1);
							patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
							 $rootScope.patientWalletdetails=response;
							 if(response){
								 window.localStorage['patientWalletdetails'] = angular.toJson(response);
							 }

							 console.log($rootScope.patientWalletdetails);
							 }).catch(function(error){
								 console.log('failure data', error);
							 });
						// }

							// $timeout(function(){
							// $ionicLoading.hide();
							// 	alert('no network');
							// },10000);

	        }
					// else{
					// 		alert('NOINTERNET')
					// }




	    }, 0 );

			function availableInVsee() {
				console.log('login check');
				if($ionicHistory.currentStateName() === 'auth.loginNew'){
					return false;
				}
				else{
					var uname1 = "greet+"+window.localStorage.user;
					var pw1 = "DQ_patient";

					console.log(uname1);
					var success = function(message)
					{
					console.log(message);

					$interval(checkNewMessages,2000);

					$ionicLoading.hide().then(function(){
					console.log("The loading indicator is now hidden");
					// alert('loggedin');
					$localStorage.showConnecting = false;
					$ionicHistory.nextViewOptions({
							disableBack: true,
							disableAnimate: true,
							historyRoot: true
					});
					$ionicHistory.clearCache();
					$ionicHistory.clearHistory();
					$state.go($state.current, {}, {location: "replace",reload: false});

					});
					// alert(message);
					}
					var failure = function()
					{
						alert("Error calling Hello Plugin");
					}

					hello.login(uname1,pw1,success, failure);
				}

			}

			function checkNewMessages()
			{
				if($ionicHistory.currentStateName() === 'auth.loginNew'){
					return false;
				}
				else{
					var uname1 = "greet+"+window.localStorage.user;
					var pw1 = "DQ_patient";

					var success = function(message)
					{
						$rootScope.unreadchatforpatient = message;
						// console.log($scope.unreadchatforpatient);
					}

					var failure = function()
					{
						console.log("Error calling Hello Plugin");
						//console.log(‘error’);

					}
						hello.unreadchatfromusers(uname1,pw1,success, failure);
				}

			}

				function startPinging()
				{
					// console.log('start piniging');
					pingService.pingToServer().then(function(response){
							// console.log( response);
					 }).catch(function(error){
							 console.log('failure data', error);
					 });
				}

				$rootScope.unreadchatforpatient = 0;

				$scope.statename = $ionicHistory.currentStateName();
				$scope.iphone=window.localStorage.iosLogin;

				$scope.deviceAndroid = ionic.Platform.isAndroid();
				// console.log();
				if($scope.deviceAndroid === false){
					window.localStorage.iphoneLogin=0;
				}


				doctorServices.myDoctorsFetched(window.localStorage.user).then(function(response){
					// alert('list');
					$scope.myConsultedDoctors=response;
					window.localStorage['myDoctors'] = angular.toJson(response);

				}).catch(function(error){
				console.log('failure data', error);
				});


				patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
					window.localStorage['patientDetails'] = angular.toJson(response);
				}).catch(function(error){
				console.log('failure data', error);
				})

				patientProfileDetailsService.fetchPatientImage(window.localStorage.user).then(function(response){
					console.log(response);
					window.localStorage['patientProfileImage'] = angular.toJson(response);
				}).catch(function(error){
				console.log('failure data', error);
				})

				// myConsultationService.myConsultedDoctors(window.localStorage.user).then(function(response){
				// 	console.log(response);
				// window.localStorage['ConsultedDoctor'] = angular.toJson(response);
				// }).catch(function(error){
				// // console.log('failure data', error);
				// });

				myConsultationService.firstConsultation(window.localStorage.user).then(function(response){
					console.log(response);
				if(response === 'DONE'){
						$rootScope.firstConsultationDone = false;
				}
				else{
					$rootScope.firstConsultationDone = true;
					// window.localStorage['ConsultedDoctor'] = angular.toJson(response);
				}

				}).catch(function(error){
				// console.log('failure data', error);
				});


				///////////get all specialities///////////
				doctorServices.myDoctorsFetched(window.localStorage.user).then(function(response){
					// alert('list');
					$scope.myConsultedDoctors=response;
					window.localStorage['myDoctors'] = angular.toJson(response);

				}).catch(function(error){
				console.log('failure data', error);
				});


				 medicalSpecialityService.getMedicalSpecialist().then(function(response){
						 console.log('successfull data', response);
						 $scope.specialitiesList = response;
						 window.localStorage['specialitiesList'] = angular.toJson(response);
					}).catch(function(error){
							console.log('failure data', error);
					});

					medicalSpecialityService.getMedicalSpecialist().then(function(response){
				 		 console.log('successfull data', response);
				 		 $scope.specialitiesList1 = response;
				 		 window.localStorage['specialitiesList1'] = angular.toJson(response);
				 	}).catch(function(error){
				 			console.log('failure data', error);
				 	});



});
