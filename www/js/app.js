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
            .state('tabs.home', { //child of tabs
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/home.html'
                    }
                }
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
            .state('tabs.detail', { //child of tabs
                url: '/list/:aID',
                views: {
                    'list-tab': { //belongs to the list-tab
                        templateUrl: 'templates/detail.html',
                        controller: 'ListController'
                    }
                }
            })
            .state('tabs.calendar', { //child of tabs
                url: '/calendar',
                views: {
                    'calendar-tab': {
                        templateUrl: 'templates/calendar.html',
                        controller: 'CalendarController'
                    }
                }
            })
        $urlRouterProvider.otherwise('/tab/home'); //redirect to home if the specified route doesn't exist 
    })

    //adding a controller for the module we started in line 3
    //$state for passing variables between routes through parameters
    .controller('ListController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        $http.get('js/data.json').success(function (data) { //storing data in artists variable if successful
            $scope.artists = data.artists;
            $scope.whichArtist = $state.params.aID;
            $scope.data = {
                showDelete: false,
                showReorder: false
            };

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
    }])
    //adding a controller for the Calendar
    .controller('CalendarController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        $http.get('js/data.json').success(function (data) { //storing data in artists variable if successful
            $scope.calendar = data.calendar;

            $scope.onItemDelete = function (dayIndex, item) {
                $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
            };

            $scope.doRefresh = function () {
                $http.get('js/data.json').success(function (data) {
                    $scope.calendar = data.calendar;
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.toggleStar = function (item) {
                item.star = !item.star;
            };
        });
    }]);