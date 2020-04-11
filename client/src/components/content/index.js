import React from "react";
import { SET_QUESTIONS, SET_PHASE } from "../../utils/actions";
import { useStoreContext } from "../../utils/globalState";
import { set } from "mongoose";

export const Content = () => {
  const [state, dispatch] = useStoreContext();

  const handleStart = event => {
    dispatch({
      type: SET_PHASE,
      phase: "play"
    })
  }

  const handleSetQuestions = event => {
    const { value } = event.target;
    dispatch({
      type: SET_QUESTIONS,
      questions: value
    })
  }

  const renderStartGame = () => {
    console.log(state);
    return <div>game started</div>
  }

  const renderGameInit = () => {
    return (
      <div className="card m-auto border border-dark rounded p-2">
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
    case "play":
      return renderStartGame();
    case "start":
      return renderGameInit();
    default: {
      return <div>nope</div>;
    }
  }
}

export default Content;