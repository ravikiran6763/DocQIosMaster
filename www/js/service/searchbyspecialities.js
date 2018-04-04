DoctorQuickApp.service('searchbyspecialities', function ($http,$q,BASE_URL, API) {

  var selectedspecial = "";
  var selectedcategory = "";
  var selectedgender = "";
  var selectedlanguage = "";

  this.specialitywisesearch = function(specialfromsearch)
  {
    selectedspecial = specialfromsearch;
  }
  this.categorywisesearch = function(categoryfromsearch)
  {
    selectedcategory = categoryfromsearch;
  }
  this.genderwisesearch = function(genderfromsearch)
  {
    selectedgender= genderfromsearch;
  }
  this.languagewisesearch = function(languagefromsearch)
  {
    selectedlanguage = languagefromsearch;
  }

  this.getSpecialData = function()
  {
    return selectedspecial;
  }

  this.getcategoryData = function()
  {
    return selectedcategory;
  }

  this.getgenderData = function()
  {
    return selectedgender;


  }
  this.getlanguageData = function()
  {
    return selectedlanguage;
  }



  this.getlistofspecialist = function(searchdoctor)
  {
      var deferred = $q.defer();
      console.log(BASE_URL.url + API.doctorbydifferentscenario);
      $http.post(BASE_URL.url + API.doctorbydifferentscenario,searchdoctor)
      .success(function (data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function (){
        deferred.reject('Error while getting data');
      });
      return deferred.promise;
  }




});
