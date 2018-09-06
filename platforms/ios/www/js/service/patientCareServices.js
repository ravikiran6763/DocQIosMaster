'use strict';
DoctorQuickApp.service('patientCareService', function ($http,$q,$ionicLoading, BASE_URL, API) {


  this.submitQuery = function (patientQuery){





    console.log('from service',patientQuery);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.patientQuery,patientQuery)
    .success(function (data, status, headers, config){




      deferred.resolve(data);


      //return status;



    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.submitCallBack = function (patientPhone){
    console.log('from service',patientPhone);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.paientCallBack,patientPhone,{timeout: 1000})
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }



})
