DoctorQuickApp.controller('inviteresultCtrl', function($scope,$state,$rootScope,$stateParams,$ionicPlatform,  $cordovaContacts ,$localStorage,$ionicLoading,$ionicPopup,invitereviews,invitereviewsresultservice,IonicClosePopupService){

  $scope.toggle = true;
  $rootScope.headerTxt="Invite Reviews";
  $rootScope.showBackBtn=true;
  $rootScope.showNotification=false;
  $rootScope.showBadge=false;
  // $rootScope.hideSideMenu = true;
  $rootScope.inviteButton = false;

  $scope.count = $stateParams.countofselected;
  $scope.cc ={};
  $scope.contacts = {};

  invitereviews.generateTinyUrl(window.localStorage.user).then(function(response){
    $rootScope.docTinyUrl=response;
    window.localStorage.docTinyUrl=$rootScope.docTinyUrl;
  }).catch(function(error){
  console.log('failure data', error);
  });
console.log(window.localStorage.docTinyUrl);

// var permissions = cordova.plugins.permissions;
// permissions.requestPermission(permissions.READ_CONTACTS, success, error);
// function error() {
// console.warn('Turned on the permission');
// }
//
// function success( status ) {
// if( !status.hasPermission ) error();
// }

  $scope.query = "Hi,\nPlease visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients. Thanks.\nClick here: ";
  $scope.tiny=window.localStorage.docTinyUrl;

$scope.query =$scope.query+$scope.tiny;
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
                   options.fields = ['givenName', 'phoneNumbers'];
                   $cordovaContacts.find(options).then(function(result) {


                       $scope.contacts = result;


                          // console.log($scope.contacts);
                          // console.log('\n');


                       var contactsWithAtLeastOnePhoneNumber = _.filter(result, function(contacts){

                         // console.log(contact.phoneNumbers.length);
                         // console.log('\n');

                           return contacts.length > 0
                       });


                       // console.log(contactsWithAtLeastOnePhoneNumber);
                       // console.log('\n');

                       //
                       // Contacts with at least one phone number...
                       $scope.deviceContacts=contactsWithAtLeastOnePhoneNumber;


                        console.log($scope.contacts.value);


                       // $scope.deviceContacts='ravikiran';
                       // console.log( $scope.deviceContacts);
                       // console.log(contactsWithAtLeastOnePhoneNumber);
                       invitereviews.invitereviewpatient($scope.contacts);
                       $state.go("templates.invite_reviews");
                       // $ionicLoading.hide();

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
