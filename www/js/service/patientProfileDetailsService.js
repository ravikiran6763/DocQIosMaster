
DoctorQuickApp.service('patientProfileDetailsService', function($http, $q, BASE_URL, API){


this.updatenotesflag = function(callid)
{
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.updateNotes);
  $http.post(BASE_URL.url + API.updateNotes,callid)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;
}

this.fetchPatientImage = function(detail){
  console.log(detail);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.fetchPatientImage);
  $http.post(BASE_URL.url + API.fetchPatientImage,detail)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;
}

  this.fetchPatient = function(detail){
    // console.log(detail);
    var deferred = $q.defer();
    // console.log(BASE_URL.url + API.patientDetails);
		$http.post(BASE_URL.url + API.patientDetails,detail)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});

		return deferred.promise;
  }

  this.emailVerification = function(patient){
    // console.log(detail);
    var deferred = $q.defer();
    // console.log(BASE_URL.url + API.patientDetails);
		$http.post(BASE_URL.url + API.checkEmailVerification,patient)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});

		return deferred.promise;
  }

  this.sendVerificationMail = function(patient){
    // console.log(detail);
    var deferred = $q.defer();
    // console.log(BASE_URL.url + API.patientDetails);
		$http.post(BASE_URL.url + API.sendVerificationMail,patient)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});

		return deferred.promise;
  }

  this.updateEmail = function(emailDetails)
  {
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.updateEmail);
    $http.post(BASE_URL.url + API.updateEmail,emailDetails)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;
  }



  //password change
  this.changePwd2 = function(newPwd){

    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.changePatientPwd,newPwd)
    .success(function (data, status, headers, config){
      deferred.resolve(data);

    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;


  }


  // this.updateEmail = function(phoneno){
  //
  //   console.log(phoneno);
  //
  //   var deferred = $q.defer();
  //   $http.post(BASE_URL.url + API.updateEmail,phoneno)
  //   .success(function (data, status, headers, config){
  //     deferred.resolve(data);
  //
  //   })
  //   .error(function (){
  //     deferred.reject('Error while getting data');
  //   });
  //
  //   return deferred.promise;
  //
  //
  // }



});
