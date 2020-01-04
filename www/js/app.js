// Ionic Starter App

angular.module('starter', ['ionic']) //array of requires
    .run(function ($ionicPlatform) {
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

    //routing
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tabs', {
                url: '/tab',
                abstract: true, //shouldn't navigate through it
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.list', { //child of tabs
                url: '/list',
                views: {
                    'list-tab': {
                        templateUrl: 'templates/list.html',
                        controller: 'ListController'
                    }
                }
            })
        $urlRouterProvider.otherwise('/tab/list'); //redirect to tabs.list if the specified route doesn't exist 
    })

    //adding a controller for the module we started in line 3
    .controller('ListController', ['$scope', '$http', function ($scope, $http) {
        $http.get('js/data.json').success(function (data) { //storing data in artists variable if successful
            $scope.artists = data.artists;

            $scope.onItemDelete = function (item) {
                $scope.artists.splice($scope.artists.indexOf(item), 1);
            };

            $scope.doRefresh = function () {
                $http.get('js/data.json').success(function (data) {
                    $scope.artists = data.artists;
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.toggleStar = function (item) {
                item.star = !item.star;
            };

            $scope.moveItem = function (item, fromIndex, toIndex) {
                $scope.artists.splice(fromIndex, 1);
                $scope.artists.splice(toIndex, 0, item);
            };
        });
    }]);