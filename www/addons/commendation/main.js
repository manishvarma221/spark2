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
//alert('asdf');

angular.module('mm.addons.commendation', ['mm.core'])

//.constant('mmaNotificationsListLimit', 20) // Max of notifications to retrieve in each WS call.
.constant('mmaCommendationListLimit', 50)
.constant('mmaCommendationPriority', 800)

.config(function($stateProvider, $mmSideMenuDelegateProvider, mmaCommendationPriority) {

    $stateProvider

    .state('site.commendation', {
        url: '/commendation',
        views: {
            'site': {
                templateUrl: 'addons/commendation/templates/list.html',
                controller: 'mmaCommendationListCtrl'
            }
        }
    });

    // Register side menu addon.
    $mmSideMenuDelegateProvider.registerNavHandler('mmaCommendation', '$mmaCommendationHandlers.sideMenuNav', mmaCommendationPriority);
})

.run(function($log, $mmaCommendation, $mmUtil, $state, $mmAddonManager) {
    $log = $log.getInstance('mmaCommendation');

    // Register push notification clicks.
    var $mmPushCommendationDelegate = $mmAddonManager.get('$mmPushCommendationDelegate');
    if ($mmPushCommendationDelegate) {
        $mmPushCommendationDelegate.registerHandler('mmaCommendation', function(commendation) {
            if ($mmUtil.isTrueOrOne(commendation.notif)) {
                $mmaCommendation.isPluginEnabledForSite(commendation.site).then(function() {
                    $mmaCommendation.invalidateCommendationList().finally(function() {
                        $state.go('redirect', {siteid: commendation.site, state: 'site.academicsummary'});
                        $state.go('redirect', {siteid: commendation.site, state: 'site.academicsummary'});                    });
                });
                return true;
            }
        });
    }
});
