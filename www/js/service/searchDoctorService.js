'use strict';
DoctorQuickApp.service('searchDoctorServices', function ($http,$q, BASE_URL, API) {

this.specialitySearch = function (speciality) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.getMedicalSpecialist,speciality)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

this.getLanguages = function () {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.languages)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}
//function to fetch all the Doctors

this.fetchAllDoctors = function () {
  console.log('function called to fetch doctors');
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.fetchAllDoctors)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


//
// var resultofsearch;


    // // sdidemenu list php file
    // this.searchData = function (sidemenu)
    // {
    //
    //     resultofsearch = sidemenu.spec;
    //     console.log(resultofsearch);
    //
    // };

    // this.getSearchData = function()
    // {
    //
    //   return resultofsearch;
    //   console.log("hello");
    //
    // };

var tags = [
         { "text": "Tag1" },
         { "text": "Tag2" },
         { "text": "Tag3" },
         { "text": "Tag4" },
         { "text": "Tag5" },
         { "text": "Tag6" },
         { "text": "Tag7" },
         { "text": "Tag8" },
         { "text": "Tag9" },
         { "text": "Tag10" }
       ];

 this.load = function() {
   var deferred = $q.defer();
   deferred.resolve(tags);
   return deferred.promise;
 };

 this.requestForCall  = function (patient) {
   console.log('from service',patient);
   var deferred = $q.defer();
   console.log(BASE_URL.url + API.requestForCall);
   $http.post(BASE_URL.url + API.requestForCall,patient)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }
 this.cancelOne2oneReq  = function (id) {
   console.log('from service',id);
   var deferred = $q.defer();
   console.log(BASE_URL.url + API.cancelOne2oneReq);
   $http.post(BASE_URL.url + API.cancelOne2oneReq,id)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }

 this.one2oneNoResponse  = function (id) {
   // console.log('from service',id);
   var deferred = $q.defer();
   // console.log(BASE_URL.url + API.cancelOne2oneReq);
   $http.post(BASE_URL.url + API.one2oneNoResponse,id)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }
 
 this.checkCallStatus  = function (id) {
   console.log('from service',id);
   var deferred = $q.defer();
   console.log(BASE_URL.url + API.checkCallStatus);
   $http.post(BASE_URL.url + API.checkCallStatus,id)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }

 this.declineOne2oneReqPatient  = function (id) {
   console.log('from service',id);
   var deferred = $q.defer();
   console.log(BASE_URL.url + API.declineOne2oneReqPatient);
   $http.post(BASE_URL.url + API.declineOne2oneReqPatient,id)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }
 this.sendOfflineMessage  = function (sendMessage) {
   console.log('MessageDAta',sendMessage);
   var deferred = $q.defer();
   $http.post(BASE_URL.url + API.sendOfflineMessage,sendMessage)
   .success(function (data, status, headers, config){
     deferred.resolve(data);

     console.log(data);


   })
   .error(function (){
     deferred.reject('Error while getting data');
   });
   return deferred.promise;

 }

 this.checkDocStatusOnTheGo  = function (docNum) {
   console.log('MessageDAta',docNum);
   var deferred = $q.defer();
   $http.post(BASE_URL.url + API.checkDocStatusOnTheGo,docNum)
   .success(function (data, status, headers, config){
     deferred.resolve(data);

     console.log(data);


   })
   .error(function (){
     deferred.reject('Error while getting data');
   });
   return deferred.promise;

 }
});
