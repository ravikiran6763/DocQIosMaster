DoctorQuickApp.service('doctorRegistrationService', function ($http,$q, BASE_URL, API) {
//Doctor Registration
this.doctorRegistrationDone = function (doctorDetails) {

  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.doctorRegistration,doctorDetails)
  .success(function (data, status, headers, config){
  
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

};

});
