 DoctorQuickApp.controller('patientrequestCtrl', function($scope,$window,$rootScope,$state,$localStorage,$stateParams,$interval,$location,$ionicPlatform,$ionicHistory,$timeout,$ionicPopup,$ionicConfig,$ionicLoading,patientrequesttodoctor,doctorServices,patientProfileDetailsService,medicalSpecialityService,IonicClosePopupService) {
			  $scope.toggle = true;
				$rootScope.headerTxt="Request";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.hideSideMenu = true;
				$rootScope.showBadge=false;
        $rootScope.inviteButton = false;


				$scope.toggleText = "Accept";
				console.log($state.$current.name);
				// if($state.$current.name === "templates.viewPatientRequest"){
				// 	alert("check for notification id existance here");
				// 	alert("Patient:",$stateParams.reqPat,"reqId:",$stateParams.reqId);
				// }

				$timeout( function(){
						console.log('interval started');
						if($state.$current.name === "templates.viewPatientRequest"){
							$rootScope.showBackBtn=false;
							$rootScope.hideSideMenu = false;
							$scope.deviceAndroid = ionic.Platform.isAndroid();
							console.log($scope.deviceAndroid);

							doctorServices.pushReqStatus($stateParams.reqId).then(function(response){
								console.log('exp',response);
									var uname1 = "greet+"+window.localStorage.user;
									var pw1 = "DQ_doctor";

									$ionicLoading.show({
									template: '<ion-spinner></ion-spinner><br><br>Preparing for Consultation.'
									});

									if($scope.deviceAndroid === true){
										// alert($stateParams.reqId);
										var success = function(message)
										{
										$ionicLoading.hide();
										console.log(message);
										$ionicHistory.nextViewOptions({
										disableAnimate: true,
										disableBack: true
										});
										$state.go($state.$current, {}, {location: "replace", reload: false});
										// alert(message);
										}
										var failure = function()
										{

										alert("Error calling Hello Plugin");
										}
										$ionicLoading.hide();
										hello.login(uname1,pw1,success, failure);

									}
									else{

									$ionicLoading.show({
									template: '<ion-spinner></ion-spinner><br><br>Preparing for Consultation.'
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

									$state.go($state.$current, {}, {location: "replace", reload: false});
									});

									}

									var failure = function()
									{
									alert("Error Occurred While Loggin in to DoctoQuick");
									}
									hello.loginstatus(success,failure);
									}

									}
								// }elsee
							// console.log('one2onePending:',$scope.one2oneRequests);
							})

						}
					}, 2000 );


					$rootScope.pushReqId=$stateParams.reqId;
					$rootScope.pushReqPat=$stateParams.reqPat;
					$rootScope.dateAndTime=$stateParams.reqTime;


					console.log('from previous',$rootScope.dateAndTime);
					console.log('from previous stateParams',$stateParams.reqTime);

					// doctorServices.currentPatient($stateParams.reqPat).then(function(response){
					// 	console.log(response);
					// window.localStorage['currentPatient'] = angular.toJson(response);
					// // console.log('one2onePending:',$scope.one2oneRequests);
					// })


					console.log('from root scope',$rootScope.dateAndTime);


					// alert($rootScope.dateAndTime);
					 console.log('reqId',$rootScope.pushReqId)
					 console.log('reqPat',$rootScope.pushReqPat)
					 var consltDetails ={
						 reqId:$stateParams.reqId,
						 reqPat:$stateParams.reqPat
					 }


           $rootScope.reqPatDetails1 = angular.fromJson($window.localStorage['currentPatient']);
           $ionicLoading.show({
             template:'<ion-spinner></ion-spinner>'
           })
           console.log($rootScope.reqPatDetails1);
					 console.log('consutation:',consltDetails);
					 console.log($rootScope.existingId);
					 doctorServices.fetchReqPatientDetails(consltDetails).then(function(response){
						 console.log('Response::',response);
             if(response){
               $ionicLoading.hide();

             }
					 $rootScope.reqPatDetails=response;
					 var data=$rootScope.reqPatDetails//take all json data into this variable
					 		for(var i=0; i<data.length; i++){
			 						$rootScope.reqId=data[i].id,
			 						$rootScope.reqPat=data[i].patientPhone,
                  $rootScope.subPatientId=data[i].subPatientId,
									// $rootScope.dateAndTime=data[i].requestedTime
					 		console.log($rootScope.reqId);
					 		console.log($rootScope.reqPat);
              window.localStorage.currentPatientPush=$rootScope.reqPat;
              console.log($rootScope.subPatientId);
              window.localStorage.currentReqId=$rootScope.reqId;
					 		}

					  //  $state.go($state.current, {}, {reload: true});
					 }).catch(function(error){
					 console.log('failure data', error);
					 });


					 $scope.deviceAndroid = ionic.Platform.isAndroid();

					 $scope.currentPatient={};
					 $scope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
			     // console.log('current patient',$scope.currentPatient);
					 $rootScope.patientNum=$scope.currentPatient.patientNum;
           $rootScope.subPatientId=$scope.currentPatient.subPatientId;

           console.log($rootScope.subPatientId);
           window.localStorage.subPatientId=$rootScope.subPatientId;
           window.localStorage.patientNum=$rootScope.patientNum;




			 	$scope.CurrentDate = new Date();
				$rootScope.dateDiff=$rootScope.dateAndTime-$scope.CurrentDate;

				// alert('DateDiff',$scope.CurrentDate);
				$rootScope.closeDocPopUp=false;
				////// calculate datedifference////
					var timestamp = new Date($rootScope.dateAndTime).getTime();
					var tt = $rootScope.dateAndTime;
					var date_test = new Date(tt.replace(/-/g,"/"));
					console.log('converted date and time',date_test);
					var timestamp = new Date(date_test).getTime();
					var currentTimestamp = new Date($scope.CurrentDate).getTime();
					console.log('from date and time',$rootScope.dateAndTime);
					console.log('current date and time',$scope.CurrentDate);
					var justdate = $rootScope.dateAndTime;

					var t = justdate.split(/[- :]/);

          // Apply each element to the Date function
          var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
          var actiondate = new Date(d);

          var timestamp = new Date(actiondate).getTime();


          console.log('actiondate',timestamp);

					console.log('timestamp',timestamp);
					console.log('currentTimestamp',currentTimestamp);



					var diffMs = (currentTimestamp - timestamp);
					var diffDays = Math.round(diffMs / 86400000); // days
					var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
					var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

					console.log('diffDays',diffDays);
					console.log('diffMins',diffMins);
				  console.log('diffHrs',diffHrs);
          $rootScope.requestedDUration= diffMins+ " Minutes"+" ago";
          // next line displys hr min and sec
					// $rootScope.requestedDUration= diffDays + " days, " + diffHrs + " Hours, " + diffMins+ " Minutes"+" ago";
					// $rootScope.requestedDUration= diffDays + " day " + "ago";
					console.log($rootScope.requestedDUration);
					var diff = currentTimestamp-timestamp;
					console.log('diff',diff);

					console.log('diffDays',diffDays);
					console.log('diffHrs',diffHrs);
					console.log('diffMins',diffMins);
					console.log('timestamp',timestamp);
					console.log('currentTimestamp',currentTimestamp);

					var diffMs = (currentTimestamp - timestamp);
					console.log('datedifference in min',diffMs);


				//////
					$rootScope.callReq=false;
					$rootScope.callAcc=true;
					$rootScope.timer=true;

    $scope.type = '';
    $scope.setType = function(event){
    $scope.isDisabled = false;
    $scope.type = angular.element(event.target).text();
		console.log($scope.type);
		if($scope.type === 'Decline' && window.localStorage.accpt === 1){

				console.log('cant Decline now');

		}
		else if($scope.type === 'Accept'){
			window.localStorage.accpt=1;
			$scope.isDisabled = true;
			$scope.toggleText ='Accepted';
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'
      })
			doctorServices.pushReqStatus($stateParams.reqId).then(function(response){
				// alert('this alert is showing');
				if(response === '"expired"'){
          $ionicLoading.hide();
					$rootScope.expiredReq = $ionicPopup.show({
					template: "<div >This Request has been served/Expired </b></div>",
					cssClass: 'requestPopup',
					scope: $scope,
					buttons: [
					{
					text: 'OK',
					type: 'button-positive',
					onTap:function(){
					console.log('cancel');
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});
						$state.go('templates.doctor_home',{}, {location: "replace", reload: false})
					}
					},
					]
					});
				}
				else{
                $ionicLoading.hide();

								$rootScope.chekDiag=false;
								$rootScope.chekTests=false;
								$rootScope.chekMedi=false;

								$rootScope.callReq=true;
								$rootScope.callAcc=false;
								$rootScope.timer=false;

								var accptdReq = {
								accpetcode : "2",
								doctorphno : window.localStorage.user,
								patientphno : $rootScope.reqPat,
								consultId:$rootScope.reqId
								}
								console.log('accptdReq',accptdReq);
								patientrequesttodoctor.accpetedbydoctor(accptdReq).then(function(response){
									$scope.reqStatus=response;
									console.log('updatedResponse:',response);
														if($scope.reqStatus == 'alreadyupdated'){
																	$rootScope.callReqPopUp = $ionicPopup.show({
																	title:"Sorry!!!",
																	template: "<div >This Request has been served already</b></div>",
																	cssClass: 'requestPopup',
																	scope: $scope,
																	buttons: [
																	{
																	text: 'OK',
																	type: 'button-positive',
																	onTap:function(){
																	console.log('cancel');
																	$ionicHistory.nextViewOptions({
																		disableAnimate: true,
																		disableBack: true
																	});
																		$state.go('templates.doctor_home',{}, {location: "replace", reload: false})
																	}
																	},
																	]
																	});


														}
														else{
																  if(window.localStorage.networkType === '4G' || window.localStorage.networkType === 'WiFi' || window.localStorage.networkType === 'Unknown'){
																				// $interval(videoOrAudio,2000);
                                        $ionicLoading.hide();
                                        $rootScope.callReqPopUp = $ionicPopup.show({
																					template: "<div >Please wait for the call<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
																					cssClass: 'requestPopup',
																					scope: $scope,
																					buttons: [
																					{
																					text: 'Cancel',
																					type: 'button-royal',
																					onTap:function(){
																						$interval.cancel($rootScope.videoOrAudio);
																						$interval.cancel($rootScope.checkAcceptedReq);

																						console.log('cancel');
																						console.log($scope.counter);
																						console.log(window.localStorage.reqId);

																						$state.go("templates.doctor_home");

																						doctorServices.cancelByDoc($rootScope.reqId).then(function(response){
																						$scope.cancelledByDoc=response;
																						console.log($scope.cancelledByDoc);
																						//  $state.go($state.current, {}, {reload: true});
																						}).catch(function(error){
																						console.log('failure data', error);
																						});
																					}
																					},
																					]
																				});
																				var patAct = {
																					accpetcode : "2",
																					doctorphno : window.localStorage.user,
																					patientphno : $rootScope.pushReqPat,
																					consultId:$rootScope.pushReqId
																				}
																				$rootScope.checkAcceptedReq = $interval(function () {
																					doctorServices.doctorActivity(patAct).then(function(response){
																					$scope.consultStatus=response;
																					window.localStorage.patientDeclined=$scope.consultStatus[0][0];
																					$scope.patDeclined=window.localStorage.patientDeclined;
																					// console.log($scope.consultStatus);
																					}).catch(function(error){
																					//  console.log('failure data', error);
																					});

																				}, 2000);

																				$rootScope.videoOrAudio = $interval(function (){
																					console.log('videoIntervalStarted');
																					console.log("currentRequestId:",$rootScope.reqId);
																					doctorServices.callStatus($rootScope.reqId).then(function(response){
																					$rootScope.callStatus=response;//store the response array in doctor details
																					window.localStorage.callStatus=$rootScope.callStatus[0][0];
																					$scope.notes=window.localStorage.callStatus;
																					console.log($scope.callStatus);
																					}).catch(function(error){
																					console.log('failure data', error);
																					});
																				}, 2000);

																}
																// else{
																// 	$ionicLoading.show({
																// 		template: 'Accepting',
																// 		duration: 5000
																// 	});
																// 	$timeout( function(){
																// 		var confirmPopup = $ionicPopup.confirm({
																// 			title: 'Slow Data',
																// 			template: 'Unable to accept the consultation request at the moment as we detected slow network on your device.',
																// 			cssClass: 'videoPopup',
																// 			scope: $scope,
																// 			buttons: [
																// 			{
																// 				text: 'OK',
																// 				type: 'button-positive',
																// 				onTap: function(e) {
																// 				console.log('OK');
																// 				$state.go("templates.doctor_home");
																// 				}
																// 			},
																// 			]
																// 		});
																// 	}, 5000 );
																// }
														}
								});


								$scope.counter = 120;
								$scope.onTimeout = function(){
									$scope.counter--;
									console.log($scope.counter);
									docTimeout = $timeout($scope.onTimeout,1000);
									if($scope.counter == 0){
									console.log('one minute over');
									$rootScope.buttonText='Send Request';
									$timeout.cancel(docTimeout);
									$rootScope.callReqPopUp.close();

									$rootScope.closeDocPopUp=true;
									console.log($rootScope.closeDocPopUp);

                  doctorServices.noResponseFromPatient($rootScope.reqId).then(function(response){
                  $scope.cancelledByDoc=response;
                  console.log($scope.cancelledByDoc);
                  //  $state.go($state.current, {}, {reload: true});
                  }).catch(function(error){
                  console.log('failure data', error);
                  });

									$scope.noResponsePopup = $ionicPopup.show({
												template: "<div ng-app='refresh_div' ><p>No response has been received from patient .</p></div>",
												cssClass: 'requestPopup',
												scope: $scope,
												buttons: [
												{
												text: 'OK',
												type: 'button-positive',
												onTap:function(){
													$state.go("templates.doctor_home");
												}
												},

											]
											});
                      IonicClosePopupService.register($scope.noResponsePopup);

									}
								}

								var docTimeout = $timeout($scope.onTimeout,1000);//timer interval
								$scope.$on('$destroy', function(){
								$timeout.cancel(docTimeout);
								console.log('destroyed');
								});
										window.localStorage.accpt = 0;

								// patientrequesttodoctor.acceptedbydoctor(accptdReq);
								// $state.go('templates.requestAccepted');
				}

			}).catch(function(error){
			console.log('failure data', error);
			})

		}
		else if($scope.type === 'Accepted'){
			$scope.isDisabled = true;
		}
		else if($scope.type === 'Decline'){

			console.log($scope.type);
			window.localStorage.accpt='';

			if(window.localStorage.accpt === 1){
				$scope.isDisabled = true;
				console.log('donNothing');
			}
			else{
				var docpatphno = {
				accpetcode : "2",
				doctorphno : window.localStorage.user,
				patientphno :$stateParams.reqPat,
				consultId:$rootScope.reqId
				}
				patientrequesttodoctor.declinedbydoctor(docpatphno).then(function(response){
	   		console.log(response);
				if(response){
					$state.go('templates.doctor_home');
					$rootScope.hideSideMenu = true;
				}
	   	 }).catch(function(error){
	   	//  console.log('failure data', error);
	   	 });
			}

		}
		else{
		//do nothing
		}

	};
// check patient activity///
$scope.DeclinedBypatient = true
$interval(checkForrDeclined,5000);

function checkForrDeclined(){
	if($scope.routeTo == true ){
		console.log($scope.routeTo);
		$rootScope.callReqPopUp.close();

	}
}
window.localStorage.showPopUp = 1;

// $interval(checkAcceptedReq,1000);
$rootScope.path=$location.path();
var values = $rootScope.path.split("/");

var checkPatientActivity={
	callId:$rootScope.reqId,
	patient:$rootScope.patientNum
}
console.log(checkPatientActivity);
// var patAct = {
// accpetcode : "2",
// doctorphno : window.localStorage.user,
// patientphno : $rootScope.pushReqPat,
// consultId:$rootScope.pushReqId
// }
$scope.popupShown = true;

 $scope.$watch('patDeclined', function (newValue, oldValue, scope){
		 console.log('changed');

		 if(newValue == 3){
			 $scope.callReqPopUp.close();
		 	setTimeout(function (){
					console.log('delay 3 sec');
				}, 3000);

				$scope.patientDeclined = $ionicPopup.show({
							template: "<div >Patient does not wish to proceed for a consultation at this time</div>",
							cssClass: 'requestPopup',
							scope: $scope,
							buttons: [
							{
							text: 'OK',
							type: 'button-positive',
							onTap:function(){
								console.log('patient Declined to call');
								$interval.cancel($rootScope.videoOrAudio);
								$interval.cancel($rootScope.checkAcceptedReq);
								$state.go("templates.doctor_home", {}, {reload: false});

							}
							},
						]

						});

		 }

 },true);

 // $interval(videoOrAudio,1000);
 // function videoOrAudio(){
 //  console.log($rootScope.reqId);
 //  doctorServices.callStatus($rootScope.reqId).then(function(response){
 //  		$rootScope.callStatus=response;//store the response array in doctor details
 // 		window.localStorage.callStatus=$rootScope.callStatus[0][0];
 // 		$scope.notes=window.localStorage.callStatus;
 //  		console.log($scope.callStatus);
 //  }).catch(function(error){
 //  	console.log('failure data', error);
 //  });
 // }
 $scope.$watch('notes', function (newValue, oldValue, scope){

 		console.log('changed');
 		console.log(newValue);
 		console.log(oldValue);
 		if(newValue == 2){
			//  alert('close prev popup')
			 $rootScope.callReqPopUp.close();
			 $ionicHistory.nextViewOptions({
				 disableAnimate: true,
				 disableBack: true
			 });
       if($stateParams.reqPat){
         window.localStorage.activePatient= $stateParams.reqPat;
       }
			 else {
           window.localStorage.activePatient= $scope.currentPatient.patientPhone;
			 }
      //  $interval.cancel($rootScope.videoOrAudio);
      //  $state.go("templates.prescription",{"reqPat":window.localStorage.activePatient},{location: "replace", reload: false});
			 if($scope.deviceAndroid === true){
         console.log(window.localStorage.activePatient);
				 $interval.cancel($rootScope.videoOrAudio);
				 $state.go("templates.prescription",{"reqPat":window.localStorage.activePatient},{location: "replace", reload: false})

			 }
			 else{
         $ionicLoading.show({
         template: '<ion-spinner></ion-spinner><br><br>Loading'
         });
         $timeout( function(){
           $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
           // alert('loggedin');
           $ionicHistory.nextViewOptions({
           disableAnimate: true,
           disableBack: true
           });
           $state.go("templates.prescription",{"reqPat":window.localStorage.activePatient},{location: "replace", reload: false})
           $interval.cancel($rootScope.videoOrAudio);

           });

         }, 10000);

			 }


 		}

 },true);

 $scope.$on('$destroy', function(){
     $interval.cancel(checkForrDeclined,5000);
 });



});
