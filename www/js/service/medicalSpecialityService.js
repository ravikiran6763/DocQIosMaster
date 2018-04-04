DoctorQuickApp.service('medicalSpecialityService', function($http, $q, BASE_URL, API,$localStorage, $ionicLoading){

      this.getMedicalSpecialist = function(){
            var deferred = $q.defer();
            console.log(BASE_URL.url + API.getMedicalSpecialist);
            $http.get(BASE_URL.url + API.getMedicalSpecialist).then ( function(response) {
                if(response.status === 200){
                  deferred.resolve(response.data);
                }else{
                  deferred.reject(response.data)
                }
            });
            return deferred.promise;
        };

      this.getMedicalSpeciality = function (specialityId) {
          var deferred = $q.defer();
              $http.post(BASE_URL.url + API.fetchSpecificSpeciality,specialityId).then ( function(response) {
              if(response.status === 200){
                deferred.resolve(response.data);
                // console.log(response.data);
              }else{
                deferred.reject(response.data)
              }
          });
          return deferred.promise;
        }

        this.sendrequesttodoctor = function(medicalSpecialityId)
        {
            var patientrequest = {
              patientphno : window.localStorage.user,
              speciality : medicalSpecialityId,
              subPatientId:window.localStorage.selectedSubPatient
            }

            console.log(patientrequest);
          var deferred = $q.defer();
          $http.post(BASE_URL.url + API.sendrequesttodoctor,patientrequest)
          .success(function (data, status, headers, config){
            // console.log(data);

            deferred.resolve(data);
          })
          .error(function (){
            deferred.reject('Error while getting data');
          });
          $ionicLoading.hide();
          return deferred.promise;

        }

        this.callAccepted = function (patient) {
      		// console.log(patient);
      		var deferred = $q.defer();
          console.log(BASE_URL.url + API.callAccepted);
      		$http.post(BASE_URL.url + API.callAccepted,patient)
      		.success(function (data, status, headers, config){
      			deferred.resolve(data);
      		})
      		.error(function (){
      			deferred.reject('Error while getting data');
      		});
      		return deferred.promise;
      }

      this.checkForAccptedReq = function (patient) {
        // console.log(patient);
        var deferred = $q.defer();
        $http.post(BASE_URL.url + API.checkForAccptedReq,patient)
        .success(function (data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function (){
          deferred.reject('Error while getting data');
        });
        return deferred.promise;
    }

      this.cancelReq = function (patient) {
        // console.log(patient);
        var deferred = $q.defer();
        console.log(BASE_URL.url + API.cancelCallReq);
        $http.post(BASE_URL.url + API.cancelCallReq,patient)
        .success(function (data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function (){
          deferred.reject('Error while getting data');
        });
        return deferred.promise;
    }

    this.declinedDuringCall = function (reqId) {
      // console.log(patient);
      var deferred = $q.defer();
      console.log(BASE_URL.url + API.declinedDuringCall);
      $http.post(BASE_URL.url + API.declinedDuringCall,reqId)
      .success(function (data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function (){
        deferred.reject('Error while getting data');
      });
      return deferred.promise;
  }

  var newPatientAdded="";
  var newPatient="";

  this.savePatient = function (patientAdded){
    console.log('service:',patientAdded);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.savePatient);
    $http.post(BASE_URL.url + API.savePatient,patientAdded)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
}

this.editNewPatient = function (patientAdded){
  console.log('service:',patientAdded);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.editNewPatient);
  $http.post(BASE_URL.url + API.editNewPatient,patientAdded)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.getSubPatients = function (user){
  console.log('service:',user);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.getSubPatients);
  $http.post(BASE_URL.url + API.getSubPatients,user)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.selectSubPatient = function (subPatientToShow){
  console.log('service:',subPatientToShow);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.selectSubPatient);
  $http.post(BASE_URL.url + API.selectSubPatient,subPatientToShow)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}
this.deletePatient = function (subPatientToDelete){
  console.log('service:',subPatientToDelete);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.deletePatient);
  $http.post(BASE_URL.url + API.deletePatient,subPatientToDelete)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

  this.addNewPatient = function(newPatient)
  {
       newPatientAdded = newPatient;
  }
  this.getNewPatient = function()
  {
    return newPatientAdded;
  }



});
