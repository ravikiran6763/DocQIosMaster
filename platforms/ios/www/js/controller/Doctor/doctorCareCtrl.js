DoctorQuickApp.controller('doctorCareCtrl', function($scope,$state, $rootScope,$ionicPopup, $localStorage,$timeout, $ionicConfig, $ionicLoading, $http, $cordovaToast, doctorCareService) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showBadge=false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;


	$rootScope.cc={};
	$scope.doctorQuery=function(){

		if(!$rootScope.cc.query){
			console.log($rootScope.cc.query);
			window.plugins.toast.showWithOptions({
			message: "Please Enter your query",
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
			var doctorQuery={
	      patientPhone:window.localStorage.user,
	      query:$rootScope.cc.query
	    }

	    doctorCareService.submitQuery(doctorQuery).then(function(response){
	        console.log(response);
	        $rootScope.cc.query="";

					var confirmPopup = $ionicPopup.confirm({
									template: '<center>Someone from DoctorQuick will contact you soon</center>',
									cssClass: 'videoPopup',
									scope: $scope,
									buttons: [
										{
											text: 'OK',
											type: 'button-positive',
											onTap: function(e) {
											console.log('offline');
											$state.go("templates.doctor_home")
											}
										},
									]
								});

	      }).catch(function(error){
	      console.log('failure data', error);
	    });

		}

	};

  $scope.doctorCallback=function(){
    console.log('callback');
		// $scope.name="ravi";
		$ionicLoading.show({
      // duration: 30000,
      noBackdrop: true,
      template: '<ion-spinner icon="lines"/><p class="item-icon-left">Loading stuff...</p>'
    });

    doctorCareService.submitCallBack(window.localStorage.user).then(function(response){
        console.log(response);
				$ionicLoading.hide();
        $rootScope.cc.query="";
				var confirmPopup = $ionicPopup.confirm({
								template: '<center>Someone from DoctorQuick will contact you soon</center>',
								cssClass: 'videoPopup',
								scope: $scope,
								buttons: [
									{
										text: 'OK',
										type: 'button-positive',
										onTap: function(e) {
										console.log('offline');
										$state.go("templates.doctor_home")
										}
									},
								]
							});
      }).catch(function(error){
      console.log('failure data', error);
    });

  };

})
