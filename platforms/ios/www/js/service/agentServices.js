DoctorQuickApp.service('agentServices', function ($http,$q, BASE_URL, API) {


  this.agentDetails = function (agentPhone) {
    var deferred = $q.defer();
    // console.log(docPhone);
    console.log(BASE_URL.url + API.agentDetails);
    $http.post(BASE_URL.url + API.agentDetails,agentPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;

  }


});
