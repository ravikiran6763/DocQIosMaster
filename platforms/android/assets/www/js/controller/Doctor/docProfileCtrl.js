DoctorQuickApp.controller('docProfileCtrl', function($scope,$rootScope,$state, $ionicConfig, $timeout, $window, $localStorage, $ionicLoading,$cordovaSocialSharing, doctorServices,rateDoctorServices,urlShortener) {

  $scope.toggle = true;
	$rootScope.headerTxt="Profile";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
  $rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
  $rootScope.inviteButton = false;


  console.log($state.$current.name);


  $scope.userDoctor = angular.fromJson($window.localStorage['doctorDetails']);
  $scope.getStars = function(rating) {
    // Get the value
    var val = parseFloat(rating);
    // Turn value into number/100
    var size = val/5*100;
    return size + '%';
  }
  console.log($scope.userDoctor);
	 $scope.$watch('toggle', function(){
			 $scope.toggleText = $scope.toggle ? 'Accept!' : 'Accepted';
	 });
// console.log(window.localStorage.user);
   rateDoctorServices.getDocRatingsByAll(window.localStorage.user).then(function(response){
   $scope.myDoctorRatings=response;//store the response array in doctor details
  //  console.log($scope.myDoctorRatings);
   $scope.ratings = [{
          current: $scope.myDoctorRatings,
          max: 5
      }, ];

   }).catch(function(error){
   console.log('failure data', error);
   });

   $scope.changeDocEmail=function(){
     $state.go('templates.changeEmail_doctor');
   }


   doctorServices.doctorEmailVerification(window.localStorage.user).then(function(response){
     $rootScope.email=response;
     if($rootScope.email == 1){
       $rootScope.emailVerified = false;
       $rootScope.Verified = false;

     }
     if($rootScope.email == 2){
       $rootScope.emailVerified = true;
       $rootScope.Verified = true;

     }

     $ionicLoading.hide();
     console.log($scope.email);

   }).catch(function(error){
   console.log('failure data', error);
   })

})
