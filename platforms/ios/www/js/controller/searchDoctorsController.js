DoctorQuickApp.controller('searchDoctorsController', function($scope,$window,$interval,$ionicHistory, $ionicConfig,$timeout, $state,$rootScope, $ionicSideMenuDelegate,$localStorage, $ionicLoading, $ionicPopup, searchDoctorServices,doctorServices, searchbyspecialities,callacceptedbydoctor,$ionicHistory,medicalSpecialityService,IonicClosePopupService,patientWalletServices) {

	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.calledOnce=false;

	console.log('Search controller called');

	$ionicSideMenuDelegate.canDragContent(false); //preventes sidemenu sliding


	console.log(window.screen.width);
	console.log(window.screen.height);



	$scope.audioCall=function(num)
	{
		console.log('user:',window.localStorage.user);
		$rootScope.docNumToCall=num;
	  $ionicLoading.show();

		patientWalletServices.getMinBalance().then(function(response){
		$rootScope.minBAlance=response;
		console.log($rootScope.minBAlance);
		}).catch(function(error){
			console.log('failure data', error);
		});

	  doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
	    // console.log(response[0][0]);
			$rootScope.patientWalletdetails=response;
			$rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
			$rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

			$rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;
	    if($rootScope.myWalletBal >= $rootScope.minBAlance)
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
					title: 'DoctorQuick',
 				 template: '<center>Your request could not be processed as your<br>DoctorQuick deposit is less than ₹{{ minBAlance }}</center> ',
 				 cssClass: 'videoPopup',
 				 scope: $scope,
 				 buttons: [
 					 {
 						 text: 'Cancel',
 						 type: 'button-royal',
 						 onTap: function(e) {
 							 $ionicHistory.nextViewOptions({
 								 disableAnimate: true,
 								 disableBack: true
 							 });
 							 $state.go('app.patient_home',{}, {location: "replace", reload: false})
 						 }
 					 },
 					 {
 						 text: 'Topup',
 						 type: 'button-positive',
 						 onTap: function(e) {
 							 $ionicHistory.nextViewOptions({
 								 disableAnimate: true,
 								 disableBack: true
 							 });
 							 $state.go('app.patient_topup',{}, {location: "replace", reload: false});
 						 }
 					 },

 				 ]
	      });
	    }
	      $ionicLoading.hide();
	    }).catch(function(error){
	  console.log('failure data', error);
	  });

	}

	$scope.$watch('checkDocStatusdfromSearch', function (newValue, oldValue, scope){
		 console.log('changed');
		 console.log('oldValue',oldValue);
		 console.log('newValue',newValue);

		 if(newValue == 2){
			 $scope.callReqPopUp.close();

			 var patientTimeout = $timeout($scope.onTimeout,1000);//timer interval
				 $scope.$on('$destroy', function(){
				 $timeout.cancel(patientTimeout);
				 console.log('destroyed');
			 });

			 searchDoctorServices.declineOne2oneReqPatient(window.localStorage.one2oneId).then(function(response){
			 $scope.declinedByPat=response;
			 window.localStorage.myCallId=0;
			 window.localStorage.callStatus=0;
			 console.log($scope.declinedByPat);
			 }).catch(function(error){
				 console.log('failure data', error);
			 });

			 $scope.alertPopup = $ionicPopup.alert({
				 // title: 'Declined!',
				 template: "<div>Doctor did not accept your consultation</div>",
				 cssClass: 'requestPopup',
				 scope: $scope,
			 });
				 alertPopup.then(function(res) {
					 var patientTimeout = $timeout($scope.onTimeout,1000);//timer interval
					 $scope.$on('$destroy', function(){
					 $timeout.cancel(patientTimeout);
					 console.log('destroyed');
					 $scope.callAccept.close();
					 $window.location.reload();
					 });
				 $state.go("app.patient_home");
				 $ionicHistory.clearHistory();
			 });
		 }

	},true);

// $interval(checkDocStatus, 1000);
$scope.myDocDetail = angular.fromJson($window.localStorage['myDocDetail']);
$ionicLoading.show({
	template:'<ion-spinner></ion-spinner>'
})
doctorServices.myDoctorsDetails(window.localStorage.docPhoneSearch).then(function(response){
	// console.log(window.localStorage.docPhone);
	if(response){
		$ionicLoading.hide();
		// $rootScope.searchDocStatus=response[0]['onoff'];
		// console.log($rootScope.searchDocStatus);
		window.localStorage['myDocDetail'] = angular.toJson(response);

		$scope.myDocDetail = angular.fromJson($window.localStorage['myDocDetail']);

	$scope.myDocDetail=response;
	var data=$scope.myDocDetail;//take all json data into this variable
		for(var i=0; i<data.length; i++){

					$rootScope.rates=data[i].ratings,
					$rootScope.totalRates=data[i].totalRates

					if($rootScope.rates == null ){
						$rootScope.rates=''
					}
					if($rootScope.totalRates == null ){
						$rootScope.totalRates=''
					}
					// console.log($rootScope.rates);
					$rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
					// console.log('rates',$rootScope.DocRates);
					// console.log('total',$rootScope.totalRates);
			}
	}


}).catch(function(error){
console.log('failure data', error);
});


$scope.docClicked=function(docPhone){
	$ionicLoading.show({
		template:'<ion-spinner></ion-spinner>'
	})
	window.localStorage.docPhoneSearch=docPhone;
	console.log(docPhone);
	doctorServices.specificSearch(window.localStorage.docPhoneSearch).then(function(response){
		if(response){
			window.localStorage['myDocDetail'] = angular.toJson(response);
			$scope.myDocDetail = angular.fromJson($window.localStorage['myDocDetail']);
			console.log(response);
			$ionicLoading.hide();

		}
		$state.go('app.results');
	}).catch(function(error){
	console.log('failure data', error);
	});
	// $state.go('app.results');
	$scope.myDoctorRatings={}
}

	function checkDocStatus(){
	  doctorServices.myDoctorsDetails(window.localStorage.docPhoneSearch).then(function(response){
			// console.log(window.localStorage.docPhone);
			if(response){
				// console.log(response);
				window.localStorage['myDocDetail'] = angular.toJson(response);
				$scope.myDocDetail = angular.fromJson($window.localStorage['myDocDetail']);
			//
			// if($rootScope.searchDocStatus === response[0]['onoff']){
			// 	// console.log('nochange');
			// }
			// else{
			// 	$scope.myDocDetail =response;
			// }

		  $scope.myDocDetail=response;
		  var data=$scope.myDocDetail;//take all json data into this variable
		    for(var i=0; i<data.length; i++){

		          $rootScope.rates=data[i].ratings,
		          $rootScope.totalRates=data[i].totalRates

		          if($rootScope.rates == null ){
		            $rootScope.rates=''
		          }
		          if($rootScope.totalRates == null ){
		            $rootScope.totalRates=''
		          }
		          // console.log($rootScope.rates);
		          $rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
		          // console.log('rates',$rootScope.DocRates);
		          // console.log('total',$rootScope.totalRates);
		      }
			}


	  }).catch(function(error){
	  console.log('failure data', error);
	  });
	}

	function checkDocStatusOnTheGo(){
		console.log(window.localStorage.docPhoneSearch);
		searchDoctorServices.checkDocStatusOnTheGo(window.localStorage.docPhoneSearch).then(function(response){
			// console.log(window.localStorage.myCallId);
		$scope.myDocStatSearch = response;
		console.log($scope.myDocStatSearch);
		window.localStorage.myDocStatusSearch=$scope.myDocStatSearch;
		$scope.checkDocStatusdfromSearch=window.localStorage.myDocStatusSearch;
		})
	}


	$scope.callDoctor=function(num,callType)
	{

		$rootScope.calledOnce=true;
		$ionicLoading.show({
			template:'<ion-spinner></ion-spinner>'
		});

		patientWalletServices.getMinBalance().then(function(response){
		$rootScope.minBAlance=response;
		console.log($rootScope.minBAlance);
		}).catch(function(error){
			console.log('failure data', error);
		});

		$rootScope.callType=callType;

		$interval(checkCallStatus,2000);
		// $interval(checkDocStatusOnTheGo,2000);


		$rootScope.docNumToCall = num;
		$ionicLoading.show();
		var callRequest={
		patient:window.localStorage.user,
		doctor:$rootScope.docNumToCall,
		subPatient:window.localStorage.selectedSubPatient

		// callId:$rootScope.callId
		}
		console.log(callRequest);
		doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
			$rootScope.patientWalletdetails=response;
			if($rootScope.patientWalletdetails === 'agent'){
				// alert('agent');
				$rootScope.myWalletBal='agent';
			}
			else{
				console.log($rootScope.patientWalletdetails);
				$rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
				$rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

				$rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;

				console.log($rootScope.myWalletBal);
			}
						$rootScope.counter = 0;
			if($rootScope.myWalletBal >= $rootScope.minBAlance || $rootScope.myWalletBal ==='agent')
			{

					if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi'){


											searchDoctorServices.requestForCall(callRequest).then(function(response){
												$ionicLoading.hide();
												console.log('print response',response);
											window.localStorage['one2oneReq'] = angular.toJson(response);
											$rootScope.one2oneReq = angular.fromJson($window.localStorage['one2oneReq']);
											window.localStorage.one2oneId = $rootScope.one2oneReq.reqId;
											console.log(window.localStorage.one2oneId);
											console.log($rootScope.one2oneReq.callStatus);

										}).catch(function(error){
										console.log('failure data', error);
										});

										// hello.greet(uname,pw,persontocall,success, failure);
										$rootScope.counter = 120;
						        $rootScope.onTimeout = function(){
						          console.log($rootScope.counter);
						          $rootScope.counter--;
						          patientTimeout = $timeout($rootScope.onTimeout,1000);
						          if($rootScope.counter == 0){
						          console.log('one minute over');
						          $rootScope.buttonText='Send Request';
						          $timeout.cancel(patientTimeout);

											searchDoctorServices.one2oneNoResponse(window.localStorage.one2oneId).then(function(response){
											$scope.cancelledReq=response;
											window.localStorage.one2oneId=0;
											window.localStorage.callStatus=0;
											$scope.callAccept.close();
											console.log($scope.cancelledReq);
											}).catch(function(error){
												console.log('failure data', error);
											});

											if($ionicHistory.currentStateName() === 'app.results'){

												noResponsePopup = $ionicPopup.alert({
													template: "<div ><p>Doctor did not accept your request</p></div>",
													cssClass: 'requestPopup',
													scope: $scope,
												});
												IonicClosePopupService.register(noResponsePopup);

											}
											else{
												return false;
											}


						          noResponsePopup.then(function(res) {
												console.log('delete request here');
												searchDoctorServices.one2oneNoResponse(window.localStorage.one2oneId).then(function(response){
												$scope.cancelledReq=response;
												window.localStorage.one2oneId=0;
												window.localStorage.callStatus=0;
												$scope.callAccept.close();
												console.log($scope.cancelledReq);
												}).catch(function(error){
													console.log('failure data', error);
												});
						          });

						          $scope.callReqPopUp.close();

						          }
						        }
										var patientTimeout = $timeout($scope.onTimeout,1000);//timer interval
							      $scope.$on('$destroy', function(){
							      $timeout.cancel(patientTimeout);
							      console.log('destroyed');
							      });
										$scope.callReqPopUp = $ionicPopup.show({
									 			 template: "<div >Your request for a<br>consultation has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
									 			 cssClass: 'requestPopup',
									 			 scope: $scope,
									 			 buttons: [
									 			 {
									 			 text: 'Cancel',
									 			 type: 'button-royal',
									 			 onTap:function(){
									 				 console.log('cancel');
									 				 console.log($rootScope.counter);
									 				 console.log(window.localStorage.user);
													 $scope.callReqPopUp.close();
													  $state.go($state.current, {}, {reload: true});
													  searchDoctorServices.cancelOne2oneReq(window.localStorage.one2oneId).then(function(response){
													  $scope.cancelledReq=response;
														window.localStorage.one2oneId=0;
														window.localStorage.callStatus=0;
														console.log($scope.cancelledReq);
													  }).catch(function(error){
													  	console.log('failure data', error);
													  });

									 			 }
									 			 },

									 		 ]

									 		 });

					}
					else{
						var slowData = $ionicPopup.confirm({
							// title: 'Slow Data',
							template: 'Unable to send request at the moment as we detected slow network on your device. Please try after sometime ',
							cssClass: 'videoPopup',
							scope: $scope,
							buttons: [
							{
								text: 'OK',
								type: 'button-positive',
								onTap: function(e) {
								console.log('ok');
								}
							},
							]
						});
						IonicClosePopupService.register(slowData);

					}

			}
			else
			{

				var confirmPopup = $ionicPopup.confirm({
					// title: 'DoctorQuick',
					template: '<center>Your request could not be processed as your DoctorQuick deposit is less than ₹{{ minBAlance }}</center> ',
					cssClass: 'videoPopup',
					scope: $scope,
					buttons: [
						{
							text: 'Cancel',
							type: 'button-royal',
							onTap: function(e) {
								$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
								});
								$state.go('app.patient_home',{}, {location: "replace", reload: false})
							}
						},
						{
							text: 'Topup',
							type: 'button-positive',
							onTap: function(e) {
								$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
								});
								$state.go('app.patient_topup',{}, {location: "replace", reload: false});
							}
						},

					]
					//templateUrl: "views/app/viewdoctor_profile.html",
				});
				IonicClosePopupService.register(confirmPopup);


			}
				$ionicLoading.hide();
			}).catch(function(error){
		console.log('failure data', error);
		});

	}



	console.log($ionicHistory.currentStateName());


if($ionicHistory.currentStateName() === 'app.results'){
	function checkCallStatus(){
		searchDoctorServices.checkCallStatus(window.localStorage.one2oneId).then(function(response){
			console.log(window.localStorage.one2oneId);
		$scope.calStat = response;
		console.log($scope.calStat[0][0]);
		window.localStorage.callStatus=$scope.calStat[0][0];
		$scope.checkStatus=window.localStorage.callStatus;
		})
	}

	$scope.$watch('checkStatus', function (newValue, oldValue, scope){
		 console.log('changed');

		 if(newValue == 2){
			 console.log('changed call val');
			 $scope.callReqPopUp.close();
			 setTimeout(function (){
						console.log('delay 3 sec');
					}, 3000);
					console.log('value changed');
					// $scope.alertPopup.close();
					$scope.callAccept = $ionicPopup.show({
				 			 template: "<div >Doctor has accepted your <br>invitation for a consultation. Please start the<br>consultation or decline</div>",
				 			 cssClass: 'requestPopup',
				 			 scope: $scope,
				 			 buttons: [
				 			 {
				 			 text: 'Decline',
				 			 type: 'button-royal',
				 			 onTap:function(){
				 				 console.log('cancel');
				 				 console.log(window.localStorage.user);
								 $interval.cancel(checkCallStatus);
								 $scope.callReqPopUp.close();
								  searchDoctorServices.declineOne2oneReqPatient(window.localStorage.one2oneId).then(function(response){
								  $scope.declinedByPat=response;
									window.localStorage.one2oneId=0;
									window.localStorage.callStatus=0;
									console.log($scope.declinedByPat);
								  }).catch(function(error){
								  	console.log('failure data', error);
								  });
									$state.go($state.current, {}, {reload: true});
				 			 }
				 			 },
							 {
							  text: 'Start',
							  type: 'button-assertive',
							  onTap:function(){
									console.log($rootScope.callType);
									var videocallflag = $rootScope.callType;
									$scope.startdate = new Date();
									$scope.callid = $rootScope.callId;
									// window.localStorage.ViewDoc=1;
									$interval.cancel(checkCallStatus);
									console.log(window.localStorage.networkType);
									var uname = "greet+"+window.localStorage.user;
									var pw = "DQ_patient";

										 var persontocall = "greet+" + $rootScope.docNumToCall;
										 console.log(uname);
										 console.log(persontocall);

									if(window.localStorage.networkType == 'None')
									{
										var confirmPopup = $ionicPopup.confirm({
														title: 'DoctorQuick',
														template: 'You are Offline ',
														cssClass: 'videoPopup',
														scope: $scope,
														buttons: [
															{
																text: 'Ok',
																type: 'button-royal',
																onTap: function(e) {
																console.log('offline');
																}
															},
														]
													});
													IonicClosePopupService.register(confirmPopup);

									}
									else if(window.localStorage.networkType == 'Unknown' || window.localStorage.networkType == 'Ethernet' || window.localStorage.networkType == '2G' || window.localStorage.networkType == '3G')
									{
										var confirmPopup = $ionicPopup.confirm({
														// title: 'DoctorQuick',
														template: 'We detected slow nwtwork on your device. Please try after sometime ',
														cssClass: 'videoPopup',
														scope: $scope,
														buttons: [
															{
																text: 'Ok',
																type: 'button-positive',
																onTap: function(e) {
																console.log('ok');
																}
															},
														]
													});
													IonicClosePopupService.register(confirmPopup);

									}
									else if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi')
									{
										console.log($rootScope.callType );
										var success = function(message)
										{

												$ionicHistory.nextViewOptions({
												disableAnimate: true,
												disableBack: true
											 });

												//
												$scope.enddate = new Date();
												console.log(window.localStorage.user);
												console.log($rootScope.accptdDoc);
												// console.log(window.localStorage.Doctocall);
												callacceptedbydoctor.accpeteddoctor(window.localStorage.user,$rootScope.docNumToCall,videocallflag,$scope.startdate,$scope.enddate,window.localStorage.one2oneId).then(function(response){
													console.log('inserted to consultation',response);

													$state.go('app.patient_summary',{calledDoctor:$rootScope.docNumToCall,consultId:window.localStorage.one2oneId}, {location: "replace", reload: false});


					              }).catch(function(error){
					              console.log('failure data', error);
					              });
										}
										var failure = function()
										{
											alert("Error calling Hello Plugin");
										}

										if($rootScope.callType == 5){
											hello.greet(uname,pw,persontocall,success, failure);
										}
										if($rootScope.callType == 6){
											hello.audiocallvsee(uname,pw,persontocall,success, failure);
										}


									}
									else{

										//Do nNothing

									}


							  }
							  },
				 		 ]

				 		 });
		 }
		 if(newValue == 4 || newValue == 5) {
						//  alert('declined');
						 $scope.callReqPopUp.close();
						 var confirmPopup = $ionicPopup.confirm({
										 // title: 'Declined!',
										 template: '<center>Doctor has declined for consultation</center>',
										 cssClass: 'videoPopup',
										 scope: $scope,
										 buttons: [
											 {
												 text: 'OK',
												 type: 'button-positive',
												 onTap: function(e) {
													 var test = $timeout($scope.onTimeout,1000);//timer interval
										 			$scope.$on('$destroy', function(){
										 			$timeout.cancel(test);
													console.log('declined here');
										 			console.log('destroyed');
													// $scope.callAccept.close();
										 			});
													 $state.go($state.current, {}, {reload: true});
												 console.log('ok');
												 }
											 },
										 ]
						 });
						 IonicClosePopupService.register(confirmPopup);

						 $scope.callAccept.close();

		 }

	},true);


}
else{
	return false;
}



	$scope.sendOfflineMessage=function(num){
		$rootScope.calledOnce=true;
		$ionicLoading.show({
			template:'<ion-spinner></ion-spinner>'
		})
		var sendMessage={
			patient:window.localStorage.user,
			doctor:num
		}
		searchDoctorServices.sendOfflineMessage(sendMessage).then(function(response){
			if(response){
				$ionicLoading.hide();

				var confirmPopup = $ionicPopup.confirm({
							template: '<center>You will be notified once the Doctor is available</center>',
							cssClass: 'videoPopup',
							scope: $scope,
							buttons: [
							{
								text: 'OK',
								type: 'button-positive',
								onTap: function(e) {
								console.log('OK');
								}
							},
							]
						});
						IonicClosePopupService.register(confirmPopup);

			}
			console.log(response);
		}).catch(function(error){
		console.log('failure data', error);
		});
	}


	    $scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
	    console.log($scope.patient_details);
	    $rootScope.defaultPatientFname=$scope.patient_details[0][0];
	    $rootScope.defaultPatientLname=$scope.patient_details[0][2];
	    $rootScope.defaultPatientNum=$scope.patient_details[0][5];


	    console.log($rootScope.defaultPatientFname);
	    console.log($rootScope.defaultPatientLname);

	    $scope.patientToConsult='';
	    $scope.changePatient=function (val) {
	      $state.go("app.subPatientList");
	    }
	    $scope.editNewPatient=function () {
	     if(window.localStorage.newPatientVal == 0){
	       console.log('select patient to edit');
	     }
	     else if(window.localStorage.newPatientVal === window.localStorage.user || window.localStorage.newPatientVal === 'new'){
	       console.log('can not edit default patient');
	     }
	     else{
	       $state.go("app.editPatient",{id:window.localStorage.newPatientVal});

	     }


	    }
			var subPatientToShow={
				subPatId:window.localStorage.selectedSubPatient,
				mainPatient:window.localStorage.user
			}
			medicalSpecialityService.selectSubPatient(subPatientToShow).then(function(response){
				 $rootScope.newPAtient=response;
				 console.log($rootScope.newPAtient.length);
				 if($rootScope.newPAtient.length == 0){
					 // console.log('hide');
					 $rootScope.defaultPatient=false;
					 $rootScope.shownewPatient=true;

				 }
				 else{
					 $rootScope.defaultPatient=true;
					 $rootScope.shownewPatient=false;
				 }
			}).catch(function(error){
					console.log('failure data', error);
			});

})
