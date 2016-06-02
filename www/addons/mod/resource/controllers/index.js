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

angular.module('mm.addons.mod_resource')

/**
 * Resource index controller.
 *
 * @module mm.addons.mod_resource
 * @ngdoc controller
 * @name mmaModResourceIndexCtrl
 */
<<<<<<< HEAD
.controller('mmaModResourceIndexCtrl', function($scope, $stateParams, $mmUtil, $mmaModResource, $log, $mmApp, $mmCourse,
            mmaModResourceComponent) {
=======
.controller('mmaModResourceIndexCtrl', function($scope, $stateParams, $mmUtil, $mmaModResource, $log, $mmApp, $mmCourse, $timeout) {
>>>>>>> v3.1.0
    $log = $log.getInstance('mmaModResourceIndexCtrl');

    var module = $stateParams.module || {},
        courseid = $stateParams.courseid;

    $scope.title = module.name;
    $scope.description = module.description;
<<<<<<< HEAD
    $scope.component = mmaModResourceComponent;
    $scope.componentId = module.id;
=======
>>>>>>> v3.1.0
    $scope.externalUrl = module.url;
    $scope.mode = false;
    $scope.loaded = false;

    function fetchContent() {
<<<<<<< HEAD
        if (module.contents) {
=======
        if (module.contents && module.contents.length) {
>>>>>>> v3.1.0
            if ($mmaModResource.isDisplayedInIframe(module)) {
                $scope.mode = 'iframe';
                var downloadFailed = false;
                return $mmaModResource.downloadAllContent(module).catch(function(err) {
                    // Mark download as failed but go on since the main files could have been downloaded.
                    downloadFailed = true;
                }).finally(function() {
                    $mmaModResource.getIframeSrc(module).then(function(src) {
<<<<<<< HEAD
                        $scope.src = src;
                        $mmaModResource.logView(module.instance).then(function() {
                            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
                        });
                        if (downloadFailed && $mmApp.isOnline()) {
                            // We could load the main file but the download failed. Show error message.
                            $mmUtil.showErrorModal('mm.core.errordownloadingsomefiles', true);
                        }
                    }).catch(function() {
                        $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
                    }).finally(function() {
                        $scope.loaded = true;
                    });
                });
            } else if ($mmaModResource.isDisplayedInline(module)) {
                var downloadFailed = false;
                $mmaModResource.downloadAllContent(module).catch(function(err) {
                    // Mark download as failed but go on since the main files could have been downloaded.
                    downloadFailed = true;
                }).finally(function() {
                    $mmaModResource.getResourceHtml(module.contents, module.id).then(function(content) {
                        $scope.mode = 'inline';
                        $scope.content = content;
                        $mmaModResource.logView(module.instance).then(function() {
                            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
                        });

=======
                        if ($scope.src && src.toString() == $scope.src.toString()) {
                            // Re-loading same page. Set it to empty and then re-set the src
                            // in the next digest so it detects it has changed.
                            $scope.src = '';
                            $timeout(function() {
                                $scope.src = src;
                            });
                        } else {
                            $scope.src = src;
                        }
                        $mmaModResource.logView(module.instance).then(function() {
                            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
                        });
>>>>>>> v3.1.0
                        if (downloadFailed && $mmApp.isOnline()) {
                            // We could load the main file but the download failed. Show error message.
                            $mmUtil.showErrorModal('mm.core.errordownloadingsomefiles', true);
                        }
                    }).catch(function() {
                        $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
                    }).finally(function() {
                        $scope.loaded = true;
                    });
                });
            } else {
                $scope.loaded = true;
                $scope.mode = 'external';

                $scope.open = function() {
<<<<<<< HEAD
                    var modal = $mmUtil.showModalLoading('mm.core.downloading', true);
=======
                    var modal = $mmUtil.showModalLoading();
>>>>>>> v3.1.0

                    $mmaModResource.openFile(module.contents, module.id).then(function() {
                        $mmaModResource.logView(module.instance).then(function() {
                            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
                        });
                    }).catch(function(error) {
<<<<<<< HEAD
                        if (error) {
=======
                        if (error && typeof error == 'string') {
>>>>>>> v3.1.0
                            $mmUtil.showErrorModal(error);
                        } else {
                            $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
                        }
                    }).finally(function() {
                        modal.dismiss();
                    });
                };
            }
        } else {
            $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
        }
    }

<<<<<<< HEAD
    // Event sent by the directive mmaModResourceHtmlLink when we click an HTML link.
    $scope.$on('mmaModResourceHtmlLinkClicked', function(e, target) {
        $scope.loaded = false;
        $mmaModResource.getResourceHtml(module.contents, module.id, target).then(function(content) {
            $scope.content = content;
        }).catch(function() {
            $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
        }).finally(function() {
            $scope.loaded = true;
        });
    });

=======
>>>>>>> v3.1.0
    $scope.doRefresh = function() {
        $mmaModResource.invalidateContent(module.id).then(function() {
            return fetchContent();
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    fetchContent();
});
