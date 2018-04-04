'use strict';
DoctorQuickApp.service('rateDoctorServices', function ($http,$q, BASE_URL, API) {

  this.getDocRatingsByMe  = function (myDocratedValues) {
    console.log('from service',myDocratedValues);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.getMyDoctorRatings);
    $http.post(BASE_URL.url + API.getMyDoctorRatings,myDocratedValues)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.getDocRatingsByAll  = function (consultedDoctor) {
    console.log('from service',consultedDoctor);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.getDocRatingsByAll);
    $http.post(BASE_URL.url + API.getDocRatingsByAll,consultedDoctor)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }


this.rateDoctor = function (ratedValues) {
    console.log('from service',ratedValues);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.rateMyDoctor);
  $http.post(BASE_URL.url + API.rateMyDoctor,ratedValues)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

this.addToFavorite = function (favorite) {
    console.log('favorite Doc',favorite);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.addToFavorite);
  $http.post(BASE_URL.url + API.addToFavorite,favorite)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


});
