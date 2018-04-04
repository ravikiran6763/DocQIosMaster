DoctorQuickApp.controller('addNewPatientCtrl', function($state,$ionicLoading,$ionicHistory, $scope,$stateParams,$window,$cordovaDatePicker, $rootScope,$filter, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage, LoginService, medicalSpecialityService) {
  $scope.toggle = true;
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.headerTxt="Select Patient";
  $rootScope.hideSideMenu = true;


console.log("inNotesCOntoller:",$state.$current.name);
if($state.$current.name === 'app.addSubPatient'){
  $rootScope.headerTxt="Add Patient";

}

$scope.defaultPatient = angular.fromJson($window.localStorage['patientDetails']);
console.log($scope.defaultPatient);
  $rootScope.editNewPatient=function(sub){
    $rootScope.editPatient=sub;
    console.log($rootScope.editPatient);
    console.log($rootScope.editPatient.newPatientDOB);
    //
    //
    // $ionicHistory.nextViewOptions({
    //     disableBack: true,
    //     disableAnimate: true,
    //     historyRoot: true
    // });
    $state.go("app.editPatient");

  }

  $rootScope.deleteNewPatient=function(sub){

    var confirmPopup = $ionicPopup.confirm({
      template: '<center>Are you sure you want to delete the patient?</center>',
      cssClass: 'videoPopup',
      scope: $scope,
      buttons: [

        {
          text: 'Cancel',
          type: 'button-positive',
          onTap: function(e) {
          console.log('ok');

          }
        },
        {
          text: 'Delete',
          type: 'button-royal',
          onTap: function(e) {
            medicalSpecialityService.deletePatient(sub).then(function(response){
               console.log('saved', response);
               if(response){
                 $state.reload()
               }
            }).catch(function(error){
                console.log('failure data', error);
            });

          }
        },
      ]
    });
    console.log(sub);
    // console.log('app.editPatient',{id:$scope.subPAtientDetails.id});

  }
  $rootScope.selectSubPatient=function(id){
    window.localStorage.selectedSubPatient=id;
    console.log(id);
    console.log('selected');
    window.history.back();
    // $state.go("app.specialityDetailsNew");
  }
$rootScope.loginDatasubmitted=false;
  $rootScope.savePatient=function(){
    $ionicLoading.show({
      template:'<ion-spinner><ion-spinner>'
    })

    // alert('add new patient');
    $rootScope.addedPatient=$rootScope.newPatient.fname+" "+$rootScope.newPatient.lname;
    $rootScope.newPatient.dob=$rootScope.dateOfBirth;
    if($rootScope.newPatient.fname && $rootScope.newPatient.lname && $rootScope.newPatient.dob  && $rootScope.newPatient.sex){
      var patientAdded={
        fname:$rootScope.newPatient.fname,
        lname:$rootScope.newPatient.lname,
        dob:$rootScope.newPatient.dob,
        sex:$rootScope.newPatient.sex,
        addedBy:window.localStorage.user
      }
      console.log(patientAdded);

      medicalSpecialityService.savePatient(patientAdded).then(function(response){
         console.log('saved', response);
         if(response){
           $ionicLoading.hide();
           $rootScope.loginDatasubmitted=false;
           $rootScope.newPatient.dob='';
           patientAdded={};
           $state.reload();

           // $state.go("app.subPatientList");
           window.plugins.toast.showWithOptions({
             message: "New patient added",
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
         $rootScope.newPatient={};
         console.log(patientAdded);
      }).catch(function(error){
          console.log('failure data', error);
      });

    }
    else{
      $ionicLoading.hide();
      if(!$rootScope.newPatient.fname ){
          $rootScope.loginDatasubmitted=true;
      }
      else if(!$rootScope.newPatient.lname){
          $rootScope.loginDatasubmitted=true;
      }
      else if(!$rootScope.newPatient.dob){
          $ionicLoading.hide();
          window.plugins.toast.showWithOptions({
          message: "Please fill DOB",
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
      else if(!$rootScope.newPatient.sex){
        $ionicLoading.hide();
        window.plugins.toast.showWithOptions({
          message: "Please select Gender",
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
        // #donothing
      }
      console.log("nodata");
    }
  }
  medicalSpecialityService.getSubPatients(window.localStorage.user)
   .then(function(response){
     $scope.subPatients = response;
     window.localStorage['subPatients'] = angular.toJson(response);
     console.log($scope.subPatients);
   }).catch(function(error){
      console.log('failure data', error);
   });

   $rootScope.dateOfBirth='';
   var ipObj2 = {
       callback: function (val) {  //Mandatory
         $scope.currentDate = new Date();
         console.log($scope.currentDate);
         console.log('Selected To Date : ' + val, new Date(val));

         $rootScope.dateOfBirth = $filter('date')(new Date(val),'yyyy-MM-dd');

       },

       from: new Date(1950, 1, 1), //Optional
       to: new Date(2050, 12, 31), //Optional
       inputDate: new Date(),      //Optional
       mondayFirst: false,          //Optional
       // disableWeekdays: [0],       //Optional
       closeOnSelect: true,
       dateFormat: 'dd MMMM yyyy',     //Optional
       templateType: 'popup'       //Optional
     };


     var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        // minDate: new Date() - 10000,
        // allowOldDates: true,
        allowFutureDates: false,
        androidTheme : 3,
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#ff0101',
        doneButtonLabel: 'DONE',
        doneButtonColor: '#6aa13e'

      };

   $scope.openDatePickerDOB = function(){
     $cordovaDatePicker.show(options).then(function(date){
       $rootScope.dateOfBirth=date;
             console.log(date);
             $rootScope.dateOfBirth =date;
         });
     // ionicDatePicker.openDatePicker(ipObj2);
   };


})
