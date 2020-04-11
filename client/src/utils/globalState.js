import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_SCORE,
  GET_ALL,
  GET_WEEKLY,
  SET_PHASE,
  SET_QUESTIONS,
  SET_TIMER,
  TOGGLE_COUNTDOWN
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_SCORE:
      return {
        ...state,
      };

    case GET_ALL:
      return {
        ...state,
      };

    case GET_WEEKLY:
      return {
        ...state,
      };
    case SET_PHASE:
      return {
        ...state,
        loadTitle: action.loadTitle,
        phase: action.phase
      }
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      }
    case SET_TIMER:
      return {
        ...state,
        timer: action.timer
      }
    case TOGGLE_COUNTDOWN:
      return {
        ...state,
        countdown: action.countdown,
        timerOn: action.timerOn
      }
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    scores: [],
    phase: "start",
    questions: 10,
    timer: 5,
    timerOn: false,
    countdown: null
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };