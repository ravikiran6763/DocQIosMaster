angular.module('DoctorQuick.filters', [])

.filter('rawHtml', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
})

.filter('parseDate', function() {
  return function(value) {
      return Date.parse(value);
  };
})

.filter('customSplitString', function() {
  return function(input) {
    var arr = input.split(',');
    return arr;
  };
})

.filter('customSpaceString', function() {
  return function(input) {
    var arr = input.split(' ');
    return arr;
  };
})

//the following filter capitalizes the first letter only
.filter('capitalize', function() {
    return function(input, scope) {
      if (input!=null) {
          var stringArr = input.split(" ");
          var result = "";
          var cap = stringArr.length;
          for(var x = 0; x < cap; x++) {
            stringArr[x].toLowerCase();
            if(x === cap - 1) {
              result += stringArr[x].substring(0,1).toUpperCase() + stringArr[x].substring(1);
            } else {
              result += stringArr[x].substring(0,1).toUpperCase() + stringArr[x].substring(1) + " ";
            }
          }
        return result;
      }
    }
  })

.filter('formatDateTime', function ($filter) {
    return function (date, format) {
        if (date) {
            return moment(Number(date)).format(format || "DD/MM/YYYY h:mm A");
        }
        else
            return "";
    };
})

.filter('formatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);
        return (z(hours) +':'+z(minutes)+':'+z(seconds));
    };
})
.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])


.filter('groupBy', function() {
    return _.memoize(function(items, field) {
            return _.groupBy(items, field);
        }
    );
})

.filter('unique', function() {
    return function (arr, field) {
        return _.uniq(arr, function(a) { return a[field]; });
    };
})
;
