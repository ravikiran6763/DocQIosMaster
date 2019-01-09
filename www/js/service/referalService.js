DoctorQuickApp.service('referalService', function ($http,$rootScope,$q,BASE_URL, API) {


this.referalCode = function (patientPhone) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.referalCode,patientPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

});
