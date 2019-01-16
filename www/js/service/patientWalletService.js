'use strict';
DoctorQuickApp.service('patientWalletServices', function ($cookies,$http,$q, BASE_URL, API) {

  this.myWalletBalance = function (patientPhone) {
      console.log('wallet Service:',patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.myWalletBalance,patientPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.claimFreeConsultation = function (patientPhone) {
      console.log('wallet Service:',patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.claimFreeConsultation,patientPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.paidToDoctors = function (patientPhone) {
      console.log('wallet Service:',patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.paidForConsultations,patientPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.refundRequest = function (refundDetails) {
      console.log('refundDetails:',refundDetails);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.refundRequest,refundDetails)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.getMinBalance = function () {
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.getMinBalance)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }


  this.getdiffbalnce = function (patientPhone) {
      var deferred = $q.defer();

      $http.post(BASE_URL.url + API.getdiffbalnce,patientPhone)
      .success(function (data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function (){
        deferred.reject('Error while getting data');
      });

      return deferred.promise;

    }


    this.askForDeposit = function (patientPhone) {
      var deferred = $q.defer();

      $http.post(BASE_URL.url + API.askForDeposit,patientPhone)
      .success(function (data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function (){
        deferred.reject('Error while getting data');
      });

      return deferred.promise;

    }
  // //transaction history
  // this.mytransactionHistory = function (patientPhone) {
  //     console.log('transaction history of:',patientPhone);
  //
  //
  // }


});
