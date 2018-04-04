angular.module('DoctorQuick.directives', [])


.directive('mdToggle', function($ionicGesture, $timeout,$state) {
		return {
			restrict: 'E',
	    replace: 'true',
	    require: '?ngModel',
	    transclude: true,
			template:
	    '<div class="flip-toggle">' +
	    '<div ng-transclude></div>' +
	    '<label class="toggle">' +
	    '<input type="checkbox">' +
	    '<div class="track">' +
	    '<div class="handle"><span class="handle-label handle-label-a">ON</span><span class="handle-label handle-label-b">OFF</span></div>' +
	    '</div>' +
	    '</label>' +
	    '</div>',
			compile: function(element, attr) {
	      var input = element.find('input');
	      angular.forEach({
	        'name': attr.name,
	        'ng-value': attr.ngValue,
	        'ng-model': attr.ngModel,
	        'ng-checked': attr.ngChecked,
	        'ng-disabled': attr.ngDisabled,
	        'ng-true-value': attr.ngTrueValue,
	        'ng-false-value': attr.ngFalseValue,
	        'ng-change': attr.ngChange
	      }, function(value, name) {
	        if (angular.isDefined(value)) {
	          input.attr(name, value);
	        }
	      });


	      if(attr.toggleClass) {
	        element[0].getElementsByTagName('label')[0].classList.add(attr.toggleClass);
	      }

	      return function($scope, $element, $attr) {
	        var el, checkbox, track, handle;

	        el = $element[0].getElementsByTagName('label')[0];
	        checkbox = el.children[0];
	        track = el.children[1];
	        handle = track.children[0];

	        var ngModelController = angular.element(checkbox).controller('ngModel');

	        $scope.toggle = new ionic.views.Toggle({
	          el: el,
	          track: track,
	          checkbox: checkbox,
	          handle: handle,
	          onChange: function() {
	            if(checkbox.checked) {
	              ngModelController.$setViewValue(true);
	            } else {
	              ngModelController.$setViewValue(false);
	            }
	            $scope.$apply();
	          }
	        });

	        $scope.$on('$destroy', function() {
	          $scope.toggle.destroy();
	        });
	      };
	    }
		}
})


.directive('showHideContainer', function(){
		return {
			scope: {
			},
			controller: function($scope, $element, $attrs) {
				$scope.show = false;

				$scope.toggleType = function($event){
					$event.stopPropagation();
					$event.preventDefault();

					$scope.show = !$scope.show;

					// Emit event
					$scope.$broadcast("toggle-type", $scope.show);
				};
			},
			templateUrl: 'views/common/show-hide-password.html',
			restrict: 'A',
			replace: false,
			transclude: true
		};
})


.directive('showHideInput', function(){
		return {
			scope: {
			},
			link: function(scope, element, attrs) {
				// listen to event
				scope.$on("toggle-type", function(event, show){
					var password_input = element[0],
							input_type = password_input.getAttribute('type');

					if(!show)
					{
						password_input.setAttribute('type', 'password');
					}

					if(show)
					{
						password_input.setAttribute('type', 'text');
					}
				});
			},
			require: '^showHideContainer',
			restrict: 'A',
			replace: false,
			transclude: false
		};
})

//Use this directive to open external links using inAppBrowser cordova plugin
.directive('dynamicAnchorFix', function($ionicGesture, $timeout, $cordovaInAppBrowser) {
	return {
		scope: {},
		link: function(scope, element, attrs) {
			$timeout(function(){
				var anchors = element.find('a');
				if(anchors.length > 0)
				{
					angular.forEach(anchors, function(a) {

						var anchor = angular.element(a);

						anchor.bind('click', function (event) {
							event.preventDefault();
							event.stopPropagation();

							var href = event.currentTarget.href;
							var	options = {};

							//inAppBrowser see documentation here: http://ngcordova.com/docs/plugins/inAppBrowser/

							$cordovaInAppBrowser.open(href, '_blank', options)
								.then(function(e) {
									// success
								})
								.catch(function(e) {
									// error
								});
						});

					});
				}
			}, 10);
		},
		restrict: 'A',
		replace: false,
		transclude: false
	};
})

.directive('validPin', function($http) {
	return {
		require: 'ngModel',
		link: function(scope, ele, attrs, c) {
			scope.$watch(attrs.ngModel, function(pinValue) {
				// $http({
				// 	method: 'POST',
				// 	url: '/api/check/' + attrs.validPin,
				// 	data: {'pin': attrs.validPin}
				// }).success(function(data, status, headers, cfg) {
				// 	c.$setValidity('valid-pin', data.isValid);
				// }).error(function(data, status, headers, cfg) {
				// 	c.$setValidity('valid-pin', false);
				// });
				if(pinValue==="")
				{
					c.$setValidity('valid-pin', true);
				}
				else
				{
					c.$setValidity('valid-pin', false);
				}
			});
		}
	};
})

.directive('multiBg', function(_){
	return {
		scope: {
			multiBg: '=',
			interval: '=',
			helperClass: '@'
		},
		controller: function($scope, $element, $attrs) {
			$scope.loaded = false;
			var utils = this;

			this.animateBg = function(){
				// Think i have to use apply because this function is not called from this controller ($scope)
				$scope.$apply(function () {
					$scope.loaded = true;
					$element.css({'background-image': 'url(' + $scope.bg_img + ')'});
				});
			};

			this.setBackground = function(bg) {
				$scope.bg_img = bg;
			};

			if(!_.isUndefined($scope.multiBg))
			{
				if(_.isArray($scope.multiBg) && ($scope.multiBg.length > 1) && !_.isUndefined($scope.interval) && _.isNumber($scope.interval))
				{
					// Then we need to loop through the bg images
					utils.setBackground($scope.multiBg[0]);
				}
				else
				{
					// Then just set the multiBg image as background image
					utils.setBackground($scope.multiBg[0]);
				}
			}
		},
		templateUrl: 'views/common/multi-bg.html',
		restrict: 'A',
		replace: true,
		transclude: true
	};
})

.directive('bg', function() {
	return {
		restrict: 'A',
		require: '^multiBg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, multiBgController) {
			element.on('load', function() {
				multiBgController.animateBg();
		  });
		}
	};
})

.directive('preImg', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			ratio:'@',
			helperClass: '@'
		},
		controller: function($scope) {
			$scope.loaded = false;

			this.hideSpinner = function(){
				// Think i have to use apply because this function is not called from this controller ($scope)
				$scope.$apply(function () {
					$scope.loaded = true;
				});
			};
		},
		templateUrl: 'views/common/pre-img.html'
	};
})

.directive('spinnerOnLoad', function() {
	return {
		restrict: 'A',
		require: '^preImg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, preImgController) {
			element.on('load', function() {
				preImgController.hideSpinner();
		  });
		}
	};
})

//new directives
.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
})


.directive('shiftInput', ['$parse', function($parse) {
    return {
        restrict: 'A',
        require: ['ngModel'],
        link: function(scope, element, attrs, ctrls) {
            var model=ctrls[0], form=ctrls[1];

            scope.next = function(){
                return model.$valid
            }

            scope.$watch(scope.next, function(newValue, oldValue){
                if (newValue && model.$dirty)
                {
                    var nextinput = element.next('input');
                    if (nextinput.length === 1)
                    {
                        // nextinput[0].focus();
												element.next()[0].focus();
                    }
                }
            })
        }
    }
}])

//directive for change password

.directive('nxEqual', function(){
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.nxEqual) {
                console.error('nxEqual expects a model as an argument!');
                return;
            }
            scope.$watch(attrs.nxEqual, function (value) {
                model.$setValidity('nxEqual', value === model.$viewValue);
            });
            model.$parsers.push(function (value) {
                var isValid = value === scope.$eval(attrs.nxEqual);
                model.$setValidity('nxEqual', isValid);
                return isValid ? value : undefined;
            });
        }
    };
})

	//favorite  Directive
.directive('buttonStar', function(){
  return {
    scope: true,
    restrict: 'E',
    template: '<button class="btn btn-icon"><span class="ionic_rating_icon_on" ng-class="{active: favorite.star}"></span></button>',
    link: function(scope, elem) {
      elem.bind('click', function() {
        scope.$apply(function(){
          scope.favorite.star = !scope.favorite.star;
        });
      });
    }
  };
})

.directive('accessibleForm', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            // set up event handler on the form element
            elem.on('submit', function () {
                // find the first invalid element
                var firstInvalid = elem[0].querySelector('.ng-invalid');
                // if we find one, set focus
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            });
        }
    };
})


.directive('iconSwitcher', function(){
  return {
    restrict : 'A',
		scope: currentState=true,

    link : function(scope, elem, attrs) {

      elem.on('click', function() {
        console.log('You clicked me!');

        if(currentState === true) {
          console.log('It is on!');
          angular.element(elem).removeClass(attrs.onIcon);
          angular.element(elem).addClass(attrs.offIcon);
        } else {
          console.log('It is off!');
          angular.element(elem).removeClass(attrs.offIcon);
          angular.element(elem).addClass(attrs.onIcon);
        }
				console.log(currentState);
        currentState = !currentState
				// $rootScope.$broadcast('currentState', currentState);
      });
  	}

  };
})
// the following directive is to link the buttons
.directive("linked",function(){
    return function (scope, element, attrs) {
        var id = attrs["linked"];
        element.on("click",function(){
            document.getElementById(id).click();
        });
    };
})

.directive('autoNext', function() {
    return {
       restrict: 'A',
       link: function(scope, element, attr, form) {
           var otpBox = parseInt(attr.otpBox);
           var maxLength = parseInt(attr.ngMaxlength);
           element.on('keypress', function(e) {
               if (element.val().length > maxLength-1) {
                  var next = angular.element(document.body).find('[otpBox=' + (otpBox+1) + ']');
                  if (next.length > 0) {
                      next.focus();
                      return next.triggerHandler('keypress', { which: e.which});
                  }
                  else  {
                      return false;
                  }
               }
               return true;
           });

       }
    }
})

.directive("moveNextOnMaxlength", function() {
    return {
        restrict: "A",
        link: function($scope, element) {
            element.on("input", function(e) {
                if(element.val().length == element.attr("maxlength")) {
								    var $nextElement = element.next();
                    if($nextElement.length) {
                        $nextElement[0].focus();
                    }
                }
            });
        }
    }
})

.directive('autofocusWhen1', function (){
	    return function (scope, element, attrs) {
	        scope.$watch('otpentered.OTP1', function(newValue){
						// scope.$watch('maxLengthReach', function(newValue){

	            if (newValue.length >= 1 ) {
	                element[0].focus();
	            }
	        });
	    }
	})

.directive('autofocusWhen2', function () {
	    return function (scope, element, attrs) {
	        scope.$watch('otpentered.OTP2', function(newValue){
						// scope.$watch('maxLengthReach', function(newValue){

	            if (newValue.length >= 1 ) {
	                element[0].focus();
	            }
	        });
	    }
	})


.directive('noSpecialChar', function() {
return {
  require: 'ngModel',
  restrict: 'A',
  link: function(scope, element, attrs, modelCtrl) {
    modelCtrl.$parsers.push(function(inputValue) {
      if (inputValue == null)
        return ''
      cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
      if (cleanInputValue != inputValue) {
        modelCtrl.$setViewValue(cleanInputValue);
        modelCtrl.$render();
      }
      return cleanInputValue;
    });
  }
} })

.directive('autofocusWhen3', function () {
    return function (scope, element, attrs) {
        scope.$watch('otpentered.OTP3', function(newValue){
					// scope.$watch('maxLengthReach', function(newValue){

            if (newValue.length >= 1 ) {
                element[0].focus();
            }
        });
    }
})


.directive('maxlines', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      var maxLines = 1;
      attrs.$observe('maxlines', function(val) {
        maxLines = parseInt(val);
      });
      ngModel.$validators.maxlines = function(modelValue, viewValue) {
        var numLines = (modelValue || '').split("\n").length;
        return numLines <= maxLines;
      };
      attrs.$observe('maxlinesPreventEnter', function(preventEnter) {
        // if attribute value starts with 'f', treat as false. Everything else is true
        preventEnter = (preventEnter || '').toLocaleLowerCase().indexOf('f') !== 0;
        if (preventEnter) {
          addKeypress();
        } else {
          removeKeypress();
        }
      });

      function addKeypress() {
        elem.on('keypress', function(event) {
          // test if adding a newline would cause the validator to fail
          if (event.keyCode == 13 && !ngModel.$validators.maxlines(ngModel.$modelValue + '\n', ngModel.$viewValue + '\n')) {
            event.preventDefault();
          }
        });
      }

      function removeKeypress() {
        elem.off('.maxlines');
      }

      scope.$on('$destroy', removeKeypress);
    }
  };
})

///////////
.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
						min: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
})


//timer
.directive('timer', ['$compile', function ($compile) {
    return {
        restrict: 'EAC',
        replace: false,
        scope: {
            interval: '=interval',
            startTimeAttr: '=startTime',
            endTimeAttr: '=endTime',
            countdownattr: '=countdown',
            finishCallback: '&finishCallback',
            autoStart: '&autoStart',
            maxTimeUnit: '='
        },
        controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {

            // Checking for trim function since IE8 doesn't have it
            // If not a function, create tirm with RegEx to mimic native trim
            if (typeof String.prototype.trim !== 'function') {
                String.prototype.trim = function () {
                    return this.replace(/^\s+|\s+$/g, '');
                };
            }

            //angular 1.2 doesn't support attributes ending in "-start", so we're
            //supporting both "autostart" and "auto-start" as a solution for
            //backward and forward compatibility.
            $scope.autoStart = $attrs.autoStart || $attrs.autostart;

            if ($element.html().trim().length === 0) {
                $element.append($compile('<span>{{millis}}</span>')($scope));
            } else {
                $element.append($compile($element.contents())($scope));
            }

            $scope.startTime = null;
            $scope.endTime = null;
            $scope.timeoutId = null;
            $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) >= 0 ? parseInt($scope.countdownattr, 10) : undefined;
            $scope.isRunning = false;

            $scope.$on('timer-start', function () {
                $scope.start();
            });

            $scope.$on('timer-resume', function () {
                $scope.resume();
            });

            $scope.$on('timer-stop', function () {
                $scope.stop();
            });

            $scope.$on('timer-clear', function () {
                $scope.clear();
            });

            $scope.$on('timer-set-countdown', function (e, countdown) {
                $scope.countdown = countdown;
            });

            function resetTimeout() {
                if ($scope.timeoutId) {
                    clearTimeout($scope.timeoutId);
                }
            }

            $scope.start = $element[0].start = function () {
                $scope.startTime = $scope.startTimeAttr ? new Date($scope.startTimeAttr) : new Date();
                $scope.endTime = $scope.endTimeAttr ? new Date($scope.endTimeAttr) : null;
                if (!$scope.countdown) {
                    $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
                }
                resetTimeout();
                tick();
                $scope.isRunning = true;
            };

            $scope.resume = $element[0].resume = function () {
                resetTimeout();
                if ($scope.countdownattr) {
                    $scope.countdown += 1;
                }
                $scope.startTime = new Date() - ($scope.stoppedTime - $scope.startTime);
                tick();
                $scope.isRunning = true;
            };

            $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function () {
                var timeoutId = $scope.timeoutId;
                $scope.clear();
                $scope.$emit('timer-stopped', {
                    timeoutId: timeoutId,
                    millis: $scope.millis,
                    seconds: $scope.seconds,
                    minutes: $scope.minutes,
                    hours: $scope.hours,
                    days: $scope.days
                });
            };

            $scope.clear = $element[0].clear = function () {
                // same as stop but without the event being triggered
                $scope.stoppedTime = new Date();
                resetTimeout();
                $scope.timeoutId = null;
                $scope.isRunning = false;
            };

            $element.bind('$destroy', function () {
                resetTimeout();
                $scope.isRunning = false;
            });

            function calculateTimeUnits() {
                if ($attrs.startTime !== undefined) {
                    $scope.millis = new Date() - new Date($scope.startTimeAttr);
                }
                // compute time values based on maxTimeUnit specification
                if (!$scope.maxTimeUnit || $scope.maxTimeUnit === 'day') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                    $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                    $scope.days = Math.floor((($scope.millis / (3600000)) / 24));
                    $scope.months = 0;
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'second') {
                    $scope.seconds = Math.floor($scope.millis / 1000);
                    $scope.minutes = 0;
                    $scope.hours = 0;
                    $scope.days = 0;
                    $scope.months = 0;
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'minute') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor($scope.millis / 60000);
                    $scope.hours = 0;
                    $scope.days = 0;
                    $scope.months = 0;
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'hour') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                    $scope.hours = Math.floor($scope.millis / 3600000);
                    $scope.days = 0;
                    $scope.months = 0;
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'month') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                    $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                    $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
                    $scope.months = Math.floor((($scope.millis / (3600000)) / 24) / 30);
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'year') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                    $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                    $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
                    $scope.months = Math.floor((($scope.millis / (3600000)) / 24 / 30) % 12);
                    $scope.years = Math.floor(($scope.millis / (3600000)) / 24 / 365);
                }
                // plural - singular unit decision
                $scope.secondsS = ($scope.seconds === 1 || $scope.seconds === 0) ? '' : 's';
                $scope.minutesS = ($scope.minutes === 1 || $scope.minutes === 0) ? '' : 's';
                $scope.hoursS = ($scope.hours === 1 || $scope.hours === 0) ? '' : 's';
                $scope.daysS = ($scope.days === 1 || $scope.days === 0) ? '' : 's';
                $scope.monthsS = ($scope.months === 1 || $scope.months === 0) ? '' : 's';
                $scope.yearsS = ($scope.years === 1 || $scope.years === 0) ? '' : 's';
                //add leading zero if number is smaller than 10
                $scope.sseconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
                $scope.mminutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
                $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
                $scope.ddays = $scope.days < 10 ? '0' + $scope.days : $scope.days;
                $scope.mmonths = $scope.months < 10 ? '0' + $scope.months : $scope.months;
                $scope.yyears = $scope.years < 10 ? '0' + $scope.years : $scope.years;

            }

            //determine initial values of time units and add AddSeconds functionality
            if ($scope.countdownattr) {
                $scope.millis = $scope.countdownattr * 1000;

                $scope.addCDSeconds = $element[0].addCDSeconds = function (extraSeconds) {
                    $scope.countdown += extraSeconds;
                    $scope.$digest();
                    if (!$scope.isRunning) {
                        $scope.start();
                    }
                };

                $scope.$on('timer-add-cd-seconds', function (e, extraSeconds) {
                    $timeout(function () {
                        $scope.addCDSeconds(extraSeconds);
                    });
                });

                $scope.$on('timer-set-countdown-seconds', function (e, countdownSeconds) {
                    if (!$scope.isRunning) {
                        $scope.clear();
                    }

                    $scope.countdown = countdownSeconds;
                    $scope.millis = countdownSeconds * 1000;
                    calculateTimeUnits();
                });
            } else {
                $scope.millis = 0;
            }
            calculateTimeUnits();

            var tick = function () {

                $scope.millis = new Date() - $scope.startTime;
                var adjustment = $scope.millis % 1000;

                if ($scope.endTimeAttr) {
                    $scope.millis = $scope.endTime - new Date();
                    adjustment = $scope.interval - $scope.millis % 1000;
                }


                if ($scope.countdownattr) {
                    $scope.millis = $scope.countdown * 1000;
                }

                if ($scope.millis < 0) {
                    $scope.stop();
                    $scope.millis = 0;
                    calculateTimeUnits();
                    if ($scope.finishCallback) {
                        $scope.$eval($scope.finishCallback);
                    }
                    return;
                }
                calculateTimeUnits();

                //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
                $scope.timeoutId = setTimeout(function () {
                    tick();
                    $scope.$digest();
                }, $scope.interval - adjustment);

                $scope.$emit('timer-tick', {
                    timeoutId: $scope.timeoutId,
                    millis: $scope.millis
                });

                if ($scope.countdown > 0) {
                    $scope.countdown--;
                } else if ($scope.countdown <= 0) {
                    $scope.stop();
                    if ($scope.finishCallback) {
                        $scope.$eval($scope.finishCallback);
                    }
                }
            };

            if ($scope.autoStart === undefined || $scope.autoStart === true) {
                $scope.start();
            }
        }]
    };
}])

.directive('myDate', ['$timeout', '$filter', function ($timeout, $filter)
    {
        return {
            require: 'ngModel',

            link: function ($scope, $element, $attrs, $ctrl)
            {
                var dateFormat = 'mm/dd/yyyy';
                $ctrl.$parsers.push(function (viewValue)
                {
                    //convert string input into moment data model
                    var pDate = Date.parse(viewValue);
                    if (isNaN(pDate) === false) {
                        return new Date(pDate);
                    }
                    return undefined;

                });
                $ctrl.$formatters.push(function (modelValue)
                {
                    var pDate = Date.parse(modelValue);
                    if (isNaN(pDate) === false) {
                        return $filter('date')(new Date(pDate), dateFormat);
                    }
                    return undefined;
                });
                $element.on('blur', function ()
                {
                    var pDate = Date.parse($ctrl.$modelValue);
                    if (isNaN(pDate) === true) {
                        $ctrl.$setViewValue(null);
                        $ctrl.$render();
                    } else {
                        if ($element.val() !== $filter('date')(new Date(pDate), dateFormat)) {
                            $ctrl.$setViewValue($filter('date')(new Date(pDate), dateFormat));
                            $ctrl.$render();
                        }
                    }

                });
                $timeout(function ()
                {
                    $element.kendoDatePicker({

                        format: dateFormat
                    });

                });
            }
        };
    }])
//search  directive
;
