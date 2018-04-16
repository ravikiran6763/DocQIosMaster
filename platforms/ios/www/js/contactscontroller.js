DoctorQuickApp.controller('contactsCtrl', function($scope,$filter,$rootScope, $cordovaContacts, $state,$stateParams, $ionicLoading, $timeout, invitereviews){
    $scope.toggle = true;
    $rootScope.headerTxt="Invite Reviews";
    $rootScope.showBackBtn=true;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;
    $rootScope.hideSideMenu = false;
    $rootScope.inviteButton = true;



    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";

    // console.log($stateParams.countofselected);

    $rootScope.contact = {};
    $scope.phoneContacts = [];
    $rootScope.contact1 = {};

    $rootScope.uniquename = {};
     // $rootScope.con = {};
      $rootScope.allcontacts = [];



$rootScope.allcontacts.checked = false;


    $rootScope.allContacts = invitereviews.getinvitecontacts();

    console.log($rootScope.allContacts);


      for (var i = 0; i < $rootScope.allContacts.length; i++) {

          $rootScope.contact = $rootScope.allContacts[i];

      }


    invitereviews.getonlysinglecontactforios($rootScope.contact).then(function(response){
      //window.localStorage['allConatctsFetched'] = angular.toJson(response);
          $rootScope.contact1 = response;
          console.log('THIS IS FROM RESSPONSE FROM PHP');
          console.log(response);

           $ionicLoading.hide();


    }).catch(function(error){
    console.log('failure data', error);
    })



    angular.forEach($rootScope.contact1, function(value,key) {


           $rootScope.con.checked = $rootScope.allcontacts.checked;
           console.log($rootScope.con.checked);


         });



    $scope.checkAll = function()
    {

      //
      // $ionicLoading.show({
      //  template: '<p>Selecting All contacts</p>'
      // });

     console.log($rootScope.contact.length);
     console.log($scope.allcontacts);

        var toggleStatus = $scope.allcontacts;
        $rootScope.allContactsSelected=[];

        if(toggleStatus)
        {
            // var i = 0;
            angular.forEach($rootScope.contact1, function(itm)
            {
              itm.selected = toggleStatus;
                // i++;
                console.log(itm.value);
                $rootScope.allContactsSelected.push(itm.value);
                console.log($rootScope.allContactsSelected);
                window.localStorage['allConatctsFetched'] = angular.toJson($rootScope.allContactsSelected);
            });

            // if(i== $rootScope.contact.length)
            // {
            //   console.log($rootScope.contact.length);
            //   console.log(i);
            //   $ionicLoading.hide();
            // }


        }
        else {
          $rootScope.allContactsSelected=[];
          window.localStorage['allConatctsFetched'] = angular.toJson($rootScope.allContactsSelected);

          console.log($rootScope.allContactsSelected);
          console.log('ALL CONATCTS UNSELECTED');
          angular.forEach($rootScope.contact1, function(itm)
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
        $scope.optionToggled = function(checkedvalue,value){
            console.log(checkedvalue);
            console.log(value);

            var d = value.split(' ').join('');
            console.log(d);

            if(checkedvalue)
                  {

                    $rootScope.selectedNumber.push(value);
                    console.log($rootScope.selectedNumber);
                    window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);

                  }
                  else {

                      var index = $rootScope.selectedNumber.indexOf(value);
                      $rootScope.selectedNumber.splice(index, 1);

                      console.log($rootScope.selectedNumber);
                      window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);


                  }
            $scope.allcontacts = $rootScope.contact1.every(function(itm){
            var togglevaue;
            return itm.selected;
            })

        }



});
