// Ionic Starter App

angular.module('starter', ['ionic']) //array of requires
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function () {
        //Hide accesory bar by default
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})