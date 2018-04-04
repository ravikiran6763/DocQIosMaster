DoctorQuickApp.controller('searchbyspecialities', function($scope,searchbyspecialities) {

  $scope.res = searchbyspecialities.getSearchData();
  console.log($scope.res);




});
