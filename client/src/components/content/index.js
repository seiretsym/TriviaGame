import React, { useEffect } from "react";
import { browserHistory } from "react-router-v3";
import { SET_QUESTION_LIMIT, SET_PHASE, SET_TIMER, TOGGLE_COUNTDOWN, LOAD_SONGS, SET_QUESTION, SET_CURRENT_SCORE, SET_PLAYER_NAME } from "../../utils/actions";
import { useStoreContext } from "../../utils/globalState";
import Audio from "../audio";
import api from "../../utils/api";
import characters from "../../utils/characterbios";

export const Content = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    // stop countdown if it reaches 0
    if (state.timer <= 0 && state.timerOn && state.phase === "question") {
      dispatch({
        type: TOGGLE_COUNTDOWN,
        countdown: clearInterval(state.countdown),
        timerOn: false,
        question_loaded: false
      })
      handleTransition("timeout");
    }
    if (state.phase === "loading" && state.question_loaded) {
      // dispatch to update
      dispatch({
        type: SET_PHASE,
        phase: "question"
      })
    } else if (state.phase === "loading" && !state.question_loaded) {
      if (state.songHistory.length < state.question_limit) {
        // should probably load a song, but after 5 seconds
        setTimeout(handleSetAnswers, 5000);
      } else {
        setTimeout(() => {
          dispatch({
            type: SET_PHASE,
            phase: "end"
          })
        }, 5000)
      }
    }
  })

  // handle loading game transitioning
  const handleTransition = title => {
    // if the songhistory length is less than the question limit
    if (state.songHistory.length < state.question_limit) {
      // continue playing
      dispatch({
        type: SET_PHASE,
        loadTitle: title,
        phase: "loading"
      })
    }
    // else, end the game
    else {
      console.log("attempt to end game from handleTransition")
      dispatch({
        type: SET_PHASE,
        loadTitle: title,
        phase: "loading",
      })
    }

  }

  // start the game
  const handleStart = () => {
    api
      .loadSongs()
      .then(({ data }) => {
        dispatch({
          type: LOAD_SONGS,
          songlist: data,
        })
        dispatch({
          type: SET_PHASE,
          phase: "loading"
        })
      })
  }

  // pick random song and generate false answers
  const handleSetAnswers = () => {
    // grab a random song from songlist
    let rng = Math.floor(Math.random() * state.songlist.length)
    let song = state.songlist[rng];
    // check song history for duplicates
    if (state.songHistory.indexOf(song.name) === -1) {
      let answers = generateAnswers(song);
      // song hasn't been played, so set questions
      dispatch({
        type: SET_QUESTION,
        songHistory: [...state.songHistory, song.name],
        question: song,
        answers: answers,
        question_loaded: true,
        timer: 30
      })

    } else {
      // loop
      handleSetAnswers();
    }
  }

  const generateAnswers = song => {
    let answers = [song.name];
    // generate false answers
    while (answers.length < 4) {
      let rng = Math.floor(Math.random() * state.songlist.length);
      let falseAnswer = state.songlist[rng].name;
      if (answers.indexOf(falseAnswer) === -1) {
        answers = [...answers, falseAnswer]
      }
    }
    // shuffle the answers
    answers.sort(() => Math.random() - 0.5);
    return answers;
  }
  // when audio can play
  const handleCanPlay = event => {
    let answerContent = document.getElementById("answers");
    answerContent.classList.remove("d-none");
    let audioPlayer = document.getElementById("audioplayer")
    audioPlayer.play();
    startTimer();
  }

  // handle timer countdown to 0
  const handleCountdown = () => {
    dispatch({
      type: SET_TIMER,
      timer: state.timer--
    })
  }

  // handle user choice for amount of questions
  const handleSetQuestions = event => {
    const { value } = event.target;
    dispatch({
      type: SET_QUESTION_LIMIT,
      question_limit: value
    })
  }

  // handle answer submission
  const handleSubmitAnswer = event => {
    // get textContent from target button
    const { textContent: answer } = event.target;

    // do answer check here
    if (answer === state.question.q.name) {
      // first, update the current score
      dispatch({
        type: SET_CURRENT_SCORE,
        current_score: state.current_score + state.timer * 10000
      })
      // next, stop the interval
      dispatch({
        type: TOGGLE_COUNTDOWN,
        countdown: clearInterval(state.countdown),
        timerOn: false,
        question_loaded: false
      })
      // transition
      handleTransition("right");
    } else {
      // wrong answer, stop interval
      dispatch({
        type: TOGGLE_COUNTDOWN,
        countdown: clearInterval(state.countdown),
        timerOn: false,
        question_loaded: false
      })
      handleTransition("wrong")
    }
  }

  // starts timer interval
  const startTimer = () => {
    dispatch({
      type: TOGGLE_COUNTDOWN,
      countdown: setInterval(handleCountdown, 1000),
      timerOn: true
    })
  }

  const handleInputChange = event => {
    event.preventDefault();
    const { value } = event.target;
    dispatch({
      type: SET_PLAYER_NAME,
      player_name: value
    })
  }

  const handleSubmitScore = () => {
    let data = {
      name: state.player_name,
      score: state.current_score
    }
    api
      .saveScore(data)
      .then(() => {
        browserHistory.push("/scores");
        window.location.reload();
      })
  }

  const renderEndGame = () => {
    return (
      <div>
        <div className="card mx-auto border border-dark rounded mb-3">
          <div className="card-title p-3 m-0">
            {<h4>Your Score: {state.current_score}</h4>}
          </div>
        </div>
        <div className="card mx-auto border border-dark rounded content-body">
          <div className="card-body">
            <div>
              <form>
                <input className="form-control w-25 mx-auto" type="text" value={state.player_name} placeholder="Enter your name..." onChange={handleInputChange} />
              </form>
              <button className="btn btn-secondary text-light w-25 mt-1" onClick={handleSubmitScore}>Submit Score</button>
            </div>
            <hr />
            <div className="card-title mt-3">
              Thank you for playing!
            </div>
            <div className="card-text">
              Hope you enjoyed the music! Check out more of Yasunori Ishiki's work <a href="http://yasunorinishiki.com/" target="_new">here</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // manipulate dom based on how a question was resolved
  const renderLoadingTitle = title => {
    switch (title) {
      case "timeout":
        return <h4>Time's up! The correct answer is <strong>{state.question.q.name}</strong>.</h4>
      case "right":
        return <h4>You got the right answer: <strong>{state.question.q.name}</strong>!</h4>
      case "wrong":
        return <h4>Wrong! The correct answer is <strong>{state.question.q.name}</strong>!</h4>
      default:
        return <h4>Loading... please wait.</h4>
    }

  }

  // manipulate dom to display question and answer buttons
  const renderAskQuestion = () => {
    return (
      <div>
        <div className="card mx-auto border border-dark rounded mb-3">
          <div className="card-title p-3 m-0">
            {<h4>Time Left: {state.timer} seconds</h4>}
          </div>
        </div>
        <div className="card mx-auto border border-dark rounded content-body">
          <div className="card-body">
            <div className="card-title text-center mt-1 mb-0">
              <Audio id="audioplayer" src={state.question.q.url} controls controlsList="nodownload" onCanPlay={handleCanPlay} />
            </div>
            <hr />
            <div id="answers" className="card-text d-none">
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <button className="btn btn-secondary text-light w-100 w-100 mt-1" onClick={handleSubmitAnswer}>{state.question.a[0]}</button>
                  <button className="btn btn-secondary text-light w-100 w-100 mt-1" onClick={handleSubmitAnswer}>{state.question.a[1]}</button>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <button className="btn btn-secondary text-light w-100 mt-1" onClick={handleSubmitAnswer}>{state.question.a[2]}</button>
                  <button className="btn btn-secondary text-light w-100 mt-1" onClick={handleSubmitAnswer}>{state.question.a[3]}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // manipulate dom to display loading state
  const renderLoadState = title => {
    const rng = Math.floor(Math.random() * characters.length);
    return (
      <div>
        <div className="card mx-auto border border-dark rounded mb-3">
          <div className="card-title p-3 m-0">
            {renderLoadingTitle(title)}
          </div>
        </div>
        <div className="card mx-auto border border-dark rounded content-body">
          <div className="card-body d-flex flex-column">
            <div className="card-text m-auto">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <img src={characters[rng].img} alt={characters[rng].name}></img>
                </div>
                <div className="col-lg-9 col-md-12 overflow-auto">
                  <h5>{characters[rng].name}</h5>
                  <hr />
                  <p>{characters[rng].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // render initial page components for selecting game options
  const renderGameInit = () => {
    return (
      <div className="card mx-auto border border-dark rounded p-2">
        <div className="card-body d-inline-flex flex-column">
          <h2 className="card-title text-center">Instructions</h2>

          <div className="mt-3 mx-auto">
            <h5 className="card-text text-center">The rules are simple:</h5>
            <ul>
              <li className="text-left">You have 30 seconds per question</li>
              <li className="text-left">Your score will be tallied at the end</li>
              <li className="text-left">Click the buttons to answer</li>
            </ul>
          </div>

          <div className="mt-5 mx-auto">
            <strong className="m-0">Select amount of Questions:</strong>
            <select className="form-control form-control-sm mt-1 mb-1" onChange={handleSetQuestions}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <button className="btn bg-secondary text-light font-weight-bold w-100" onClick={handleStart}>Start</button>
          </div>
        </div>
      </div>
    )
  }

  switch (state.phase) {
    case "end":
      return renderEndGame();
    case "question":
      return renderAskQuestion();
    case "loading":
      return renderLoadState(state.loadTitle);
    case "start":
      return renderGameInit();
    default: {
      return <div>Something broke. Tell Kerwin.</div>;
    }
  }
}

export default Content;