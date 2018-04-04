DoctorQuickApp.controller('myDoctorCtrl', function($scope,$rootScope,$ionicConfig, $http, $window,$timeout, $interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices) {

	$rootScope.headerTxt="My Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			showBackdrop:true

			// hideOnStageChange: true
	});
	$scope.myConsultedDoctors = angular.fromJson($window.localStorage['myDoctors']);

 var username = "greet+"+window.localStorage.user;
 var password = "DQ_patient";

	$scope.getDocRatingsAll = function(doctorPhone) {
			// alert("Loaded!");
			console.log(doctorPhone);
			rateDoctorServices.getDocRatingsByAll(doctorPhone).then(function(response){
				$scope.docRating=response;
				console.log($scope.docRating);
				$ionicLoading.hide();
				$scope.$watch('docRating', function() {
			 // do something here
	 }, true);
			}).catch(function(error){
			console.log('failure data', error);
			});
			$scope.ratings = [{
						current: $scope.docRating,
						max: 5
				}, ];

	};
		$ionicLoading.show({
		    template: '<ion-spinner></ion-spinner>',
				showBackdrop:true

		    // hideOnStageChange: true
		});

  doctorServices.myDoctorsFetched(window.localStorage.user).then(function(response){
		// alert('list');
		$ionicLoading.show({
		    template: '<ion-spinner></ion-spinner>',
				showBackdrop:true
		    // hideOnStageChange: true
		});
		window.localStorage['myDoctors'] = angular.toJson(response);
		$scope.myConsultedDoctors = angular.fromJson($window.localStorage['myDoctors']);

    // $scope.myConsultedDoctors=response;
		if($scope.myConsultedDoctors){
			$ionicLoading.hide();
		}
		console.log($scope.myConsultedDoctors);
		$scope.getStars = function(rating) {
			// Get the value
			var val = parseFloat(rating);
			// Turn value into number/100
			var size = val/5*100;
			return size + '%';
		  // Get the value
		  var val = parseFloat(rating);
		  // Turn value into number/100
		  var size = val/5*100;
		  return size + '%';
		}
  }).catch(function(error){
  console.log('failure data', error);
  });

$scope.delItem=function(removeFav){
	$ionicLoading.show({
		template:'<ion-spinner></ion-spinner>'
	});
	console.log(removeFav);
	var docToRemove={
		docPhone:removeFav,
		patientPhone:window.localStorage.user
	}
	console.log(docToRemove);
	doctorServices.removeFavDoctor(docToRemove).then(function(response){
		console.log(response);
		if(response === 'deleted'){
			$ionicLoading.hide();
			$state.reload();
		}
	}).catch(function(error){
	console.log('failure data', error);
	});
}

	$scope.viewDocProfile=function(docPhone,rates,total){
		$ionicLoading.show({
			template:'<ion-spinner>,ion-spinner>'
		})
		window.localStorage.docPhone=docPhone
		$rootScope.ratesForDoc=rates
		$rootScope.totalRate=total

		doctorServices.myDoctorsDetails(window.localStorage.docPhone).then(function(response){
			if(response){
				$ionicLoading.hide();
				$scope.myDocDetails1=response;
				window.localStorage['myDocDetails1'] = angular.toJson(response);
				$state.go('app.viewdoctor_profile', {rates: $rootScope.ratesForDoc,totalRates: $rootScope.totalRate})

			}

		console.log('doc',$scope.myDocDetails1);

		}).catch(function(error){
		console.log('failure data', error);
		});


		// $state.go('app.viewdoctor_profile');


	}


})
