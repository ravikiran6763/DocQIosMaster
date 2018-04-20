DoctorQuickApp.controller('doctorScreensCtrl', function($scope,$ionicHistory,$timeout,$window,$location,$rootScope,$localStorage,$interval,$ionicConfig, $state, $ionicSideMenuDelegate,$ionicLoading, $interval, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails,doctorServices,HardwareBackButtonManager,LoginService,invitereviews) {

  	$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;
    $scope.docAvailable=true;
    $scope.docNotAvailable=false;
    $rootScope.inviteButton = false;

    $rootScope.homePage=$ionicHistory.currentStateName();
    $ionicSideMenuDelegate.canDragContent(false); //preventes sidemenu sliding

    HardwareBackButtonManager.disable();
    $ionicConfig.views.swipeBackEnabled(false);//disables swipe back in iphone

    // alert($rootScope.previousState.name);
    // alert($rootScope.homePage);

    // doctorServices.doctorStatus(window.localStorage.user).then(function(response){
    //     console.log(response);
    //     window.localStorage.onOff=response;
    //     if(response == 1){
    //     $scope.docAvailable=true;
    //     $scope.docNotAvailable=false;
    //
    //     }
    //     else{
    //     $scope.docAvailable=false;
    //     $scope.docNotAvailable=true;
    //     }
    // }).catch(function(error){
    // console.log('failure data', error);
    // });

    $rootScope.goToConsultation = function ()
    {
      $state.go("templates.consulted_patient")
    }
    $timeout( function(){
        console.log('interval started');


        if($localStorage.showConnecting === true){
          console.log($localStorage.showConnecting);

          $timeout( function(){
          $rootScope.connectingMessage = 'Internet connection appears very slow. Please try later'
        }, 60000 );
          $rootScope.connectingMessage = 'Connecting to DoctorQuick'
          $ionicLoading.show({
            template: '<ion-spinner></ion-spinner><br><br>{{connectingMessage}}',
            // duration:3000,
            noBackdrop: true
          });

        }

        $interval(availableInVsee,2000,1);

        // $interval(checkNewMessages,2000);


    }, 0 );

    doctorServices.doctorDetails(window.localStorage.user).then(function(response,data){
      $rootScope.doctor_details=response;//store the response array in doctor details
      console.log($rootScope.doctor_details);
      window.localStorage['doctorDetails'] = angular.toJson(response);

    }).catch(function(error){
      console.log('failure data', error);
    });




    function availableInVsee() {
      if($ionicHistory.currentStateName() === 'auth.loginNew'){
        return false;
      }
      else{
      console.log('LOGIN CHECK');
            var uname1 = "greet+"+window.localStorage.user;
            var pw1 = "DQ_doctor";

            var success = function(message)
            {
                  console.log(message);
              $scope.iosLoggin=message;

              window.localStorage.iosLogin=$scope.iosLoggin;


              window.FirebasePlugin.onTokenRefresh(function(token) {
              // save this server-side and use it to push notifications to this device

                  console.log(token);

                  $scope.playerId=token;
                  // alert('oneSignal')
                  console.log($scope.playerId);
                  if(window.localStorage.doctororpatient === 'patient'){
                    var updatePlayer ={
                      palyerId:$scope.playerId,
                      userNum:window.localStorage.user,
                      user:'patient'
                    }
                  }
                  else{
                    var updatePlayer ={
                      palyerId:$scope.playerId,
                      userNum:window.localStorage.user,
                      user:'doctor',
                      status:'available',
                      manufacturer:window.localStorage.manufacturer,
                      model:window.localStorage.model

                    }
                  }

                  LoginService.updatePlayer(updatePlayer).then(function(response){
                    console.log(response);
                    if(response){
                      doctorServices.doctorStatus(window.localStorage.user).then(function(response){

                          console.log(response);
                          window.localStorage.onOff=response;
                          if(response == 1){
                          $scope.docAvailable=true;
                          $scope.docNotAvailable=false;

                          }
                          else{
                          $scope.docAvailable=false;
                          $scope.docNotAvailable=true;
                          }
                      }).catch(function(error){
                      console.log('failure data', error);
                      });
                    }
                });


              }, function(error) {
                  console.error(error);
              });



              doctorServices.doctorStatus(window.localStorage.user).then(function(response){
                       console.log(response);
                       console.log('update doctor status');
                       window.localStorage.onOff=response;
                       if(response == 1){
                       $scope.docAvailable=true;
                       $scope.docNotAvailable=false;

                       }
                       else{
                       $scope.docAvailable=false;
                       $scope.docNotAvailable=true;
                       }
                   }).catch(function(error){
                   console.log('failure data', error);
                   });

            }
            var failure = function()
            {

              alert("Error calling Hello Plugin");

            }

            hello.login(uname1,pw1,success, failure);

            $timeout( function(){
                        console.log('interval started');
                        $interval($rootScope.loginInterval,2000,1);
                        $interval(checkNewMessages,2000);
                   }, 10000 );

                   var username = "greet+"+window.localStorage.user;
                   var password = "DQ_doctor";
                   function checkNewMessages()
                   {
                      var success = function(message)
                      {
                        $rootScope.unreadchatforpatient = message;
                        console.log($scope.unreadchatforpatient);
                      }

                      var failure = function()
                      {
                        console.log("Error calling Hello Plugin");
                        //console.log(‘error’);

                      }
                        hello.unreadchatfromusers(username,password,success, failure);
                   }
               $rootScope.loginInterval = function () {
                console.log("checking for login");
                 var success = function(message)
                {
                  console.log(message);
                  $ionicLoading.hide().then(function(){
                  $localStorage.showConnecting = false;
                  console.log("The loading indicator is now hidden");
                  $ionicHistory.nextViewOptions({
                  disableAnimate: true,
                  disableBack: true
                  });
                    //$interval.cancel(loginStatus);
                  });
                }

                var failure = function()
                {
                  alert("Error Occurred While Loggin in to DoctoQuick");
                }
                hello.loginstatus(success,failure);
                }
          }
    }


// $rootScope.checkNewMessages = $interval(function(){}, 2000);
    function checkNewMessages()
    {
          var username = "greet+"+window.localStorage.user;
          var password = "DQ_doctor";
          var success = function(message)
          {
          $rootScope.unreadchatforpatient = message;
          // console.log($scope.unreadchatforpatient);
          }

          var failure = function()
          {
          console.log("Error calling Hello Plugin");
          //console.log(‘error’);

          }
          hello.unreadchatfromusers(username,password,success, failure);
    }
$rootScope.unreadchatforpatient = 0;
    invitereviews.generateTinyUrl(window.localStorage.user).then(function(response){
      $rootScope.docTinyUrl=response;
      window.localStorage.docTinyUrl=$rootScope.docTinyUrl;
    }).catch(function(error){
    console.log('failure data', error);
    });

  if($rootScope.previousState.name === '' && $rootScope.homePage === 'templates.doctor_home'){
    $scope.docAvailable=false;
    $scope.docNotAvailable=true;
    // window.localStorage.onOff=2;
  }
    console.log($ionicHistory.viewHistory());
    $interval(checkConsultations,2000,false);
    console.log(window.localStorage.onOff);
    // $scope.docStatus=window.localStorage.onOff;
    $scope.$watch('docStatus', function (newValue, oldValue, scope){
       console.log('changed');

       if(newValue > oldValue){
           $interval.cancel(checkConsultations);
       }

    },true);

var doctorDeviceDetails ={
  doctorNum:window.localStorage.user,
  deviceId:window.localStorage.deviceID,
  deviceSerial:window.localStorage.serial
}
function checkConsultations(){
    doctoronoffdetails.getdoctorrequest(doctorDeviceDetails).then(function(response){
    $scope.pendingRequests = response;
    // console.log('pending:',$scope.pendingRequests);
    $scope.requests=$scope.pendingRequests.length;
  });
  // .catch(function(error){
  //   console.log('failure data', error);
  // })

  // console.log($ionicHistory.currentStateName());
  if ($ionicHistory.currentStateName() === 'auth.loginNew') {
    return false;
  }

  doctoronoffdetails.doctorDeviceUpdate(window.localStorage.user).then(function(response){
    $scope.deviceDetails = response;
    // console.log( $scope.deviceDetails);
    // console.log('deviceUUID:',$scope.deviceDetails[0][0]);
    // console.log('DeviceSerial:',$scope.deviceDetails[0][1]);

    window.localStorage.deviceUUID = $scope.deviceDetails[0][0];
    $scope.deviceUUID=window.localStorage.deviceUUID;
    if(window.localStorage.deviceID === $scope.deviceUUID){
      $rootScope.LogoutDocFromOldDevce=false;
    }
    else {
      console.log('device changed');
      var unametologout = "greet+"+window.localStorage.user;
      var pwtologout = "DQ_doctor";
        var success = function(message)
        {

              $rootScope.LogoutDocFromOldDevce=true;
              $ionicLoading.hide();
              console.log(message);
              $ionicHistory.nextViewOptions({
              disableBack: true,
              disableAnimate: true,
              historyRoot: true
              });

              $state.go('auth.loginNew');
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory();
              $window.localStorage.clear();
                var alertPopup = $ionicPopup.alert({
                  template: '<center>Your device is no longer registered <br> with DoctorQuick. Contact care@doctorquick.com</center>',
                  cssClass: 'videoPopup',
                });
                alertPopup.then(function(res) {
                  ionic.Platform.exitApp();
                });
        }
        var failure = function()
        {
          console.log('error calling hello plugin');
        }
        hello.logout(unametologout,pwtologout,success, failure);



    }

  })
  .catch(function(error){
    console.log('failure data', error);
  })


}

    // console.log($ionicHistory.currentStateName());
    $scope.emailNotification = 'Subscribed';
    // console.log($scope.emailNotification);
    $scope.Online = function (message) {
      $scope.status=message;
      console.log(window.localStorage.user);
      doctorServices.notifyPatient(window.localStorage.user).then(function(response){
        console.log(response);
      })
          console.log(message);
          $scope.docAvailable=true;
          $scope.docNotAvailable=false;

          var whichdoctoronoff = {
            doctorphno : window.localStorage.user,
            onoff :1
          }
          doctoronoffdetails.doctoronoff(whichdoctoronoff).then(function(response){
  				console.log(response);
  				}).catch(function(error){
  				console.log('failure data', error);
  				});

              $ionicLoading.hide();

              //Unregister from onesignal notifications
              $scope.accptNotifications=false;
    					$scope.rejectNotifications=true;

              window.FirebasePlugin.onTokenRefresh(function(token) {
              // save this server-side and use it to push notifications to this device

                  console.log(token);

                  $scope.playerId=token;
      						// alert('oneSignal')
                  console.log($scope.playerId);
      						if(window.localStorage.doctororpatient === 'patient'){
      							var updatePlayer ={
      								palyerId:$scope.playerId,
      								userNum:window.localStorage.user,
      								user:'patient'
      							}
      						}
      						else{
      							var updatePlayer ={
      								palyerId:$scope.playerId,
      								userNum:window.localStorage.user,
      								user:'doctor',
                      status:$scope.status
      							}

      						}

                  LoginService.updatePlayer(updatePlayer).then(function(response){
                    console.log(response);
                });


              }, function(error) {
                  console.error(error);
              });

        };
  $scope.Offline = function (message) {
        console.log(message);
        $scope.status=message;
        // $window.location.reload();
        $scope.docAvailable=false;
        $scope.docNotAvailable=true;

        $scope.accptNotifications=true;
        $scope.rejectNotifications=false;
        if(window.localStorage.doctororpatient === 'patient'){
        var updatePlayer ={
        palyerId:'',
        userNum:window.localStorage.user,
        user:'patient'
        }

        $scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
        var playerId = JSON.parse($window.localStorage.getItem("patientDetails"));
        playerId[0][8] = "";
        console.log(playerId);
        console.log($scope.patient_details[0][8]);
        localStorage.setItem("patientDetails",JSON.stringify(playerId));
        console.log(angular.fromJson($window.localStorage['patientDetails']));

        LoginService.updatePlayer(updatePlayer).then(function(response){
        console.log(response);
        })
        }
        else{
        var updatePlayer ={
        palyerId:'',
        userNum:window.localStorage.user,
        user:'doctor',
        status:$scope.status
        }

        LoginService.updatePlayer(updatePlayer).then(function(response){
        console.log(response);
        })
        }





  };

///////////////////////////////////////////////
    $rootScope.changeNotification = function (e)
    {
      if(e)
      {
          $scope.notificationValue = true;
        }
        else{
          $scope.notificationValue = false;
        }
        console.log('check box changed', $scope.notificationValue);
    }

    if(window.localStorage.onOff == 1){
    $scope.checkedValue=true;
    }

	$rootScope.changeStatus = function (e)
	{
    console.log(e);
		$scope.checkedValue = true;
				if(e)
				{
						$scope.checkedValue = true;
            window.localStorage.onOff=1
						var whichdoctoronoff = {
							doctorphno : window.localStorage.user,
							onoff : window.localStorage.onOff
						}
						doctoronoffdetails.doctoronoff(whichdoctoronoff);

							var uname1 = "greet+"+window.localStorage.user;
							var pw1 = "DQ_doctor";
								console.log(uname1);
								console.log(pw1);

								var success = function(message)
								{
									console.log(message);
								}

								var failure = function()
								{
									console.log("Error calling Hello Plugin");
								}

								hello.login(uname1,pw1,success, failure);

				}
				else
				{
						$scope.checkedValue = false;
            // window.localStorage.onOff=2
						var whichdoctoronoff = {
								doctorphno : window.localStorage.user,
								onoff : window.localStorage.onOff
					}
					doctoronoffdetails.doctoronoff(whichdoctoronoff);
					var unametologout = "greet+"+window.localStorage.user;
					var pwtologout = "DQ_doctor";

					// alert(unametologout);
					var success = function(message)
					{
						alert(message);
					}
					var failure = function()
					{
						alert("Error calling Hello Plugin");
					}
					hello.logout(unametologout,pwtologout,success, failure);

				}
	}

 $scope.pending=window.localStorage.requests;
  $scope.hello = 5;
  window.localStorage.totalReq = 0;

    $scope.$watch('requests', function (newValue, oldValue, scope){

        if(newValue > oldValue){

        }

    },true);



$rootScope.ExpiredAlert= false;
$scope.viewRequest=function(patient){
  console.log(patient);
  console.log('view');
  // $ionicLoading.show({
  //   template:'<ion-spinner></ion-spinner>'
  // })
  $rootScope.currentPatient = patient;
  window.localStorage['currentPatient'] = angular.toJson($rootScope.currentPatient);

  console.log($rootScope.currentPatient);
  console.log($rootScope.currentPatient.requestedTime);
        $rootScope.id= $rootScope.currentPatient.id;
  $state.go('templates.patientRequest',{'reqId':$rootScope.currentPatient.id,'reqPat':$rootScope.currentPatient.patientNum,'reqTime':$rootScope.currentPatient.awstime})
  // $state.go('templates.patientRequest',{},{location:"replace",reload:true})
}
$scope.playDemoVideo = function() {

$scope.videoPlayerPopup = $ionicPopup.show({
  template: '<div ><p style="color:#fcfff4; margin: -21px 0 0 15px; "></div><div style="position: absolute; margin-top: 0px; margin-bottom: 0; top: 23px;left: 95%; border-radius: 22px; font-size: 4vw; color: teal; text-align: center; padding: 0px; background-color: white; width: 5%;font-weight: bolder;color: #777;" ng-controller="doctorScreensCtrl" ng-Click="closethis();">X</div>'+
      '<iframe style="width: 100%; height: 59%; border: 4px solid green; margin-top: 7%;" src="https://www.youtube-nocookie.com/embed/Nt364t3Vp6I?rel=0&amp;showinfo=0" frameborder="0"  autoplay></iframe>',
  cssClass: 'videoPlayerPopup',
  scope: $scope,

});

$scope.closethis = function()
{
    $scope.videoPlayerPopup.close();
};
// $scope.showModal('templates/video-popover.html');
}


//invite Reviews
$scope.contacts='';
$scope.inviteForReview=function(){
  $scope.contacts = angular.fromJson($window.localStorage['numbersToSendInvites']);
  $scope.allConatctsFetched = angular.fromJson($window.localStorage['allConatctsFetched']);
  console.log($scope.allConatctsFetched);

  console.log($scope.allConatctsFetched.length);

  // $scope.contacts = invitereviews.getinvitecontacts();
	console.log($scope.contacts.length);


  if($scope.contacts.length === 0 && $scope.allConatctsFetched.length === 0)
  {

    $ionicLoading.hide();
    window.plugins.toast.showWithOptions({
      message: "Please select your contacts",
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
  else if($scope.allConatctsFetched.length === 0 &&  $scope.contacts.length > 0)
  {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner><br><center>Sending invite</center>'
    })
    $scope.all=2;

    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";
    invitereviews.sendsmstoinvitereviews($scope.contacts,$scope.query,window.localStorage.user,window.localStorage.docTinyUrl,$scope.all).then(function(response){
      if(response){
        console.log(response);
        $ionicLoading.hide();
        $scope.contacts=[];
        window.localStorage['numbersToSendInvites'] = angular.toJson($scope.contacts);
        $state.go("templates.doctor_home")
      }
    }).catch(function(error){
    console.log('failure data', error);
    })

  }
  else if($scope.allConatctsFetched.length > 0 &&  $scope.contacts.length === 0)
  {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner><br><center>Sending invite</center>'
    })
    $scope.all=1;

    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";
    invitereviews.sendsmstoinvitereviews($scope.allConatctsFetched,$scope.query,window.localStorage.user,window.localStorage.docTinyUrl,$scope.all).then(function(response){
      if(response){
        console.log(response);
        $ionicLoading.hide();
        $scope.contacts=[];
        window.localStorage['allConatctsFetched'] = angular.toJson($scope.contacts);
        $state.go("templates.doctor_home")
      }
    }).catch(function(error){
    console.log('failure data', error);
    })

  }
  else {


  }

}
$scope.$on('$destroy', function(){
	console.log('destroyed');
   $interval.cancel(checkNewMessages);

});

});
