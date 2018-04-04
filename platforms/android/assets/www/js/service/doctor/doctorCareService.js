'use strict';
DoctorQuickApp.service('doctorCareService', function ($http,$q, BASE_URL, API) {

  this.submitQuery = function (doctorQuery){
    console.log('from service',doctorQuery);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.patientQuery,doctorQuery)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.submitCallBack = function (doctorPhone){
    console.log('from service',doctorPhone);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.paientCallBack,doctorPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }



})
