import React from "react";
import { SET_QUESTIONS, SET_PHASE } from "../../utils/actions";
import { useStoreContext } from "../../utils/globalState";

export const Content = () => {
  const [state, dispatch] = useStoreContext();

  const handleStart = event => {
    dispatch({
      type: SET_PHASE,
      phase: "load"
    })
    // renderStartGame()
  }

  const handleSetQuestions = event => {
    const { value } = event.target;
    dispatch({
      type: SET_QUESTIONS,
      questions: value
    })
  }


  // manipulate dom to display question and answer buttons
  const renderAskQuestion = () => {
    console.log(state);

    return <div>game started</div>
  }

  // manipulate dom to display loading state
  const renderLoadState = () => {
    console.log(state);
    return (
      <div>
        <div className="card mx-auto border border-dark rounded mb-3">
          <div className="card-title p-3 m-0">
            <span>Loading...</span>
          </div>
        </div>
        <div className="card mx-auto border border-dark rounded bio">
          <div className="card-body d-flex flex-column">
            <div className="card-text m-auto">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <img src="assets/images/therion.gif"></img>
                </div>
                <div className="col-lg-9 col-md-12 overflow-auto">
                  <h5>Therion</h5>
                  <hr />
                  <p>His name is Therion, and he is a thief. While his past is a guarded secret, his exploits are known far and wide. Mere whispers of his extravagant heists strike fear into the hearts of the wealthy. Drifting into the Cliftlands one day, he hears a rumor of great riches to be had. He set his sights on a mansion said to be impregnable, only to find what he never expected...</p>
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
    case "question":
      return renderAskQuestion();
    case "load":
      return renderLoadState();
    case "start":
      return renderGameInit();
    default: {
      return <div>nope</div>;
    }
  }
}

export default Content;