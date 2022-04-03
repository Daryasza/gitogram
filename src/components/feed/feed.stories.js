import xFeed from './feed.vue';

export default {
  title: 'feed',
  component: xFeed
}

const template = args => ({
  components: { xFeed },
  setup() {
    return { args };
  },
  template: '<xFeed v-bind="args"/>'
})

export const Default = template.bind({})

Default.args = {
  avatar: 'https://picsum.photos/600',
  username: 'Mark',
  date: '2021-12-12T12:12:12Z',
  issues: [
    {
      "url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/36",
      "repository_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch",
      "labels_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/36/labels{/name}",
      "comments_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/36/comments",
      "events_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/36/events",
      "html_url": "https://github.com/cleanlock/VideoAdBlockForTwitch/issues/36",
      "id": 1190937652,
      "node_id": "I_kwDOHF0GnM5G_EQ0",
      "number": 36,
      "title": "Resolution issue",
      "user": {
        "login": "pixeltris",
        "id": 6952411,
        "node_id": "MDQ6VXNlcjY5NTI0MTE=",
        "avatar_url": "https://avatars.githubusercontent.com/u/6952411?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/pixeltris",
        "html_url": "https://github.com/pixeltris",
        "followers_url": "https://api.github.com/users/pixeltris/followers",
        "following_url": "https://api.github.com/users/pixeltris/following{/other_user}",
        "gists_url": "https://api.github.com/users/pixeltris/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/pixeltris/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/pixeltris/subscriptions",
        "organizations_url": "https://api.github.com/users/pixeltris/orgs",
        "repos_url": "https://api.github.com/users/pixeltris/repos",
        "events_url": "https://api.github.com/users/pixeltris/events{/privacy}",
        "received_events_url": "https://api.github.com/users/pixeltris/received_events",
        "type": "User",
        "site_admin": false
      },
      "labels": [
  
      ],
      "state": "open",
      "locked": false,
      "assignee": null,
      "assignees": [
  
      ],
      "milestone": null,
      "comments": 0,
      "created_at": "2022-04-03T13:51:49Z",
      "updated_at": "2022-04-03T13:51:49Z",
      "closed_at": null,
      "author_association": "NONE",
      "active_lock_reason": null,
      "body": "I saw some comments about the extension defaulting to 360p which I was able to reproduce. The code attempts to restore the original set quality, but doesn't quite get it right. A simpler approach is to restore the value currently set in `localStorage`.\r\n\r\nCurrent code:\r\n\r\nhttps://github.com/cleanlock/VideoAdBlockForTwitch/blob/7234bf4a73271d368d9f28328d515bb541620fa0/chrome/remove_video_ads.js#L217-L220\r\n\r\nShould be changed to:\r\n\r\n```js\r\nvar currentQualityLS = window.localStorage.getItem('video-quality');\r\nlowQuality[qualityToSelect].click();\r\nwindow.localStorage.setItem('video-quality', currentQualityLS);\r\n```\r\n\r\nFrom my brief testing this seems to fix the issue.",
      "reactions": {
        "url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/36/reactions",
        "total_count": 1,
        "+1": 1,
        "-1": 0,
        "laugh": 0,
        "hooray": 0,
        "confused": 0,
        "heart": 0,
        "rocket": 0,
        "eyes": 0
      },
      "timeline_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/36/timeline",
      "performed_via_github_app": null
    },
    {
      "url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/35",
      "repository_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch",
      "labels_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/35/labels{/name}",
      "comments_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/35/comments",
      "events_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/35/events",
      "html_url": "https://github.com/cleanlock/VideoAdBlockForTwitch/issues/35",
      "id": 1190923003,
      "node_id": "I_kwDOHF0GnM5G_Ar7",
      "number": 35,
      "title": "Make sure to rate the Extension on Firefox & Chrome",
      "user": {
        "login": "cleanlock",
        "id": 32986026,
        "node_id": "MDQ6VXNlcjMyOTg2MDI2",
        "avatar_url": "https://avatars.githubusercontent.com/u/32986026?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/cleanlock",
        "html_url": "https://github.com/cleanlock",
        "followers_url": "https://api.github.com/users/cleanlock/followers",
        "following_url": "https://api.github.com/users/cleanlock/following{/other_user}",
        "gists_url": "https://api.github.com/users/cleanlock/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/cleanlock/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/cleanlock/subscriptions",
        "organizations_url": "https://api.github.com/users/cleanlock/orgs",
        "repos_url": "https://api.github.com/users/cleanlock/repos",
        "events_url": "https://api.github.com/users/cleanlock/events{/privacy}",
        "received_events_url": "https://api.github.com/users/cleanlock/received_events",
        "type": "User",
        "site_admin": false
      },
      "labels": [
  
      ],
      "state": "open",
      "locked": false,
      "assignee": null,
      "assignees": [
  
      ],
      "milestone": null,
      "comments": 0,
      "created_at": "2022-04-03T12:54:00Z",
      "updated_at": "2022-04-03T12:54:00Z",
      "closed_at": null,
      "author_association": "OWNER",
      "active_lock_reason": null,
      "body": "Heya!\r\n\r\nPlease make sure that you rate the extension on Firefox & Chrome, so it gets more attention :)\r\n\r\nOnly rate for the browser you're using. Thanks <3",
      "reactions": {
        "url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/35/reactions",
        "total_count": 0,
        "+1": 0,
        "-1": 0,
        "laugh": 0,
        "hooray": 0,
        "confused": 0,
        "heart": 0,
        "rocket": 0,
        "eyes": 0
      },
      "timeline_url": "https://api.github.com/repos/cleanlock/VideoAdBlockForTwitch/issues/35/timeline",
      "performed_via_github_app": null
    }
  ]
}