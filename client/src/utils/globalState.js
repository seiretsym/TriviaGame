import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_SCORE,
  GET_ALL,
  GET_WEEKLY,
  LOAD_SONGS,
  SET_PHASE,
  SET_QUESTION,
  SET_QUESTION_AMOUNT,
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
    case LOAD_SONGS:
      return {
        ...state,
        songlist: action.songlist
      }
    case SET_PHASE:
      return {
        ...state,
        loadTitle: action.loadTitle,
        phase: action.phase
      };
    case SET_QUESTION:
      return {
        ...state,
        question: {
          q: action.question,
          a: action.answers
        },
        question_loaded: action.question_loaded,
        songHistory: action.songHistory,
        timer: action.timer
      };
    case SET_QUESTION_AMOUNT:
      return {
        ...state,
        question_amount: action.question_amount
      }
    case SET_TIMER:
      return {
        ...state,
        timer: action.timer
      };
    case TOGGLE_COUNTDOWN:
      return {
        ...state,
        countdown: action.countdown,
        timerOn: action.timerOn,
        question_loaded: action.question_loaded
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    scores: [],
    phase: "start",
    questions: 10,
    timer: 30,
    timerOn: false,
    countdown: null,
    songHistory: [],
    question_loaded: false,
    question_amount: 10
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };