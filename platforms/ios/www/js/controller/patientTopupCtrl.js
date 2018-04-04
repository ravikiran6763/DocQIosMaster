DoctorQuickApp.controller('patientTopupCtrl', function($scope,$rootScope,$state,$localStorage, $location, $ionicConfig,$cordovaInAppBrowser, $http, $cordovaToast, patientWalletServices, RazorPayService ,patientProfileDetailsService,BASE_URL, API) {

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

	$scope.validateTopup=function(isDocTopUpValid){
	  console.log('isDocTopUpValid ', isDocTopUpValid);
	  console.log('clicked');

	  $scope.topUp = true;
	  if(isDocTopUpValid) {
	    // console.log('isDocFormValid ', isDocFormValid)

								$scope.payment.topUpAmt=($scope.payment.topUp*100);
								console.log($scope.payment.topUp);
							 if($scope.payment.topUp < 270){//250
								 window.plugins.toast.showWithOptions({
								 message: "Amount must be ₹270 or higher",
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
											},

									}
									RazorPayService.topUpOptions(options);


									var successCallback = function(payment_id) {
									console.log('payment_id: ' + payment_id)

									$scope.paymentid = payment_id;
										RazorPayService.topUp($scope.paymentid).then(function(response){
									   $rootScope.patientWalletUpdate=response;
										 console.log($rootScope.patientWalletUpdate);
										 if($rootScope.patientWalletUpdate === 'TransactionSuccessful'){

											 // console.log('TransactionSuccessful');
											 var confirmPopup = $ionicPopup.confirm({
							 					// title: 'DoctorQuick',
							 					template: '<center>Successfully added the amount to you DoctorQuick Deposit</center>',
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
														// $window.location.reload(true);
														$state.reload();

							 							}
							 						},
							 					]
							 				});

											  // $state.go('app.patient_topup');

												// $state.go("app.patient_payments", $stateParams, {reload: true, inherit: false});
												// 	this.navCtrl.push("patient_payments",{
												// 		status: this.status
												// 	});
										 }
										 if($rootScope.patientWalletUpdate ==='ERROR'){
											  alert('Error While Initiating Payment');
										 }
										 $scope.payment.topUpAmt="";
										 // $state.reload()
										// $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
									 console.log($rootScope.patientWalletUpdate);
									   }).catch(function(error){
									     console.log('failure data', error);
									   });
									}

									var cancelCallback = function(error) {
									console.log(error.description + ' (Error '+error.code+')')
										window.plugins.toast.showWithOptions({
										message: "Transaction cancelled",
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
										// $window.location.reload(true);
									}

									RazorpayCheckout.open(options, successCallback, cancelCallback);



								}
	  }
		else{
			window.plugins.toast.showWithOptions({
			message: "Amount must be ₹270 or higher",
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
			// $cordovaToast.showLongCenter('amount must be ₹250 or higher.', 'short', 'center').then(function(success) {
			// // success
			// }, function (error) {
			// // error
			// });
		}
	}


  $scope.payment={};

	patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
   $rootScope.patientWalletdetails=response;
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
						$scope.patientEmail=data[i].patientEmail,

				console.log($scope.patientFname);
				console.log($scope.patientEmail);

				}

 }).catch(function(error){
 console.log('failure data', error);
 })

 patientWalletServices.paidToDoctors(window.localStorage.user).then(function(response){
	$rootScope.doctorsList=response;
	console.log($rootScope.doctorsList);
	}).catch(function(error){
		console.log('failure data', error);
	});
})
