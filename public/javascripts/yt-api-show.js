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
  }
}

// API signin
function handleSignInClick(event) { gapi.auth2.getAuthInstance().signIn(); }
function handleSignOutClick(event) { gapi.auth2.getAuthInstance().signOut(); }



function makeApiCall(YTchannel) {
    const YTinfo = {};
    // Make an API call
    gapi.client.youtube.channels.list({
      'part': 'statistics',
      'id': YTchannel
    }).then(function(response) {
      let YTinfo = response.result.items[0];
      populatePage(YTinfo);
    });
    
  }