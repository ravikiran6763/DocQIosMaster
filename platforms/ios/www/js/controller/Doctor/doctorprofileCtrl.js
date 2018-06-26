DoctorQuickApp.controller('doctorprofileCtrl', function($scope, $state, $stateParams, $ionicPopup,$ionicHistory, $timeout, $interval, $rootScope, $cordovaNetwork, $window,$localStorage, $ionicLoading,callacceptedbydoctor,doctorServices,patientrequesttodoctor,searchDoctorServices,medicalSpecialityService,IonicClosePopupService) {

$rootScope.headerTxt="Doctor Profile";
$rootScope.showBackBtn=true;
$rootScope.checkedValue = false;
$rootScope.onceClicked=false;

$rootScope.docPhone = window.localStorage.docPhone;

console.log($rootScope.docPhone);
console.log('docprofileview');

$rootScope.docRates=$stateParams.rates;
$rootScope.docTotalRates=$stateParams.totalRates;

$ionicLoading.show({
  templates:'<ion-spinner></ion-spinner>',
  showBackdrop:true

});
$interval(checkDocStatus, 1000);

$scope.myDocDetails1 = angular.fromJson($window.localStorage['myDocDetails1']);


doctorServices.myDoctorsDetails(window.localStorage.docPhone).then(function(response){
  console.log(response[0]['onoff']);
  $rootScope.myDocAvailable=response[0]['onoff'];
  window.localStorage['myDocDetails1'] = angular.toJson(response);

// $scope.myDocDetails1=response;
console.log('doc',$scope.myDocDetails1);
$scope.myDocDetails1 = angular.fromJson($window.localStorage['myDocDetails1']);

var data=$scope.myDocDetails1;//take all json data into this variable
  for(var i=0; i<data.length; i++){

        $rootScope.rates=data[i].ratings,
        $rootScope.totalRates=data[i].ratingCount

        if($rootScope.rates == null ){
          $rootScope.rates=''
        }
        if($rootScope.totalRates == null ){
          $rootScope.totalRates=''
        }
        console.log($rootScope.rates);

        $rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
        console.log('rates',$rootScope.DocRates);
        console.log('total',$rootScope.totalRates);

        console.log('doc',$rootScope.DocRates);

        $scope.ratings = [{
               current: $rootScope.DocRates,
               max: 5,
               total:$rootScope.totalRates
             }, ];
             $scope.getStars = function(rating) {
               // Get the value
               var val = parseFloat(rating);
               // Turn value into number/100
               var size = val/5*100;
               return size + '%';
             }

    }
}).catch(function(error){
console.log('failure data', error);
});

$scope.example = {
       value: new Date()
     };

function checkDocStatus(){

  doctorServices.myDoctorsDetails(window.localStorage.docPhone).then(function(response){
  $scope.myDocDetails1=response;
  // console.log($scope.myDocDetails1);
  var data=$scope.myDocDetails1;//take all json data into this variable
    for(var i=0; i<data.length; i++){

          $rootScope.rates=data[i].ratings,
          $rootScope.totalRates=data[i].totalRates
          $rootScope.onoff=data[i].onoff;
          if($rootScope.myDocAvailable ===  $rootScope.onoff ){

            // console.log('docAvailability',$rootScope.myDocAvailable);
            // console.log($rootScope.myDocAvailable);
          }
          else{
            $scope.example = {
                   value: new Date()
                 };
            $scope.myDocDetails1 = response;
            // $rootScope.counter++;
            $rootScope.myDocAvailable =  $rootScope.onoff ;
            console.log('update data');
          }
          // console.log($rootScope.onoff);
          // console.log($scope.myDocDetails1);

          if($rootScope.rates == null ){
            $rootScope.rates=''
          }
          if($rootScope.totalRates == null ){
            $rootScope.totalRates=''
          }
          // console.log($rootScope.rates);

          $rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
          // console.log('rates',$rootScope.DocRates);
          // console.log('total',$rootScope.totalRates);



      }


  }).catch(function(error){
  console.log('failure data', error);
  });
}



doctorServices.myDoctorsFetched(window.localStorage.user).then(function(response){
    $scope.myConsultedDoctors=response;
    $ionicLoading.hide();
  }).catch(function(error){
console.log('failure data', error);
});

//for voice call


    doctorServices.myDoctorsDetails(window.localStorage.consultedDoctor).then(function(response){
    $scope.myDocDetails=response;
    }).catch(function(error){
    console.log('failure data', error);
    });

    $scope.updateDocPwd=function(){
      $rootScope.ratedBy=$scope.login.userPhone;
      console.log('dddd');

    }

    $scope.sendOfflineMessage=function(num){
        $rootScope.onceClicked=true;
  		var sendMessage={
  			patient:window.localStorage.user,
  			doctor:num
  		}
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'
      });
      console.log(sendMessage);
  		searchDoctorServices.sendOfflineMessage(sendMessage).then(function(response){
  			console.log(response);
        if(response){
          console.log('hide loading');
          $ionicLoading.hide();
          var confirmPopup = $ionicPopup.confirm({
          			template: '<center>You will be notified once the Doctor is available</center>',
          			cssClass: 'videoPopup',
          			scope: $scope,
          			buttons: [
          			{
          				text: 'OK',
          				type: 'button-positive',
          				onTap: function(e) {
          				console.log('OK');
          				}
          			},
          			]
          		});
              IonicClosePopupService.register($scope.alertPopup);


        }

  		}).catch(function(error){
  		console.log('failure data', error);
  		});
  	}

    $scope.$watch('myDocStatus', function (newValue, oldValue, scope){
       console.log('changed');
       console.log('oldValue',oldValue);
       console.log('newValue',newValue);

       if(newValue == 2){
         $scope.callReqPopUp.close();
         var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer interval
           $scope.$on('$destroy', function(){
           $timeout.cancel(patientTimeout);
           console.log('destroyed');
         });

         searchDoctorServices.declineOne2oneReqPatient(window.localStorage.myCallId).then(function(response){
         $scope.declinedByPat=response;
         window.localStorage.myCallId=0;
         window.localStorage.callStatus=0;
         console.log($scope.declinedByPat);
         }).catch(function(error){
           console.log('failure data', error);
         });
         $scope.callAccept.close();

         $scope.alertPopup = $ionicPopup.alert({
           // title: 'Declined!',
           template: "<div>Doctor did not accept your consultation</div>",
           cssClass: 'requestPopup',
           scope: $scope,
         });

         IonicClosePopupService.register($scope.alertPopup);


           alertPopup.then(function(res) {
             var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer inerval
             $scope.$on('$destroy', function(){
             $timeout.cancel(patientTimeout);
             console.log('destroyed');
             console.log("callID:",window.localStorage.myCallId);
             $scope.callAccept.close();
             $window.location.reload();



             });
           $state.go("app.patient_home");
           $ionicHistory.clearHistory();
         });
       }

    },true);

    function checkDocStatusOnTheGo(){
      console.log($rootScope.onGoingDoc);
      searchDoctorServices.checkDocStatusOnTheGo($rootScope.onGoingDoc).then(function(response){
        console.log(window.localStorage.myCallId);
      $scope.myDocStat = response;
      console.log($scope.myDocStat);
      window.localStorage.myDocStatus=$scope.myDocStat;
      $scope.myDocStatus=window.localStorage.myDocStatus;
      })
    }


  	function checkMyCallStatus(){

      if(window.localStorage.myCallId == 0){
        return false
      }
      else{
        searchDoctorServices.checkCallStatus(window.localStorage.myCallId).then(function(response){
    			console.log(window.localStorage.myCallId);
    		$scope.myCalStat = response;
    		// console.log($scope.myCalStat[0][0]);
    		window.localStorage.myCallStatus=$scope.myCalStat[0][0];
    		$scope.checkMyStatus=window.localStorage.myCallStatus;
    		})
      }

  	}
  	$scope.$watch('checkMyStatus', function (newValue, oldValue, scope){
  		 console.log('changed');
       if(newValue == 4 || newValue == 5){
         $scope.callReqPopUp.close();
         //
         var confirmPopup = $ionicPopup.confirm({
                 // title: 'Declined!',
                 template: '<center>Doctor has declined for consultation</center>',
                 cssClass: 'videoPopup',
                 scope: $scope,
                 buttons: [
                   {
                     text: 'OK',
                     type: 'button-positive',
                     onTap: function(e) {
                       var patientTimeout = $timeout($scope.onTimeout,1000);//timer interval
                      $scope.$on('$destroy', function(){
                      $timeout.cancel(patientTimeout);
                      console.log('declined here');
                      console.log('destroyed');
                      });
                       $state.go($state.current, {}, {reload: true});
                       // searchDoctorServices.declineOne2oneReqPatient(window.localStorage.myCallId).then(function(response){
                       // $scope.declinedByPat=response;
                       // window.localStorage.myCallId=0;
                       // window.localStorage.callStatus=0;
                       // console.log($scope.declinedByPat);
                       // // $scope.alertPopup.hide();
                       // }).catch(function(error){
                       //   console.log('failure data', error);
                       // });

                     }
                   },
                 ]
         });
         IonicClosePopupService.register(confirmPopup);

         $scope.callAccept.close();


       }
  		 else if(newValue == 2){
  			 console.log('changed call val');
  			 $scope.callReqPopUp.close();
  			 setTimeout(function (){
  						console.log('delay 3 sec');
  					}, 3000);
  					console.log('value changed');
            // $interval.cancel(checkMyCallStatus);

            console.log('show popup');
  					$scope.callAccept = $ionicPopup.show({
              template: "<div >Doctor has accepted<br>your invitation for a consultation.<br>Please start the consultation or decline</div>",
  				 			 cssClass: 'requestPopup',
  				 			 scope: $scope,
  				 			 buttons: [
  				 			 {
  				 			 text: 'Decline',
  				 			 type: 'button-royal',
  				 			 onTap:function(){
  				 				 console.log('cancel');
  				 				 console.log(window.localStorage.user);
                   $interval.cancel(checkMyCallStatus);
  								 $scope.callReqPopUp.close();
  								  searchDoctorServices.declineOne2oneReqPatient(window.localStorage.myCallId).then(function(response){
  								  $scope.declinedByPat=response;
  									window.localStorage.myCallId=0;
  									window.localStorage.callStatus=0;
  									console.log($scope.declinedByPat);
  								  }).catch(function(error){
  								  	console.log('failure data', error);
  								  });
  									$state.go($state.current, {}, {reload: true});
  				 			 }
  				 			 },
  							 {
  							  text: 'Start',
  							  type: 'button-assertive',
  							  onTap:function(){

  									var videocallflag = $rootScope.callType;
                    console.log(videocallflag);
  									$scope.startdate = new Date();
  									$scope.callid = $rootScope.callId;
  									// window.localStorage.ViewDoc=1;
                    $interval.cancel(checkMyCallStatus);
  									console.log(window.localStorage.networkType);
  									var uname = "greet+"+window.localStorage.user;
  									var pw = "DQ_patient";

  										 var persontocall = "greet+" + $rootScope.docNumToCall;
  										 console.log(uname);
  										 console.log(persontocall);

  									if(window.localStorage.networkType == 'None')
  									{
  										var confirmPopup = $ionicPopup.confirm({
  														title: 'DoctorQuick',
  														template: 'You are Offline ',
  														cssClass: 'videoPopup',
  														scope: $scope,
  														buttons: [
  															{
  																text: 'Ok',
  																type: 'button-royal',
  																onTap: function(e) {
  																console.log('offline');
  																}
  															},
  														]
  													});
                            IonicClosePopupService.register(confirmPopup);

  									}
  									else if(window.localStorage.networkType == 'Unknown' || window.localStorage.networkType == 'Ethernet' || window.localStorage.networkType == '2G' || window.localStorage.networkType == '3G')
  									{
  										var confirmPopup = $ionicPopup.confirm({
  														// title: 'DoctorQuick',
  														template: 'We detected slow nwtwork on your device. Please try after sometime ',
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
                            IonicClosePopupService.register(confirmPopup);

  									}
  									else if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi' )
  									{
                        console.log(videocallflag);
  										var success = function(message)
  										{

  												$ionicHistory.nextViewOptions({
  												disableAnimate: true,
  												disableBack: true
  											 });
  												//
  												$scope.enddate = new Date();
  												console.log(window.localStorage.user);
  												console.log($rootScope.accptdDoc);
  												// console.log(window.localStorage.Doctocall);

  												callacceptedbydoctor.accpeteddoctor(window.localStorage.user,$rootScope.docNumToCall,videocallflag,$scope.startdate,$scope.enddate,window.localStorage.myCallId).then(function(response){
  													console.log('inserted to consultation',response);
                            $state.go('app.patient_summary',{calledDoctor:$rootScope.docNumToCall,consultId:window.localStorage.myCallId}, {location: "replace", reload: false});
  					              }).catch(function(error){
  					              console.log('failure data', error);
  					              });
  										}
  										var failure = function()
  										{
  											alert("Error calling Hello Plugin");
  										}
                      if(videocallflag == 5){
                        hello.greet(uname,pw,persontocall,success, failure);
                      }
                      if(videocallflag == 6){
                        hello.audiocallvsee(uname,pw,persontocall,success, failure);
                      }
  									}
  									else{
  										//Do nNothing
  									}
  							  }
  							  },
  				 		 ]

  				 		 });
  		 }
       else{
         //do nothing
       }

  	},true);

    $scope.callMyDoc=function(num,type)
    {
      $rootScope.onceClicked=true;
      console.log(num);
      console.log(type);
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'
      });
      $rootScope.onGoingDoc=num;
      $rootScope.callType=type;
      console.log(type);
      $rootScope.docNumToCall = num;
      $interval(checkMyCallStatus,2000);
      $interval(checkDocStatusOnTheGo,2000);

      var callRequest={
        patient:window.localStorage.user,
        doctor:$rootScope.docNumToCall,
        subPatient:window.localStorage.selectedSubPatient
        // callId:$rootScope.callId
      }
      console.log(window.localStorage.selectedSubPatient);
      doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
        $scope.patientWalletdetails=response;
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
              $rootScope.counter = 0;
        if($scope.myWalletBal >= 270 || $scope.myWalletBal === 'agent')
        {
              console.log(callRequest);
              if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi'){
                searchDoctorServices.requestForCall(callRequest).then(function(response){
                console.log('one2oneReq',response);
                window.localStorage['one2oneReq'] = angular.toJson(response);
                $rootScope.one2oneReq = angular.fromJson($window.localStorage['one2oneReq']);
                window.localStorage.myCallId = $rootScope.one2oneReq.reqId;

                console.log(window.localStorage.myCallId);
                console.log($rootScope.one2oneReq.callStatus);

                }).catch(function(error){
                console.log('failure data', error);
                });

            // hello.greet(uname,pw,persontocall,success, failure);
            $rootScope.counter = 120;
            $rootScope.onTimeout = function(){
              console.log($rootScope.counter);
              $rootScope.counter--;
              patientTimeout = $timeout($rootScope.onTimeout,1000);
              if($rootScope.counter == 0){
              console.log('one minute over');
              $rootScope.buttonText='Send Request';
              $timeout.cancel(patientTimeout);

              searchDoctorServices.one2oneNoResponse(window.localStorage.myCallId).then(function(response){
                $scope.alertPopup.close();

              $scope.cancelledReq=response;
              window.localStorage.myCallId=0;
              window.localStorage.callStatus=0;
              console.log($scope.cancelledReq);
              }).catch(function(error){
                console.log('failure data', error);
              });
              $scope.callAccept.close();
              $scope.noResponsePopup = $ionicPopup.alert({
              template: "<div ><p>Doctor did not accept your request</p></div>",
              cssClass: 'requestPopup',
              scope: $scope,
              });
              IonicClosePopupService.register($scope.noResponsePopup);

              noResponsePopup.then(function(res){
                console.log('delete request here');
                searchDoctorServices.one2oneNoResponse(window.localStorage.myCallId).then(function(response){
                  $scope.alertPopup.close();

                $scope.cancelledReq=response;
                window.localStorage.myCallId=0;
                window.localStorage.callStatus=0;
                console.log($scope.cancelledReq);
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



            $scope.callReqPopUp = $ionicPopup.show({
                 template: "<div >Your request for a<br>consultation has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
                 cssClass: 'requestPopup',
                 scope: $scope,
                 buttons: [
                 {
                 text: 'Cancel',
                 type: 'button-royal',
                 onTap:function(){
                   console.log('cancel');
                   console.log($rootScope.counter);
                   console.log(window.localStorage.user);
                   $scope.callReqPopUp.close();
                    $state.go($state.current, {}, {reload: true});
                    searchDoctorServices.cancelOne2oneReq(window.localStorage.myCallId).then(function(response){
                    $scope.cancelledReq=response;
                    window.localStorage.myCallId=0;
                    window.localStorage.callStatus=0;
                    console.log($scope.cancelledReq);
                    }).catch(function(error){
                      console.log('failure data', error);
                    });

                 }
                 },

               ]

               });

              }
              else{
                var slowData = $ionicPopup.confirm({
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
                IonicClosePopupService.register(slowData);

              }

        }
        else
        {

          var confirmPopup = $ionicPopup.confirm({
      						title: 'DoctorQuick',
      						template: '<center><b>You can not send request now as your Wallet Balance is low</b></center> ',
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
                       $state.go('app.patient_home',{}, {location: "replace", reload: false})
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
                IonicClosePopupService.register(confirmPopup);


        }
          $ionicLoading.hide();
        }).catch(function(error){
      console.log('failure data', error);
      });

    }

    $scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
    console.log($scope.patient_details);
    $rootScope.defaultPatientFname=$scope.patient_details[0][0];
    $rootScope.defaultPatientLname=$scope.patient_details[0][2];
    $rootScope.defaultPatientNum=$scope.patient_details[0][5];


    console.log($rootScope.defaultPatientFname);
    console.log($rootScope.defaultPatientLname);

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
    var subPatientToShow={
      subPatId:window.localStorage.selectedSubPatient,
      mainPatient:window.localStorage.user
    }
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
})
