'use strict';

angular.module('openwheels.resource.show.revisions', [])


/*
$scope.fields        = [];
$scope.revisions     = [];
$scope.selectedField = null;

// populate fields
angular.forEach(resource, function (val, key) {
    $scope.fields.push(key);
});

// populate revisions
alertService.load();
revisionsService.revisions({
    id   : resource.id,
    type : 'OpenWheels\\ApiBundle\\Entity\\Resource'
})
    .then(function (revisions) {
        $scope.revisions = revisions;
    })
    .finally(function () {
        alertService.loaded();
    });


*/


.controller('ResourceShowRevisionsController', function ($scope, alertService, revisionlog, perPage, resource, revisionsService) {

  $scope.curPage = 1;
  $scope.perPage = perPage;
  $scope.offset = 0;
  $scope.resource = resource;

  handleRevisionLog(revisionlog);

  function handleRevisionLog(revisionlog) {
      $scope.revisionlog = revisionlog.result;
      $scope.lastPage = Math.ceil(revisionlog.total / $scope.perPage);
  }

  $scope.nextPage = function() {
      $scope.offset = $scope.curPage * $scope.perPage;
      revisionsService.revisions(_.extend({}, {id: $scope.resource.id, type: 'OpenWheels\\ApiBundle\\Entity\\Resource', limit: $scope.perPage, offset: $scope.offset }))
          .then(function(revisionlog) {
              handleRevisionLog(revisionlog);
              $scope.curPage = $scope.curPage + 1;
          });
  };

  $scope.prevPage = function() {
      $scope.offset = ($scope.curPage - 2) * $scope.perPage;
      revisionsService.revisions(_.extend({}, {id: $scope.resource.id, type: 'OpenWheels\\ApiBundle\\Entity\\Resource', limit: $scope.perPage, offset: $scope.offset}))
          .then(function(revisionlog) {
              handleRevisionLog(revisionlog);
              $scope.curPage = $scope.curPage - 1;
          });
  };

  $scope.refresh = function() {
      revisionsService.revisions(_.extend({}, {id: $scope.resource.id, type: 'OpenWheels\\ApiBundle\\Entity\\Resource', limit: $scope.perPage, offset: $scope.offset}))
          .then(function(revisionlog) {
              handleRevisionLog(revisionlog);
          });
  };


});
