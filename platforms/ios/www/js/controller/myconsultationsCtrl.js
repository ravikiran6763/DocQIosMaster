DoctorQuickApp.controller('myconsultationsCtrl', function($state,$ionicHistory,$scope,$window, $rootScope, $ionicPlatform,$localStorage, $ionicLoading, $ionicConfig, $http,$interval, LoginService, patientCareService, doctorServices,myConsultationService,Factory) {

	$rootScope.headerTxt="My Consultations";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$rootScope.inviteButton = false;


	$scope.names = {};
	$scope.listofnames = [];
	$scope.fromusername = [];
	$scope.listofphones = [];
// for doctors consultationDetails
// console.log('consultations');

var username = "greet+"+window.localStorage.user;
// console.log('MY CONSULTATION CALLED');
if(window.localStorage.doctororpatient == 'doctor'){
	var password = "DQ_doctor";

}
else{
	var password = "DQ_patient";
}

$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			showBackdrop:true
			// duration:3000
		});

if(window.localStorage.doctororpatient === "patient"){ //to list out the consulted patient/doctors
	$rootScope.ConsultedDoctor = angular.fromJson($window.localStorage['ConsultedDoctor']);

	myConsultationService.myConsultedDoctors(window.localStorage.user).then(function(response){
	$rootScope.ConsultedDoctor=response;//store the response array in doctor details
	window.localStorage['ConsultedDoctor'] = angular.toJson(response);
	$rootScope.ConsultedDoctor = angular.fromJson($window.localStorage['ConsultedDoctor']);
	console.log($rootScope.ConsultedDoctor);

	if($rootScope.ConsultedDoctor){
		$ionicLoading.hide();

		var data = response;
		for(var i=0; i<data.length; i++){
		$rootScope.doctorFname=data[i].doctorFname;
		$rootScope.doctorLname=data[i].doctorLname;
		$rootScope.doctorMname=data[i].doctorMname;
		$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
		}
	}

	}).catch(function(error){
	// console.log('failure data', error);
	});
}
else{
	myConsultationService.myConsultedPatients(window.localStorage.user).then(function(response){
	$scope.myPatients=response;//store the response array in doctor details
	console.log($scope.myPatients);
	if($scope.myPatients){
		$ionicLoading.hide();

		var data = $scope.myPatients;
		for(var i=0; i<data.length; i++){
		$scope.patientFname=data[i].patientFname;
		$scope.patientLname=data[i].patientLname;
		$scope.patientPhone=data[i].patientPhone;
		$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
		$scope.listofnames.push($scope.fullname);
		$scope.listofphones.push(data[i].patientPhone);
		//console.log(window.localStorage.user);
		}
	}

	}).catch(function(error){
	console.log('failure data', error);
	});
}

// $interval(checkNewMessages,2000);
// function checkNewMessages(){
//
// }
$rootScope.checkNewMessages = $interval(function(){
	console.log('refreshing consultation list for new messages');

		var success = function(message)
		{
				// console.log(message.length);
				if($scope.deviceAndroid)
				{
						if(window.localStorage.doctororpatient == 'patient')
						{
								//var password = "DQ_doctor";
								$scope.chatlist1 = message;
								// console.log(message);
								var forandroidchatlist = {};
								forandroidchatlist = $scope.chatlist1;
								var dataofandroid = JSON.parse(forandroidchatlist);
								dataofandroid.chatTo=window.localStorage.user;
								doctorServices.createChatHistory(dataofandroid).then(function(response){
								$scope.chatHistory=response;//store the response array in doctor details
							//  console.log('dataSent :',response);
								}).catch(function(error){
								console.log('failure data', error);
								});


								myConsultationService.myConsultedDoctors(window.localStorage.user).then(function(response){
								$rootScope.ConsultedDoctor=response;//store the response array in doctor details
								// console.log($rootScope.ConsultedDoctor);
								var data = response;
								// console.log(response);
								for(var i=0; i<data.length; i++){
								$rootScope.doctorFname=data[i].doctorFname;
								$rootScope.doctorLname=data[i].doctorLname;
								$rootScope.doctorMname=data[i].doctorMname;
								$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
								}
								$ionicLoading.hide();
								}).catch(function(error){
								console.log('failure data', error);
								});

						}
						else
						{

								$scope.chatlist1 = message;
								// console.log(message);
								var forandroidchatlist = {};
								forandroidchatlist = $scope.chatlist1;
								var dataofandroid = JSON.parse(forandroidchatlist);
								dataofandroid.chatTo=window.localStorage.user;
								doctorServices.createChatHistoryforDoctor(dataofandroid).then(function(response){
								$scope.chatHistory=response;//store the response array in doctor details
								//  console.log('dataSent :',response);
								}).catch(function(error){
								console.log('failure data', error);
								});

								myConsultationService.myConsultedPatients(window.localStorage.user).then(function(response){
								$scope.myPatients=response;//store the response array in doctor details
								// console.log($scope.myPatients);
								var data = $scope.myPatients;
								for(var i=0; i<data.length; i++){
								$scope.patientFname=data[i].patientFname;
								$scope.patientLname=data[i].patientLname;
								$scope.patientPhone=data[i].patientPhone;
								$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
								$scope.listofnames.push($scope.fullname);
								$scope.listofphones.push(data[i].patientPhone);
								//console.log(window.localStorage.user);
								}
								}).catch(function(error){
								console.log('failure data', error);
								});

						}

				}
				else
				{

				// console.log('this is ios chat histroy');


				if(window.localStorage.doctororpatient == 'patient')
				{
						// console.log('this is patient');

						$scope.ios = message;
						// console.log($scope.ios);
						$scope.ios = message;
						var forioschatlist = {};
						forioschatlist = $scope.ios;
						var res = forioschatlist.slice(1,-1);
						var dataForIos = JSON.parse(forioschatlist);


						console.log('the data from chat counts:',dataForIos);

						doctorServices.createChatHistoryIos(dataForIos).then(function(response){
						$scope.chatHistoryios=response;//store the response array in doctor details
						console.log('dataSent :',$scope.chatHistoryios);
						}).catch(function(error){
						console.log('failure data', error);
						});

						myConsultationService.myConsultedDoctors(window.localStorage.user).then(function(response){
						$rootScope.ConsultedDoctor=response;//store the response array in doctor details
						var data = response;
						$ionicLoading.hide();
						for(var i=0; i<data.length; i++){
						$rootScope.doctorFname=data[i].doctorFname;
						$rootScope.doctorLname=data[i].doctorLname;
						$rootScope.doctorMname=data[i].doctorMname;
						$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
						}

						}).catch(function(error){
						console.log('failure data', error);
						});

				}
				else {

							$scope.ios = message;
							var forioschatlist = {};
							forioschatlist = $scope.ios;
							var res = forioschatlist.slice(1,-1);
							var dataForIos = JSON.parse(forioschatlist);

							console.log('DATAFROM CHAT',dataForIos);
							doctorServices.createChatHistoryIosforDoctor(dataForIos).then(function(response){
							$scope.chatHistoryios=response;//store the response array in doctor details
							console.log('dataSent:',$scope.chatHistoryios);
							}).catch(function(error){
							console.log('failure data', error);
							});

							myConsultationService.myConsultedPatients(window.localStorage.user).then(function(response){
							$scope.myPatients=response;//store the response array in doctor details
							console.log($scope.myPatients);
							var data = $scope.myPatients;
							for(var i=0; i<data.length; i++){
							$scope.patientFname=data[i].patientFname;
							$scope.patientLname=data[i].patientLname;
							$scope.patientPhone=data[i].patientPhone;
							$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
							$scope.listofnames.push($scope.fullname);
							$scope.listofphones.push(data[i].patientPhone);
							//console.log(window.localStorage.user);
							}
							$ionicLoading.hide();
							}).catch(function(error){
							console.log('failure data', error);
							});

				}

				}

		}


		var failure = function()
		{
		 alert("Error calling Hello Plugin");
		}

		hello.chatcounts(username,password,success, failure);
}, 2000);

$scope.pagedecision=$ionicHistory.currentStateName();
var username = "greet+"+window.localStorage.user;

if($scope.pagedecision === 'templates.consulted_patient')
		{
				var password = "DQ_doctor";
				// console.log(password);
		}
		else {
			var password = "DQ_patient";
		}

$scope.deviceAndroid = ionic.Platform.isAndroid();

$scope.consultationDetails=function(consultedDoc,consultDate)
{


		var array = consultDate.split(' ');
		console.log('the splitted date is:');
		console.log(array[0]);





			var date =array[0];
			console.log(date);
			var d = new Date();
			console.log(d);




			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			curr_month++;
			var curr_year = d.getFullYear();


			var todaydate = curr_year + "-" + curr_month + "-" + curr_date;

			console.log('TODAY DATE IS:');
			console.log(todaydate);
				var today = todaydate;


			var date2 = new Date(today);
			var date1 = new Date(date);
			var timeDiff = Math.abs(date2.getTime() - date1.getTime());
			$scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
			console.log('the diff is:');
			console.log($scope.dayDifference);


				// var daydiff = $scope.dayDifference;
				var username = "greet+"+window.localStorage.user;
				var password = "DQ_patient";
				var persontocall = "greet+" + consultedDoc;
				console.log(persontocall);
				console.log($scope.daydiff);



					var daydiff = array[0];

					console.log('TODAY DATE FORMAT IS',daydiff);


					var success = function(message)
					{
						console.log(message);
					}

					var failure = function()
					{
						console.log("Error calling Hello Plugin");
					}

			 		hello.chat(username,password,persontocall,daydiff,success, failure);


}
$localStorage.sendPrescTo=''

$scope.clicktochat = function(pateientPhone)
{
		console.log(pateientPhone);
		$rootScope.deviceIOS = ionic.Platform.isIOS();
		$rootScope.deviceAndroid = ionic.Platform.isAndroid();

		var daydiff = "2018-12-01";
		$localStorage.sendPrescTo=pateientPhone;
		$scope.patientToChat=pateientPhone;
		var username = "greet+"+window.localStorage.user;
		var password = "DQ_doctor";
	 	var persontocall = "greet+" + $scope.patientToChat;
		var success = function(message)
		{
			console.log(message);
			var str = message;
	 		var res = str.slice(6, 16);

		}
		var failure = function()
		{
			console.log('error');

		}
		hello.chat(username,password,persontocall,daydiff,success, failure);


}
console.log($state.$current.name);
console.log($rootScope.previousState.name);

$scope.$on('$destroy', function(){
	console.log('destroyed');
   $interval.cancel($rootScope.checkNewMessages);

});

});
