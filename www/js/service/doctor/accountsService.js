'use strict';
DoctorQuickApp.service('accountsService', function ($http,$q, BASE_URL, API,$rootScope, $localStorage ) {

	this.docAccountsBalance = function (docPhone) {
      // alert('get details')
      var deferred = $q.defer();
    		$http.post(BASE_URL.url + API.docAccountsBalance,docPhone)
  		.success(function (data, status, headers, config){
  			deferred.resolve(data);
  		})
  		.error(function (){
  			deferred.reject('Error while getting data');
  		});
  		return deferred.promise;
}


	this.docAccountsDetails = function (docPhone){
		$rootScope.docPhone=docPhone;
		console.log('service:',docPhone);
    var docAccDetails={
			docPhone:window.localStorage.user,
      fromDate :$rootScope.from,
      toDate:$rootScope.toDate
    }
		console.log(docAccDetails);
    if($rootScope.from && $rootScope.toDate){
      // alert('get details')
      console.log('from Service',docAccDetails);
      var deferred = $q.defer();
      // console.log(BASE_URL.url + API.docAccDetails);
  		$http.post(BASE_URL.url + API.docAccDetails,docAccDetails)
  		.success(function (data, status, headers, config){
  			deferred.resolve(data);
  		})
  		.error(function (){
  			deferred.reject('Error while getting data');
  		});
  		return deferred.promise;
    }

}
this.returnUserPhone=function(){
  return userPhone;
}

});
