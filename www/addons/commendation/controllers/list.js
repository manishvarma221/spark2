// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//Commendation

angular.module('mm.addons.commendation')

/**
 * Controller to handle commendation list.
 *
 * @module mm.addons.commendation
 * @ngdoc controller
 * @name mmaCommendationListCtrl
 */
.controller('mmaCommendationListCtrl', function($scope, $mmUtil, $mmaCommendation, mmaCommendationListLimit, $sce, $compile, $state) {

    var readCount = 0,
        unreadCount = 0;
    $scope.commendation = [];
    //$scope.commendationcourse = [];


    $scope.action = function(e, course) {
    
        console.log(course);
        $state.go('site.mm_course', {course: course});
        e.preventDefault();
        e.stopPropagation();
    };
    
    $scope.actionGrade = function(e, course) {
       
        $state.go('site.grades', {course: course});
        e.preventDefault();
        e.stopPropagation();
    };

    // Convenience function to get commendation. Get unread notifications first.
    function fetchCommendation(refresh) {

        if (refresh) {
            readCount = 0;
            unreadCount = 0;
        }


        return $mmaCommendation.getCommendation(true,unreadCount, mmaCommendationListLimit).then(function(gotres_commendation) {
            $scope.commendation = gotres_commendation;
            
            $scope.canLoadMore = false;
        }, function(error) {                
                    
                    if (error) {
                        $mmUtil.showErrorModal(error);
                    } else {
                        $mmUtil.showErrorModal('mma.commendation.errorgetcommendation', true);
                    }
                    $scope.canLoadMore = false;
        });

        
    }
    fetchCommendation().finally(function() {
        $scope.commendationLoaded = true;
    });

    $scope.refreshCommendation = function() {
        $mmaCommendation.invalidateCommendationList().finally(function() {
            fetchCommendation(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };

    $scope.loadMoreCommendation = function(){
        fetchCommendation().finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
});