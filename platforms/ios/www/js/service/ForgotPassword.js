'use strict';
DoctorQuickApp.service('ForgotPassword', function ($http,$q, BASE_URL, API) {

  this.forgotPassword = function (userNum){
    console.log('from service',userNum);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.ForgotPassword);
    $http.post(BASE_URL.url + API.ForgotPassword,userNum)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }


})
