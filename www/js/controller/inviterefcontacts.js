DoctorQuickApp.controller('inviterefcontacts', function($scope,$filter,$rootScope, $cordovaContacts,$window, $state,$stateParams, $ionicLoading, $timeout, invitereviews){
    $scope.toggle = true;
    $rootScope.headerTxt="Refer A Friend";
    $rootScope.showBackBtn=true;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;
    $rootScope.hideSideMenu = false;
    $rootScope.inviteButton = true;


  $scope.allcontactsforref = [];
  $rootScope.contact3 = {};
  $rootScope.contact4 = {};


  console.log('this js file  called');

$scope.allcontactsforref.checked = false;


    $rootScope.allContacts6 = invitereviews.getinvitecontacts();


      console.log('THE LIST OF CONATCTS IS:');
      console.log($rootScope.allContacts6);

      for (var i = 0; i < $rootScope.allContacts6.length; i++) {

          $rootScope.contact3 = $rootScope.allContacts6[i];

          console.log('THE RESPONSE IS:');

          console.log($rootScope.contact3);

      }

    // $rootScope.contact1 = angular.fromJson($window.localStorage['allDeviceContacts']);

    invitereviews.getonlysinglecontactforios($rootScope.contact3).then(function(response){
      // window.localStorage['allDeviceContacts'] = angular.toJson(response);
          $rootScope.contact4 = response;
          console.log('AFTER RESPONSE');

          console.log($rootScope.contact4);

           $ionicLoading.hide();


    }).catch(function(error){
    console.log('failure data', error);
    })


    angular.forEach($rootScope.contact4, function(value,key) {
           $rootScope.con.checked = $rootScope.allcontactsforref.checked;
           console.log($rootScope.con.checked);


         });


           $rootScope.allContactsSelected=[];
           window.localStorage['allConatctsFetchedrefered']=angular.toJson($rootScope.allContactsSelected);

    $scope.checkAllref = function(checkedvalueforall)
    {

          console.log('Check this line after');
          console.log(checkedvalueforall);

          var toggleStatus = checkedvalueforall;


          if(toggleStatus)
          {


            angular.forEach($rootScope.contact4, function(itm)
            {

              itm.selected = toggleStatus;
                // i++;
                console.log(itm.value);
                $rootScope.allContactsSelected.push(itm.value);
                window.localStorage['allConatctsFetchedrefered'] = angular.toJson($rootScope.allContactsSelected);

            });



          }
          else {

            $rootScope.allContactsSelected=[];
            window.localStorage['allConatctsFetchedrefered'] = angular.toJson($rootScope.allContactsSelected);

            angular.forEach($rootScope.contact4, function(itm)
            {
              console.log(itm);

              itm.selected = toggleStatus;
            });


          }

          if(i>0)
          {
            $ionicLoading.hide();

          }



    }


      $rootScope.selectedNumber=[];
      window.localStorage['numbersToSendReferal']=angular.toJson($rootScope.selectedNumber);



    $scope.optionToggled = function(checkedvalue,value){
        console.log(checkedvalue);
        console.log(value);
        if(checkedvalue)
              {

                $rootScope.selectedNumber.push(value);
                console.log($rootScope.selectedNumber);
                window.localStorage['numbersToSendReferal'] = angular.toJson($rootScope.selectedNumber);


              }
              else {

                  var index = $rootScope.selectedNumber.indexOf(value);
                  $rootScope.selectedNumber.splice(index, 1);
                    window.localStorage['numbersToSendReferal'] = angular.toJson($rootScope.selectedNumber);



              }
        $scope.allcontacts = $rootScope.contact4.every(function(itm){
        var togglevaue;
        return itm.selected;
        })

    }


});
