angular.module('DoctorQuick.services', [])

.service('FeedList', function ($rootScope, FeedLoader, $q){
	this.get = function(feedSourceUrl) {
		var response = $q.defer();
		//num is the number of results to pull form the source
		FeedLoader.fetch({q: feedSourceUrl, num: 20}, {}, function (data){
			response.resolve(data.responseData);
		});
		return response.promise;
	};
})


.service('isLoggedIn', function ($rootScope, FeedLoader, $q){
	this.get = function() {
		return true;

	};
})


// PUSH NOTIFICATIONS
.service('PushNotificationsService', function ($rootScope, $cordovaPush, NodePushServer, GCM_SENDER_ID){
	/* Apple recommends you register your application for push notifications on the device every time it’s run since tokens can change. The documentation says: ‘By requesting the device token and passing it to the provider every time your application launches, you help to ensure that the provider has the current token for the device. If a user restores a backup to a device other than the one that the backup was created for (for example, the user migrates data to a new device), he or she must launch the application at least once for it to receive notifications again. If the user restores backup data to a new device or reinstalls the operating system, the device token changes. Moreover, never cache a device token and give that to your provider; always get the token from the system whenever you need it.’ */
	this.register = function() {
		var config = {};

		// ANDROID PUSH NOTIFICATIONS
		if(ionic.Platform.isAndroid())
		{
			config = {
				"senderID": GCM_SENDER_ID
			};

			$cordovaPush.register(config).then(function(result) {
				// Success
				console.log("$cordovaPush.register Success");
				console.log(result);
			}, function(err) {
				// Error
				console.log("$cordovaPush.register Error");
				console.log(err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				console.log(JSON.stringify([notification]));
				switch(notification.event)
				{
					case 'registered':
						if (notification.regid.length > 0 ) {
							console.log('registration ID = ' + notification.regid);
							NodePushServer.storeDeviceToken("android", notification.regid);
						}
						break;

					case 'message':
						if(notification.foreground == "1")
						{
							console.log("Notification received when app was opened (foreground = true)");
						}
						else
						{
							if(notification.coldstart == "1")
							{
								console.log("Notification received when app was closed (not even in background, foreground = false, coldstart = true)");
							}
							else
							{
								console.log("Notification received when app was in background (started but not focused, foreground = false, coldstart = false)");
							}
						}

						// this is the actual push notification. its format depends on the data model from the push server
						console.log('message = ' + notification.message);
						break;

					case 'error':
						console.log('GCM error = ' + notification.msg);
						break;

					default:
						console.log('An unknown GCM event has occurred');
						break;
				}
			});

			// WARNING: dangerous to unregister (results in loss of tokenID)
			$cordovaPush.unregister(options).then(function(result) {
			  // Success!
			}, function(err) {
			  // Error
			});
		}

		if(ionic.Platform.isIOS())
		{
			config = {
				"badge": true,
				"sound": true,
				"alert": true
			};

			$cordovaPush.register(config).then(function(result) {
				// Success -- send deviceToken to server, and store for future use
				console.log("result: " + result);
				NodePushServer.storeDeviceToken("ios", result);
			}, function(err) {
				console.log("Registration error: " + err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				console.log(notification.alert, "Push Notification Received");
			});
		}
	};
})

//new services
.service('PatientReg', function () {
     var Patient = {
        FirstName: '',
        MName: '',
				LastName: '',
				Age: '',
    };
    return Patient;
})

.factory('payu', function ($resource) {
       return $resource('http://localhost:8100/');
   })

	 .service('APIInterceptor', function($rootScope, checkInternet) {
	     var service = this;
	     service.request = function(config) {

	         return config;
	     };
	     service.responseError = function(response) {
	         if (response.status === 401) {
	             $rootScope.$broadcast('unauthorized');
	         }
	         return response;
	     };
	 })

.service('checkInternet', function($rootScope){
	console.log('check');
	console.log('network',navigator.onLine);

})

.service( 'HardwareBackButtonManager', function($ionicPlatform){
  this.deregister = undefined;

  this.disable = function(){
    this.deregister = $ionicPlatform.registerBackButtonAction(function(e){
    e.preventDefault();
    return false;
    }, 101);
  }

  this.enable = function(){
    if( this.deregister !== undefined ){
      this.deregister();
      this.deregister = undefined;
    }
  }
  return this;
})

.service('goBackMany',function($ionicHistory){
  return function(depth){
    // get the right history stack based on the current view
    var historyId = $ionicHistory.currentHistoryId();
    var history = $ionicHistory.viewHistory().histories[historyId];
    // set the view 'depth' back in the stack as the back view
    var targetViewIndex = history.stack.length - 1 - depth;
    $ionicHistory.backView(history.stack[targetViewIndex]);
    // navigate to it
    $ionicHistory.goBack();
  }
})

.service('urlShortener', service);

function service($log, $q, $http) {

    var gapiKey = 'AIzaSyAnSYS82Y5k9Lmln9xUS6k7e3xNcpHvOWs';
    var gapiUrl = 'https://www.googleapis.com/urlshortener/v1/url';

    return {
        shorten: shorten
    };

    //////////////////////////////////////////////////

    function shorten(url) {
        console.log(url);
        var data = {
            method: 'POST',
            url: gapiUrl + '?key=' + gapiKey,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                longUrl: "url",
            }
        };

        return $http(data).then(function (response) {
					console.log(data);
            // $log.debug(response);
            return response.data;
        }, function (response) {
            // $log.debug(response);
            return response.data;
        });
    };
}

;
