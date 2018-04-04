DoctorQuickApp.controller('doctorCtrl', function($state, $scope, $rootScope, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage, LoginService, doctorServices) {
console.log(window.localStorage.user);
$scope.userPhone=LoginService.returnUserPhone();

  $scope.getDocDetails=function(){
    $state.go('templates.doc_profile');
  }

$scope.getMyConsultations=function(){
    doctorServices.myConsultedPatients(window.localStorage.user).then(function(response){
      $scope.myPatients=response;//store the response array in doctor details
      console.log($scope.myPatients);

  }).catch(function(error){
    console.log('failure data', error);
  });
}

})
