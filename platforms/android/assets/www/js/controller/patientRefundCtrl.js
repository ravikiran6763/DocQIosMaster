DoctorQuickApp.controller('patientRefundCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$ionicPopup, $stateParams, $cordovaToast, $http,patientWalletServices) {
	$rootScope.headerTxt="Refund ";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

	$rootScope.credit = $stateParams.credit;
	$rootScope.debit = $stateParams.debit;
	$scope.payment={};
	$rootScope.balanceAmt=$rootScope.credit-$rootScope.debit;

console.log('refundCtrl');

patientWalletServices.paidToDoctors(window.localStorage.user).then(function(response){
 $rootScope.doctorsList=response;
 console.log($rootScope.doctorsList);
 }).catch(function(error){
	 console.log('failure data', error);
 });

if($rootScope.debit===''){
	console.log('null');
}
console.log($rootScope.debit);
	$scope.refundReq = function(isDocTopUpValid) {
		console.log('isDocTopUpValid ', isDocTopUpValid)
		$scope.submitted = true;

		if(!$scope.payment.refund){


						window.plugins.toast.showWithOptions({
						message: "Amount must be entered",
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
		else if ($scope.payment.refund>$rootScope.balanceAmt) {


			window.plugins.toast.showWithOptions({
			message: "Amount more than available balance",
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
						// $cordovaToast.showLongCenter('Amount more than available balance.', 'short', 'center').then(function(success) {
						// // success
						// }, function (error) {
						// // error
						// });

		}
		else{
			var refundDetails ={
				reqBy:window.localStorage.user,
				reqAmount:$scope.payment.refund
			}


			//refund code should be here
			patientWalletServices.refundRequest(refundDetails).then(function(response){
			 $rootScope.refundRequested=response;
			 if($rootScope.refundRequested){
				 var confirmPopup = $ionicPopup.confirm({
	 				// title: 'Refund',
	 				template: 'Your request for refund is processed and it will be credited to your account within 7 business days',
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
			 }
			 console.log($rootScope.refundRequested);
			 }).catch(function(error){
				 console.log('failure data', error);
			 });



			// var confirmPopup = $ionicPopup.confirm({
			//  // title: '<h4>Thank You</h4>',
			// 	template: 'Your request for refund is processed and it will be added to your account number within 7 business days..'
			// });
		}



	   };

})
