// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'vcRecaptcha'])

  .controller('recaptchaCtrl', function ($scope, vcRecaptchaService, $http) {

      // Local settings
      // var URL = 'http://localhost:3030';

      // Prod settings
      // var URL = 'https://bb.quizbet.se';

      // Amazon temp demo
      // var URL = 'https://Sample-env.zqmksgbjhx.eu-central-1.elasticbeanstalk.com';
      var URL = 'http://34.250.40.53:3000';

      $scope.response = null;
      $scope.widgetId = null;
      $scope.model = {
          key: '6LfBqhQUAAAAAN1SyD7WVetHMDI2njVyY6BdsBpo'
      };
      $scope.expired = function(){

        console.log("Google says expired:");

      };
      $scope.setResponse = function(response) {

        if ($scope.response === ""){
          console.log("Response is empty");
        } else {

          $http({
            url: URL + '/api/recaptcha/validate',
            method: 'POST',
            data: {
                response: response
            }
          }).success(function(data){
            console.log("/validate: " + data.success);

            //TODO Check for right output
            if(data.success){
              console.log("succes: true");
            } else {
              console.log("succes: false");
            }

            // If recaptcha validation succes
            //TODO Redirect to home
            //TODO recaptcha.reset / recaptcha.reload
          });

        }

      };
      $scope.setWidgetId = function (widgetId) {
          $scope.widgetId = widgetId;
          hunterUser();
      };

      /////
      //
      // This will execute when a client loads a recaptcha
      //
      ////////
      //TODO Send client IP adress?
      //TODO Bind to a QuizBet user
      function hunterUser(){

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
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
