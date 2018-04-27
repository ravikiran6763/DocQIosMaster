
DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope,$window, $scope, $interval,$ionicHistory, $stateParams,$ionicPopup ,$localStorage, $timeout, $stateParams, $cordovaToast, medicalSpecialityService,$localStorage, $ionicLoading,doctorServices,patientWalletServices) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.hideSideMenu = true;
    $rootScope.showBadge=false;
    $rootScope.showSubPatients=false;
    $rootScope.clickedOnce = false;


// TO CHECK NO OF DOCTORS ONLINE IN VSEE
$scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
console.log($scope.patient_details);
$rootScope.defaultPatientFname=$scope.patient_details[0][0];
$rootScope.defaultPatientLname=$scope.patient_details[0][2];
$rootScope.defaultPatientNum=$scope.patient_details[0][5];


console.log($rootScope.defaultPatientFname);
console.log($rootScope.defaultPatientLname);

// $rootScope.newPAtient=medicalSpecialityService.getNewPatient();

$interval(CheckOnlineDocs, 2000);

var subPatientToShow={
  subPatId:window.localStorage.selectedSubPatient,
  mainPatient:window.localStorage.user
}
console.log(subPatientToShow);
console.log(window.localStorage.selectedSubPatient);

medicalSpecialityService.selectSubPatient(subPatientToShow).then(function(response){
   $rootScope.newPAtient=response;
   console.log($rootScope.newPAtient.length);
   if($rootScope.newPAtient.length == 0){
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
console.log($rootScope.newPatientFname);
  //hello.logininformation(username,password,success, failure);
console.log($rootScope.SpecilityId);
$ionicLoading.show({
  template:'<ion-spinner></ion-spinner>'
})



$scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);
console.log(window.localStorage.SpecilityId);

// var result = JSON.parse(localStorage.getItem("specialitiesList"));
// $scope.specialityDetails = JSON.parse(localStorage.getItem("specialitiesList"))[window.localStorage.SpecilityIndex];
// console.log($scope.specialityDetails);
// console.log($scope.specialitiesList[window.localStorage.SpecilityId]);

  medicalSpecialityService.getMedicalSpeciality(window.localStorage.SpecilityId)
   .then(function(response){
     if(response){
       console.log(response);
       $rootScope.oldDocStatus=response[0]['noofonlinedoctors']
       console.log($rootScope.oldDocStatus);
       var data = response;
       for(var i=0; i<data.length; i++){
         $rootScope.doctorFname=data[i].doctorFname;
       console.log(i);
       }

       window.localStorage['specialityDetails'] = angular.toJson(response);
       $scope.specialityDetails = angular.fromJson($window.localStorage['specialityDetails']);
       console.log($scope.specialityDetails[0][1] );
       $ionicLoading.hide();
     }
      console.log('Details', response);
      $scope.specialityDetails = response;
      $rootScope.showSubPatients=true;
   }).catch(function(error){
       console.log('failure data', error);
   });

  $rootScope.counter = 0;
   $scope.stopped = false;
   $scope.buttonText='Send Request';

   $rootScope.popUpClosed == false;
  $scope.sendrequesttoonlinedoctors = function()
  {

    window.ga.trackEvent('Request', 'Click', 'sendrequesttoonlinedoctors',1)// Label and Value are optional, Value is numeric

    $rootScope.clickedOnce = true;
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner>'
    });
      $interval(checkAcceptedReqDocStatus,2000);
    patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
     $rootScope.patientWalletdetails=response;
     if($rootScope.patientWalletdetails === 'agent'){
       // alert('agent');
       $rootScope.myWalletBal='agent';
     }
     else{
       console.log($rootScope.patientWalletdetails);
       $rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
       $rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

       $rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;

       console.log($rootScope.myWalletBal);
     }

     $rootScope.newPAtient=medicalSpecialityService.getNewPatient();
     console.log($rootScope.newPAtient);
     if($rootScope.myWalletBal >= 270 || $rootScope.myWalletBal === 'agent'){
       console.log(window.localStorage.networkType);
       if(window.localStorage.networkType === '4G' || window.localStorage.networkType === 'WiFi' || window.localStorage.networkType === 'Unknown'){
         console.log(window.localStorage.SpecilityId);

         medicalSpecialityService.sendrequesttodoctor(window.localStorage.SpecilityId).then(function(response){
           console.log('successfull data', response[0][1]);
           $rootScope.sentReqResponse=response;
           $rootScope.sentReqId=$rootScope.sentReqResponse[0];
           $rootScope.sentReqStat=$rootScope.sentReqResponse[1];
           console.log($rootScope.sentReqStat);
           console.log($rootScope.sentReqId);


           if($rootScope.sentReqStat === 'Inserted'){
             $ionicLoading.hide();
            $rootScope.counter = 120;
             $rootScope.onTimeout = function(){
               // console.log($scope.counter);
              $rootScope.counter--;
               patientTimeout = $timeout($rootScope.onTimeout,1000);
               if($scope.counter == 0){
               console.log('one minute over');
               $rootScope.buttonText='Send Request';
               $timeout.cancel(patientTimeout);

               var noResponsePopup = $ionicPopup.alert({
               template: "<div ><p>None of the doctors have accepted your request</p></div>",
               cssClass: 'requestPopup',
               scope: $scope,
               });

               noResponsePopup.then(function(res) {
                 medicalSpecialityService.cancelReq(window.localStorage.user).then(function(response){
                 $scope.cancelledReq=response;
                 // $state.go("app.medical_speciality");
                 $interval.cancel(checkAcceptedReq);
                 $interval.cancel(checkAcceptedReqDocStatus);
                 }).catch(function(error){
                 console.log('failure data', error);
                 });
               });

               $scope.callReqPopUp.close();

               }
             }
          var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer interval
          $scope.$on('$destroy', function(){
          $timeout.cancel(patientTimeout);
          console.log('destroyed');
          });



          $rootScope.buttonText='Request sent' ;
          $scope.callReqPopUp = $ionicPopup.show({
                template: "<div >Your request for a<br>consultation has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
                cssClass: 'requestPopup',
                scope: $scope,
                buttons: [
                {
                text: 'Cancel',
                type: 'button-royal',
                onTap:function(){

                  $interval.cancel(checkAcceptedReq);
                  $interval.cancel(checkAcceptedReqDocStatus);

                  console.log('cancel');
                  console.log($scope.counter);
                  console.log(window.localStorage.user);
                  medicalSpecialityService.cancelReq(window.localStorage.user).then(function(response){
                  $scope.cancelledReq=response;
                    $state.go($state.current, {}, {reload: true});
                  }).catch(function(error){
                  console.log('failure data', error);
                  });
                }
                },
              ]

              });
              $scope.nonePopUp=false;
              var closePopup=function(){
                console.log('cancelCall here');
                medicalSpecialityService.cancelReq(window.localStorage.user).then(function(response){
                $scope.cancelledReq=response;
                $scope.callReqPopUp.close(); //close the popup after 3 seconds for some reason
                 $scope.nonePopUp=true;
                   $interval.cance(checkAcceptedReq);
                  console.log($scope.cancelledReq);
                }).catch(function(error){
                console.log('failure data', error);
                });

              }

              console.log($scope.counter);
              console.log('buttonclicked');
              $interval(checkAcceptedReq,2000);

              var checkAcceptedReq = $interval(function () {
                var newCallStatus = {
                  patient:window.localStorage.user,
                  reqId:$rootScope.sentReqId
                }
                 console.log('intervalStarted');
                 console.log(newCallStatus);
                    medicalSpecialityService.checkForAccptedReq(newCallStatus).then(function(response){
                    $scope.accptdReq=response;
                    console.log($scope.accptdReq);
                      if($scope.accptdReq != ''){
                        console.log($scope.accptdReq);
                        var accptDoc=$scope.accptdReq;
                        for(var i=0; i<accptDoc.length; i++){
                          $rootScope.doctorPhone=accptDoc[i].doctorPhone,
                          $rootScope.callId=accptDoc[i].callId,
                          $rootScope.cal_flag=accptDoc[i].flag,
                          $rootScope.rates=accptDoc[i].ratings,
                          $rootScope.totalRates=accptDoc[i].totalRates
                        }
                        $scope.callReqPopUp.close();

                        setTimeout(function (){
                          console.log('delay 3 sec');
                          $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                          });
                          var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer interval
                          $scope.$on('$destroy', function(){
                          $timeout.cancel(patientTimeout);
                          console.log('destroyed');
                          });
                          $state.go('app.callAccepted',{accptdDoc:$rootScope.doctorPhone,callId:$rootScope.callId,callFlag:$rootScope.cal_flag,rates:$rootScope.rates,totalRates:$rootScope.totalRates},{location: "replace", reload: false});
                          console.log('show accpted doc profile');
                            $interval.cancel(checkAcceptedReq);
                        }, 1000);

                      }

                    }).catch(function(error){
                    console.log('failure data', error);
                    });

               }, 2000);

           }
          else{
              console.log('Database Error');
          }
          }).catch(function(error){
              console.log('failure data', error);
          });
          /*Start timers*/
       }
       else{

             $ionicLoading.show({
               template: 'Sending request',
               duration: 5000
             });
             $timeout( function(){
               var confirmPopup = $ionicPopup.confirm({
                 // title: 'Slow Data',
                 template: 'Unable to send request at the moment as we detected slow network on your device. Please try after sometime ',
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
             }, 5000 );

       }
     }
     else{
              $ionicLoading.hide();
               var confirmPopup = $ionicPopup.confirm({
           						// title: 'Low Balance',
           						template: '<center>Your request could not be processed as your DoctorQuick deposit is less than ₹270.</center> ',
           						cssClass: 'videoPopup',
           						scope: $scope,
           						buttons: [
                        {
           								text: 'Cancel',
           								type: 'button-royal',
           								onTap: function(e) {
                            $ionicHistory.nextViewOptions({
                              disableAnimate: true,
                              disableBack: true
                            });
                            $state.go($state.$current,{}, {location: "replace", reload: false})
           								}
           							},
           							{
           								text: 'Topup',
           								type: 'button-positive',
           								onTap: function(e) {
                            $ionicHistory.nextViewOptions({
                              disableAnimate: true,
                              disableBack: true
                            });
                            $state.go('app.patient_topup',{}, {location: "replace", reload: false});
           								}
           							},

           						]
           					});
         }
     }).catch(function(error){
       console.log('failure data', error);
     });

  }




   function CheckOnlineDocs(){
   // window.localStorage.SpecilityId=$rootScope.SpecilityId;
   medicalSpecialityService.getMedicalSpeciality(window.localStorage.SpecilityId)
    .then(function(response){
      $rootScope.newDocStatus=response[0]['noofonlinedoctors']
      if($rootScope.newDocStatus === $rootScope.oldDocStatus){

        // console.log('same data');
      }
      else{
        $rootScope.oldDocStatus = $rootScope.newDocStatus;
        console.log($scope.specialityDetails);
        console.log(response);
        $scope.specialityDetails =response;
      }
      // console.log(response[0]['noofonlinedoctors']);

      // console.log($scope.specialityDetails);

      // $rootScope.newValueForOnlineDoc=$rootScope.specialityDetails[]['noofonlinedoctors'];
      // console.log($rootScope.newValueForOnlineDoc);
      $scope.specialityDetails = response;
      // console.log($scope.specialityDetails);
    }).catch(function(error){
       console.log('failure data', error);
    });
   }

   $scope.isFirstTime = false;

   var checkPatientActivity={
   	callId:$rootScope.callId,
   	doctor:$stateParams.accptdDoc
   }
   console.log(checkPatientActivity);
    function checkAcceptedReqDocStatus(){
   	//  doctorServices.patientActivity($rootScope.callId).then(function(response){
   	 doctorServices.patientActivity(checkPatientActivity).then(function(response){
   	 $scope.consultStatus=response;
   // 	 console.log($scope.consultStatus);
   	 window.localStorage.declinedByDoc = $scope.consultStatus[0][0];
   	 $scope.docDeclined=window.localStorage.declinedByDoc;
   	//  console.log($scope.consultStatus);
   	 }).catch(function(error){
   	//  console.log('failure data', error);
   	 });
    }
    $scope.$watch('docDeclined', function (newValue, oldValue, scope){
    		console.log('changed');

    		if(newValue > oldValue){
   			setTimeout(function (){
   					 console.log('delay 3 sec');
   				 }, 3000);

   		     var alertPopup = $ionicPopup.alert({
   		       title: 'Declined!',
   					 template: "<div>Doctor has declined for a consultation</div>",
   					 cssClass: 'requestPopup',
   					 scope: $scope,
   		     });
   		     	 alertPopup.then(function(res) {
               var test = $timeout($rootScope.onTimeout,1000);//timer interval
         			$scope.$on('$destroy', function(){
         			$timeout.cancel(test);
         			console.log('destroyed');
         			});
   					 $state.go("app.patient_home");
   					 $ionicHistory.clearHistory();
   		     });
    		}

    },true);

//New patient details

    $scope.patientToConsult='';
    $scope.changePatient=function (val) {
      $state.go("app.subPatientList");
    }
   $scope.editNewPatient=function () {
     if(window.localStorage.newPatientVal == 0){
       console.log('select patient to edit');
     }
     else if(window.localStorage.newPatientVal === window.localStorage.user || window.localStorage.newPatientVal === 'new'){
       console.log('can not edit default patient');
     }
     else{
       $state.go("app.editPatient",{id:window.localStorage.newPatientVal});

     }


  }




  $rootScope.newpatientAdded=medicalSpecialityService.getNewPatient();
  console.log($rootScope.newpatientAdded);
  $scope.newPatientFname=$scope.newpatientAdded.fname;
  $scope.newPatientLname=$scope.newpatientAdded.lname;
  if($rootScope.newpatientAdded){
    $rootScope.shownewPatient=false;
  }
  else{
    $rootScope.shownewPatient=true;
  }
  $scope.$on('$destroy', function(){
      console.log('destroyed');
      $interval.cancel(checkAcceptedReqDocStatus);
      $interval.cancel(CheckOnlineDocs);

  });


});
