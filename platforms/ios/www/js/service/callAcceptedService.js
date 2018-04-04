'use strict';
DoctorQuickApp.service('callAcceptedService', function ($http,$q, BASE_URL, API) {

  this.callDeclined = function (patientQuery){
    console.log('from service',patientQuery);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.callDecline,patientQuery)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.acceptPopUpSeen = function (accptId) {
    console.log(accptId);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.popupSeen);
    $http.post(BASE_URL.url + API.popupSeen,accptId)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.updateseenView = function (callId) {
    console.log(callId);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.updateseenView);
    $http.post(BASE_URL.url + API.updateseenView,callId)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }


})
