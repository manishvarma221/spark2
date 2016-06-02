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

angular.module('mm.addons.mod_forum', [])

.constant('mmaModForumDiscPerPage', 10) // Max of discussions per page.
.constant('mmaModForumComponent', 'mmaModForum')
.constant('mmaModForumNewDiscussionEvent', 'mma-mod_forum_new_discussion')

.config(function($stateProvider) {

    $stateProvider

    .state('site.mod_forum', {
        url: '/mod_forum',
        params: {
            module: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModForumDiscussionsCtrl',
<<<<<<< HEAD
                templateUrl: 'addons/mod_forum/templates/discussions.html'
=======
                templateUrl: 'addons/mod/forum/templates/discussions.html'
>>>>>>> v3.1.0
            }
        }
    })

    .state('site.mod_forum-discussion', {
        url: '/mod_forum-discussion',
        params: {
            discussionid: null,
<<<<<<< HEAD
            courseid: null
=======
            cid: null // Not naming it courseid because it collides with 'site.mod_forum' param in split-view.
>>>>>>> v3.1.0
        },
        views: {
            'site': {
                controller: 'mmaModForumDiscussionCtrl',
<<<<<<< HEAD
                templateUrl: 'addons/mod_forum/templates/discussion.html'
=======
                templateUrl: 'addons/mod/forum/templates/discussion.html'
>>>>>>> v3.1.0
            }
        }
    })

    .state('site.mod_forum-newdiscussion', {
        url: '/mod_forum-newdiscussion',
        params: {
<<<<<<< HEAD
            courseid: null,
=======
            cid: null, // Not naming it courseid because it collides with 'site.mod_forum' param in split-view.
>>>>>>> v3.1.0
            forumid: null,
            cmid: null
        },
        views: {
            'site': {
                controller: 'mmaModForumNewDiscussionCtrl',
<<<<<<< HEAD
                templateUrl: 'addons/mod_forum/templates/newdiscussion.html'
=======
                templateUrl: 'addons/mod/forum/templates/newdiscussion.html'
>>>>>>> v3.1.0
            }
        }
    });

})

<<<<<<< HEAD
.config(function($mmCourseDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModForum', 'forum', '$mmaModForumCourseContentHandler');
})

.run(function($mmaModForum, $mmModuleActionsDelegate) {

    // Add actions to notifications. Forum will only add 1 action: view discussion.
    $mmModuleActionsDelegate.registerModuleHandler('mmaModForum', function(url, courseid) {

        if (courseid && url.indexOf('/mod/forum/') > -1 && $mmaModForum.isPluginEnabled()) {
            var d = url.match(/discuss\.php\?d=([^#]*)/);
            if (d && typeof d[1] != 'undefined') {
                var action = {
                    message: 'mm.core.view',
                    icon: 'ion-eye',
                    state: 'site.mod_forum-discussion',
                    stateParams: {
                        courseid: courseid,
                        discussionid: d[1]
                    }
                };
                return [action]; // Delegate expects an array of actions, a handler can define more than one action.
            }
        }

    });
=======
.config(function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModForum', 'forum', '$mmaModForumHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModForum', '$mmaModForumHandlers.linksHandler');
>>>>>>> v3.1.0
});
