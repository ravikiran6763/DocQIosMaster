'use strict';
DoctorQuickApp.service('myConsultationService', function ($http,$q, BASE_URL, API) {

this.myConsultedDoctors = function (patient_phone) {
// console.log(patient_phone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myConsultations,patient_phone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

this.docSummaryDetails = function (myDoc) {
console.log(myDoc);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.docSummary);
  $http.post(BASE_URL.url + API.docSummary,myDoc)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

//for doctors consultationDetails


this.myConsultedPatients = function (doctor_phone) {
// console.log(patient_phone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myConsultedPatients,doctor_phone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


this.firstConsultation = function (patient) {
// console.log(patient_phone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.firstConsultation,patient)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}



});
