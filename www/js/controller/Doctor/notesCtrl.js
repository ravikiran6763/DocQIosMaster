
DoctorQuickApp.controller('notesCtrl', function($scope,$state,$window,$rootScope,$localStorage,$ionicConfig,$ionicLoading,$stateParams,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,patientProfileDetailsService,doctorServices,medicalSpecialityService) {

  $scope.toggle = true;
	$rootScope.showBackBtn=false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.inviteButton = false;

  $scope.deviceAndroid = ionic.Platform.isAndroid();
  if($scope.deviceAndroid === false){
    window.localStorage.sendPrescTo='';
  }
  console.log(window.localStorage.subPatientId);
  console.log(window.localStorage.patientNum);

console.log("inNotesCOntoller:",$state.$current.name);
if($state.$current.name === 'templates.prescription'){
    $rootScope.headerTxt="Notes";
    $rootScope.hideSideMenu = false;
    $scope.currentPatient={};
    // $window.location.reload();
    // $scope.newpatientAdded=doctorServices.getNewPatient();
    // console.log($rootScope.newpatientAdded);

    $rootScope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
    console.log($rootScope.currentPatient);
    window.localStorage.patientToDisplay=$rootScope.currentPatient.patientNum;
    $rootScope.patientFname=$scope.currentPatient.patientFname;
    $rootScope.patientLname=$scope.currentPatient.patientLname;
    $rootScope.patientAge=$scope.currentPatient.patientAge;
    $rootScope.patientSex=$scope.currentPatient.patientSex;
    $rootScope.patientImage=$scope.currentPatient.image;
    $rootScope.dateAndTime=$scope.currentPatient.requestedTime;
    $rootScope.reqId=$scope.currentPatient.id;
    $rootScope.patientNum=$scope.currentPatient.patientNum;
    $rootScope.subPatientId=$scope.currentPatient.subPatientId;

    window.localStorage.reqPat = $stateParams.reqPat;

    var patientToDisplay =window.localStorage.patientToDisplay;
    var subPatientToShow ={
      subPatId:window.localStorage.subPatientId,
      mainPatient:window.localStorage.patientNum
    }
    console.log(subPatientToShow);
    medicalSpecialityService.selectSubPatient(subPatientToShow).then(function(response){
       $rootScope.subPatientDetails=response;
       console.log($rootScope.subPatientDetails);
       console.log($rootScope.subPatientDetails.length);
       if($rootScope.subPatientDetails.length == 0){
         console.log('hide');
         $rootScope.defaultPatient=false;
         $rootScope.shownewPatient=true;

       }
       else{
         $rootScope.defaultPatient=true;
         $rootScope.shownewPatient=false;
       }
    }).catch(function(error){
        console.log('failure data', error);
    });
    // console.log(patientToDisplay);
    if(!patientToDisplay){
      patientProfileDetailsService.fetchPatient($stateParams.reqPat).then(function(response){
        $scope.patient_details=response;
        console.log($scope.patient_details.subPatientId);
        $ionicLoading.hide();
      }).catch(function(error){
        console.log('failure data', error);
      })
    }
    else{
      console.log('from localStorage',$rootScope.currentPatient.patientNum);
      window.localStorage.patientToDisplay=window.localStorage.currentPatientPush;
      patientProfileDetailsService.fetchPatient(window.localStorage.currentPatientPush).then(function(response){
        $scope.patient_details=response;
        console.log($scope.patient_details);
        $ionicLoading.hide();
      }).catch(function(error){
        console.log('failure data', error);
      })
    }

    $ionicLoading.show();


}

else {
  $rootScope.headerTxt="Prescription";
  $rootScope.hideSideMenu = true;
  window.localStorage.activePatient=$stateParams.reqPat;
  $scope.subPatient='';
  window.localStorage.showConnecting =false;
  // $scope.newpatientAdded=doctorServices.getNewPatient();
  // $scope.newPatientFname=$scope.newpatientAdded.fname;
  // $scope.newPatientLname=$scope.newpatientAdded.lname;
  //
  // console.log($scope.newpatientAdded.fname);
  // console.log($scope.newpatientAdded.lname);
  $scope.selectedPatient=function(id){
    console.log(id);
    console.log('selected patient',$scope.subPatient.id);
  }
  medicalSpecialityService.getSubPatients($stateParams.reqPat)
   .then(function(response){
     $scope.subPatients = response;
     console.log($scope.subPatients);
   }).catch(function(error){
      console.log('failure data', error);
   });

  patientProfileDetailsService.fetchPatient($stateParams.reqPat).then(function(response){
    $scope.patient_details=response;
    console.log($scope.patient_details);
    $ionicLoading.hide();
  }).catch(function(error){
    console.log('failure data', error);
  })
}



})
