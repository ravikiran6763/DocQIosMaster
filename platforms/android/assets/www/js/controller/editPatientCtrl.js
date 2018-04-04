DoctorQuickApp.controller('editPatientCtrl', function($state, $scope,$stateParams,  $cordovaDatePicker, $rootScope, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage,$filter, LoginService, medicalSpecialityService) {
  $scope.toggle = true;
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.headerTxt="Edit Patient";
  $rootScope.hideSideMenu = true;

  window.localStorage.newPatientVal=0;
  console.log(window.localStorage.newPatientVal);
  $rootScope.dateOfBirth='';
  var ipObj2 = {
      callback: function (val) {  //Mandatory
        $scope.currentDate = new Date();
        console.log($scope.currentDate);
        console.log('Selected To Date : ' + val, new Date(val));

    $rootScope.editPatient.newPatientDOB = $filter('date')(new Date(val),'yyyy-MM-dd');

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
            $rootScope.editPatient.newPatientDOB =date;

        });


    // ionicDatePicker.openDatePicker(ipObj2);
  };

  $rootScope.editNewPatient=function(newdata){
    console.log(newdata.newPatientDOB);
    console.log(newdata.newPatientFname);
    console.log(newdata.newPatientLname);
    if(!newdata.newPatientFname){
      // alert('lname missed');
      $rootScope.loginDatasubmitted=true;
    }

    else if(!newdata.newPatientLname){
      // alert('lname missed');
      $rootScope.loginDatasubmitted=true;
    }

    else if(!newdata.newPatientDOB){
      alert('fill dob');
    }
    else{
      medicalSpecialityService.editNewPatient(newdata).then(function(response){
         console.log('saved', response);
         if(response){
           window.plugins.toast.showWithOptions({
             message: "Patient updated successfully",
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
         // $state.go("app.subPatientList");
         $rootScope.newPatient={};
      }).catch(function(error){
          console.log('failure data', error);
      });
    }

  }

})
