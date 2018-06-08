DoctorQuickApp.controller('patientpaymentCtrl', function($scope, $ionicConfig, $rootScope, $localStorage,$ionicPopup,$ionicLoading,  $window, $ionicSideMenuDelegate, LoginService, patientWalletServices) {

console.log(window.localStorage.user);
  $rootScope.headerTxt="Payments";
  $rootScope.showBackBtn=true;
  $rootScope.checkedValue = false;
  $rootScope.showNotification=false;
  $rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

$ionicLoading.show({
  template:'<ion-spinner></ion-spinner>',
  showBackdrop:true
})

$scope.patientWalletdetails = angular.fromJson($window.localStorage['patientWalletdetails']);

  patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
    console.log(response);
   // $rootScope.patientWalletdetails=response;
   if(response){
     window.localStorage['patientWalletdetails'] = angular.toJson(response);
     $scope.patientWalletdetails = angular.fromJson($window.localStorage['patientWalletdetails']);
   }

   console.log($rootScope.patientWalletdetails);
   }).catch(function(error){
     console.log('failure data', error);
   });

   patientWalletServices.claimFreeConsultation(window.localStorage.user).then(function(response){
    $rootScope.freeDetails=response;
    if($rootScope.freeDetails == "Claimed"){
      var confirmPopup = $ionicPopup.confirm({
        template: '<center>Free consultation for this device <br>has been already claimed with another phone number.<br>A deposit is required to continue with consultations.<br>Contact Customer Care for Help.</center>',
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
    }
    console.log($rootScope.freeDetails);
    }).catch(function(error){
      console.log('failure data', error);
    });

   patientWalletServices.paidToDoctors(window.localStorage.user).then(function(response){
    $rootScope.doctorsList=response;
    if($rootScope.doctorsList){
      $ionicLoading.hide();

    }
    console.log('Consulted Doctors:',$rootScope.doctorsList);
    }).catch(function(error){
      console.log('failure data', error);
    });

   $scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);

})
