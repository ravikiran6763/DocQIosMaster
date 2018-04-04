'use strict';
DoctorQuickApp.service('LoginService', function ($http,$q, BASE_URL, API) {

 var userPhone;
 var loggedIn = false;


this.logoutFromDq = function (userNum) {
  console.log(userNum);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.logout);
  $http.post(BASE_URL.url + API.logout,userNum)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.updatePlayer = function (updatePlayer) {
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.updatePlayer);
  $http.post(BASE_URL.url + API.updatePlayer,updatePlayer)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.alreadyLoggedIn = function (userDetails) {
  console.log(userDetails);
  userPhone = userDetails.userNum;
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.alreadyLoggedIn);
  $http.post(BASE_URL.url + API.alreadyLoggedIn,userDetails)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

	this.loginprocess = function (userDetails) {

    console.log(userDetails);
    loggedIn = true;

		userPhone = userDetails.userNum;
		var deferred = $q.defer();
    console.log(BASE_URL.url + API.login);
		$http.post(BASE_URL.url + API.login,userDetails)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
      console.log(data);
      console.log(status);

		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}
this.isLoggedIn=function(){

  console.log(loggedIn);
  return loggedIn;
}

});
