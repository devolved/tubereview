// YouTube API code

function handleClientLoad() { gapi.load('client:auth2', initClient); }

function initClient() {
  // Initialize the client with API key and People API, and initialize OAuth with an
  // OAuth 2.0 client ID and scopes (space delimited string) to request access.
  gapi.client.init({
      apiKey: 'AIzaSyBlp1Js92t-JC8rtLSlygQOAq7q287qF7s',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
      clientId: '924696548581-7thvpcf0eloagr39csujtj3fdkk2ujju.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/youtube.readonly'
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn) {
  // When signin status changes, this function is called.
  // If the signin status is changed to signedIn, we make an API call.
  if (isSignedIn) {
    console.log(isSignedIn);
    makeApiCall(YTchannel);
  }
}

// API signin
function handleSignInClick(event) { gapi.auth2.getAuthInstance().signIn(); }
function handleSignOutClick(event) { gapi.auth2.getAuthInstance().signOut(); }

let YTchannel = document.getElementById('chanID').innerHTML;

function makeApiCall(YTchannel) {
    let YTinfo = {};
    // Make an API call
    gapi.client.youtube.channels.list({
      'part': 'statistics',
      'id': YTchannel
    }).then(function(response) {
      YTinfo = response.result.items[0];
      populateMeta(YTinfo);
    });
    
}

function populateMeta(YTinfo) {

    let subs = document.getElementById('subs');
    let count = parseInt(YTinfo.statistics.subscriberCount, 10);

    if (count < 1000) {
        subs.innerHTML = "Subscribe " + count;
    } else if (count > 1000000) {
        let x = (count / 1000000).toFixed(1);
        subs.innerHTML = "Subscribe " + x.toString() + "m";
    } else {
        let x = Math.floor(count / 1000);
        subs.innerHTML = "Subscribe " + x.toString() + "k";
    }

}

