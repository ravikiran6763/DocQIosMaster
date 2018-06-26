// Ionic DoctorQuickApp

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

var DoctorQuickApp = angular.module('DoctorQuick', [
  'ionic',
  'angularMoment',
  'DoctorQuick.directives',
  'DoctorQuick.filters',
  'DoctorQuick.services',
  'DoctorQuick.factories',
  'DoctorQuick.config',
  'DoctorQuick.views',
  'underscore',
  'ngMap',
  'ngResource',
  'ngCookies',
  'ngStorage',
  'ngCordova',
  // 'youtube-embed',
  'ngCordova.plugins.contacts',
  'ngMask',
  'ui.router',
  'ngTagsInput',
  'ionic-ratings',
  'base64',
  // 'ionic-datepicker',
  'ngMessages',
  // 'ion-alpha-scroll',
  // 'angular-circular-progress',
  'ionic-letter-avatar',
  'ionic.closePopup',
  'base64',
  // 'swipe.name'
  // 'ngImageCompress',
  // 'ngMaterial'
  // 'ionic.cloud'
])

DoctorQuickApp.run(['$rootScope', '$interval', function($rootScope, $interval,$ionicPlatform) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      //print here
      $interval.cancel($rootScope.loginInterval);
      //
      // $ionicPlatform.registerBackButtonAction(function(){
      //   if($ionicHistory.currentStateName === 'templates.inviteresult'){
      //     //console.log('back button disabled');
      //     event.preventDefault();
      //   }else{
      //     $ionicHistory.goBack();
      //   }
      // }, 100);


    });
}])
// DoctorQuickApp.run(function($rootScope, $ionicPlatform, $ionicScrollDelegate){
//
//       $ionicPlatform.ready(function () {
//           if (window.cordova && window.cordova.plugins.Keyboard){
//               cordova.plugins.Keyboard.disableScroll(true); // This will prevent the view to bounce when inputs are on focus
//           }
//       });
//
//       // $rootScope.$on('$ionicView.loaded', function () {
//       //     if (window.cordova && window.cordova.plugins.Keyboard) {
//       //         cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false); // This makes the accessory bar visible and it only works when the view is loaded and DOM ready
//       //     }
//       // });
//
//       // window.addEventListener('native.keyboardshow', function () {
//       //     $ionicScrollDelegate.scrollBy(0, 1); //This will return focus to the current input once the keyboard slides-up in the view
//       // });
//
// });

DoctorQuickApp.run(function($window,$timeout,$cordovaSplashscreen, $rootScope) {
  // //console.log(navigator.onLine);
      // $cordovaSplashscreen.hide();
      $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
        });
      }, false);

})

DoctorQuickApp.run(function($ionicPlatform,$interval,$cordovaNetwork,$localStorage, $rootScope){
  $ionicPlatform.ready(function() {
    // window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
    // window.plugin.backgroundMode.enable();
    ionic.Platform.isFullScreen = true
    function successFunction() {
      // //console.log("It worked!");
    }
    function errorFunction(error) {
        //console.log(error);
      }

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    ionic.Platform.fullScreen();

    setTimeout(function() {
      //console.log('hide splash ');
        // navigator.splashscreen.hide();
    }, 300);

    // window.MobileAccessibility.usePreferredTextZoom(true);
   function getTextZoomCallback(textZoom) {
     //console.log('WebView text should be scaled to the preferred value ' + textZoom + '%')
   }
   // window.MobileAccessibility.getTextZoom(getTextZoomCallback);

      // window.addEventListener('native.keyboardshow', function(e){
      //   setTimeout(function() {
      //     document.activeElement.scrollIntoViewIfNeeded();
      //   }, 100);
      // });
      window.addEventListener('native.keyboardshow', keyboardShowHandler);
document.addEventListener('focusout', function(e) {
  //console.log('focused');
  window.scrollTo(0, 0);
});
function keyboardShowHandler(e){
    //console.log('Keyboard height is: ' + e.keyboardHeight);
    // container.style.height = scrollViewOffsetHeight + "px";

}
   //    window.addEventListener('native.keyboardshow', function (e) {
   //     //console.log('keyboard opened');
   // });

   window.addEventListener('native.keyboardhide', function () {

       //console.log('keyboard closed');
   });

   var mailme = function() {
       //console.log('Caught!');
   }

   window.addEventListener('error', function(e) {
       var ie = window.event || {};
       var errMsg = e.message || ie.errorMessage || "404 error on " + window.location;
       var errSrc = (e.filename || ie.errorUrl) + ': ' + (e.lineno || ie.errorLine);
       mailme([errMsg, errSrc]);
   }, true);


  });

  $interval(checkConnection, 1000)
  function checkConnection() {
      var networkState = navigator.network.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown';
      states[Connection.ETHERNET] = 'Ethernet';
      states[Connection.WIFI]     = 'WiFi';
      states[Connection.CELL_2G]  = '2G';
      states[Connection.CELL_3G]  = '3G';
      states[Connection.CELL_4G]  = '4G';
      states[Connection.NONE]     = 'None';

      window.localStorage.networkType = states[networkState];
      $rootScope.networkType = window.localStorage.networkType;
      // //console.log('Connection type: ' + window.localStorage.networkType);
  }

})

DoctorQuickApp.run(function($state,$ionicPlatform,$window, $rootScope,$ionicHistory, $ionicConfig, $ionicPlatform,$interval,$localStorage,$ionicLoading, $cordovaDevice, $timeout,$injector,$ionicHistory, $cordovaKeyboard, $cordovaNetwork, $ionicPopup) {
  $ionicPlatform.on("deviceready", function(){

          var deviceID = device.uuid;
          window.localStorage.deviceID=deviceID;
          //console.log(window.localStorage.deviceID);

          var deviceHardwareSerial = device.serial;
          window.localStorage.serial=deviceHardwareSerial;
          // //console.log(window.localStorage.serial);
          // //console.log(deviceHardwareSerial);
          var manufacturer = device.manufacturer;
          window.localStorage.manufacturer=manufacturer;

          var model = device.model;
          window.localStorage.model=model;

          if (ionic.Platform.isAndroid()) {
              window.addEventListener("native.hidekeyboard", function () {
                  StatusBar.hide();
                  window.AndroidFullScreen.immersiveMode(false, false);
              });
          }
          else {
          //console.log("localStorage previous value",window.localStorage.sendPrescTo);
          $localStorage.sendPrescTo = "";
          //console.log("localStorage after value",window.localStorage.sendPrescTo);
          }
          //
          if(window.StatusBar){
          // StatusBar.styleDefault();
            // StatusBar.overlaysWebView(true);
            StatusBar.hide();
          }

          if (window.Connection){
            if (navigator.connection.type == Connection.NONE)
            {

            //console.log("Internet is disconnected on your device");
            };
          };

          function successFunction() {
          console.info("It worked!");
          }
          function errorFunction(error){
          console.error(error);
          }
          function trace(value){
          //console.log(value);
          }

          //-------------------------------------ONESIGNAL PUSH SETUP---------------------

          window.FirebasePlugin.onTokenRefresh(function(token) {
      // save this server-side and use it to push notifications to this device

              console.log(token);
          }, function(error) {
              console.error(error);
          });

          window.FirebasePlugin.onNotificationOpen(function(notification) {
                console.log(notification);
                  console.log(notification.tap);

                  if($ionicHistory.currentStateName() === 'templates.patientRequest' || $ionicHistory.currentStateName() === 'templates.sendPrescription' || $ionicHistory.currentStateName() === 'templates.prescription' || $ionicHistory.currentStateName() === 'templates.testPrescription' || $ionicHistory.currentStateName() === 'templates.medicationForPatient' || $ionicHistory.currentStateName() === 'templates.diagnosisForPatient'){
                    console.log('Current View:',$ionicHistory.currentStateName());
                  }
                  else{
                        if(notification.tap)
                        {
                            console.log('notification tapped');
                        }
                        else {

                          var confirmPopup = $ionicPopup.confirm({
                                 // title: 'Low Balance',
                                 template: '<center>You have a New Consultation Request</center> ',
                                 cssClass: 'videoPopup',
                                 buttons: [
                                   {
                                     text: 'OK',
                                     type: 'button-positive',
                                     onTap: function(e) {
                                       console.log('OK TAPPED');
                                       $ionicHistory.nextViewOptions({
                                         disableAnimate: true,
                                         disableBack: true
                                       });
                                       $state.go('templates.doctor_home',{}, {location: "replace", reload: false});
                                     }
                                   },
                                   {
                                     text: 'Cancel',
                                     type: 'button-royal',
                                     onTap: function(e) {
                                       console.log("do nothing");
                                     }
                                   },

                                 ]
                               });

                        }
                  }


                //$state.go('app.patient_profile');
            }, function(error) {
                console.error(error);
            });



          //-------------------------------------ONESIGNAL PUSH SETUP---------------------

          $rootScope.deviceAndroid = ionic.Platform.isAndroid();
          $rootScope.deviceIOS = ionic.Platform.isIOS();

          if($rootScope.deviceIOS){
          //console.log("iosDevice:",$rootScope.deviceIOS);
          }

          // if(window.localStorage.doctororpatient === "doctor" ){
          //
          //   // alert(window.localStorage.sendPrescTo);
          //
          //     if($rootScope.deviceIOS === true){
          //       if($localStorage.sendPrescTo != ''){
          //         //console.log("iosDevice:");
          //         //console.log("iospatient:",window.localStorage.sendPrescTo);
          //         $state.go('templates.sendPrescription',{"reqPat": $localStorage.sendPrescTo},{location: "replace", reload: false});
          //         return '/templates/sendPrescription';
          //       }
          //     }
          //
          //
          // }
          //
          // else{
          // //do nothing
          // //console.log('UNDEFINED');
          // }


          $timeout( function() {
              // $localStorage.sendPrescTo='';
                  if($localStorage.sendPrescTo != ''){
                    Storage.showConnecting = false;
                    $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><br><br>Please Wait',
                    duration:5000
                    });
                    console.log("iospatient:",$localStorage.sendPrescTo);
                    $state.go('templates.sendPrescription',{"reqPat": $localStorage.sendPrescTo},{location: "replace", reload: false});
                    return '/templates/sendPrescription';
                  }

          }, 0);


          var permissions = cordova.plugins.permissions;
          // permissions.requestPermission(permissions.READ_CONTACTS, success, error);

          permissions.requestPermission(permissions.CAMERA, success, error);
          permissions.requestPermission(permissions.RECORD_AUDIO, success, error);

          function error() {
          console.warn('Turned on the permission');
          }

          function success( status ) {
          if( !status.hasPermission ) error();
          }

          //-------------------------------------ANALYTICS SETUP---------------------
            // window.ga.startTrackerWithId('UA-114659588-1')
             //  window.ga.startTrackerWithId('UA-114659588-1', 1, function(msg){
             //    window.ga.trackView('Index.html');
             //  });
             // window.ga.setAllowIDFACollection(true)
             // // window.ga.trackEvent('Request', 'Click', 'sendrequesttoonlinedoctors',1)// Label and Value are optional, Value is numeric
             // // window.ga.debugMode();
             // window.ga.enableUncaughtExceptionReporting(true, gasuccess, gaerror)
             // function gasuccess() {
             // console.info("Google Analytics working");
             // }
             // function gaerror(error){
             // console.error(error);
             // }
             // window.ga.trackView('Profile');
             // window.ga.trackView('specialityDetailsNew');
          //-------------------------------------ANALYTICS SETUP---------------------


  });

  // document.addEventListener("deviceready", (function() {
  //   window.localStorage.AppVersion=AppVersion.build;
  // }), false);
  //

  //cordova event handling
  document.addEventListener('deviceready', function () {
    //console.log('splash hidden');
    navigator.splashscreen.hide();
  });
  document.addEventListener("resume", onResume, false);
  function onResume() {

        setTimeout(function() {
        //console.log('resume');
              // $state.go("templates.doc_profile");//working
              // $state.go($state.current, {}, { reload: true, inherit: false, notify: true });
            //
        }, 0);
  }

  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams,$localStorage){

  $rootScope.previousState = fromState;
  //console.log(toState.name.indexOf('app.patient_home'));
  //console.log(toState.name.indexOf());
  if(toState.name.indexOf('auth.loginNew') > -1)
  {

      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      // $ionicConfig.views.transition(none);
      // If it's ios, then enable swipe back again
      if(ionic.Platform.isIOS())
      {
          $ionicConfig.views.transition('none');
          $ionicConfig.views.swipeBackEnabled(false);
      }
      else{
          $ionicConfig.views.transition('platform');
      }
      //console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
  }
  //console.log(toState.name);
  //console.log(fromState.name);

//to stop back from update view
  if(!$rootScope.previousState && toState.name === "templates.doctor_home"){
    //console.log('this is it');
    $state.go('templates.sendPrescription',{}, {location: "replace", reload: false});
  }

  if(!$rootScope.previousState && toState.name === "templates.doctor_home"){
    //console.log('this is it');
    $state.go('templates.sendPrescription',{}, {location: "replace", reload: false});
  }

  if(toState.name === "templates.prescription" && fromState.name ==="templates.consulted_patient") {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
    disableBack: true,
    historyRoot: true
    });
    $state.go("templates.doctor_home");
  }
  if (toState.name != "templates.invite_reviews") {
    $rootScope.inviteButton = false;
    $rootScope.hideSideMenu = true;
  }

  if (toState.name === "templates.doctor_home") {
    $rootScope.showNotification = true;
    	$rootScope.showBadge=true;
    // $rootScope.hideSideMenu = true;
  }
  if (toState.name != "templates.doctor_home") {
    $rootScope.showBackBtn=false;
    // $rootScope.hideSideMenu = true;
  }
  if (toState.name == "app.patient_summary") {
    // $rootScope.hideSideMenu = true;
    //console.log('summary');
  }
  if( fromState.name === "templates.doctor_home"){
    //console.log('this is it');
    $rootScope.specialdata=null;
    $rootScope.genderdata= null;
    $rootScope.statusdata=null;
    $rootScope.languagedataselected=null;

    $rootScope.specialityList.sex = "";
    $rootScope.specialityList.search = "";
    $rootScope.specialityList.stat = "";
    $rootScope.specialityList.language = "";

    var specialitywise = "";
    var catwise = "";
    var genderwise = "";
    var languagewise = "";

  }
  //console.log($rootScope.previousState.name);
  $ionicPlatform.registerBackButtonAction(function (event){
      //console.log($state.$current.name);
      if (( $rootScope.previousState.name==="templates.diagnosisForPatient" || $rootScope.previousState.name === "templates.medicationForPatient") || $rootScope.previousState.name ==="templates.patientTests"){
            // alert('route to home page and set the root to homepage');

            $rootScope.completeConsultation = $ionicPopup.show({
            template: "<div >Please send the prescription to complete the consultation</b></div>",
            cssClass: 'requestPopup',
            buttons: [
            {
            text: 'Ok',
            type: 'button-royal',
            onTap:function(){
            //console.log('cancel');
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
            });
            // $state.go('templates.doctor_home',{}, {location: "replace", reload: false})
            }
            },
            ]
            });

      }
      else if($rootScope.previousState.name === "app.patient_summary" || $rootScope.previousState.name === "app.callAccepted"){
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
            });
            $state.go("app.patient_home");
      }
      else if($rootScope.previousState.name === "templates.prescription" && $state.$current.name === "templates.consulted_patient"){
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
          });
          $state.go("templates.doctor_home");
      }
      else if($state.$current.name === "templates.prescription"){
            $rootScope.prescriptioAlert = $ionicPopup.show({
            // title:"Alert!!!",
            template: "<div >Please send the prescription to the Patient</b></div>",
            cssClass: 'requestPopup',
            buttons: [
            {
            text: 'Ok',
            type: 'button-royal',
            onTap:function(){
            //console.log('cancel');
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
            });
            // $state.go('templates.doctor_home',{}, {location: "replace", reload: false})
            }
            },
            ]
            });
      }
      else if($state.$current.name === "templates.sendPrescription"){

          $state.go("templates.doctor_home")

      }
      else if($rootScope.previousState.name === "templates.sendPrescription"){

          $state.go("templates.doctor_home")

      }
      else if($state.$current.name === "templates.doctor_home"){
        // $ionicHistory.nextViewOptions({
        //     disableBack: true,
        //     disableAnimate: true,
        //     historyRoot: true
        // });
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
          $rootScope.inviteButton = false;
          // window.location.reload();

          $state.go("templates.doctor_home")

      }

      else if($state.$current.name === "app.patient_home"){
        //console.log('reload homepage');
        // $ionicHistory.nextViewOptions({
        //     disableBack: true,
        //     disableAnimate: true,
        //     historyRoot: true
        // });
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
          $state.go($state.$current)
      }
      else if($state.$current.name === "auth.loginNew"){
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          // $ionicHistory.nextViewOptions({
          // disableAnimate: true,
          // disableBack: true
          // });

          $state.go("auth.loginNew")
      }

      else if($state.$current.name === 'app.searchDoctors'){
            //console.log('clear search values here');
            $rootScope.specialdata=null;
            $rootScope.genderdata= null;
            $rootScope.statusdata=null;
            $rootScope.languagedataselected=null;

            $rootScope.specialityList.sex = "";
            $rootScope.specialityList.search = "";
            $rootScope.specialityList.stat = "";
            $rootScope.specialityList.language = "";

            var specialitywise = "";
            var catwise = "";
            var genderwise = "";
            var languagewise = "";

            // //console.log($scope.specialdata);
            window.history.back();

      }

      else {
        //console.log('goback to prev view');
        //console.log($state.$current-1);
          // For all other states, the H/W BACK button is enabled
          // navigator.app.backHistory();
          window.history.back();
          // window.history.go(-(history.length - 1));
          // $ionicHistory.goBack();
      }
  }, 1000);

  });
  })


  DoctorQuickApp.config(['$provide', '$httpProvider', function($provide, $httpProvider) {
      $httpProvider.interceptors.push('RequestsErrorHandler');

      // --- Decorate $http to add a special header by default ---

      function addHeaderToConfig(config) {
          config = config || {};
          config.headers = config.headers || {};

          // Add the header unless user asked to handle errors himself
          if (!specificallyHandleInProgress) {
              config.headers[HEADER_NAME] = true;
          }

          return config;
      }

      // The rest here is mostly boilerplate needed to decorate $http safely
      $provide.decorator('$http', ['$delegate', function($delegate) {
          function decorateRegularCall(method) {
              return function(url, config) {
                  return $delegate[method](url, addHeaderToConfig(config));
              };
          }

          function decorateDataCall(method) {
              return function(url, data, config) {
                  return $delegate[method](url, data, addHeaderToConfig(config));
              };
          }

          function copyNotOverriddenAttributes(newHttp) {
              for (var attr in $delegate) {
                  if (!newHttp.hasOwnProperty(attr)) {
                      if (typeof($delegate[attr]) === 'function') {
                          newHttp[attr] = function() {
                              return $delegate[attr].apply($delegate, arguments);
                          };
                      } else {
                          newHttp[attr] = $delegate[attr];
                      }
                  }
              }
          }

          var newHttp = function(config) {
              return $delegate(addHeaderToConfig(config));
          };

          newHttp.get = decorateRegularCall('get');
          newHttp.delete = decorateRegularCall('delete');
          newHttp.head = decorateRegularCall('head');
          newHttp.jsonp = decorateRegularCall('jsonp');
          newHttp.post = decorateDataCall('post');
          newHttp.put = decorateDataCall('put');

          copyNotOverriddenAttributes(newHttp);

          return newHttp;
      }]);
  }])

DoctorQuickApp.config(function( $ionicConfigProvider) {
       $ionicConfigProvider.navBar.alignTitle('center');
       // $ionicConfigProvider.views.transition('platform');
       $ionicConfigProvider.views.transition('none')
       $ionicConfigProvider.backButton.previousTitleText(false).text('');
       // $ionicConfigProvider.scrolling.jsScrolling(true);
});

DoctorQuickApp.config(function($stateProvider, $httpProvider,$urlRouterProvider, $ionicConfigProvider,USER_ROLES) {
// $ionicConfigProvider.navBar.alignTitle('left')
  //INTRO
  $httpProvider.defaults.timeout = 60000;
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // $httpProvider.interceptors.push('Interceptor');
  $httpProvider.interceptors.push(function($q,$injector,$localStorage,$rootScope) {
    return {
          request: function (config) {
              //config.cache = true;
              // config.timeout = 30000;
              return config;
          },
          responseError: function (rejection,response) {
            //console.log(rejection);
            //console.log(response);

            $rootScope.$watchCollection('[networkType, online]', function(newValues, oldValues){
                // do stuff here
                // newValues and oldValues contain the new and respectively old value
                // of the observed collection array
                //console.log('newValues',newValues[0],newValues[1]);
                //console.log('oldValues',oldValues[0],oldValues[1]);

            });


            $rootScope.$watch('networkType', function(newValue, oldValue){
              // //console.log($injector.get("$localStorage").networkType);
              //console.log('newValue',newValue);
              //console.log('oldValue',oldValue);
              //console.log($rootScope.online);

                   if (newValue ==='None' || newValue ==='Unknown' || newValue ==='Ethernet' ) {
                      //  $rootScope.online=$rootScope.online;
                        // $injector.get("$state").reload()
                   }
                   // else if( newValue ==='2G'){
                   //   $injector.get("$state").reload();
                   // }
                   // else if( newValue ==='2G' && oldValue ==='2G'){
                   //   $injector.get("$ionicLoading").hide();
                   // }
                   else{
                     $injector.get("$ionicLoading").hide();
                     // $injector.get("$state").reload();


                   }
                  // else if(newValue == false && oldValue == false || newValue == true && oldValue == true){
                  //    //console.log('on');
                  //  }else{
                  //    //console.log('offf');
                  //
                  //  }
               });
               //console.log(rejection.status);

              switch (rejection.status) {
                  // case 0 :  var $http = $injector.get('$http');//for retry condition
                  //           return $http(response.config);
                  //         break;
                  case -1 :
                      //console.log('connection timed out!');
                      if($injector.get("$state").$current.name === "auth.loginNew"){
                        //console.log('loginview');
                        // $injector.get("$ionicLoading").show({
                        //       template: '<ion-spinner></ion-spinner><br><br>Logging into DoctorQuick',
                        //       duration:30000
                        //     });
                              //console.log($injector.get("$state").$current.name);

                                // window.location = "noresponse.html";
                                // $injector.get("$ionicLoading").show({
                  						  //       template: '<ion-spinner></ion-spinner><br><br>Recovering lost connection',
                  						  //     });
                      }
                      else{

                        $injector.get("$ionicLoading").show({
                              template: 'Recovering lost connection',
                            });

                            // $injector.get("$ionicLoading").hide();
                            // $injector.get("$ionicLoading").hide().then(function(){
                            // //console.log("The loading indicator is now hidden");
                            // // $injector.get("$ionicLoading").show({
                            // //       template: '<ion-spinner ></ion-spinner><br><br>Recovering lost connection',
                            // //     });
                            //
                            // });
                      }
                      break;
                  case 404 :
                      //console.log('Error 404 - not found!');

                      break;
                  case 408 :
                      //console.log('Timeout');
                      $injector.get("$ionicPopup").confirm({
                            // title: 'Unable to reach DoctorQuick servers',
                            template: '<center>Unable to reach DoctorQuick servers. Please check your connection and try again</center>',
                            cssClass: 'videoPopup',
                            // scope: $scope,
                            buttons: [
                              {
                                text: 'OK',
                                type: 'button-royal',
                                onTap: function(e) {
                                //console.log('ok');
                                 //console.log(window.localStorage.doctororpatient);
                                 if(window.localStorage.doctororpatient === "patient"){
                                   $injector.get("$state").go("app.patient_home");
                                 }
                                 else{
                                   $injector.get("$state").go("templates.doctor_home");
                                 }

                                }
                              },
                            ]
                          });

                      break;
              }
              return $q.reject(rejection);
          }
      }
    });



  $stateProvider
  .state('splash',{
    url:'/splash',
    templateUrl:'splash.html',
    controller : 'splashCtrl'
  })
  .state('auth', {
    cache : false,
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.loginNew', {
    cache : false,
    url: '/loginNew',
    templateUrl: "views/auth/loginNew.html",
    controller : 'LoginCtrl'
  })

  .state('auth.getPassword', {
    cache : false,
    url: "/getPassword",
    templateUrl: "views/auth/getPassword.html",
    controller: 'ForgotPasswordCtrl'
  })
  .state('auth.terms', {
    cache : false,
    url: "/terms",
    templateUrl: "views/auth/terms.html"
  })




//newly added for Doctor
$stateProvider
.state('auth.doctorRegistration', {
  cache : false,
  url: "/doc_reg1",
  templateUrl: "views/auth/doc_reg1.html"

})
.state('auth.doctorRegistration2', {
  cache : false,
  url: "/doc_reg2",
  templateUrl: "views/auth/doc_reg2.html"
  })

//Patient
.state('auth.patient_reg1', {
  cache : false,
  url: "/patient_reg1",
  templateUrl: "views/auth/patient_reg1.html"

})

.state('auth.patient_reg2', {
  cache : false,
  url: "/patient_reg2",
  templateUrl: "views/auth/patient_reg2.html"

})

.state('auth.patient_reg3', {
  cache : false,
  url: "/patient_reg3/:pateientPhone",
  templateUrl: "views/auth/patient_reg3.html"

})

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/patient-side-menu.html"

  })

  .state('app.patient_home', {
    cache : false,
    url: "/patientScreens",
    // abstract: true,
    views: {
      'menuContent': {
        templateUrl: "views/app/patient_home.html",
        controller: 'patientHomeCtrl'

      }
    }
  })


  .state('app.patient_profile', {
    url: "/patient_profile",
    views: {
      'menuContent': {
        templateUrl: "views/app/patient_profile.html",
        controller:'patientProfileCtrl'
      }
    }
  })

  .state('app.changePassword_patient', {
    url: "/changePassword_patient",
    views: {
      'menuContent': {
        templateUrl: "views/app/changePassword_patient.html",
        controller:'updatePatientDetailsCtrl'

      }
    }
  })

  .state('app.changeEmail_patient', {
    url: "/changeEmail_patient",
    views: {
      'menuContent': {
        templateUrl: "views/app/changeEmail_patient.html",
        controller:'updatePatientDetailsCtrl'

      }
    }
  })
  //my_doctors
  .state('app.my_doctors', {
    url: "/my_doctors",
    views: {
      'menuContent': {
        templateUrl: "views/app/my_doctors.html",
        controller:'myDoctorCtrl'

      }
    }
  })
//myconsultations

.state('app.my_consultations',{
  url: "/my_consultations",
  views: {
    'menuContent': {
      templateUrl: "views/app/my_consultations.html",
      controller:'myconsultationsCtrl'
    }
  }
})

.state('app.patient_summary', {
  cache : false,
  url: "/patient_summary/:calledDoctor/:consultId",
  views: {
    'menuContent': {
      templateUrl: "views/app/patient_summary.html",
      controller:'consultSummaryCtrl'
    }
  }
})

//patientPayments
.state('app.patient_payments', {
  url: "/patient_payments",
  views: {
    'menuContent': {
      templateUrl: "views/app/patient_payments.html",
      controller:'patientpaymentCtrl'
    }
  }
})
//refund
.state('app.refund_patient', {
  url: "/refund_patient/:credit/:debit",
  views: {
    'menuContent': {
      templateUrl: "views/app/refund_patient.html",
      controller:'patientRefundCtrl'
    }
  }
})
//topup
.state('app.patient_topup', {
  url: "/patient_topup",
  views: {
    'menuContent': {
      templateUrl: "views/app/patient_topup.html",
      controller:'patientTopupCtrl'
    }
  }
})
//customercare patient
.state('app.patient_customercare', {
  url: "/patient_customercare",
  views: {
    'menuContent': {
      templateUrl: "views/app/patient_customercare.html",
      controller:'patientCareCtrl'
    }
  }
})

.state('app.termsOfuse', {
  url: "/termsOfuse",
  views: {
    'menuContent': {
      templateUrl: "views/app/termsOfuse.html",
      controller:'termsCtrl'
    }
  }
})

//medical_speciality
.state('app.medical_speciality', {
  url: "/medical_speciality",
  views: {
    'menuContent': {
      templateUrl: "views/app/medical_speciality.html",
      controller:"specilityListCtrl"
    }
  }
})
.state('app.subPatientList', {
  cache : false,
  url: "/subPatientList",
  views: {
    'menuContent': {
      templateUrl: "views/app/subPatientList.html",
      controller:'addNewPatientCtrl'
    }
  }
})

.state('app.addSubPatient', {
  cache : false,
  url: "/addSubPatient",
  views: {
    'menuContent': {
      templateUrl: "views/app/addSubPatient.html",
      controller:'addNewPatientCtrl'
    }
  }
})
.state('app.editPatient', {
  cache : false,
  url: "/editPatient",
  views: {
    'menuContent': {
      templateUrl: "views/app/editPatient.html",
      controller:'editPatientCtrl'
    }
  }
})

//doctore screens
  .state('app.specialityDetailsNew', {
    url: "/specialityDetailsNew",
    views: {
      'menuContent': {
        templateUrl: "views/app/specialityDetailsNew.html",
        controller:'specilityDetailsCtrl'

      }
    }
  })

//search
.state('app.searchDoctors', {
  url: "/searchDoctors",
  views: {
    'menuContent': {
      templateUrl: "views/app/searchDoctorNew.html",
      controller:"SearchCtrl"

    }
  }
})


  .state('app.doctorsearch', {
    url: "/doctorsearch",
    views: {
      'menuContent': {
        templateUrl: "views/app/searchresultbydoctor.html",
        controller:"searchDoctorsController"

      }
    }
  })


  //doctor profile
    .state('app.results', {
      url: "/results",
      views: {
        'menuContent': {
          templateUrl: "views/app/results.html",
          controller:"searchDoctorsController"
        }
      }
    })

//doctor profile
  .state('app.viewdoctor_profile', {
    url: "/viewdoctor_profile/:rates/:totalRates",
    views: {
      'menuContent': {
        templateUrl: "views/app/viewdoctor_profile.html",
        controller: 'doctorprofileCtrl'
      }
    }
  })

  .state('app.capture', {
    url: "/capture",
    views: {
      'menuContent': {
        templateUrl: "views/app/capture.html"

      }
    }
  })

  .state('app.callAccepted', {
    cache : false,
    url: "/callAccepted/:accptdDoc/:callId/:callFlag",
    views: {
      'menuContent': {
        templateUrl: "views/app/callAccepted.html",
        controller:'callAcceptedCtrl'

      }
    }
  })

  .state('templates', {
    url: "/templates",
    abstract: true,
    templateUrl: "views/templates/doc-sidemenu.html",
    controller: 'doctorScreensCtrl'
  })

  .state('templates.loadingDoctor', {
    url: "/loadingDoctor",
    views: {
      'menuContent': {
        templateUrl: "views/templates/loadingDoctor.html",
          controller: 'loadingDoctor'
      }
    }
  })

  .state('templates.doctor_home', {
    url: "/doctor_home",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doctor_home.html",
          controller: 'doctorScreensCtrl'
      }
    }
  })
  .state('templates.testPrescription', {
    url: "/testPrescription",
    views: {
      'menuContent': {
        templateUrl: "views/templates/testPrescription.html",
      }
    }
  })

  .state('templates.doc_profile', {
    url: "/doc_profile",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doc_profile.html",
        controller:'docProfileCtrl'
      }
    }
  })

  .state('templates.changeEmail_doctor', {
    url: "/changeEmail_doctor",
    views: {
      'menuContent': {
        templateUrl: "views/templates/changeEmail_doctor.html",
        controller:'updateDoctorDetailsCtrl'

      }
    }
  })

  .state('templates.doc_acc_statement', {
    url: "/doc_acc_statement",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doc_acc_statement.html",
        controller:'docAccStatementCtrl'
      }
    }
  })
  .state('templates.consulted_patient', {
    url: "/consulted_patient",
    views: {
      'menuContent': {
        templateUrl: "views/templates/consulted_patient.html",
        controller:'myconsultationsCtrl'
      }
    }
  })

  .state('templates.viewPatientRequest', {
    url: "/viewPatientRequest/:reqId/:reqPat/:reqTime",
    views: {
      'menuContent': {
        templateUrl: "views/templates/patientRequestfromPush.html",
          controller: 'patientrequestCtrl'
      }
    }
  })

  .state('templates.patientRequest', {
    url: "/patientRequest/:reqId/:reqPat/:reqTime",
    views: {
      'menuContent': {
        templateUrl: "views/templates/patientRequestfromdocotor.html",
          controller: 'patientrequestCtrl'
      }
    }
  })

  .state('templates.doc-customercare', {
    url: "/doc_customercare",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doc-customercare.html",
          controller:'doctorCareCtrl'
      }
    }
  })

/* serach results by patients */

  .state('templates.invite_reviews', {
    url: "/invite_reviews/:countofselected",
    views: {
      'menuContent': {
        templateUrl: "views/templates/invite_reviews.html",
        controller:'contactsCtrl'
      }
    }
  })


  .state('templates.requestAccepted', {
    url: "/requestAccepted",
    views: {
      'menuContent': {
        templateUrl: "views/templates/requestAccepted.html",
        controller:"callAccptCtrl"
      }
    }
  })

  .state('templates.prescription', {
    cache : false,
    url: "/notesForPatient/:reqPat",
    views: {
      'menuContent': {
        templateUrl: "views/templates/prescription.html",
        controller:'notesCtrl'
      }
    }
  })


  .state('templates.sendPrescription', {
    cache : false,
    url: "/sendPrescription/:reqPat",
    views: {
      'menuContent': {
        templateUrl: "views/templates/sendPrescription.html",
        controller:'notesCtrl'
      }
    }
  })

  .state('templates.diagnosisForPatient', {
    url: "/diagnosisForPatient/:ptFname/:ptLname/:ptImage/:ptPh",
    views: {
      'menuContent': {
        templateUrl: "views/templates/diagnosisForPatient.html",
        controller:'diagnosisCtrl'

      }
    }
  })

  .state('templates.medicationForPatient', {
    url: "/medicationForPatient/:ptFname/:ptLname/:ptImage/:ptPh",
    views: {
      'menuContent': {
        templateUrl: "views/templates/medicationForPatient.html",
        controller:'medicationCtrl'
      }
    }
  })

  .state('templates.patientTests', {
    url: "/patientTests/:ptFname/:ptLname/:ptImage/:ptPh",
    views: {
      'menuContent': {
        templateUrl: "views/templates/patientTests.html",
        controller:'patientTestsCtrl'
      }
    }
  })


  .state('templates.inviteresult', {
    url: "/inviteresult",
    views: {
      'menuContent': {
        templateUrl: "views/templates/inviteresult.html",
        controller : 'inviteresultCtrl'
      }
    }
  })

  .state('templates.termsOfUse', {
    url: "/termsOfUse",
    views: {
      'menuContent': {
        templateUrl: "views/templates/termsOfUse.html",
        controller:'termsCtrl'
      }
    }
  })

  .state('templates.video', {
    url: "/video",
    views: {
      'menuContent': {
        templateUrl: "views/templates/video.html",
        controller:'videoCtrl'
      }
    }
  })

  .state('templates.updatePassword', {
    url: "/updatePassword",
    views: {
      'menuContent': {
        templateUrl: "views/templates/updatePassword.html",
        controller:'updateDoctorDetailsCtrl'
      }
    }
  })
;

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/auth/loginNew');
  $urlRouterProvider.otherwise(function($injector,$localStorage,$window,$location,$rootScope) {

    var $state = $injector.get('$state');
    var Storage = $injector.get('$localStorage');
    var rootScope = $injector.get('$rootScope');

    //console.log(window.localStorage.doctororpatient);
    //console.log(window.localStorage.doctororpatient);

    if(window.localStorage.doctororpatient === 'doctor'){
      Storage.showConnecting = true;
      console.log('window.localStorage.sendPrescTo::',window.localStorage.sendPrescTo);

      if(Storage.sendPrescTo){
        // alert('route to presc')
        Storage.showConnecting = false;
        $state.go('templates.sendPrescription',{"reqPat": Storage.sendPrescTo},{location: "replace", reload: false});
        return '/templates/sendPrescription';
        Storage.sendPrescTo='';
      }
      else{
        console.log("normal routing");
        return '/templates/doctor_home';

      }
    }
    else if(window.localStorage.doctororpatient === 'patient'){
      Storage.showConnecting = true;
      return '/app/patientScreens';
    }
    else{
      Storage.showConnecting = false;
      return '/auth/loginNew';
    }

  });


});
