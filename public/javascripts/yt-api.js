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
    //makeApiCall();
    console.log(isSignedIn);
  }
}

// API signin
function handleSignInClick(event) { gapi.auth2.getAuthInstance().signIn(); }
function handleSignOutClick(event) { gapi.auth2.getAuthInstance().signOut(); }


// Process YT channel URL
// https://www.youtube.com/channel/UCnQC_G5Xsjhp9fEJKuIcrSw

let YTchannel = 'url';

document.getElementById('chan').addEventListener('change', function(){
  let x = this.value.trim();
  if(x.length == 24) {
    YTchannel = this.value;
    document.getElementById('chan-error').innerHTML = '';
    console.log(YTchannel);
  } else if ( x.length === 56) {
    YTchannel = x.substring(32, 56);
    document.getElementById('chan-error').innerHTML = '';
    console.log(YTchannel);
  } else {
    document.getElementById('chan-error').innerHTML = 'Please enter a valid channel URL';
  };

  
  
  
});



function makeApiCall() {

  // Make an API call to the People API, and print the user's given name.
  gapi.client.youtube.channels.list({
    'part': 'snippet,statistics,brandingSettings',
    'id': YTchannel
  }).then(function(response) {
    var YTinfo = response.result.items[0];

    console.log(YTinfo.brandingSettings.image.bannerImageUrl);

    
document.getElementById('yt-banner').style.backgroundImage='url("' + YTinfo.brandingSettings.image.bannerImageUrl + '")';


  });
  
}


let trig = document.getElementById('trig');

trig.addEventListener('click', function(){
  makeApiCall();
});

// Form handling








