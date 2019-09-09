//// begin trivia code

// global variable stuffs
var picked = [],
    songs = [],
    charBio = [],
    intervalId,
    questions = 0,
    maxQuestions = 0,
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
    // begin countdown
    beginCountdown();
    
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
        endGame();
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
                    // continue looping until b is a number that hasn't been picked
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
    queueQuestion();
}

// fill queue card
function queueCharBio() {
    // generate random number based on charBio.length
    var i = Math.floor(Math.random() * charBio.length);

    // plug info into card elements
    $("#charImg").attr("src", charBio[i].img);
    $("#charName").html(charBio[i].name);
    $("#charDesc").html(charBio[i].desc);

    // show the card
    hideCards("#trivia");
    showCard("#bio");
    showCard("#bio-info");

    // scroll card to top
    $("#bio-child").scrollTop(0);
}

// queue question!
function queueQuestion() {
    // show loading card
    queueCharBio();

    // set a timeout so player can see correct/wrong answers before queue timer begins
    setTimeout(function() {

        questions++;
        // if game has already started use different info text
        if (questions <= maxQuestions) {
            timer = 5;
            $("#timer2").html("Showing Question <strong>" + questions + "</strong> of <strong>" + maxQuestions + "</strong> in <strong>" + timer + "</strong> seconds");
            intervalId = setInterval(function() {
                timer--;
                $("#timer2").html("Showing Question <strong>" + questions + "</strong> of <strong>" + maxQuestions + "</strong> in <strong>" + timer + "</strong> seconds");
                if (timer === 0) {
                    clearInterval(intervalId);
                    stopSong();
                    setQuestion();
                    // swap cards
                    hideCards("#bio", "#bio-info");
                    showCard("#trivia");
                    // play song
                    playSong();
                }
            }, 1000)
        }
        // end the game after 10 questions
        else {
            endGame();
        }
    }, 5000);
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
    // display message
    infoText("<strong>" + answer + "</strong> is correct!");
}

// function to do something when the answer is wrong
function answerWrong() {
    // increment wrong count
    wrong++;
    // display message
    infoText("Wrong! Correct answer: <strong>" + answer + "</strong>");
}

// function to edit the display message on card
function infoText(msg) {
    $("#timer2").html(msg);
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
            // update info text
            infoText("Time's up! Answer is <strong>" + answer + "</strong>")
            // get ready for next song!
            queueQuestion();
        }
    }, 1000);
}

// play game
function playGame(selectId) {
    resetGame();
    maxQuestions = $(selectId).find(":selected").val();
    hideCards("#start", "#end");
    showCard("#trivia");
    setQuestion();
    queueQuestion();
}

// reset stuff to play the game
function resetGame() {
    questions = 0;
    maxQuestions = 0;
    picked = [];
    right = 0;
    wrong = 0;
    missed = 0;
    infoText("<br>");
}

// end game
function endGame() {
    hideCards("#start", "#trivia", "#bio", "#bio-info");
    showCard("#end");
    stopSong();
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

// read file for playlist
function loadJSON() {
        // read from json file
        $.getJSON({
            url: "assets/music/arrays.json",
            success: function(result) {
                // store songs into global array
                songs = result.list;
                // store character bios into global array
                charBio = result.characters;
            }
        });
}

// event listener!
$(document).ready(function() {

    // load arrays
    loadJSON();

    // unhide start button
    $("#play").removeClass("d-none");

    // listen for button clicks
    $(".btn").on("click", function() {
        // check if button is the Start Game button
        if (this.value === "play") {
            playGame("#select1");
            infoText("Please wait while the game loads.");
        }
        // check if button is the Play Again button
        else if (this.value === "playagain") {
            playGame("#select2");
            infoText("Please wait while the game loads.");
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