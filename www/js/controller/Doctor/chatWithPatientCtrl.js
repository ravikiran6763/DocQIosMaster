DoctorQuickApp.controller('chatWithPatientCtrl', function($scope, $rootScope, $localStorage, $ionicConfig, $ionicActionSheet) {
	$rootScope.headerTxt="Messeges";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.hideSideMenu = true;

	$scope.showActionsheet = function() {

	 $ionicActionSheet.show({

		 buttons: [

			 { text: ' Send Photo ' },
			 { text: ' Send Prescription' },

			 ],
		//  destructiveText: 'Delete',
		 cancelText: 'Cancel',
		 cancel: function() {
			 console.log('CANCELLED');
			 window.localStorage.$reset;
		 },
		 buttonClicked: function(index) {
			 console.log('BUTTON CLICKED', index);
			 if(index == 0){
				//  alert('sendphoto');
				console.log('Send photo');

			 }
			 if(index == 1){
				console.log('sendprescription');
			}
			 return true;
		 },

	 });
 };
	// $http.get('patient_home.json').success(function(response) {
	// 	$scope.feeds_categories = response;
	// });patientProfileCtrl
})
