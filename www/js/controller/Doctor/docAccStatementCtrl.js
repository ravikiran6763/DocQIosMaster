DoctorQuickApp.controller('docAccStatementCtrl', function($scope, $rootScope,$cordovaDatePicker, $ionicConfig, $localStorage, $filter, $ionicLoading,accountsService) {
  console.log('Doc Account statements');
	$rootScope.headerTxt="Account Statement";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.hideSideMenu = true;
  $rootScope.inviteButton = false;


  console.log(window.localStorage.user);
  $rootScope.from ='';
  $rootScope.toDate='';

accountsService.docAccountsBalance(window.localStorage.user).then(function(response){
    $scope.availableBalance=response;
    console.log($scope.availableBalance);
  }).catch(function(error){
  console.log('failure data', error);
});

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log(val);
        console.log('Selected from Date : ' + val, new Date(val));
        $rootScope.from = $filter('date')(new Date(val),'yyyy-MM-dd');
        accountsService.docAccountsDetails($rootScope.from);
      },

      from: new Date(2016, 1, 1), //Optional
      to: new Date(2050, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      // disableWeekdays: [0],       //Optional
      closeOnSelect: true,
      dateFormat: 'dd MMMM yyyy',      //Optional
      templateType: 'popup'       //Optional
    };
// console.log(window.localStorage.fromDate);
$rootScope.transcMsg='Select Dates';
    var ipObj2 = {
        callback: function (val) {  //Mandatory
          console.log('Selected To Date : ' + val, new Date(val));
          $rootScope.toDate = $filter('date')(new Date(val),'yyyy-MM-dd');
          accountsService.docAccountsDetails().then(function(response){
              console.log(response);
              $scope.DocAcc=response;
            if($scope.DocAcc.length === 0){
              $rootScope.transcMsg='No Transactions';
            }else{
              $rootScope.transcMsg='';
            }

              }).catch(function(error){
            console.log('failure data', error);
          });
        },

        from: new Date(2016, 1, 1), //Optional
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
         cancelButtonLabel: 'CANCEL',
         cancelButtonColor: '#ff0101',
         doneButtonLabel: 'DONE',
         doneButtonColor: '#6aa13e'

       };



      $scope.openDatePickerfrom = function(){

        $cordovaDatePicker.show(options).then(function(date){
          $rootScope.from=date;
                console.log(date);
            });
            accountsService.docAccountsDetails($rootScope.from);
        // ionicDatePicker.openDatePicker(ipObj1);
      };
    $scope.openDatePickerTo = function(){
      var options = {
         date: new Date(),
         mode: 'date', // or 'time'
         // minDate: new Date() - 10000,
         // allowOldDates: true,
         allowFutureDates: false,
         cancelButtonLabel: 'CANCEL',
         cancelButtonColor: '#ff0101',
         doneButtonLabel: 'DONE',
         doneButtonColor: '#6aa13e'

       };

      $cordovaDatePicker.show(options).then(function(date){
        $rootScope.toDate =date;
              console.log(date);
              if($rootScope.toDate){
                accountsService.docAccountsDetails().then(function(response){
                    console.log(response);
                    $scope.DocAcc=response;
                  if($scope.DocAcc.length === 0){
                    $rootScope.transcMsg='No Transactions';
                  }else{
                    $rootScope.transcMsg='';
                  }

                    }).catch(function(error){
                  console.log('failure data', error);
                });
              }
          });

      // ionicDatePicker.openDatePicker(ipObj2);
    };




})
