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
    //console.log(isSignedIn);
  }
}

// API signin
function handleSignInClick(event) { gapi.auth2.getAuthInstance().signIn(); }
function handleSignOutClick(event) { gapi.auth2.getAuthInstance().signOut(); }

// Process YT channel URL
document.getElementById('chan').addEventListener('change', function(){
  let YTchannel = this.value.trim();
  
  if(YTchannel.length == 24) {

    document.getElementById('chan-error').innerHTML = '';
    this.classList.add('valid')
    this.classList.remove('invalid');
    makeApiCall(YTchannel);
  } else if (YTchannel.length == 56) {
    YTchannel = YTchannel.substring(32, 56);
    document.getElementById('chan-error').innerHTML = '';
    this.classList.add('valid')
    this.classList.remove('invalid');
    makeApiCall(YTchannel);
  } else {
    document.getElementById('chan-error').innerHTML = 'Please enter a valid channel URL';
    this.classList.add('invalid')
    this.classList.remove('valid');
    document.getElementById('review').classList.remove('show');
  };

});



function makeApiCall(YTchannel) {
  const YTinfo = {};
  // Make an API call
  gapi.client.youtube.channels.list({
    'part': 'snippet,statistics,brandingSettings',
    'id': YTchannel
  }).then(function(response) {
    let YTinfo = response.result.items[0];
    populatePage(YTinfo);
  });
  
}

function populatePage(YTinfo){
  // set banner img
  document.getElementById('yt-banner').style.backgroundImage='url("' + YTinfo.brandingSettings.image.bannerTabletExtraHdImageUrl + '")';

  // process chan description to <p>
  let chanDescription = formatToP(YTinfo.brandingSettings.channel.description);

  // populate hidden form data
  document.getElementById('channel-url').value = 'https://www.youtube.com/channel/' + YTinfo.id;
  document.getElementById('channel-banner').value = YTinfo.brandingSettings.image.bannerTabletExtraHdImageUrl;
  document.getElementById('channel-thumb').value = YTinfo.snippet.thumbnails.medium.url;
  document.getElementById('channel-title').value = YTinfo.brandingSettings.channel.title;
  document.getElementById('channel-description').value = chanDescription;
  document.getElementById('channel-subs').value = YTinfo.statistics.subscriberCount;
  document.getElementById('channel-views').value = YTinfo.statistics.viewCount;

  // create rating url
  let urlArray = YTinfo.brandingSettings.channel.title.split(" ");
  document.getElementById('rating-url').value = urlArray.join('-').toLowerCase();

  // populate channel preview
  if (YTinfo.brandingSettings.channel.title.length > 18) {
    document.getElementById('prev-heading').classList.add('long-title');
  }

  document.getElementById('prev-heading').innerHTML = YTinfo.brandingSettings.channel.title;
  document.getElementById('prev-thumb').style.backgroundImage='url("' + YTinfo.snippet.thumbnails.medium.url + '")';
  document.getElementById('prev-desc').innerHTML = chanDescription;


  // show form and banner
  document.getElementById('review').classList.add('show');


}

// change to <p> formatted
function formatToP(text) {
  let t = text;
  t = t.match(/[^\r\n]+/g).join('</p><p>');
  t = '<p>' + t + '</p>';

  return t;
}








