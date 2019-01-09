DoctorQuickApp.controller('inviteToDqCtrl', function($scope,$state,$rootScope,$stateParams,$ionicPlatform,  $cordovaContacts ,$localStorage,$ionicLoading,$ionicPopup,$window,invitereviews,referalService,referalService,IonicClosePopupService){


  $scope.toggle = true;
  $rootScope.headerTxt="Refer A Friend";
  $rootScope.showBackBtn=true;
  $rootScope.showNotification=false;
  $rootScope.showBadge=false;
  // $rootScope.hideSideMenu = true;
  $rootScope.inviteButton = false;

  $scope.count = $stateParams.countofselected;
  $scope.cc ={};
  $scope.contacts = {};

  referalService.referalCode(window.localStorage.user).then(function(response){
    $rootScope.refCode=response;
    console.log($rootScope.refCode);
    window.localStorage.refCode=$rootScope.refCode;
  }).catch(function(error){
  console.log('failure data', error);
  });



  console.log(window.localStorage.refCode);

  // var permissions = cordova.plugins.permissions;
  // permissions.requestPermission(permissions.READ_CONTACTS, success, error);
  // function error() {
  // console.warn('Turned on the permission');
  // }
  //
  // function success( status ) {
  // if( !status.hasPermission ) error();
  // }


  $scope.patientProfile = angular.fromJson($window.localStorage['patientDetails']);
  console.log($scope.patientProfile);
  var data = $scope.patientProfile;
  for(var i=0; i<data.length; i++){

    $rootScope.patientFname=data[i].patientFname;
    $rootScope.patientLname=data[i].patientLname;
  }
  console.log($rootScope.patientFname, $rootScope.patientLname);



  $scope.query = " wants you to use DoctorQuick for consulting a Doctor online from your smart phone. Use referal code "+window.localStorage.refCode+" to get a first consultation free.\n";
  $scope.tiny='https://appurl.io/jpwavzgm';

$scope.query =$rootScope.patientFname+" "+$rootScope.patientLname+$scope.query+$scope.tiny;
console.log($scope.query);



  // $scope.query=$scope.query window.localStorage.docTinyUrl;
  $scope.showAlert= function(){

    var options = {
      message: $scope.query, // not supported on some apps (Facebook, Instagram)
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    var onSuccess = function(result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }

    var onError = function(msg){
      console.log("Sharing failed with message: " + msg);
    }

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

  }
  $scope.Savedata = function()
  {

  var confirmPopup = $ionicPopup.show({
         template: '<center>You can send Review invites<br>through DoctorQuick or you<br>can use your own device apps.</center> ',
         cssClass: 'inviteReviewPopup',
         scope: $scope,
         buttons: [
           {
             text: 'DoctorQuick',
             type: 'button-positive',
             onTap: function(e) {
                    $rootScope.hideSideMenu = false;

                    $ionicLoading.show({
                       template: '<ion-spinner></ion-spinner><br><p>Fetching your contacts</p>'
                   });
                   var options = {};
                   options.multiple = true;
                   options.hasPhoneNumber = true;
                   options.fields = ['name.formatted', 'phoneNumbers'];
                   $cordovaContacts.find(options).then(function(result) {
                       $scope.contacts = result;


                       var contactsWithAtLeastOnePhoneNumber = _.filter(result, function(contacts){

                              return contacts.length > 0

                       });

                       //
                       // Contacts with at least one phone number...
                       $scope.deviceContacts=contactsWithAtLeastOnePhoneNumber;
                       // $scope.deviceContacts='ravikiran';
                       console.log( $scope.deviceContacts);
                       console.log(contactsWithAtLeastOnePhoneNumber);
                       invitereviews.invitereviewpatient($scope.contacts);
                       // $state.go("templates.invite_reviews");
                       // $ionicLoading.hide();

                       $state.go("app.refer_contacts");


                   }, function(error) {
                       console.log("ERROR: " + error);
                   });
             }
           },
           {
             text: 'Other Apps',
             type: 'button-positive',
             onTap: function(e) {
               var options = {
                 message: $scope.query, // not supported on some apps (Facebook, Instagram)
                 // subject: 'the subject', // fi. for email
                 // files: ['', ''], // an array of filenames either locally or remotely
                 // url: 'https://www.website.com/foo/#bar?a=b',
                 chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
               }

               var onSuccess = function(result) {
                 console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                 console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
               }

               var onError = function(msg){
                 console.log("Sharing failed with message: " + msg);
               }

               window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
             }
           },

         ]
       });

       IonicClosePopupService.register(confirmPopup);

  }


  $scope.Cleardata = function()
  {
  $scope.cc.query = "";
  }



});
