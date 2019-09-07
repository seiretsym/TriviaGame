//// begin trivia code

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

// global variable stuffs
var picked = [],
    intervalId,
    questions = 0,
    answer = "",
    right = 0,
    wrong = 0,
    missed = 0;

/// functions
// load song into audio element
function loadSong(songTitle) {
    var aud = document.getElementById("audio");
    var index = songs.findIndex(songs => songs.title === songTitle);
    $("#audio").attr("src", songs[index].src);
}

// play the song!
function playSong() {
    var aud = document.getElementById("audio");
    aud.play();
}

// stop the song!
function stopSong() {
    var aud = document.getElementById("audio");
    aud.pause();
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
function falseTitles(songTitle) {
    // get answer title index #
    var a = songs.findIndex(songs => songs.title === songTitle);
    // declare variables to store false titles give them a value so they're defined for if comparisons later
    var b = "A",
        c = "A",
        d = "A";
    var boolKey = true;

    // loop until b c d has different index numbers that are not the same
    while(boolKey) {
        // stop while loop if there's no reason to loop again
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
        }
        // if b is not empty, but c is
        else if (b !== "A" && c === "A") {
            // store number in c
            c = num;
            boolKey = true;
        }
        // store in d if anything else
        else {
            d = num;
        }
    }

    // now get the titles
    a = getSongTitle(a);
    b = getSongTitle(b);
    c = getSongTitle(c);
    d = getSongTitle(d);

    // shove the titles into an array and return it
    var array = [a, b, c, d];

    return array;
}

// function to return song title from index number
function getSongTitle(index) {
    return songs[index].title;
}

// randomly plug titles into answer choice buttons
function plugTitles(titleArray) {

    // shuffle that array
    titleArray = shuffle(titleArray);

    // plug those titles in to the buttons with a loop!
    for (var i = 0; i < 4; i++) {
        $("#choice"+(i+1)).val(titleArray[i]);
        $("#choice"+(i+1)).html(titleArray[i]);
    }
}

// function to shuffle an array
function shuffle(array) {
    // use a for loop in reverse!
    for (var i = array.length - 1; i > 0; i--) {
        // create a random number based on i
        var num = Math.floor(Math.random() * (i + 1));
        // store array index in temp
        var temp = array[i];
        // do a shuffle
        array[i] = array[num];
        array[num] = temp;
    }
    return array;
}

// check answer
function checkAnswer(song) {
    // if answer is correct
    if (song === answer) {
        // increase right count
        answerRight();
    }
    // otherwise it's wrong
    else {
        // increase wrong count
        answerWrong();
    }

    // stop timer
    clearInterval(intervalId);

    // get ready for next question
    setTimeout(queueQuestion, 5000);
}

// queue question!
function queueQuestion() {
    stopSong();
    setQuestion();
    questions++;
    // this is to make sure the info text is correct if the game just started
    if (questions === 1) {
        timer = 5;
        infoText("Time until game begins: " + timer);
        intervalId = setInterval(function() {
            timer--;
            infoText("Time until game begins: " + timer);
            if (timer === 0) {
                clearInterval(intervalId);
                showButtons();
                beginCountdown();
                infoText("<br>");
                // play song
                playSong();
            }
        }, 1000)
    }
    // if game has already started use different info text
    else if (questions !== 11) {
        timer = 5;
        infoText("Time until next question: " + timer);
        intervalId = setInterval(function() {
            timer--;
            infoText("Time until next question: " + timer);
            if (timer === 0) {
                clearInterval(intervalId);
                showButtons();
                beginCountdown();
                infoText("<br>");
                // play song
                playSong();
            }
        }, 1000)
    }
    // end the game after 10 questions
    else {
        endGame();
    }

}

// set question!
function setQuestion() {
    // set answer to random song
    answer = randSong();

    // get an array of titles for correct/incorrect answers
    var answerArray = falseTitles(answer);

    // plug answers into buttons
    plugTitles(answerArray)

    // load song
    loadSong(answer);
}

// function do something when the answer is right
function answerRight() {
    // increment right count
    right++;
    // hide buttons
    hideButtons();
    // display message
    infoText("That's right. <strong>" + answer + "</strong> is correct!");
}

// function to do something when the answer is wrong
function answerWrong() {
    // increment wrong count
    wrong++;
    // hide buttons
    hideButtons();
    // display message
    infoText("Wrong! The correct answer is <strong>" + answer + "</strong>");
}

// function to edit the display message on card
function infoText(msg) {
    $(".infotext").html(msg);
}
// hide answer buttons so they can't be clicked again
function hideButtons() {
    $("audio").addClass("invisible").removeClass("visible");
    $("#timer").html("<br>");
    $("#choice1").addClass("invisible").removeClass("visible");
    $("#choice2").addClass("invisible").removeClass("visible");
    $("#choice3").addClass("invisible").removeClass("visible");
    $("#choice4").addClass("invisible").removeClass("visible");
}

// show answer buttons so they can be clicked
function showButtons() {
    $("audio").addClass("visible").removeClass("invisible");
    $("#timer").html("<br>");
    $("#choice1").addClass("visible").removeClass("invisible");
    $("#choice2").addClass("visible").removeClass("invisible");
    $("#choice3").addClass("visible").removeClass("invisible");
    $("#choice4").addClass("visible").removeClass("invisible");
}

// set a timer for guessing the answer!
function beginCountdown() {
    var timer = 30;
    $("#timer").html("Time Left: " + timer + " seconds");
    // create a countdown interval
    intervalId = setInterval(function() {
        timer--;
        $("#timer").html("Time Left: " + timer + " seconds");
        // if timer reaches 0
        if (timer === 0) {
            // add to miss counter
            missed++;
            // then stop countdown
            clearInterval(intervalId);
            // hide buttons
            hideButtons();
            // update info text
            infoText("Time's up! The correct answer is <strong>" + answer + "</strong>")
            // stop the song!
            stopSong();
            // get ready for next song!
            setTimeout(queueQuestion, 5000);
        }
    }, 1000);
}

// play game
function playGame() {
    resetGame();
    hideCards("#start", "#end");
    showCard("#trivia");
    setQuestion();
    hideButtons();
    queueQuestion();
}

// reset stuff to play the game
function resetGame() {
    questions = 0;
    picked = [];
    right = 0;
    wrong = 0;
    missed = 0;
}

// end game
function endGame() {
    hideCards("#start", "#trivia");
    showCard("#end");
    // fix the score!
    $("#rightAnswers").html(right);
    $("#wrongAnswers").html(wrong);
    $("#missedAnswers").html(missed);
}

// hide cards!
function hideCards() {
    // nifty loop utilizing arguments!
    for (var i = 0; i < arguments.length; i++) {
        $(arguments[i]).addClass("d-none");
    }
}

// show card!
function showCard(cardId) {
    $(cardId).removeClass("d-none");
}

// event listener!
$(document).ready(function() {

    $(".btn").on("click", function() {
        // check if button is the Start Game button
        if (this.value === "play") {
            playGame();
        }
        // if not, only other buttons are answers
        else {
            checkAnswer(this.value);
        }
    })

})


//// to do list
// slap kerwin
// slap kerwin again
// and... slap kerwin again