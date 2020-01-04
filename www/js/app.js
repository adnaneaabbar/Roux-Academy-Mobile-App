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

//adding a controller for the module we started in line 3
.controller('ListController', ['$scope', '$http', function($scope, $http) {
    $http.get('js/data.json').success(function(data) { //storing data in artists variable if successful
        $scope.artists = data.artists;
        $scope.onItemDelete = function (item) {
            $scope.artists.splice($scope.artists.indexOf(item), 1);
        };
        $scope.moveItem = function (item, fromIndex, toIndex) {
            $scope.artists.splice(fromIndex, 1);
            $scope.artists.splice(toIndex, 0, item);
        };
    });
}]);