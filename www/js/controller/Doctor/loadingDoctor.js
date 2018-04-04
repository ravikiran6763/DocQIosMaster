DoctorQuickApp.controller('loadingDoctor', function($state,$scope,$rootScope,$interval, $ionicConfig, $ionicHistory,$timeout, $window, $localStorage, $ionicLoading, doctorServices,rateDoctorServices,LoginService,doctoronoffdetails) {



  var username = "greet+"+window.localStorage.user;
  var password = "DQ_doctor";
  function checkNewMessages()
  {
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


  $timeout( function() {
    $scope.deviceAndroid = ionic.Platform.isAndroid();
    console.log($scope.deviceAndroid);

        $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick',
        duration:7000
        });
    var uname1 = "greet+"+window.localStorage.user;
    var pw1 = "DQ_doctor";

    // window.plugins.OneSignal.getIds(function(ids) {
    //   $scope.playerId=JSON.stringify(ids['userId']);
    //   // console.log($scope.playerId);
    //   var updatePlayer ={
    //     palyerId:$scope.playerId,
    //     userNum:window.localStorage.user,
    //     user:'doctor'
    //   }
    //   console.log(updatePlayer);
    //   LoginService.updatePlayer(updatePlayer).then(function(response){
    //     console.log(response);
    //   })
    // });

    doctorServices.doctorDetails(window.localStorage.user).then(function(response,data){
      $rootScope.doctor_details=response;//store the response array in doctor details
      console.log($rootScope.doctor_details);
      window.localStorage['doctorDetails'] = angular.toJson(response);

    }).catch(function(error){
      console.log('failure data', error);
    });
    doctorServices.notifyPatient(window.localStorage.user).then(function(response){
      console.log(response);
    })
    var whichdoctoronoff = {
      doctorphno : window.localStorage.user,
      onoff : 1
    }
    doctoronoffdetails.doctoronoff(whichdoctoronoff).then(function(response){
    console.log(response);
    }).catch(function(error){
    console.log('failure data', error);
    });


    if($scope.deviceAndroid === true){

        var success = function(message)
        {
          $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
          // alert('loggedin');
          $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
          });
          $interval.cancel(loginStatus);
          $state.go('templates.doctor_home', {}, {location: "replace", reload: false});
          });
        // alert(message);
        }
        var failure = function()
        {
        alert("Error calling Hello Plugin");
        }

        hello.login(uname1,pw1,success, failure);
        $timeout( function(){
        console.log('interval started');
        var username = "greet+"+window.localStorage.user;
        var password = "DQ_doctor";
          $rootScope.checkNewMessages = $interval(function(){
          //code goes here
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
          }, 1000);
        }, 3000);

    }
    else{

          var success = function(message)
          {
          // alert(message);
          $scope.iosLoggin=message;
          window.localStorage.iosLogin=$scope.iosLoggin;

          }
          var failure = function()
          {

          alert("Error calling Hello Plugin");

          }

          hello.login(uname1,pw1,success, failure);

          $timeout( function(){
          console.log('interval started');
          $interval(loginStatus,2000,1);
          // $interval(checkNewMessages,2000);

          }, 10000 );


            var username = "greet+"+window.localStorage.user;
            var password = "DQ_doctor";

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
            function loginStatus() {
              var success = function(message)
              {
                // alert(message);
                $ionicLoading.hide().then(function(){
                console.log("The loading indicator is now hidden");
                // alert('loggedin');
                $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
                });
                $interval.cancel(loginStatus);
                $state.go('templates.doctor_home', {}, {location: "replace", reload: false});
                });

              }

              var failure = function()
              {
                alert("Error Occurred While Loggin in to DoctoQuick");
              }
              hello.loginstatus(success,failure);
            }

    }


  }, 0);


})
