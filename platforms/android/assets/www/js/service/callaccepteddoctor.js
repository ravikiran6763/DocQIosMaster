DoctorQuickApp.service('callacceptedbydoctor', function ($http,$q, BASE_URL, API) {


	this.accpeteddoctor = function (patientphno,doctorphno,videocallflag,startdate,enddate,callid) {
		console.log('called');
		var details = {
			patient_phno:patientphno,
			doctor_phno : doctorphno,
			decide : videocallflag,
			startdate : startdate,
			enddate : enddate,
			callid : callid
		}
		console.log(details);
		var deferred = $q.defer();
		$http.post(BASE_URL.url + API.callaccepteddoctor,details)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
      console.log(data);

		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});
