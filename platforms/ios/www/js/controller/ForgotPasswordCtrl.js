DoctorQuickApp.controller('ForgotPasswordCtrl', function($scope,$window,$state,$ionicPopup , $ionicLoading,$cordovaToast, $ionicHistory,ForgotPassword) {
$scope.user = {};

  console.log('forgotPasseword');
	$scope.recoverPassword = function(){
    console.log($scope.user.phone);
		console.log('recoverclicked');
    $ionicLoading.show({

    })

    ForgotPassword.forgotPassword($scope.user.phone).then(function(response){
        $scope.PasswordDetails=response;//store the response array in doctor details
        console.log($scope.PasswordDetails);
        if($scope.PasswordDetails === "DoesNotExist"){
          $ionicLoading.hide();
          var confirmPopup = $ionicPopup.confirm({

    				template: '<center>This mobile number is not registered with us</center>',
    				cssClass: 'videoPopup',
    				scope: $scope,
    				buttons: [
    					{
    						text: 'OK',
    						type: 'button-positive',
    						onTap: function(e){
    						console.log('ok');
    						}
    					},
    				]
    			});
        }
        else{
          $ionicLoading.hide();

          var confirmPopup = $ionicPopup.confirm({

    				template: '<center>Your password has been sent to registered mobile number</center>',
    				cssClass: 'videoPopup',
    				scope: $scope,
    				buttons: [
    					{
    						text: 'OK',
    						type: 'button-positive',
    						onTap: function(e){
    						console.log('ok');
                $ionicHistory.nextViewOptions({
                  disableAnimate: true,
                  disableBack: true
                });
                $state.go('auth.loginNew', {}, {location: "replace", reload: false});
    						}
    					},
    				]
    			});


          // window.plugins.toast.showWithOptions({
          // message: "Your password has been sent to registerd mobile number",
          // duration: "short", // 2000 ms
          // position: "bottom",
          // styling: {
          // opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
          // backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
          // textColor: '#ffffff', // Ditto. Default #FFFFFF
          // textSize: 13, // Default is approx. 13.
          // cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
          // horizontalPadding: 16, // iOS default 16, Android default 50
          // verticalPadding: 12 // iOS default 12, Android default 30
          // }
          // });


        }


    }).catch(function(error){
      console.log('failure data', error);
    });

	};


})
