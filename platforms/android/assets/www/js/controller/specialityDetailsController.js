DoctorQuickApp.controller('specialityDetailsController', function($rootScope,$scope,$stateParams,medicalSpecialityService)
{

	console.log('state params', $stateParams);

	var getSpecialityDetails = function () {
		medicalSpecialityService.getSpecialistDetails($stateParams.specialityId)
		.then(function(response) {
			$scope.specilaityDetails = response.data;
		})
		.catch(function(error) {
			console.log(error);
		})
	}();

})
