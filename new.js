const lanyard = async () => {
    const url = "https://api.lanyard.rest/v1/users/586206645592391711";
    let data = {};
    try {
        const res = await fetch(url);
        const json = await res.json();
        data = json.data;
    } catch (error) {
        console.error(`LANYARD: ${error}`);
    }
    if (data.listening_to_spotify === true) {
        parseLanyardData(data);
    }
};

const parseLanyardData = (data) => {
    const { song, album, album_art_url, artist, track_id } = data.spotify;
    const songData = {
        name: song,
        album: album,
        albumArt: album_art_url,
        artist: artist,
        link: `https://open.spotify.com/track/${track_id}`,
    };
    // console.table(songData);
    updateSpotifyData(songData);
};

const updateSpotifyData = (data) => {
    document.getElementById("lanyard-song").innerHTML = data.name;
    document.getElementById("lanyard-album").innerHTML = data.album;
    document.getElementById("lanyard-artist").innerHTML = data.artist;
    document.getElementById("lanyard-url").setAttribute("href", data.link);
};

const changeVisibility = (state) => {
    document.getElementById("lanyard-song").style.visibility = state;
    document.getElementById("lanyard-album").style.visibility = state;
    document.getElementById("lanyard-artist").style.visibility = state;
    document.getElementById("lanyard-url").style.visibility = state;
};
