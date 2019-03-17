
console.log('path good');

let user = "https://www.youtube.com/user/devolvedcouk/playlists?";

let param ="part=snippet&mine=true";

const clientID = "924696548581-7thvpcf0eloagr39csujtj3fdkk2ujju.apps.googleusercontent.com"



const YTurl = user + param;

fetch(user + param, {method: "get", mode: "no-cors", "Content-Type": "application/json"})
    .then(data =>{return data.json()})
    .then(res => {console.log(res)});