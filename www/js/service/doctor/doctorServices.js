'use strict';
DoctorQuickApp.service('doctorServices', function ($http,$q,$localStorage, BASE_URL, API) {


this.doctorDetails = function (docPhone) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.doctorDetails,docPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.currentPatient = function (docPhone) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.currentPatient,docPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}
this.fetchReqPatientDetails = function(detail){
  // console.log(detail);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.reqPatientDetails);
  $http.post(BASE_URL.url + API.reqPatientDetails,detail)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;
}

//mydoctors function
this.myDoctorsFetched = function (userPhone){
  //console.log(userPhone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.fetchMyDoctors,userPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.myDoctorsDetails = function (mydocPhone) {
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.fetchSpecificDoctor);
  $http.post(BASE_URL.url + API.fetchSpecificDoctor,mydocPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.specificSearch = function (mydocPhone) {
  console.log('mysearch',mydocPhone);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.specificSearch);
  $http.post(BASE_URL.url + API.specificSearch,mydocPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.myConsultedPatients = function (meDoc) {
  // console.log(meDoc);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myConsultedPatients,meDoc)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


this.checkMyBalance = function (myNumber) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myWalletBalance,myNumber)
  .success(function (data, status, headers, config){
    deferred.resolve(data);

  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


this.changeDocPwd = function(newPwd){

  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.updateDocPassword);
  $http.post(BASE_URL.url + API.updateDocPassword,newPwd)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.cancelByDoc = function(consultId){

  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.cancelByDoc,consultId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.noResponseFromPatient = function(consultId){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.noResponseFromPatient,consultId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.patientActivity = function(checkPatientActivity){
  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.patientActivity,checkPatientActivity)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.doctorActivity = function(patAct){
  // console.log(accptdReq);
  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.doctorActivity,patAct)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.videoOrAudio = function(consultId){
  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.videoOrAudio,consultId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.createChatHistory = function (chat) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.createChatHistory,chat)
  .success(function (data, status, headers, config){
    deferred.resolve(data);



  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}



this.createChatHistoryforDoctor = function (chat) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.createChatHistoryforDoctor,chat)
  .success(function (data, status, headers, config){
    deferred.resolve(data);



  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}




this.createChatHistoryIos = function (chat) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.createChatHistoryIos,chat)
  .success(function (data, status, headers, config){
    deferred.resolve(data);



  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.createChatHistoryIosforDoctor = function (chat) {
  console.log('from service chatadata:',chat);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.createChatHistoryIosforDoctor);
  $http.post(BASE_URL.url + API.createChatHistoryIosforDoctor,chat)
  .success(function (data, status, headers, config){
    deferred.resolve(data);



  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}


this.callStatus = function (reqId){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.callStatus,reqId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.fetchChatHistory = function (chatHistory){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.fetchChatHistory,chatHistory)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.checkIdStatus = function (id){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.checkIdStatus,id)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.pushReqStatus = function (id){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.pushReqStatus,id)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}


this.notifyPatient = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.notifyPatient,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.doctorStatus = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.doctorStatus,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.doctorEmailVerification = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.doctorEmailVerification,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.updateDoctorEmail = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.updateDoctorEmail,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.sendVerificationMailToDoc = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.sendVerificationMailToDoc,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.removeFavDoctor = function (removeFav){
  console.log(removeFav);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.removeFavDoctor);
  $http.post(BASE_URL.url + API.removeFavDoctor,removeFav)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

});
