function getInfo() {
  const url = "https://api.lanyard.rest/v1/users/586206645592391711";

  $.getJSON(url, function(json) {

    // display status
    if (json['data']['discord_status'] == "offline") {
      setVisibility("lanyard-box", "hidden");
      setVisibility("album-art", "hidden");

    } else {
      setVisibility("lanyard-box", "visible");

      // check for activities if I am online
      if (json['data']['activities'].length > 0) {

        // add special info from rich presence
        if (json['data']['listening_to_spotify'] == true) {
          console.log("Spotify detected");
          setText("game", "Spotify");
          setText("details", json['data']['spotify']['song']);
          setText("additional-details", "by " + json['data']['spotify']['artist']);
          setAlbumArt(json['data']['spotify']['album_art_url']);
          setVisibility("album-art", "visible");
          document.getElementById("lanyard-box").style.backgroundColor = "#1db954";
          addSpotifyURL(json['data']['spotify']['track_id']);

        } else if (json['data']['activities'][0]['name'] == "Atom Editor") {
          document.getElementById("game").innerHTML = "Atom";
          document.getElementById("details").innerHTML = "editing " + json['data']['activities'][0]['state'].substring(8);
          document.getElementById("additional-details").innerHTML = "working on " + json['data']['activities'][0]['details'].substring(11);
          setAlbumArt("assets/images/atom.png");
          setVisibility("album-art", "visible");

        } else if (json['data']['activities'][0]['name'] == "Visual Studio Code") {
          document.getElementById("game").innerHTML = "VS Code";
          document.getElementById("details").innerHTML = "editing " + json['data']['activities'][0]['details'].substring(8);
          document.getElementById("additional-details").innerHTML = "working on " + json['data']['activities'][0]['state'].substring(11);
          setAlbumArt("assets/images/vscode.png");
          setVisibility("album-art", "visible");
        // or just display the game name
        } else {
          document.getElementById("game").innerHTML = json['data']['activities'][0]['name'];
          setVisibility("album-art", "hidden");
        }
      }

    }

  })

  function setVisibility(elementId, state) {
    document.getElementById(elementId).style.visibility = state;
  }

  function setAlbumArt(path) {
    document.getElementById("album-art").src = path;
  }

  function addSpotifyURL(url) {
    document.getElementById("details").setAttribute('href', "https://open.spotify.com/track/" + url);
  }

  function setText(elementId, text) {
    document.getElementById(elementId).innerHTML = text;
  }
}
