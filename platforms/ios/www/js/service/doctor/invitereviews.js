DoctorQuickApp.service('invitereviews', function ($http,$rootScope,$q,BASE_URL, API) {


var con = [];
this.invitereviewpatient = function (listofcontacts){

    con.push(listofcontacts);
  }

this.getinvitecontacts = function()
{
    return con;
    console.log(con);



}



this.sendsmstoinvitereviews = function (contactsfrominvitereview,queryforinvitereview,doctor,link) {


toinvite = {

    phnos : contactsfrominvitereview,
    query : queryforinvitereview,
    user : doctor,
    inviteLink:link

};

console.log(toinvite);

var deferred = $q.defer();
$http.post(BASE_URL.url + API.invitereviews,toinvite)
.success(function (data, status, headers, config){
console.log(data);
  deferred.resolve(data);
})
.error(function (){
  deferred.reject('Error while getting data');
});

return deferred.promise;

};
this.generateTinyUrl = function (docPhone) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.generateTinyUrl,docPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.invitereviewforall = function (contact) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.invitereviewforall,contact)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.getonlysinglecontact = function (contact) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.getonlysinglecontact,contact)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}



});
