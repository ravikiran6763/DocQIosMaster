DoctorQuickApp.controller('patientTopupCtrl', function($scope,$rootScope,$state,$stateParams,$ionicHistory,$localStorage,$ionicPopup,$window,$ionicLoading,$ionicPlatform, $location, $ionicConfig,$cordovaInAppBrowser, $http, $cordovaToast, patientWalletServices, RazorPayService ,patientProfileDetailsService,IonicClosePopupService,BASE_URL, API) {

	$rootScope.headerTxt="Topup";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	$scope.paymentid= "";

			// if (StatusBar.isVisible) {
			//     // do something
			// 		alert('statusbar shown');
			// }



			$ionicLoading.show();


// if($rootScope.myDebit)
// {
//
// 	//nothing
// }
// else {
//
// 	$rootScope.myDebit = 0;
//
// }

			// $rootScope.balanceamount = $rootScope.myCredit -  $rootScope.myDebit;


			console.log('THE CREDIT AMOUNT',	window.localStorage.user);


			patientWalletServices.getdiffbalnce(window.localStorage.user).then(function(response){

			$rootScope.diffBalance=response;

			console.log('THE BALANCE AMOUNT IS:',$rootScope.diffBalance);
			}).catch(function(error){
				console.log('failure data', error);
			});




				patientWalletServices.getMinBalance().then(function(response){
				$rootScope.minBAlance=response;
				console.log($rootScope.minBAlance);
				}).catch(function(error){
					console.log('failure data', error);
				});


		$scope.validateTopup=function(isDocTopUpValid){
		  console.log('isDocTopUpValid ', isDocTopUpValid);
		  console.log('clicked');

		  $scope.topUp = true;
		  if(isDocTopUpValid){
		    // console.log('isDocFormValid ', isDocFormValid)
				// $rootScope.minBAlance=1;


									$scope.payment.topUpAmt=($scope.payment.topUp*100);
									console.log($scope.payment.topUp);
									if(window.localStorage.user == '9738158587' ){
										$rootScope.minBAlance=1;

									}


										if($rootScope.diffBalance > 0 && $scope.payment.topUp >= $rootScope.diffBalance)
										{

											$scope.payment.topUpAmt=($scope.payment.topUp*100);



											var options = {
														description: 'GET WELL SOONER',
														currency: 'INR',
														// key: 'rzp_test_JTodx06v7mHqbr',//change this key to live account key rzp_live_gTFcR9lOEpUn71 // rzp_test_JTodx06v7mHqbr
														key: 'rzp_live_gTFcR9lOEpUn71',//change this key to live account key rzp_live_gTFcR9lOEpUn71 // rzp_test_JTodx06v7mHqbr
														amount:$scope.payment.topUpAmt ,
														name: 'DoctorQuick',
														method:{
														wallet:true,
														upi:true
														},
														prefill:{
														email: $scope.patientEmail,
														contact: window.localStorage.user,
														name: $scope.patientFname
														}
														// ,
														// callback_url: 'http://ec2-13-126-101-210.ap-south-1.compute.amazonaws.com/patient/razorPaySuccess.php'
														// callback_url: 'http://doctorquickelb-549049736.ap-south-1.elb.amazonaws.com/razorPaySuccess.php'

											}


											var called=false;
											var successCallback = function(payment_id) {

																		RazorPayService.topUpOptions(options);
																		//
																		// console.log('payment_id: ' + payment_id)
																		// console.log('options:',options);

																		$scope.paymentid = payment_id;

																		RazorPayService.topUp($scope.paymentid).then(function(response){

																			$rootScope.patientWalletUpdate=response;
																			if($rootScope.patientWalletUpdate='TransactionSuccessful'){
																				window.plugins.toast.showWithOptions({
																					message: "Transaction Successfull",
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
																			}
																			else{
																				var errorInPayment = $ionicPopup.confirm({
																				// title: 'Refund',
																				template: '<center>Error Occurred while adding amout to DoctorQuick Deposit.<br>Contact Customer Care </center>',
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
																			IonicClosePopupService.register(errorInPayment);
																			}


																		}).catch(function(error){
																		console.log('failure data', error);
																		});
																		$state.go('app.patient_payments');
																		// $window.location.reload(true);
																		 called = false;
											}

											var cancelCallback = function(error) {
												console.log(error.description + ' (Error '+error.code+')');
												window.plugins.toast.showWithOptions({
													message: "Transaction Failed",
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
												 called = false;
											}
											// RazorpayCheckout.open(options, successCallback, cancelCallback);

												$ionicPlatform.ready(function(){
													// alert('platform ready in topup')
														if (!called) {
														RazorpayCheckout.open(options, successCallback, cancelCallback);
														called = true;
														}
												});





										}
										else if($scope.payment.topUp < $rootScope.minBAlance){ //250

											console.log($rootScope.diffBalance);
											if($rootScope.diffBalance <= 0){
												window.plugins.toast.showWithOptions({
													message: "Amount must be ₹ " + $rootScope.minBAlance + "  or higher",
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
												console.log($rootScope.diffBalance);
												window.plugins.toast.showWithOptions({
													message: "Amount must be ₹ " + $rootScope.diffBalance + "  or higher",
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


											}

									else{
												var options = {
															description: 'GET WELL SOONER',
															currency: 'INR',
															// key: 'rzp_test_JTodx06v7mHqbr',//change this key to live account key rzp_live_gTFcR9lOEpUn71 // rzp_test_JTodx06v7mHqbr
															key: 'rzp_live_gTFcR9lOEpUn71',//change this key to live account key rzp_live_gTFcR9lOEpUn71 // rzp_test_JTodx06v7mHqbr
															amount:$scope.payment.topUpAmt ,
															name: 'DoctorQuick',
															method:{
															wallet:true,
															upi:true
															},
															prefill:{
															email: $scope.patientEmail,
															contact: window.localStorage.user,
															name: $scope.patientFname
															}
															// ,
															// callback_url: 'http://ec2-13-126-101-210.ap-south-1.compute.amazonaws.com/patient/razorPaySuccess.php'
															// callback_url: 'http://doctorquickelb-549049736.ap-south-1.elb.amazonaws.com/razorPaySuccess.php'

												}


												var called=false;
												var successCallback = function(payment_id) {

																			RazorPayService.topUpOptions(options);
																			//
																			// console.log('payment_id: ' + payment_id)
																			// console.log('options:',options);

																			$scope.paymentid = payment_id;

																			RazorPayService.topUp($scope.paymentid).then(function(response){

																				$rootScope.patientWalletUpdate=response;
																				if($rootScope.patientWalletUpdate === 'TransactionSuccessful'){
																					window.plugins.toast.showWithOptions({
																						message: "Transaction Successfull",
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
																				}
																				else{
																					var errorInPayment = $ionicPopup.confirm({
																 	 				// title: 'Refund',
																 	 				template: '<center>Error Occurred while adding amout to DoctorQuick Deposit.<br>Contact Customer Care </center>',
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
																 				IonicClosePopupService.register(errorInPayment);
																				}


																			}).catch(function(error){
																			console.log('failure data', error);
																			});
																			$state.go('app.patient_payments');
																			// $window.location.reload(true);
																			 called = false;
												}

												var cancelCallback = function(error) {
													console.log(error.description + ' (Error '+error.code+')');
													window.plugins.toast.showWithOptions({
														message: "Transaction Failed",
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
													 called = false;
												}
												// RazorpayCheckout.open(options, successCallback, cancelCallback);

													$ionicPlatform.ready(function(){
														// alert('platform ready in topup')
															if (!called) {
															RazorpayCheckout.open(options, successCallback, cancelCallback);
															called = true;
															}
													});

											}
		  }
			else{
				console.log($rootScope.patientWalletdetails);
				$rootScope.balanceToDeposit = $rootScope.minBAlance - ($rootScope.myCredit - $rootScope.myDebit);
				console.log($rootScope.balanceToDeposit);

				if($rootScope.balanceToDeposit<0){
					console.log('no deposit required');
				}
				else{
					if($rootScope.balanceToDeposit <= 0){
								window.plugins.toast.showWithOptions({
										message: "Amount must be ₹"+$rootScope.minBAlance+ " or higher",
										// message: "Amount must be ₹270 or higher",
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
						// console.log($rootScope.balanceToDeposit);
							window.plugins.toast.showWithOptions({
								message: "Amount must be ₹"+$rootScope.balanceToDeposit+ " or higher",
								// message: "Amount must be ₹270 or higher",
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

				}


				// $cordovaToast.showLongCenter('amount must be ₹250 or higher.', 'short', 'center').then(function(success) {
				// // success
				// }, function (error) {
				// // error
				// });
			}
		}



  $scope.payment={};


	patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
		if(response){
			window.localStorage['patientWalletdetails'] = angular.toJson(response);
		}
   $rootScope.patientWalletdetails=response;
	 $rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
	 $rootScope.myDebit=$rootScope.patientWalletdetails[0][1];
   console.log($rootScope.patientWalletdetails);
   }).catch(function(error){
     console.log('failure data', error);
   });

//RAZORPAY DETAILS

//key id:rzp_test_mzUbTyUmUd2dyE
//Key secret :Ocof0Yf9Ms36q8Pq7EtE2zUd
// https://rzp_test_mzUbTyUmUd2dyE:Ocof0Yf9Ms36q8Pq7EtE2zUd@api.razorpay.com/v1/payments

$scope.patient_details=[];
	 patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
		$scope.patient_details=response;
		console.log($scope.patient_details);
		var data=$scope.patient_details//take all json data into this variable
		 var totList=[];
				for(var i=0; i<data.length; i++){

						$scope.patientFname=data[i].patientFname,
						$scope.patientEmail=data[i].patientEmail

				}

 }).catch(function(error){
 console.log('failure data', error);
 })

 patientWalletServices.paidToDoctors(window.localStorage.user).then(function(response){
	$rootScope.doctorsList=response;
	if($rootScope.doctorsList){
		$ionicLoading.hide();
	}
	console.log($rootScope.doctorsList);
	}).catch(function(error){
		console.log('failure data', error);
	});
})




// alert('wallet:',$rootScope.patientWalletUpdate);
// window.history.back();
// var confirmPopup = $ionicPopup.confirm({
//  // title: 'Refund',
//  template: '<center>Transaction Successful</center>',
//  cssClass: 'videoPopup',
//  scope: $scope,
//  buttons: [
//
// 	 {
// 		 text: 'OK',
// 		 type: 'button-positive',
// 		 onTap: function(e) {
// 		 	$window.location.reload(true);
// 			// window.history.back();
// 		 }
// 	 },
//  ]
// });
// $ionicHistory.goBack();
