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

// CSS
import 'css/style.scss';

angular
	// 'angular.filter', 'ngMessages',
	.module('DagCMS', ['ngSanitize', 'GetData', 'ui.router', 'ngAnimate'])
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
				state.go('front');
			});
			// Oppsett av states
			$stateProvider
				.state('front', {
					url: '/',
					template: front_tpl,
					params: { title: 'BYSYKLER', isFront: true, reloadData:true },
				})
				.state('stasjoner', {
					url: '/stasjoner/:stasjoner',
					template: front_tpl,
					params: { title: 'BYSYKLER', loadCustom: true, reloadData:true  },
				})
				.state('liste', {
					url: '/liste',
					template: list_tpl,
					params: { title: 'Liste', loadList: true, reloadData:false },
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
			
			$scope.getStationsStatus = function(stations) {
				DataHandler.getStationsStatus().then(
					function(answer) {
						$scope.status = answer.data.status.status;
					},
					function(reason) {}
				);
			};
			$scope.getStations = function(stations) {
				DataHandler.getStations(stations).then(
					function(answer) {
						$scope.stations = answer.data.station;
					},
					function(reason) {}
				);
			};
			$scope.getAllStations = function() {
				DataHandler.getAllStations().then(
					function(answer) {
						$scope.allStations = answer.data.stations.stations;
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
					if (item.id) {
						$scope.selectedStations.push(item);
					}
				}
			};
			$scope.deleteSelectedItem = function(id) {
				var pos = $scope.selectedStations
					.map(function(e) {
						return e.id;
					})
					.indexOf(id);
				$scope.selectedStations.splice(pos, 1);
			};
			$scope.emptySelectedStations = function(){
				$scope.selectedStations = [];
			}
			$scope.gotoSystems = function() {
				var result = $scope.selectedStations.map(a => a.id);
				$state.go('stasjoner', { stasjoner: result.toString().replace(/,/g, '-') });
			};
			$transitions.onSuccess({}, function() {
				$scope.title = $stateParams.title;
				if ($stateParams.stasjoner) {
					$scope.getStations($stateParams.stasjoner);
				}
				if($stateParams.isFront){
					$scope.getStations('302-354-392');
					$scope.getStationsStatus();
				}
				if($stateParams.reloadData){
					$scope.refreshDataInterval = setInterval(function(){
						var result = $scope.stations.map(a => a.id);
						DataHandler.getUpdatedFiles().then(
							function(answer) {
								$scope.getStationsStatus();
								$scope.getStations(result.toString().replace(/,/g, '-'));
							},
							function(reason) {

							}
						);
					  }, 60000)
				}else{
					window.clearInterval($scope.refreshDataInterval);
				}
			});

		},
	]);
