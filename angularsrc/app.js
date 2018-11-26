// Angular
import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-animate';
//import 'angular-aria';
//import 'angular-messages';
//import 'angular-filter';
import 'angular-sanitize';

// Service
import GetData from './services/service.data.js';

// Templates
import front_tpl from 'partials/front_tpl.html';
import list_tpl from 'partials/list_tpl.html';
import front_bysykkel_tpl from 'partials/front_bysykkel_tpl.html';
import list_bysykkel_tpl from 'partials/list_bysykkel_tpl.html';

// CSS
import 'css/style.scss';

angular
	// 'angular.filter', 'ngMessages',
	.module('DagCMS', ['ngSanitize', 'GetData', 'ui.router', 'ngAnimate'])
	.run([
		'$rootScope',
		'$state',
		'$stateParams',
		function($rootScope, $state, $stateParams) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		},
	])
	.config([
		'$qProvider',
		'$compileProvider',
		'$sceDelegateProvider',
		'$locationProvider',
		'$stateProvider',
		'$urlRouterProvider',
		function(
			$qProvider,
			$compileProvider,
			$sceDelegateProvider,
			$locationProvider,
			$stateProvider,
			$urlRouterProvider
		) {
			//  $uiViewScrollProvider.useAnchorScroll();
			$qProvider.errorOnUnhandledRejections(false);
			$compileProvider.debugInfoEnabled(false);
			$sceDelegateProvider.resourceUrlWhitelist(['**']);

			$urlRouterProvider.otherwise(function($injector, $location) {
				var state = $injector.get('$state');
				state.go('front', { sted: 'oslo' });
			});
			// Oppsett av states
			$stateProvider
				.state('front', {
					url: '/:sted',
					template: function($stateParams) {
						if ($stateParams.sted.toLowerCase() === 'oslo') {
							return front_tpl;
						} else {
							return front_bysykkel_tpl;
						}
					},
					params: { title: 'BYSYKLER', isFront: true, reloadData: true },
				})
				.state('stasjoner', {
					url: '/:sted/stasjoner/:stasjoner',
					template: function($stateParams) {
						if ($stateParams.sted.toLowerCase() === 'oslo') {
							return front_tpl;
						} else {
							return front_bysykkel_tpl;
						}
					},
					params: { title: 'BYSYKLER', loadCustom: true, reloadData: true },
				})
				.state('liste', {
					url: '/:sted/liste',
					template: function($stateParams) {
						if ($stateParams.sted.toLowerCase() === 'oslo') {
							return list_tpl;
						} else {
							return list_bysykkel_tpl;
						}
					},
					params: { title: 'Liste', loadList: true, reloadData: false },
				});
		},
	])
	.controller('MainCtrl', [
		'$scope',
		'$stateParams',
		'$state',
		'$sce',
		'$transitions',
		'DataHandler',
		function($scope, $stateParams, $state, $sce, $transitions, DataHandler) {
			$scope.selectedStations = [];
			$scope.goto = function(gotohappyplace) {
				$state.go(gotohappyplace, { sted: $stateParams.sted });
			};
			$scope.getStationsStatus = function(stations) {
				DataHandler.getStationsStatus().then(
					function(answer) {
						$scope.status = answer.data.status.status;
					},
					function(reason) {}
				);
			};
			$scope.getStations = function(stations) {
				DataHandler.getStations(stations, $stateParams.sted).then(
					function(answer) {
						$scope.stations = answer.data.station;
					},
					function(reason) {}
				);
			};
			$scope.getAllStations = function() {
				DataHandler.getAllStations($stateParams.sted).then(
					function(answer) {
						if ($stateParams.sted.toLowerCase() == 'oslo') {
							$scope.allStations = answer.data.stations.stations;
						} else {
							$scope.allStations = answer.data.stations.data.stations;
						}
					},
					function(reason) {}
				);
			};
			$scope.loadList = function() {
				$scope.getAllStations();
			};
			$scope.selectStation = function(item) {
				let obj = $scope.selectedStations.find(obj => obj == item);
				if (obj) {
				} else {
					if (item.id || item.station_id) {
						$scope.selectedStations.push(item);
					}
				}
			};
			$scope.deleteSelectedItem = function(id) {
				var pos = $scope.selectedStations
					.map(function(e) {
						if (e.id) {
							return e.id;
						} else {
							return e.station_id;
						}
					})
					.indexOf(id);
				$scope.selectedStations.splice(pos, 1);
			};
			$scope.emptySelectedStations = function() {
				$scope.selectedStations = [];
			};
			$scope.gotoSystems = function() {
				if ($scope.selectedStations[0].id) {
					var result = $scope.selectedStations.map(a => a.id);
				} else {
					var result = $scope.selectedStations.map(a => a.station_id);
				}
				$scope.selectedStations = [];
				$state.go('stasjoner', { sted: $stateParams.sted, stasjoner: result.toString().replace(/,/g, '-') });
			};
			$transitions.onSuccess({}, function() {
				$scope.title = $stateParams.title;
				if ($stateParams.stasjoner) {
					$scope.getStations($stateParams.stasjoner);
				}
				if ($stateParams.isFront) {
					$scope.getStations('302-354-392', $stateParams.sted);
					$scope.getStationsStatus();
				}
				if ($stateParams.reloadData) {
					$scope.refreshDataInterval = setInterval(function() {
						if ($scope.stations[0].id) {
							var result = $scope.stations.map(a => a.id);
						} else {
							var result = $scope.stations.map(a => a.station_id);
						}
						DataHandler.getUpdatedFiles($stateParams.sted).then(
							function(answer) {
								$scope.getStationsStatus();
								$scope.getStations(result.toString().replace(/,/g, '-'), $stateParams.sted);
							},
							function(reason) {}
						);
					}, 60000);
				} else {
					window.clearInterval($scope.refreshDataInterval);
				}
			});
		},
	]);
