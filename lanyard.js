function getinfo() {
  const url = "https://api.lanyard.rest/v1/users/586206645592391711";

  $.getJSON(url, function(json) {

    // display status
    if (json['data']['discord_status'] == "offline") {
      document.getElementById("lanyard-box").style.visibility = "hidden";
      document.getElementById("album-art").style.visibility = "hidden";
    } else {
      document.getElementById("lanyard-box").style.visibility = "visible";

      // check for activities if I am online
      if (json['data']['activities'].length > 0) {

        // add special info from rich presence
        if (json['data']['listening_to_spotify'] == true) {
          console.log("Spotify detected");
          document.getElementById("game").innerHTML = "Spotify";
          document.getElementById("details").innerHTML = json['data']['spotify']['song'];
          document.getElementById("additional-details").innerHTML = "by " + json['data']['spotify']['artist'];
          document.getElementById("album-art").src = json['data']['spotify']['album_art_url']
          document.getElementById("album-art").style.visibility = "visible";
          document.getElementById("lanyard-box").style.backgroundColor = "#1db954";

        } else if (json['data']['activities'][0]['name'] == "Atom Editor") {
          document.getElementById("game").innerHTML = "Atom";
          document.getElementById("details").innerHTML = "editing " + json['data']['activities'][0]['state'].substring(8);
          document.getElementById("additional-details").innerHTML = "working on " + json['data']['activities'][0]['details'].substring(11);
          document.getElementById("album-art").src = "assets/images/atom.png"
          document.getElementById("album-art").style.visibility = "visible";

        } else if (json['data']['activities'][0]['name'] == "Visual Studio Code") {
          document.getElementById("game").innerHTML = "VS Code";
          document.getElementById("details").innerHTML = "editing " + json['data']['activities'][0]['details'].substring(8);
          document.getElementById("additional-details").innerHTML = "working on " + json['data']['activities'][0]['state'].substring(11);
          document.getElementById("album-art").src = "assets/images/vscode.png"
          document.getElementById("album-art").style.visibility = "visible";
        // or just display the game name
        } else {
          document.getElementById("game").innerHTML = json['data']['activities'][0]['name'];
          document.getElementById("album-art").style.visibility = "hidden";
        }
      }

    }
  })
}
