
angular.module('starter', ['ionic', 'vcRecaptcha'])

  .controller('recaptchaCtrl', function ($scope, vcRecaptchaService, $http) {

      // Local settings
      var URL = 'http://localhost:3000';

      $scope.response = null;
      $scope.widgetId = null;
      $scope.model = {
          key: '<----PUBLIC KEY----->'
      };

      // Executes when recaptcha has loaded
      $scope.setWidgetId = function (widgetId) {

          $scope.widgetId = widgetId;

          // Sends user, host and phone info to /api/recaptcha/info
          sendUserInfo();
      };

      // Executes when we enter a successful recaptcha
      $scope.setResponse = function(response) {

          $http({
            url: URL + '/api/recaptcha/validate',
            method: 'POST',
            data: {
                response: response,
            }
          }).success(function(data){
            console.log("callback() /api/recaptcha/validate:");
            console.log(data);
          });
      };

      $scope.expired = function(){

        console.log("Reseting response and widgetId.");
        vcRecaptchaService.reload($scope.widgetId);
        $scope.response = null;
      };

      // This will execute when a client loads a recaptcha
      function sendUserInfo(){

        $http({
          url: URL + '/api/recaptcha/info',
          method: 'POST',
          data: {
              quizBetUser: "anonymous",
              hostname: "localhost",
              phoneId: "9652452"
          }
        }).success(function(data){
            console.log(data);
        });
      }
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
