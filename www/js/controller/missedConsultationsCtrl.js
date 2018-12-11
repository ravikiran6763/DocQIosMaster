DoctorQuickApp.controller('missedConsultationsCtrl', function($state,$ionicHistory,$scope,$window,$ionicPopup, $rootScope, $ionicPlatform,$localStorage, $ionicLoading, $ionicConfig, $http,$interval,missedConsultationService) {

	$rootScope.headerTxt="Missed Consultations";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$rootScope.inviteButton = false;

  console.log("missed calls");
  missedConsultationService.missedConsultations(window.localStorage.user).then(function(response){
	  $rootScope.missedCalls=response;//store the response array in doctor details
	   console.log('Missed :',response);
  }).catch(function(error){
  	console.log('failure data', error);
  });


	$scope.sendSmsToPatient=function(patientNum){
		$ionicLoading.show({
			template:'<ion-spinner></ion-spinner>'
		});
		var smsData={
			patient: patientNum,
			doctor:window.localStorage.user
		}
		missedConsultationService.sendSmsToPatient(smsData).then(function(response){
		  // $rootScope.smsSent=response;//store the response array in doctor details
				$ionicLoading.hide();
				var notifyPatient = $ionicPopup.confirm({
								template: '<center>This patient has now notified of your availability</center>',
								cssClass: 'videoPopup',
								scope: $scope,
								buttons: [
									{
										text: 'OK',
										type: 'button-positive',
										onTap: function(e) {
											// console.log('offline');
										// $state.go("app.patient_home")
										}
									},
								]
							});
	  }).catch(function(error){
	  	console.log('failure data', error);
	  });
	}



});
