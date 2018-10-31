'use strict';
DoctorQuickApp.service('RazorPayService', function ($http,$q,$rootScope, BASE_URL, API) {

  this.topUpOptions  = function (options) {
    $rootScope.options=options;
  }

  this.topUp  = function (RazorPayId) {

    $rootScope.Id=RazorPayId;
    // alert('hello')
    var storePaymentDetails={
      paymentId:$rootScope.Id,
      amountPaid:$rootScope.options.amount/100,
      patientPhone:$rootScope.options.prefill.contact,
    }
    console.log('deposit Details :',storePaymentDetails);
    // alert(storePaymentDetails.paymentId);
    // alert(storePaymentDetails.amountPaid);
    // alert(storePaymentDetails.patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.topMeup,storePaymentDetails)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
             


    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }



});
