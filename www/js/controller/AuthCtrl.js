DoctorQuickApp.controller('AuthCtrl', function($scope,$ionicScrollDelegate,$cordovaDatePicker,$interval, $state,$ionicConfig,$ionicHistory,$base64,$window, $cordovaToast, $timeout, $rootScope, $ionicPlatform, $localStorage, $ionicModal, $http, $ionicPopup, $ionicLoading,$filter, patientRegistrationService, doctorRegistrationService,LoginService,patientProfileDetailsService,searchDoctorServices,medicalSpecialityService) {

    $rootScope.showBackBtn=false;
    $rootScope.PatientDetail = {};
    $rootScope.PatientDetail2 = {};

    $rootScope.Doctor = {};
    $rootScope.PatientDetail = {};
    $scope.Doctor = {};
    $rootScope.dateOfBirth='';
    $scope.submitted = false;

    $scope.deviceAndroid = ionic.Platform.isAndroid();
    // alert($scope.deviceAndroid);
    $scope.devicePlatform = ionic.Platform.isIOS();
    console.log($ionicHistory.currentStateName());

    $ionicConfig.views.swipeBackEnabled(false);

    medicalSpecialityService.getMedicalSpecialist().then(function(response){
        console.log('successfull data', response);
        $scope.specialitiesList = response;
        window.localStorage['specialitiesList'] = angular.toJson(response);
     }).catch(function(error){
         console.log('failure data', error);
     });

     searchDoctorServices.specialitySearch().then(function(response){
       window.localStorage['specialityList1'] = angular.toJson(response);
       // console.log(window.localStorage['specialityList1']);
     }).catch(function(error){
     console.log('failure data', error);
     });

     searchDoctorServices.getLanguages().then(function(response){
       window.localStorage['languages'] = angular.toJson(response);
       // console.log(window.localStorage['languages']);
     }).catch(function(error){
     console.log('failure data', error);
     });


$ionicScrollDelegate.$getByHandle('nomineeDiv').scrollBy(500,100,true);

    ionic.Platform.ready(function(){
        // will execute when device is ready, or immediately if the device is already ready.
        if($scope.deviceAndroid){
          console.log('ready');
          // StatusBar.hide();
        }

      });


$scope.sendForm = function($event,form)
{
     $event.preventDefault()
     $scope.submitted = true

};


console.log(window.localStorage.doctororpatient);


//Validate  Doctor

//patient Registration forms.

  $scope.registerPatient=function()
  {
      console.log($scope.loginDatasubmitted);
      var patientDetails = {};
      $rootScope.loginDatasubmitted=false;
      console.log($scope.loginDatasubmitted);
      $state.go('auth.patient_reg1', {}, {reload: true});
  }

  $scope.goToPatientReg2 = function ()
  {
      $state.go('auth.patient_reg2');
  }
  $rootScope.otp = "";
  $scope.goToNextView = function ()
  {

      $scope.phoneno = $rootScope.PatientDetail.patient_mob;
        patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
        {
            $rootScope.otp=response;
          console.log($rootScope.otp);
          })
          .catch(function(error)
          {
              console.log('failure data', error);
          });

      $state.go('auth.patient_reg3');
  }

  $scope.backView = function()
  {
    window.history.go(-1);
  }
  $scope.resendOtp = function()
  {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner><br>Resending OTP'
    });
    patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
    {
      $rootScope.otpentered = {};
        $rootScope.otp=response;
        console.log($rootScope.otp);
        if($rootScope.otp){
          $ionicLoading.hide();
          window.plugins.toast.showWithOptions({
          message: "OTP has been sent to your mobile number",
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
      })
      .catch(function(error)
      {
          console.log('failure data', error);
      });
  }

    $rootScope.otpentered = {};


$scope.patientRegistration = function()
{
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner><br><br><br>Logging into DoctorQuick'
  });
        console.log('reg clicked');
        console.log($rootScope.otp);
        if($rootScope.otpentered.OTP1 === undefined && $rootScope.otpentered.OTP2 === undefined && $rootScope.otpentered.OTP3 === undefined && $rootScope.otpentered.OTP4 === undefined)
        {
            $ionicLoading.hide();
            window.plugins.toast.showWithOptions({
                message: "Valid OTP must be entered",
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
        else if($rootScope.otpentered.OTP1 === $rootScope.otp[0] && $rootScope.otpentered.OTP2 ===  $rootScope.otp[1] && $rootScope.otpentered.OTP3 === $rootScope.otp[2] && $rootScope.otpentered.OTP4 === $rootScope.otp[3])
        {

              patientDetails=
                {
                  pateientFname : $rootScope.PatientDetail.patient_fname,
                  pateientMname : $rootScope.PatientDetail.patient_mname,
                  pateientLname:$rootScope.PatientDetail.patient_lname,
                  pateientAge :$rootScope.PatientDetail.patient_age,
                  pateientPhone:$rootScope.PatientDetail.patient_mob,
                  pateientEmail:$rootScope.PatientDetail.pat_email,
                  pateientSex:$rootScope.PatientDetail.gender,
                  pateientPwd:$rootScope.PatientDetail.pat_password,
                  patientImage:$rootScope.imageData,
                  deviceID:window.localStorage.deviceID,
                  serial:window.localStorage.serial

                };
                var loginData = {
                  'phone': $rootScope.PatientDetail.patient_mob,
                  'password': $rootScope.PatientDetail.pat_password
                };
                console.log(loginData);
                window.localStorage.user=$rootScope.PatientDetail.patient_mob;
                window.localStorage.pass=$rootScope.PatientDetail.pat_password;
                window.localStorage.doctororpatient='patient'
                console.log(patientDetails);
          patientRegistrationService.patientRegistrationDone(patientDetails).then(function(response)
          {

            console.log(response);
            if(response){

              window.plugins.OneSignal.getIds(function(ids) {
                $scope.playerId=JSON.stringify(ids['userId']);
                // console.log($scope.playerId);
                var updatePlayer ={
                  palyerId:$scope.playerId,
                  userNum:window.localStorage.user,
                  user:'patient'
                }
                console.log(updatePlayer);
                LoginService.updatePlayer(updatePlayer).then(function(response){
                  console.log(response);
                })
              });

              patientProfileDetailsService.fetchPatient($rootScope.PatientDetail.patient_mob).then(function(response){
  							window.localStorage['patientDetails'] = angular.toJson(response);
  						}).catch(function(error){
  						console.log('failure data', error);
  						})

              patientProfileDetailsService.fetchPatientImage($rootScope.PatientDetail.patient_mob).then(function(response){
  							console.log(response);
  							window.localStorage['patientProfileImage'] = angular.toJson(response);
  						}).catch(function(error){
  						console.log('failure data', error);
  						})

  						searchDoctorServices.specialitySearch().then(function(response){
  							window.localStorage['specialityList1'] = angular.toJson(response);
  							// console.log(window.localStorage['specialityList1']);
  						}).catch(function(error){
  						console.log('failure data', error);
  						});

  						searchDoctorServices.getLanguages().then(function(response){
  							window.localStorage['languages'] = angular.toJson(response);
  							// console.log(window.localStorage['languages']);
  						}).catch(function(error){
  						console.log('failure data', error);
  						});

              medicalSpecialityService.getMedicalSpecialist().then(function(response){
                  console.log('successfull data', response);
                  $scope.specialitiesList = response;
                  window.localStorage['specialitiesList'] = angular.toJson(response);
               }).catch(function(error){
                   console.log('failure data', error);
               });

              $rootScope.dateOfBirth='';
              $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
              });
              $scope.submitted = false;
              $scope.submitted2ndPage = false;
              $rootScope.loginDatasubmitted=false;

              // $ionicLoading.show({
              //   template:'<ion-spinner></ion-spinner><br><br><br>Logging into DoctorQuick'
              // });
              var uname1 = "greet+"+$rootScope.PatientDetail.patient_mob;
  						var pw1 = "DQ_patient";
              var success = function(message)
              {
                // console.log(message);

                $ionicLoading.hide().then(function(){
                  console.log("The loading indicator is now hidden");
                  $rootScope.PatientDetail={};

                  $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true,
                    historyRoot:true
                  });
                  $state.go('app.patient_home', {}, {location: "replace", reload: true});

                });
                $timeout( function(){
                console.log('interval started');
                $interval(checkNewMessages,2000);
                }, 5000 );
              }

              var failure = function()
              {

                alert("Error Occurred While Loggin in to DoctoQuick");

              }
              // $ionicHistory.nextViewOptions({
              //   disableAnimate: true,
              //   disableBack: true,
              //   historyRoot:true
              // });
              // $state.go('app.patient_home', {}, {location: "replace", reload: true});

            hello.login(uname1,pw1,success, failure);

            var username = "greet+"+$rootScope.PatientDetail.patient_mob;
            var password = "DQ_patient";
            $rootScope.unreadchatforpatient = 0;

            function checkNewMessages()
            {
                var success = function(message)
                {
                  $rootScope.unreadchatforpatient = message;
                  console.log($rootScope.unreadchatforpatient);
                }

                var failure = function()
                {
                  console.log("Error calling Hello Plugin");
                  //console.log(‘error’);

                }
                  hello.unreadchatfromusers(username,password,success, failure);
            }
            // var details = {
            //   'phone': $rootScope.PatientDetail.patient_mob,
            //   'password': $rootScope.PatientDetail.pat_password
            // }
            // console.log(details);
            //   $state.go('auth.loginNew', {userPhone:$rootScope.PatientDetail.patient_mob,userPassword:$rootScope.PatientDetail.pat_password}, {location: "replace", reload: true});

            }
            else{
              // $state.go('app.patient_home');
              // $rootScope.PatientDetail =  {};
              /*
              showShortTop(message)
              showShortCenter(message)
              showShortBottom(message)
              showLongTop(message)
              showLongCenter(message)
              showLongBottom(message)
              showWithOptions(options)
              */

            }

          })
          .catch(function(error)
          {
              console.log('failure data', error);
          });
        }
        else
        {
              // alert('Incorrect OTP');
              $ionicLoading.hide();
              window.plugins.toast.showWithOptions({
                message: "Valid code must be entered",
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
        			// $timeout(function() {
        		  //    $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
        		  // }, 1000);
              // $cordovaToast.showLongBottom('Valid code must be entered tap on Resend to receive a code again.', 'short', 'center').then(function(success) {
              // // success
              // }, function (error) {
              // // error
              // });
        }

}

    $rootScope.validInput=true;
    $scope.validateUser=function(isFormValid){

      $rootScope.validInput=false;
      $scope.validForm =isFormValid;
      $scope.submitted = true;
      $scope.currentDate = new Date();
      console.log($scope.currentDate);
      console.log($rootScope.dateOfBirth);
      console.log($rootScope.PatientDetail.dob);

      var date2 = new Date();
      var date1 = new Date($rootScope.dateOfBirth);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // return $scope.dayDifference;
      console.log($scope.dayDifference);
      // if($scope.dayDifference < 6570){
      //
      //   alert('you should be 18+')
      //
      // }

      // console.log($rootScope.PatientDetail);
      if(isFormValid) {
        console.log(isFormValid);

///this is for calender

        if($rootScope.dateOfBirth === '' || $scope.dayDifference < 6570){
          $scope.submittedAge = true;
          window.plugins.toast.showWithOptions({
          message: "You should be 18+ to use DoctorQuick",
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
          $rootScope.PatientDetail.patient_age=$rootScope.dateOfBirth;
          $state.go('auth.patient_reg2');
        }
        // $state.go('auth.patient_reg2');

      }

    }

    $rootScope.validInput=true;
  $scope.validateUser1=function(isForm1Valid){

    console.log('clicked');
    $rootScope.validInput=false;
    $scope.submitted2ndPage = true;
    // console.log($rootScope.PatientDetail.patient_mob);
    $rootScope.otpentered = {};
    if(!$rootScope.PatientDetail.patient_mob){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      $scope.submittedMob = true;
      console.log($rootScope.PatientDetail.patient_mob);

    }
    else if(!$rootScope.PatientDetail.gender){
      $scope.submittedSex = true;

    }
    else if(!$rootScope.PatientDetail.pat_email){
      $scope.submittedMail = true;

    }
    else if(!$rootScope.PatientDetail.pat_password){
      $scope.submittedPwd = true;
      window.plugins.toast.showWithOptions({
        message: "Valid 4 digit password must be entered",
        duration: "short", // 2000 ms
        position: "bottom",
        styling: {
        opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
        textColor: '#ffffff', // Ditto. Default #FFFFFF
        textSize: 13, // Default is approx. 13.
        cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
        horizontalPadding: 16, // iOS default 16, Android default 50
        verticalPadding: 12 // iOS default 12, Android default 30
        }
      });

    }
    else{
      console.log('validated');
    }

    if(isForm1Valid) {
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'
      })
      // console.log($rootScope.PatientDetail.pat_password.length());
      if($scope.firstNum < 6){
        $ionicLoading.hide();
        console.log($scope.firstNum);
        window.plugins.toast.showWithOptions({
        message: "Enter a Valid 10 digit phone number",
        duration: "short", // 2000 ms
        position: "bottom",
        styling: {
        opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
        textColor: '#ffffff', // Ditto. Default #FFFFFF
        textSize: 13, // Default is approx. 13.
        cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
        horizontalPadding: 16, // iOS default 16, Android default 50
        verticalPadding: 12 // iOS default 12, Android default 30
        }
        });
      }
      else{
        //check for existing patient
          var checkDeviceReg={
            user:$rootScope.PatientDetail.patient_mob,
            deviceID:window.localStorage.deviceID,
            serial:window.localStorage.serial
          }
          console.log(checkDeviceReg);
          patientRegistrationService.existingPatient(checkDeviceReg).then(function(response)
          {
            $scope.patientExist=response;
            console.log($scope.patientExist);
                if($scope.patientExist === 'patient'){
                  $ionicLoading.hide();
                    $scope.myPopup=$ionicPopup.show({
                      // title: '',
                      template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Mobile Number Already Registered<br>Tap on <a ui-sref="auth.getPassword" ng-click=closethis()>Forgot Password</a> to get your password instantly on your registered mobile number</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',

                      cssClass: 'loginPopup',
                      scope: $scope,
                                });
                    $scope.closethis = function()
                    {
                    $scope.myPopup.close();
                    $window.localStorage.clear();
                    // $state.go('auth.loginNew');

                  };
                }
                else{
                      $scope.phoneno = $rootScope.PatientDetail.patient_mob;

                      patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
                      {
                            $rootScope.otp=response;
                            console.log($rootScope.otp);
                            if($rootScope.otp){
                            $ionicLoading.hide();
                            $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true,
                            historyRoot: true

                            });
                            $state.go('auth.patient_reg3');
                            }
                      }).catch(function(error)
                      {
                        console.log('failure data', error);
                      });

                }
          })
          .catch(function(error)
          {
            console.log('failure data', error);
          });

        }
      }

    }

    $scope.validateDoctor=function(isDocFormValid){
      console.log('isDocFormValid ', isDocFormValid)
    console.log($rootScope.Doctor);
      console.log('clicked');


      if(!$scope.Doctor.doc_fname){
        // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
        $scope.submitted = true;
        //
        // $cordovaToast.showLongCenter('Valid Name be entered', 'short', 'center').then(function(success){
        // // success
        // }, function (error) {
        // // error
        // });
      }
      else if(!$scope.Doctor.doc_lname){
        // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
        $scope.submittedLname = true;

        // $cordovaToast.showLongCenter('Valid Name be entered', 'short', 'center').then(function(success){
        // // success
        // }, function (error) {
        // // error
        // });
      }
      else{
        console.log('validated');
      }

      if(isDocFormValid) {
        console.log($scope.Doctor);
        // console.log('isDocFormValid ', isDocFormValid)
        $state.go('auth.doctorRegistration2');
      }

      // $state.go('auth.patient_reg2');
    }

  $scope.doctorRegistration = function(isDocForm1Valid)
  {
    console.log('clicked');
    console.log('isDocForm1Valid ', isDocForm1Valid)

    if(!$scope.Doctor.doc_email){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      console.log('enter mail');
      $scope.submittedMail = true;
      console.log($scope.Doctor.doc_email);

      // window.plugins.toast.showWithOptions({
      // message: "Valid email must be entered",
      // duration: "short", // 2000 ms
      // position: "bottom",
      // styling: {
      // opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      // backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
      // textColor: '#ffffff', // Ditto. Default #FFFFFF
      // textSize: 13, // Default is approx. 13.
      // cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      // horizontalPadding: 16, // iOS default 16, Android default 50
      // verticalPadding: 12 // iOS default 12, Android default 30
      // }
      // });

    }
    else if(!$scope.Doctor.doc_phone){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      console.log('enter mail');
      $scope.submittedMob = true;
      console.log($scope.Doctor.doc_phone);

      // window.plugins.toast.showWithOptions({
      //     message: "Valid phone number must be entered",
      //     duration: "short", // 2000 ms
      //     position: "bottom",
      //     styling: {
      //     opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      //     backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
      //     textColor: '#ffffff', // Ditto. Default #FFFFFF
      //     textSize: 13, // Default is approx. 13.
      //     cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      //     horizontalPadding: 16, // iOS default 16, Android default 50
      //     verticalPadding: 12 // iOS default 12, Android default 30
      //     }
      // });

    }

    else{
      console.log('2nd form validated');
      var doctorDetails={
        doctorFname : $scope.Doctor.doc_fname,
        doctorMname : $scope.Doctor.doc_mname,
        doctorLname:$scope.Doctor.doc_lname,
        doctorEmail:$scope.Doctor.doc_email,
        doctorPhone:$scope.Doctor.doc_phone
      };

      doctorRegistrationService.doctorRegistrationDone(doctorDetails).then(function(response){
        console.log(response);
        if(response == 'ERROR'){
          console.log("doctor Already Exist");
          //Alert Popup goes healthcare

          $scope.myPopup = $ionicPopup.show({
          // title: 'Invalid Credentials',
          cssClass: 'requestPopup',
          template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Please wait someone from DoctorQuick will call you shortly to help you with registration.</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
          scope: $scope,
          buttons: [
          {
          text: 'OK',
          type: 'button-royal',
          onTap:function(){
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $window.localStorage.clear();
          }
          },
          ]


          });
          $scope.closethis = function()
          {
            $scope.myPopup.close();
          };


        }
        else if(response == 'Exist'){
          $scope.myPopup=$ionicPopup.show({
            // title: '',
            template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Mobile Number Already Registered<br>Tap on <a ui-sref="auth.getPassword" ng-click=closethis()>Forgot Password</a> to get your password instantly on your registered mobile number</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',

            cssClass: 'loginPopup',
            scope: $scope,
                      });
          $scope.closethis = function()
          {
          $scope.myPopup.close();
          $window.localStorage.clear();
          // $state.go('auth.loginNew');

          };
        }
        else{

          $scope.regDoc=doctorDetails;
          console.log($scope.regDoc);
          var showDoc= $ionicPopup.show({
            scope: $scope,
            template: "<style>.button{background-color:#648c39;} .popup-buttons{padding:0; min-height:0;} .popup-body { padding: 10px; overflow: scroll; text-align: center; font-family: Ubuntu,bold,sans-serif !important;	 } </style>"+
                        "<body ><p >Thank you for registering <br/> Dr. {{regDoc.doctorFname}} {{regDoc.doctorMname}} {{regDoc.doctorLname}}<br/><br/> Someone from DoctorQuick will call you soon to help you with your Signup.<p/></body>",
            // title: 'Thank You',
            cssClass: 'videoPopup',
            buttons: [

             {
               text: 'Close',
               type: 'button-positive',
               onTap: function() {
                 console.log('Doctor Registered Successfully');
                 $state.go('auth.loginNew');

               }
             }
            ]
          });
        }
        $scope.Doctor = {};
      }).catch(function(error){
        console.log('failure data', error);

      });
    }



  }

  $scope.termsAndCond=function(){
    // console.log('clicked');
    $ionicLoading.show();
    $scope.termsPopup = $ionicPopup.show({
      title: 'Terms Of Use',
      templateUrl: "views/auth/terms.html",
      cssClass: 'termsPopup',
      scope: $scope,
    });

    $scope.closethis = function()
    {
    $scope.termsPopup.close();
    };
      $ionicLoading.hide();
  }

  //video popoverOptions

  $scope.playVideo = function() {
  $ionicLoading.show();
  $scope.videoPlayerPopup = $ionicPopup.show({
    // title: 'DoctorQuick',
    template: '<div ><p style="color:#fcfff4; margin: -21px 0 0 15px; "></div><div style="position: absolute; margin-top: 0px; margin-bottom: 0; top: 23px;left: 95%; border-radius: 22px; font-size: 4vw; color: teal; text-align: center; padding: 0px; background-color: white; width: 5%;font-weight: bolder;color: #777;" ng-controller="doctorScreensCtrl" ng-Click="closethis();">X</div>'+
        '<iframe style="width: 100%; height: 59%; border: 4px solid green; margin-top: 7%;" src="https://www.youtube.com/embed/xrLtb9Pkkjg?rel=0&amp;showinfo=0" frameborder="0"  autoplay></iframe>',
    // template:'test',
    cssClass: 'videoPlayerPopup',
    scope: $scope,

  });

  $ionicLoading.hide();
  $scope.closethis = function()
  {
  $scope.videoPlayerPopup.close();
  };
}

var currentTime = new Date()

// returns the month (from 0 to 11)
var month = currentTime.getMonth() ;
$rootScope.currentMonth= month;
// returns the day of the month (from 1 to 31)
var day = currentTime.getDate();
$rootScope.currentDay= day;


// returns the year (four digits)
var year = currentTime.getFullYear();
$rootScope.currentYear= year;


$rootScope.dateOfBirth='';
var ipObj2 = {
    callback: function (val) {  //Mandatory
      $scope.currentDate = new Date();
      console.log($scope.currentDate);
      console.log('Selected To Date : ' + val, new Date(val));

      $rootScope.dateOfBirth = $filter('date')(new Date(val),'yyyy-MM-dd');

    },

    from: new Date(1950, 1, 1), //Optional
    to: new Date($rootScope.currentYear, $rootScope.currentMonth, $rootScope.currentDay), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: false,          //Optional
    // disableWeekdays: [0],       //Optional
    closeOnSelect: true,
    dateFormat: 'dd MMMM yyyy',     //Optional
    // templateType: 'Modal'       //Optional
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
      });
};

})
