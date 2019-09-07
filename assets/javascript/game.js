//// begin trivia code

// variables
var picked = [];

// music array
var songs = [
    {
        title: "Main Theme",
        src: "assets/music/01_main_theme.flac"
    },
    {
        title: "Ophilia, the Cleric",
        src: "assets/music/02_ophilia_the_cleric.flac"
    },
    {
        title: "Cyrus, the Scholar",
        src: "assets/music/03_cyrus_the_scholar.flac"
    },
    {
        title: "Tressa, the Merchant",
        src: "assets/music/04_tressa_the_merchant.flac"
    },
    {
        title: "Olberic, the Warrior",
        src: "assets/music/05_olberic_the_warrior.flac"
    },
    {
        title: "Primrose, the Dancer",
        src: "assets/music/06_primrose_the_dancer.flac"
    },
    {
        title: "Alfyn, the Apothecary",
        src: "assets/music/07_alfyn_the_apothecary.flac"
    },
    {
        title: "Therion, the Thief",
        src: "assets/music/08_therion_the_thief.flac"
    },
    {
        title: "H'aanit, the Hunter",
        src: "assets/music/09_haanit_the_hunter.flac"
    },
    {
        title: "The Frostlands",
        src: "assets/music/10_the_frostlands.flac"
    },
    {
        title: "The Flatlands",
        src: "assets/music/11_the_flatlands.flac"
    },
    {
        title: "The Coastlands",
        src: "assets/music/12_the_coastlands.flac"
    },
    {
        title: "The Highlands",
        src: "assets/music/13_the_highlands.flac"
    },
    {
        title: "The Sunlands",
        src: "assets/music/14_the_sunlands.flac"
    },
    {
        title: "The Riverlands",
        src: "assets/music/15_the_riverlands.flac"
    },
    {
        title: "The Cliftlands",
        src: "assets/music/16_the_cliftlands.flac"
    },
    {
        title: "The Woodlands",
        src: "assets/music/17_the_woodlands.flac"
    }
]

/// functions
// find song from title in object array and plug into audio element to play!
function playSong(songTitle) {
    var aud = document.getElementById("audio");
    var index = songs.findIndex(songs => songs.title === songTitle);
    $("#audio").attr("src", songs[index].src);
    aud.play();
}

// pop that trivia card!
function popCard() {

}

// pick a random song and return its title!
function randSong() {
    var boolKey = true;
    var a;

    // check if all songs have been picked
    if (picked.length === songs.length) {
        console.log("NO MORE SONGS");
    }
    else {
        // check if song has already been picked
        while (boolKey) {
            // generate a random index number based off of songs.length
            var b = Math.floor(Math.random() * songs.length);
            a = b;
            boolKey = false;
            for (var i = 0; i < picked.length; i++) {
                if (b == picked[i]) {
                    // set boolKey to true if it has
                    boolKey = true;
                }
            }
        }

        // add index to picked[]
        picked.push(b);

        // return song title
        return songs[b].title;
    }


}