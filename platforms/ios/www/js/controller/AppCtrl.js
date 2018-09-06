DoctorQuickApp.controller('AppCtrl', function($state, $scope, $rootScope,$window, $timeout,$location, $stateParams,$ionicPlatform,$cordovaDevice, $window, $ionicHistory, $interval, $ionicModal, $ionicPopover, $ionicLoading, $ionicConfig, $ionicPopup,$http, $ionicSideMenuDelegate, $localStorage, $sessionStorage, $cordovaInAppBrowser,$cordovaCamera, $cordovaNetwork,$cordovaToast,$ionicNavBarDelegate, LoginService, patientProfileDetailsService,searchDoctorServices, doctorServices, medicalSpecialityService,myConsultationService,rateDoctorServices,patientWalletServices,searchbyspecialities,rateDoctorServices,medicalSpecialityService, callAcceptedService,testresultbydoctor,searchDoctorServices,Factory) {

	$rootScope.headerTxt='';
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$rootScope.hideSideMenu = true;

	$scope.myDocDetail = {};

	$rootScope.showSPecialities=false;
	$rootScope.showSex=false;
	$rootScope.showStatus=false;
	$rootScope.showLanguage=false;
	$rootScope.inviteButton = false;

	$scope.closeSideMenu = function() {
		console.log('closing side menu');
		$ionicSideMenuDelegate.toggleRight();
	};





	$scope.showConsulation=function()
	{
		$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true,
			historyRoot:true
		});
			$state.go('app.my_consultations',{}, {location: "replace", reload: false});
	}

	var specialitywise = "";
	var catwise = "";
	var genderwise = "";
	var languagewise = "";

	$rootScope.chekDiag=false;
	$rootScope.chekTests=false;
	$rootScope.chekMedi=false;
	// console.log($rootScope.chekDiag);

	$scope.accptNotifications=false;
	$scope.rejectNotifications=true;
	$rootScope.sandwich=false;
	// var model = $cordovaDevice.getModel();
	// console.log(model);
	console.log('appcalld');

	$scope.deviceAndroid = ionic.Platform.isAndroid();
	$scope.devicePlatform = ionic.Platform.isIOS();


	console.log($rootScope.previousState);

	// if(window.localStorage.doctororpatient === 'doctor')
	// {
  //
	// }


		//var networkState= $cordovaNetwork.isOnline();
		////////////////////////////////////////////////////////////////////////////////
		//console.log(networkState);
		// $interval(checkForInternet, 1000);

		window.localStorage.chekedData =0;
		window.localStorage.dataConnection=navigator.onLine;
		// $scope.dataLost=window.localStorage.dataConnection;
		$scope.dataLost=window.localStorage.networkType;

		$scope.showAlert==false;

		console.log(window.localStorage.dataConnection);
		$scope.$watch('dataLost', function (newValue, oldValue, scope){
			// alert('changed');
			// alert(window.localStorage.dataConnection);
			console.log('newVal',newValue);
			console.log('oldValue',oldValue);

				if(newValue === 'None' && oldValue != 'None'){
					var confirmPopup = $ionicPopup.confirm({
						title: 'DoctorQuick',
						template: 'Seems you are disconnected from the internet',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
							{
								text: 'Cancel',
								type: 'button-royal',
							},
							{
								text: 'Ok',
								type: 'button-positive',
								onTap: function(e) {
								console.log('ok');

							}
							},
						]
					});


				}
		},true);
		////////////////////////////////////////////////////////////////////////////////

		$rootScope.statename = $ionicHistory.currentStateName();

		// console.log($rootScope.statename);
	if($ionicHistory.currentStateName() === 'app.patient_home'){
		console.log($ionicHistory.currentStateName() );
		$ionicHistory.nextViewOptions({
		disableBack: true
		});
	}
	// console.log($scope.deviceAndroid );
	$scope.doRefresh = function() {
		console.log('Refreshing!');
		$timeout( function() {
		$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
	};

	$scope.$on('$ionicView.afterEnter', function (event, viewData) {
	  $timeout(function() {
	    $ionicNavBarDelegate.align('center');
	  }, 100);
	});

	// if(window.localStorage.doctororpatient === 'doctor'){
	// 	$localStorage.sendPrescTo='';
	// }
	$rootScope.goBack = function()
	{
		if(window.localStorage.doctororpatient === 'doctor'){
			$localStorage.sendPrescTo='';
		}
				console.log($ionicHistory.backView());
				$scope.prevPage=$ionicHistory.currentStateName();
				console.log($ionicHistory.currentStateName());
				console.log(window.localStorage.doctororpatient);
				if(!$ionicHistory.backView()){
					if(window.localStorage.doctororpatient === 'doctor'){
						$state.go('templates.doctor_home');
					}

					else if(window.localStorage.doctororpatient === 'patient'){
						$state.go('app.patient_home');
					}
					else{
						window.history.back();
					}
				}
				else{

									if($scope.prevPage === 'app.patient_summary'){
											// alert('summary page')
											$state.go('app.patient_home');
											$ionicHistory.clearHistory();
									}
									else if($scope.prevPage === 'templates.prescription'){
											$state.go('templates.doctor_home');
											$ionicHistory.clearHistory();
									}
									else if($scope.prevPage === 'templates.requestAccepted'){
											$state.go('templates.doctor_home');
											$ionicHistory.clearHistory();
									}
									else if($scope.prevPage === 'app.patient_home' || $scope.prevPage === 'templates.doctor_home'){
											// $state.go('templates.doctor_home');
											console.log('donothing');
									}
									else if($scope.prevPage === 'app.specialityDetailsNew'){
											window.history.back();
									}
									else if($scope.prevPage === 'app.searchDoctors'){
												console.log('clear search values here');
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

												console.log($rootScope.specialdata);
												window.history.back();

									}
									else if($scope.prevPage === 'templates.prescription'){
											$state.go('templates.doctor_home');
											$ionicHistory.clearHistory();
									}
									else if($scope.prevPage === 'app.callAccepted'){
											// alert('decline call here');
											// ion.sound.play("bell_ring");
									}

									else if($scope.prevPage === 'app.changeEmail_patient'){
											// $state.go('templates.doctor_home');
											// $ionicHistory.clearHistory();
											window.history.go(-1);
									}
									else{
												window.history.go(-1);
												// window.history.back(-1);
												// $scope.backView = $ionicHistory.backView();
												//        $scope.backView.go();
												// $ionicHistory.goBack();
												// $ionicHistory.goBack(-1);
												console.log(window.history.length);
												// window.history.go(-(history.length - 1));
									}
				}

	}



	$rootScope.specialityList = {};
	$rootScope.sexList = {};
	$rootScope.LanguageList = {};
	$rootScope.statusList = {};

	$scope.showSideMenu = function (selectedSearch){

			if (selectedSearch == "gender")
			{

				$rootScope.sexList = [
				{'sex': 'Male'},
				{'sex': 'Female'},
				{'sex': 'Any'}

				]

				$rootScope.SearchHeader='Gender';
				$rootScope.showSPecialities=false;
				$rootScope.showSex=true;
				$rootScope.showStatus=false;
				$rootScope.showLanguage=false;

			}

			if (selectedSearch == "language")
			{
					$scope.LanguageList = angular.fromJson($window.localStorage['languages']);
					console.log($scope.LanguageList);

					$rootScope.SearchHeader='Language';
					$rootScope.showSPecialities=false;
					$rootScope.showSex=false;
					$rootScope.showStatus=false;
					$rootScope.showLanguage=true;

			}

			if (selectedSearch == "onlineOffline") {
				$rootScope.showSearchOption=true;

				$rootScope.statusList = [

				{'stat': 'Online'},
				{'stat': 'Offline'}
				]
				$rootScope.SearchHeader='Online/Offline';
				$rootScope.showSPecialities=false;
				$rootScope.showSex=false;
				$rootScope.showStatus=true;
				$rootScope.showLanguage=false;

			};
			//Make API request and get the data
			$rootScope.specialityList1={};
			if (selectedSearch == "speciality")
			{
				$rootScope.SearchHeader='Speciality';
				$rootScope.showSPecialities=true;
				$rootScope.showSex=false;
				$rootScope.showStatus=false;
				$rootScope.showLanguage=false;

				$scope.specialityList1 = angular.fromJson($window.localStorage['specialityList1']);
				console.log($scope.specialityList1);

			};

		$rootScope.sideMenuForSearch = true;
		$ionicSideMenuDelegate.toggleRight();
	}


	$scope.sidemenu = {};
	$scope.choice='';

	$scope.selectSpeciality = function(val)	{
		$scope.specfic = val;
		$scope.choice= val;
		console.log($scope.specfic);
		$ionicSideMenuDelegate.toggleRight();
		searchbyspecialities.specialitywisesearch($scope.specfic);
		$rootScope.specialdata =  searchbyspecialities.getSpecialData();
	}

	$scope.selectSex = function(val)	{
		if(val === "Male")
		{
			$scope.gender = "Male";
		}
		else if(val === "Female")
		{
			$scope.gender = "Female";
		}
		else
		{
			$scope.gender = "Any";
		}
			$ionicSideMenuDelegate.toggleRight();
			searchbyspecialities.categorywisesearch($scope.gender);
			$rootScope.genderdata =  searchbyspecialities.getcategoryData();
			console.log($scope.gender);

	}
	$scope.selectStatus = function(val)	{

		if(val === "Online")
		{
		// $scope.onoff = 'Online';
		$scope.onoff =  "Online";
		}
		else
		{
		// $scope.onoff = 'Offline';
		$scope.onoff =  "Offline";
		}
		$ionicSideMenuDelegate.toggleRight();
		searchbyspecialities.genderwisesearch($scope.onoff);
		$rootScope.statusdata =  searchbyspecialities.getgenderData();

	}
	$scope.selectLanguage = function(val)	{
		console.log(val);
		$ionicSideMenuDelegate.toggleRight();
		searchbyspecialities.languagewisesearch(val);
		$rootScope.languagedataselected =  searchbyspecialities.getlanguageData();
		console.log($scope.languagedataselected);
	}
	$scope.items=[];
	$scope.moredata = false;

	// $scope.loadMore=function()
  // {
	// 	console.log($rootScope.doclist.length);
  //     $scope.items.push({id: $rootScope.doclist.length});
	// 		console.log($scope.items);
	//
  //     if($scope.items.length==10)
  //     {
  //         $scope.moredata=true;
  //     }
  //   $scope.$broadcast('scroll.infiniteScrollComplete');
  // };


	$scope.searchdoctorbydifferentscenario = function(specialitywise,catwise,genderwise,languagewise)
	{

					$rootScope.doclist = {};
					$ionicLoading.show({
						template:'<ion-spinner><ion-spinner>'
					});
					//PUT ONE ERROR MESSAGE HERE
					if(specialitywise == null && catwise == null && genderwise == null && languagewise == null)
					{
							console.log('Please Select Atlease One Search Criteria');
							$ionicLoading.hide();
							window.plugins.toast.showWithOptions({
								message: "Please select atleast one search criteria",
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
							$timeout(function() {
							$scope.queryPopup.close(); //close the popup after 3 seconds for some reason
							}, 1000);


					}
					else
					{
								console.log(specialitywise);
								/* Patients Selected One of the Search Criteria */
								var searchdoctor = {
								byspecial:specialitywise,
								bygender:catwise,
								bystatus:genderwise,
								bylanguage:languagewise
								};

								console.log(searchdoctor);
								$rootScope.rates=0;
								$rootScope.totalRates=0;
									//// ///////////////////////////////////SEARCH PATTERN QUERY FORMATION/////////////////////////////////////////////////

									console.log(searchdoctor.byspecial);

									//// ///////////////////////////////////SEARCH PATTERN QUERY FORMATION/////////////////////////////////////////////////
									var DEFAULT_PAGE_SIZE_STEP = 15;

									  $rootScope.currentPage = 1;
									  $rootScope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;

									  $scope.loadNextPage = function(){
											console.log($rootScope.searchResultLength);
											console.log($rootScope.pageSize);

									    $rootScope.currentPage++;
									    $rootScope.pageSize = $rootScope.currentPage * DEFAULT_PAGE_SIZE_STEP;
											if($rootScope.pageSize>=$rootScope.searchResultLength){
												console.log('hide show more');
												$rootScope.showMore=true;
											}

									  }



								searchbyspecialities.getlistofspecialist(searchdoctor).then(function (response) {
										$ionicLoading.show();


								if(response)
								{



										console.log('the length of the response is:');
										console.log(response);



												if(response.length <= 15){
														console.log('hide show more');
														$rootScope.showMore=true;
												}
												else{
													$rootScope.showMore=false;
												}

												$rootScope.searchResultLength = response.length;
												console.log(response);
												console.log($rootScope.pageSize);


												// window.localStorage['doclist'] = angular.toJson(response);
												// $rootScope.doclist = angular.fromJson($window.localStorage['doclist']);


												$rootScope.doclist = response;


												$state.go('app.doctorsearch');
												// $rootScope.doclist = response;

												var data=$rootScope.doclist;//take all json data into this variable
												for(var i=0; i<data.length; i++){

												$rootScope.rate=data[i].ratings,
												//$rootScope.totalRates=data[i].totalRates
												$rootScope.totalRates=data[i].ratingCount
												// console.log($rootScope.rate);
												// console.log($rootScope.totalRates);
												$rootScope.totalRates=data[i].ratingCount

												if($rootScope.rate == 0 || $rootScope.totalRates == 0){
													$rootScope.overallRating= 1;
												}

												else{
													$rootScope.overallRating = $rootScope.rate/$rootScope.totalRates;
												}
												// console.log($rootScope.overallRating);
												$scope.ratings = [{
												current: $rootScope.overallRating,
												max: 5
												}];
												// console.log($scope.ratings);
												$scope.getStars = function(rating) {
												// Get the value
												var val = parseFloat(rating);
												// Turn value into number/100
												var size = val/5*100;
												return size + '%';
												}
												// $rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;

												}


												$ionicLoading.hide();

								}
								else if(Object.keys(response).length == 0)
								{
											$ionicLoading.hide();
											console.log('empty');
											var confirmPopup = $ionicPopup.confirm({
											title: 'No Doctors Available',
											template: '<center>Please try again after some time.</center>',
											cssClass: 'videoPopup',
											scope: $scope,
											buttons: [

											{
											text: 'OK',
											type: 'button-royal',
											onTap: function(e) {
											console.log('ok');

											}
											},
											]
											});

											return true;

								}
								else {
										$rootScope.doclist = response;
										console.log(response);
										$state.go('app.doctorsearch');
										$rootScope.doclist = "no doctors found";
										}
								}).catch(function (response, data, status, header) {

										console.log('THE STATUS IS:');
										console.log(status);


								});
					}
	}


	//signout

		$scope.confirmSignout = function() {
			console.log('closing side menu');
			$ionicSideMenuDelegate.toggleRight();
					var confirmPopup = $ionicPopup.confirm({
							template: '<center>Are you sure you want to Signout?</center>',
							cssClass: 'videoPopup',
							scope: $scope,
							buttons: [
							{
							text: 'Cancel',
							type: 'button-royal',
							onTap: function(e) {
							// $ionicSideMenuDelegate.toggleRight();
							}
							},
							{
							text: 'OK',
							type: 'button-positive',
							onTap: function(e) {
								$ionicLoading.show({
									template:'<ion-spinner></ion-spinner><br><br>Logging out from DoctorQuick'
								})
							LoginService.logoutFromDq(window.localStorage.user).then(function(response){
							$scope.loggedOut=response;
							console.log($scope.loggedOut);
							if($scope.loggedOut){
								// $ionicHistory.clearCache();
								// 	$ionicHistory.clearHistory();
								$scope.loginDatasubmitted = false;

								var unametologout = "greet+"+window.localStorage.user;
								var pwtologout = "DQ_patient";


								var success = function(message)
								{

									console.log(message);

											$ionicLoading.hide();
											console.log(message);
											$ionicHistory.nextViewOptions({
											disableBack: true,
											disableAnimate: true,
											historyRoot: true
											});
											$ionicHistory.clearCache();
											$ionicHistory.clearHistory();
											$window.localStorage.clear();

											$state.go('auth.loginNew');
											// $window.location.reload();

								}
								var failure = function()
								{
									console.log('error calling hello plugin');
								}
								hello.logout(success, failure);
							}
							}).catch(function(error){
							console.log('failure data', error);
							});
							}
							},
							]
					});

		}

	$rootScope.toggleLeftSideMenu = function () {
		$rootScope.sideMenuForSearch = false;
		$ionicSideMenuDelegate.toggleRight();
	}

		$scope.clearAllHistory = function(){
			if(window.localStorage.doctororpatient === 'patient'){
				$ionicHistory.clearCache().then(function(){ $state.go('app.patient_home'); });
				console.log($ionicHistory.viewHistory());

			}
			if(window.localStorage.doctororpatient === 'doctor'){
				$ionicHistory.clearCache().then(function(){ $state.go('templates.doctor_home'); });
				console.log($ionicHistory.viewHistory());
			}
		}

	$scope.getPatientDetails = function(){
		$state.go('app.patient_profile');
		// $scope.patient_details ={};
	}
	console.log($state.$current.name);
	$scope.changePwd=function(){
		$state.go('app.changePassword_patient');
	}
	$scope.changeDocPwd=function(){
		$state.go('templates.updatePassword');
	}

	$rootScope.passwordToUpdate={};
	$rootScope.ratedBy;
		$scope.updatePwd=function(){
							$ionicLoading.show({
								template:'<ion-spinner>,ion-spinner>'
							})
							// $rootScope.ratedBy=$rootScope.passwordToUpdate.userPhone;
							var newPwd={
							newPwd1:$rootScope.passwordToUpdate.password,
							userPhone:window.localStorage.user
							};
							console.log($rootScope.passwordToUpdate.password);
							if(!$rootScope.passwordToUpdate.password){
									$ionicLoading.hide();
										// $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
										$scope.submittedPwd = true;

										window.plugins.toast.showWithOptions({
										message: "Valid 4 digit password must be entered",
										duration: "short", // 2000 ms
										position: "bottom",
										styling: {
										opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
										backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
										textColor: '#ffffff', // Ditto. Default #FFFFFF
										textSize: 13, // Default is approx. 13.
										cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
										horizontalPadding: 16, // iOS default 16, Android default 50
										verticalPadding: 12 // iOS default 12, Android default 30
										}
										});

							}
							if($rootScope.passwordToUpdate.password && !$rootScope.passwordToUpdate.verify){
									$ionicLoading.hide();
										// $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
										$scope.submittedPwd = true;

										window.plugins.toast.showWithOptions({
										message: "Please confirm your new password",
										duration: "short", // 2000 ms
										position: "bottom",
										styling: {
										opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
										backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
										textColor: '#ffffff', // Ditto. Default #FFFFFF
										textSize: 13, // Default is approx. 13.
										cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
										horizontalPadding: 16, // iOS default 16, Android default 50
										verticalPadding: 12 // iOS default 12, Android default 30
										}
										});

							}
							console.log($rootScope.passwordToUpdate.verify);
							if($rootScope.passwordToUpdate.password && $rootScope.passwordToUpdate.verify){
									if($rootScope.passwordToUpdate.password === $rootScope.passwordToUpdate.verify){
											if(window.localStorage.doctororpatient === 'patient'){
												patientProfileDetailsService.changePwd2(newPwd).then(function(response){
													console.log(response);
													$ionicLoading.hide();

													$rootScope.passwordToUpdate={};
													window.plugins.toast.showWithOptions({
													message: "Your password has been updated",
													duration: "short", // 2000 ms
													position: "bottom",
													styling: {
													opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
													backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
													textColor: '#ffffff', // Ditto. Default #FFFFFF
													textSize: 13, // Default is approx. 13.
													cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
													horizontalPadding: 16, // iOS default 16, Android default 50
													verticalPadding: 12 // iOS default 12, Android default 30
													}
													});
													}).catch(function(error){
												console.log('failure data', error);
												});
											}
											else{
												doctorServices.changeDocPwd(newPwd).then(function(response){
												console.log(response);
												$ionicLoading.hide();

												// $state.go("templates.doc_profile")
												$rootScope.passwordToUpdate={};
												window.plugins.toast.showWithOptions({
													message: "Your password has been updated",
													duration: "short", // 2000 ms
													position: "bottom",
													styling: {
													opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
													backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
													textColor: '#ffffff', // Ditto. Default #FFFFFF
													textSize: 13, // Default is approx. 13.
													cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
													horizontalPadding: 16, // iOS default 16, Android default 50
													verticalPadding: 12 // iOS default 12, Android default 30
													}
												});

												// $state.go("templates.doctor_home");

												}).catch(function(error){
												console.log('failure data', error);
												});
											}

											//
											// $ionicHistory.nextViewOptions({
											// disableAnimate: true,
											// disableBack: true
											// });
											// $state.go("app.patient_profile");
									}
									else{
												$ionicLoading.hide();
												$rootScope.passwordToUpdate={};
												window.plugins.toast.showWithOptions({
												message: "Password did not match",
												duration: "short", // 2000 ms
												position: "bottom",
												styling: {
												opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
												backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
												textColor: '#ffffff', // Ditto. Default #FFFFFF
												textSize: 13, // Default is approx. 13.
												cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
												horizontalPadding: 16, // iOS default 16, Android default 50
												verticalPadding: 12 // iOS default 12, Android default 30
												}
												});
									}
							}


		}
$scope.updateDocPwd=function(){
					$ionicLoading.show({
						template:'<ion-spinner></ion-spinner>'
					})
					$rootScope.ratedBy=$rootScope.passwordToUpdate.userPhone;
					var newPwd={
					newPwd1:$rootScope.passwordToUpdate.password,
					userPhone:window.localStorage.user
					};
					console.log($rootScope.passwordToUpdate.password);
					console.log($rootScope.passwordToUpdate.verify);

					console.log(newPwd);
					if(!$rootScope.passwordToUpdate.password){
								$ionicLoading.hide();
								// $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
								$scope.submittedPwd = true;

								window.plugins.toast.showWithOptions({
								message: "Valid 4 digit password must be entered",
								duration: "short", // 2000 ms
								position: "bottom",
								styling: {
								opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
								backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
								textColor: '#ffffff', // Ditto. Default #FFFFFF
								textSize: 13, // Default is approx. 13.
								cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
								horizontalPadding: 16, // iOS default 16, Android default 50
								verticalPadding: 12 // iOS default 12, Android default 30
								}
								});

					}
					if($rootScope.passwordToUpdate.password && !$rootScope.passwordToUpdate.verify){
							$ionicLoading.hide();
								// $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
								$scope.submittedPwd = true;

								window.plugins.toast.showWithOptions({
								message: "Please confirm your new password",
								duration: "short", // 2000 ms
								position: "bottom",
								styling: {
								opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
								backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
								textColor: '#ffffff', // Ditto. Default #FFFFFF
								textSize: 13, // Default is approx. 13.
								cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
								horizontalPadding: 16, // iOS default 16, Android default 50
								verticalPadding: 12 // iOS default 12, Android default 30
								}
								});

					}
					if($rootScope.passwordToUpdate.password && $rootScope.passwordToUpdate.verify){
							if($rootScope.passwordToUpdate.password === $rootScope.passwordToUpdate.verify){
									doctorServices.changeDocPwd(newPwd).then(function(response){
									console.log(response);
									$ionicLoading.hide();

									// $state.go("templates.doc_profile")
									$rootScope.passwordToUpdate={};
									window.plugins.toast.showWithOptions({
										message: "Your password has been updated",
										duration: "short", // 2000 ms
										position: "bottom",
										styling: {
										opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
										backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
										textColor: '#ffffff', // Ditto. Default #FFFFFF
										textSize: 13, // Default is approx. 13.
										cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
										horizontalPadding: 16, // iOS default 16, Android default 50
										verticalPadding: 12 // iOS default 12, Android default 30
										}
									});

									// $state.go("templates.doctor_home");

									}).catch(function(error){
									console.log('failure data', error);
									});
							}
							else{
									$ionicLoading.hide();

									window.plugins.toast.showWithOptions({
									message: "Password did not match",
									duration: "short", // 2000 ms
									position: "bottom",
									styling: {
									opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
									backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
									textColor: '#ffffff', // Ditto. Default #FFFFFF
									textSize: 13, // Default is approx. 13.
									cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
									horizontalPadding: 16, // iOS default 16, Android default 50
									verticalPadding: 12 // iOS default 12, Android default 30
									}
									});
							}
					}


}
$scope.myDoctors=function(){
$state.go('app.my_doctors');
}

//Rating functionality

$scope.ratingsObject = {
iconOn: 'ion-ios-star',    //Optional
iconOff: 'ion-ios-star-outline',   //Optional
rating:  $scope.myRating, //fetch value from database if already rated
minRating:0,    //Optional
readOnly: true, //Optional
callback: function(rating) {    //Mandatory
$scope.ratingsCallback(rating);
}

};



$scope.ReviewApp = function()
{

$scope.deviceAndroid = ionic.Platform.isAndroid();


if($scope.deviceAndroid)
{
$ionicSideMenuDelegate.toggleRight();
window.open("market://details?id=com.greettech.DoctorQuick","_system");

}
else{
	$ionicSideMenuDelegate.toggleRight();
		window.open("https://itunes.apple.com/in/app/doctorquick-get-well-sooner/id1382247082?mt=8","_system");

}


}


$scope.getWallet=function(){
$rootScope.patientWalletdetails ={};
$rootScope.patientTransactiondetails ={};
$state.go('app.patient_payments');
}

$scope.balAmnt;
$rootScope.myBalance;

//  console.log(window.localStorage.seen);
// $interval(callReqInterval, 15000);
function callReqInterval() {

if($ionicHistory.currentStateName() != 'auth.loginNew'){
medicalSpecialityService.callAccepted(window.localStorage.user).then(function(response){
// console.log('successfull data', response);
$scope.calledDetails=response;
console.log($rootScope.online);
console.log($scope.calledDetails);
var data=$scope.calledDetails;//take all json data into this variable
var totList=[];
for(var i=0; i<data.length; i++){

$rootScope.cal_flag=data[i].cal_flag,
$rootScope.callId=data[i].callId,
$rootScope.onoff=data[i].onoff,
$rootScope.doctorPhone=data[i].doctorPhone,
$rootScope.popupSeen=data[i].popupSeen,
$rootScope.accptdDocFname=data[i].doctorFname,
$rootScope.accptdDocLname=data[i].doctorLname,

console.log($rootScope.popupSeen);

window.localStorage.Doctocall =  $rootScope.doctorPhone;
if($rootScope.cal_flag === '4'  && $rootScope.popupSeen === '1' ){

$ionicPopup.confirm({
title: '<i class="ion-checkmark-circled" style="font-size: 20vw !important; color: #6fa02d !important;"></i><br/>',
template: '<center><b>Dr {{accptdDocFname}} {{accptdDocLname}}</b><br> has accepted your invitation for a consultation. Please start the consultation now or decline.</center>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{
text: 'Decline',
type: 'button-royal',
onTap: function(e) {
console.log('Decline');
}
},
{
text: 'View',
type: 'button-positive',
onTap: function(e) {
console.log($rootScope.callId);
callAcceptedService.acceptPopUpSeen($rootScope.callId).then(function(response){
$scope.popupSTATUS=response;
console.log($scope.popupSTATUS);
}).catch(function(error){
console.log('failure data', error);
});
$state.go('app.callAccepted');
}
},
]
})

}
else{
window.localStorage.showPopup =2;
}
}

}).catch(function(error){
console.log('failure data', error);
});

}

// console.log('callAtInterval');
}



//video call in search

$scope.checkWalletBalance=function()
{
$ionicLoading.show();
var calldecline={
patient:window.localStorage.user,
doctor:$rootScope.doctorPhone,
callId:$rootScope.callId
}
console.log(calldecline);
doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
// console.log(response[0][0]);
$scope.myBalance=response[0][0];
window.localStorage.patientWalletBalance=$scope.myBalance;
console.log('pop up page clicked');
var uname = "greet+"+window.localStorage.user;
var pw = "DQ_patient";

var persontocall = "greet+" + window.localStorage.docPhone;
//  var persontocall = "greet+" + window.localStorage.consultedDoctor;
console.log(uname);
console.log(persontocall);
var success = function(message)
{
console.log(message);
}
var failure = function()
{
alert("Error calling Hello Plugin");
}


if($scope.myBalance >= 270)
{

hello.greet(uname,pw,persontocall,success, failure);
var confirmPopup = $ionicPopup.confirm({
template: '<b>Request for Video call has been sent <br><center>00:02</center></b>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{ text: 'Cancel',
type: 'button-royal', },

{
text: 'Resend',
type: 'button-positive',

},
]
//templateUrl: "views/app/viewdoctor_profile.html",
});


}
else
{

var confirmPopup = $ionicPopup.confirm({
template: '<b>Your DoctorQuick Balance is too low.</b>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{
text: 'Cancel',
type: 'button-royal', },
{

text: 'Topup',
type: 'button-positive',
onTap: function(e) {
$state.go('app.patient_topup');
}

},
]
//templateUrl: "views/app/viewdoctor_profile.html",
});

}
$ionicLoading.hide();
}).catch(function(error){
console.log('failure data', error);
});

}



$scope.BalanceForVoiceCall=function()
{
$ionicLoading.show();
doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
// console.log(response[0][0]);
$scope.myBalance=response[0][0];
var uname = "greet+"+window.localStorage.user;
var pw = "DQ_patient";

var persontocall = "greet+" + window.localStorage.docPhone;
//  var persontocall = "greet+" + window.localStorage.consultedDoctor;
console.log(uname);
console.log(persontocall);

var success = function(message)
{
alert(message);
}
var failure = function()
{
alert("Error calling Hello Plugin");
}



if($scope.myBalance >= 270)
{
hello.audiocallvsee(uname,pw,persontocall,success, failure);
var confirmPopup = $ionicPopup.confirm({
template: '<b>Request for Voice call has been sent <br><center>00:02</center></b>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{ text: 'Cancel',
type: 'button-royal', },

{
text: 'Resend',
type: 'button-positive',

},
]
//templateUrl: "views/app/viewdoctor_profile.html",
});
}
else
{
var confirmPopup = $ionicPopup.confirm({
template: '<b>Your DoctorQuick Balance is too low.</b>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{
text: 'Cancel',
type: 'button-royal', },
{
text: 'Topup',
type: 'button-positive',
onTap: function(e) {
$state.go('app.patient_topup');
}
},
]
//templateUrl: "views/app/viewdoctor_profile.html",
});
}
$ionicLoading.hide();
}).catch(function(error){
console.log('failure data', error);
});

}

/////////////Show and hide notification////////////////////////////////////////

$scope.hideNotifications = function (msg) {
console.log(msg);
$scope.accptNotifications=true;
$scope.rejectNotifications=false;
if(window.localStorage.doctororpatient === 'patient'){
var updatePlayer ={
palyerId:'',
userNum:window.localStorage.user,
user:'patient'
}

$scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
var playerId = JSON.parse($window.localStorage.getItem("patientDetails"));
playerId[0][8] = "";
console.log(playerId);
console.log($scope.patient_details[0][8]);
localStorage.setItem("patientDetails",JSON.stringify(playerId));
console.log(angular.fromJson($window.localStorage['patientDetails']));

LoginService.updatePlayer(updatePlayer).then(function(response){
console.log(response);
})
}
else{
var updatePlayer ={
palyerId:'',
userNum:window.localStorage.user,
user:'doctor'
}

LoginService.updatePlayer(updatePlayer).then(function(response){
console.log(response);
})
}




// 	window.plugins.OneSignal.registerForPushNotifications(true);
};
$scope.showNotifications = function (msg) {
// alert(msg);
$scope.accptNotifications=false;
$scope.rejectNotifications=true;
window.plugins.OneSignal.getIds(function(ids){
//document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
//document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
console.log(JSON.stringify(ids['userId']));
$scope.playerId=JSON.stringify(ids['userId']);
// alert('oneSignal')
console.log($scope.playerId);
if(window.localStorage.doctororpatient === 'patient'){
var updatePlayer ={
palyerId:$scope.playerId,
userNum:window.localStorage.user,
user:'patient'
}
}
else{
var updatePlayer ={
palyerId:$scope.playerId,
userNum:window.localStorage.user,
user:'doctor'
}
}

LoginService.updatePlayer(updatePlayer).then(function(response){
console.log(response);
})
});
};


///prescription par
$rootScope.prescription={};

$scope.done = function (prescType,sno){
switch(sno){
case 1:	//for diagnosis
if($rootScope.prescription.diagnosisforpatient)
{
console.log($rootScope.previousState.name);

testresultbydoctor.diagnosisdone($rootScope.prescription.diagnosisforpatient);
$rootScope.chekDiag=true;
$rootScope.val=$rootScope.prescription.diagnosisforpatient;
if($rootScope.previousState.name === "templates.sendPrescription"){
console.log('prescription view');
$state.go('templates.sendPrescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});
return '/templates/sendPrescription';
}
else{
console.log('notes view');
$state.go('templates.prescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});

}
}
else
{

$rootScope.prescription.diagnosisforpatient="";
// alert('please enter diagnosis');
window.plugins.toast.showWithOptions({
message: "Please enter diagnosis",
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
// $timeout(function() {
// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
// }, 1000);
}  break;
case 2:	//for tests
if($rootScope.prescription.checkedTests)
{
console.log($rootScope.previousState.name);

testresultbydoctor.testrecommended($rootScope.prescription.checkedTests);
$rootScope.chekTests=true;
$rootScope.testVal=$rootScope.prescription.checkedTests;
// $state.go("templates.prescription");
if($rootScope.previousState.name === "templates.sendPrescription"){
console.log('prescription view');
$state.go('templates.sendPrescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});
return '/templates/sendPrescription';
}
else{
console.log('notes view');
$state.go('templates.prescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});

}
}
else {
$rootScope.prescription.checkedTests="";
window.plugins.toast.showWithOptions({
message: "Please enter test recomended",
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
// $timeout(function() {
// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
// }, 1000);
// alert('please enter tests details');
}
break;
case 3:	//for medications

if($rootScope.prescription.medicationforpatient)
{
console.log($rootScope.previousState.name);

testresultbydoctor.medicationdone($rootScope.prescription.medicationforpatient);
$rootScope.chekMedi=true;
$rootScope.mediVal=$rootScope.prescription.medicationforpatient;
// $state.go("templates.prescription");
if($rootScope.previousState.name === "templates.sendPrescription"){
console.log('prescription view');
$state.go('templates.sendPrescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});
return '/templates/sendPrescription';
}
else{
console.log('notes view');
$state.go('templates.prescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});

}
}
else {
// alert('please enter medication');
$rootScope.prescription.medicationforpatien="";
window.plugins.toast.showWithOptions({
message: "Please enter medication",
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
// $timeout(function() {
// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
// }, 1000);
}

console.log("3. Selected Name: " + prescType );
break;
default:console.log('default');

}
}


$rootScope.chekMedi = false;
$rootScope.chekDiag = false;
$rootScope.chekTests = false;

$rootScope.newPatient={};




	$scope.endConsultation = function(type)
	{
				console.log(type);
				$rootScope.charge=type;
				console.log(window.localStorage.subPatientId);
				window.localStorage.newPatientFname='';
				window.localStorage.newPatientLname='';
				window.localStorage.newPatientAge='';
				window.localStorage.newPatientSex='';

				$scope.diagnosis ="";
				$scope.tests = "";
				$scope.medication = "";
				var prescriptiondetails={};
				console.log($rootScope.chekDiag,$rootScope.chekTests,$rootScope.chekMedi);
				if($rootScope.charge == 1 || $rootScope.charge == 3){

									if($rootScope.chekDiag  === true && $rootScope.chekMedi  === true && $rootScope.chekTests === true)
									{
											$scope.diagnosis = testresultbydoctor.getdiagnosis();
											$scope.tests = testresultbydoctor.gettests();
											$scope.medication = testresultbydoctor.getmedication();

									}
									else if($rootScope.chekDiag  === true && $rootScope.chekTests  === true)
									{
												$scope.diagnosis = testresultbydoctor.getdiagnosis();
												$scope.tests = testresultbydoctor.gettests();
												// $scope.medication = testresultbydoctor.getmedication();

												window.plugins.toast.showWithOptions({
												message: "You Missed Medication",
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
												// $timeout(function() {
												// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
												// }, 1000);
												// alert('You Missed Medication');
												$scope.diagnosis = testresultbydoctor.getdiagnosis();
												$scope.tests = testresultbydoctor.gettests();
												var diagandtests = {
												diagnosis : $scope.diagnosis,
												tests : $scope.tests
												}
												console.log(diagandtests);
									}
									else if($rootScope.chekDiag  === true && $rootScope.chekMedi  === true)
									{
												$scope.diagnosis = testresultbydoctor.getdiagnosis();
												// $scope.tests = testresultbydoctor.gettests();
												$scope.medication = testresultbydoctor.getmedication();

												window.plugins.toast.showWithOptions({
												message: "You Missed Tests",
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
												// $timeout(function() {
												// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
												// }, 1000);
												// alert('You Missed Tests');
												$scope.diagnosis = testresultbydoctor.getdiagnosis();
												$scope.medication = testresultbydoctor.getmedication();
												var diagandmedication = {
												diagnosis : $scope.diagnosis,
												medication : $scope.medication
												}
												console.log(diagandmedication);
									}
									else if($rootScope.chekTests  === true && $rootScope.chekMedi  === true)
									{
											// $scope.diagnosis = testresultbydoctor.getdiagnosis();
											$scope.tests = testresultbydoctor.gettests();
											$scope.medication = testresultbydoctor.getmedication();

											window.plugins.toast.showWithOptions({
											message: "You Missed Diagnosis",
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
											// $timeout(function() {
											// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
											// }, 1000);
											// alert('You Missed Diagnosis');
											$scope.tests = testresultbydoctor.gettests();
											$scope.medication = testresultbydoctor.getmedication();
											var testsandmedication = {
											tests : $scope.tests,
											medication : $scope.medication
											}
											console.log(testsandmedication);
									}
									else if($rootScope.chekDiag  === true)
									{
											$scope.diagnosis = testresultbydoctor.getdiagnosis();
											// $scope.tests = testresultbydoctor.gettests();
											// $scope.medication = testresultbydoctor.getmedication();
											window.plugins.toast.showWithOptions({
											message: "You have Missed tests and Medication",
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
											// $timeout(function() {
											// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
											// }, 1000);
											// alert('You have Missed tests and Medication');
											$scope.diagnosis = testresultbydoctor.getdiagnosis();
											var onlydiagnosis = {
											diagnosis : $scope.diagnosis
											}
											console.log(onlydiagnosis);
									}
									else if($rootScope.chekTests  === true)
									{
												// $scope.diagnosis = testresultbydoctor.getdiagnosis();
												$scope.tests = testresultbydoctor.gettests();
												// $scope.medication = testresultbydoctor.getmedication();
												window.plugins.toast.showWithOptions({
												message: "You have Missed Diagnosis and Medication",
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
												// $timeout(function() {
												// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
												// }, 1000);
												// alert('You have Missed Diagnosis and Medication');
												$scope.tests = testresultbydoctor.gettests();
												var onlytests = {
												tests : $scope.tests
												}
												console.log(onlytests);
									}
									else if($rootScope.chekMedi === true)
									{
												// $scope.diagnosis = testresultbydoctor.getdiagnosis();
												// $scope.tests = testresultbydoctor.gettests();
												$scope.medication = testresultbydoctor.getmedication();
												window.plugins.toast.showWithOptions({
												message: "You have Missed Diagnosis and Tests",
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
												// $timeout(function() {
												// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
												// }, 1000);
												// alert('You have Missed Diagnosis and Tests');
												$scope.medication = testresultbydoctor.getmedication();
												var onlymedication = {
												medication : $scope.medication
												}
												console.log(onlymedication);
									}
									else
									{
												window.plugins.toast.showWithOptions({
												message: "Diagnosis has to be entered ",
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
												// $timeout(function() {
												// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
												// }, 1000);
												console.log('Please select atleast one Test')
									}
										$scope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
										// console.log('CURRENT PATIENT FOR SEND PRESCRIPTION',$scope.currentPatient);
										console.log('FROM STATEPARAMS',$stateParams.reqPat);
										// console.log('FROM SCOPE VALUE',$scope.currentPatient.patientNum);

									if(!$scope.currentPatient){
										$rootScope.patientNum=$stateParams.reqPat;
										window.localStorage.patientToDisplay=$stateParams.reqPat;
									}
									else{
										console.log($stateParams.reqPat);
										window.localStorage.patientToDisplay=$stateParams.reqPat;

										// $rootScope.patientNum=$scope.currentPatient.patientNum;
										// window.localStorage.patientToDisplay=$scope.currentPatient.patientNum;

									}

										// window.localStorage.patientToDisplay=$stateParams.reqPat;

									var patientToDisplay =window.localStorage.patientToDisplay;
									if($rootScope.chekDiag || $rootScope.chekTests || $rootScope.chekMedi)
									{

												$ionicLoading.show({
													templates:'<ion-spinner></ion-spinner>'
												})
													// $rootScope.newpatientAdded=doctorServices.getNewPatient();
													// console.log($rootScope.newpatientAdded);
													// $scope.newPatientFname=$scope.newpatientAdded.fname;
													// $scope.newPatientLname=$scope.newpatientAdded.lname;

													if(!patientToDisplay){
													patientToDisplay=$stateParams.reqPat;
													}

													var prescriptiondetails = {
															docphno : window.localStorage.user,
															patientphno : patientToDisplay,
															diagnosis : $scope.diagnosis,
															tests : $scope.tests,
															medication : $scope.medication,
															subPatient:window.localStorage.subPatientId,
															charge:$rootScope.charge,
															currentReqId:window.localStorage.currentReqId
													};
													console.log(prescriptiondetails);
													console.log($rootScope.chekDiag);

													//test jpeg image response/Users/amittantia/Desktop/RK/VseePlugin
													testresultbydoctor.jpegtest(prescriptiondetails).then(function(response){
													console.log(response);
													$scope.pic=response
													console.log(prescriptiondetails);
													if($scope.pic === "DiagnosisError"){
															$ionicLoading.hide();
															window.plugins.toast.showWithOptions({
															message: "Please Enter Diagnosis as it is Mandatory.",
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
													else{
													var auname =  "greet+"+window.localStorage.user;
													var apw = "DQ_doctor";
													if(!patientToDisplay){
													patientToDisplay=$stateParams.reqPat;
													}
													var ato = "greet+" + patientToDisplay;

													console.log(auname);
													console.log(ato);
													var prescImg=$scope.pic;

													console.log(prescImg);

													var success = function(message)
													{


															console.log('THE RESPONSE IS:',message);

															$ionicLoading.hide();

															$localStorage.sendPrescTo = "";

															console.log('prescription clicked');
															console.log(message);
															$rootScope.prescription = {};
															prescriptiondetails='';
															window.localStorage.subPatientId='';
															$ionicHistory.nextViewOptions({
															disableAnimate: true,
															disableBack: true
															});

															$state.go('templates.consulted_patient',{},{location:"replace",reload:true});
															$rootScope.currentPatientEmpty=[];
															window.localStorage['currentPatient'] = angular.toJson($rootScope.currentPatientEmpty);
															// alert(message);
															console.log(message);
													}

													var failure = function()
													{
													alert("Error calling Hello Plugin");
													}

													hello.automatic(auname,apw,ato,prescImg,success, failure);

													}

													}).catch(function(error){
													console.log('failure data', error);
													});

									}
										$rootScope.chekTests;
				}
				else{
					$state.go("templates.doctor_home");
					$rootScope.currentPatientEmpty=[];
					window.localStorage['currentPatient'] = angular.toJson($rootScope.currentPatientEmpty);
				}
	}





});
