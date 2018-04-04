DoctorQuickApp.service('patientrequesttodoctor', function ($http,$q, BASE_URL, API) {


      this.accpetedbydoctor = function(accptdReq)
      {
          console.log('clicked');
       		var deferred = $q.defer();
          // console.log(BASE_URL.url + API.acceptedbydoctor);
       		$http.post(BASE_URL.url + API.acceptedbydoctor,accptdReq)
       		.success(function (data, status, headers, config){
            console.log(data);
       			deferred.resolve(data);
       		})
       		.error(function (){
       			deferred.reject('Error while getting data');
       		});
       		return deferred.promise;
      }

      this.declinedbydoctor = function(docpatphno)
      {
        console.log(docpatphno);
        var deferred = $q.defer();
        $http.post(BASE_URL.url + API.declinedbydoctor,docpatphno)
        .success(function (data, status, headers, config){
        console.log(data);
        deferred.resolve(data);
        })
        .error(function (){
        deferred.reject('Error while getting data');
        });

        return deferred.promise;

      }

      this.sendNotification = function(patient)
      {
        var deferred = $q.defer();
        $http.post(BASE_URL.url + API.sendNotification,patient)
        .success(function (data, status, headers, config){
        console.log(data);
        deferred.resolve(data);
        })
        .error(function (){
        deferred.reject('Error while getting data');
        });

        return deferred.promise;

      }


});
