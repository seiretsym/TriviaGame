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
    var title = randSong();

}

// pick a random song and return its title!
function randSong() {
    var boolKey = true;
    var a;

    // check if all songs have been picked
    if (picked.length === songs.length) {
        // do something else here
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

// generate false song titles
function falseTitle(songTitle) {
    // get answer title index #
    var a = songs.findIndex(songs => songs.title === songTitle);
    // declare variables to store false titles give them a value so they're defined for if comparisons later
    var b = "A",
        c = "A",
        d = "A";
    var boolKey = true;

    // loop until b c d has different index numbers that are not the same
    while(boolKey) {
        boolKey = false;
        // generate random number
        var num = Math.floor(Math.random() * songs.length);
        // check if num = a, b, or c
        if (num === a || num === b || num === c) {
            // change boolkey to loop again for a new number
            boolKey = true;
        }
        // if b is empty
        else if (b === "A") {
            // store number in b
            b = num;
            boolKey = true;
            console.log("B: " + b);
        }
        // if b is not empty, but c is
        else if (b !== "A" && c === "A") {
            // store number in c
            c = num;
            boolKey = true;
            console.log("C: " + c);
        }
        // store in d if anything else
        else {
            d = num;
            console.log("D: " + d);
        }
    }

    // now get the titles
    b = getSongTitle(b);
    c = getSongTitle(c);
    d = getSongTitle(d);

    console.log(c);
    console.log(b);
    console.log(d);
}

// get song title from index number
function getSongTitle(index) {
    return songs[index].title;
}

// randomly plug titles into answer choice buttons
functon plugTitles(title1, title2, title3, title4) {

}

falseTitle("Main Theme");