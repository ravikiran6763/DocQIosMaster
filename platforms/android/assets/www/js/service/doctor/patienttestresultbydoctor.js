DoctorQuickApp.service('testresultbydoctor', function ($http,$q, BASE_URL, API, $cordovaFileTransfer,$cordovaFile) {

    var diagnosisbydoctor = "";
    var testsbydoctor = "";
    var medicationbydoctor = "";
    var diagnosis = "";
    var tests = "";
    var medication = "";

  this.diagnosisdone = function(diagnosis)
  {
       diagnosisbydoctor = diagnosis;
  }

  this.testrecommended = function(tests)
  {
    testsbydoctor = tests;
  }

  this.medicationdone = function(medication)
  {
      medicationbydoctor = medication;
  }

  this.getdiagnosis = function()
  {
      if(diagnosisbydoctor)
      {
            return diagnosisbydoctor;
      }
      else
      {
          return "";
      }
  }

  this.gettests = function()
  {
    if(testsbydoctor)
    {
          return testsbydoctor;
    }
    else
    {
          return "";
    }
  }

  this.getmedication = function()
  {
    if(medicationbydoctor)
    {
          return medicationbydoctor;
    }
    else
    {
          return "";
    }
  }

  this.jpegtest = function(options)
  {
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.testjpegimage,options)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;

  }
});
