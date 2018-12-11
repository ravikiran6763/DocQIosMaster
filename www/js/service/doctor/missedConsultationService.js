'use strict';
DoctorQuickApp.service('missedConsultationService', function ($http,$q, BASE_URL, API) {

this.missedConsultations = function (doctorPhone) {
// console.log(patient_phone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.missedConsultations,doctorPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

this.sendSmsToPatient = function (smsData) {
// console.log(smsData);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.sendSmsToPatient,smsData)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

//for doctors consultationDetails




});
