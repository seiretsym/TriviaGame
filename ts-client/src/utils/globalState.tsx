import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_SCORE,
  GET_ALL,
  GET_WEEKLY,
  LOAD_SONGS,
  SET_CURRENT_SCORE,
  SET_PHASE,
  SET_PLAYER_NAME,
  SET_QUESTION,
  SET_QUESTION_LIMIT,
  SET_TIMER,
  TOGGLE_COUNTDOWN
} from "./actions";

export interface iAction {
  type: string,
  songlist: Array<object>,
  current_score: number,
  loadTitle: string,
  phase: string,
  player_name: string,
  question: string,
  answers: Array<string>,
  question_loaded: boolean,
  songHistory: Array<string>,
  timer: number,
  question_limit: number,
  countdown: number,
  timerOn: boolean
}

const StoreContext = createContext(undefined);
const { Provider } = StoreContext;

const reducer = (state: object, action: iAction) => {
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
      };
    case SET_CURRENT_SCORE:
      return {
        ...state,
        current_score: action.current_score
      };
    case SET_PHASE:
      return {
        ...state,
        loadTitle: action.loadTitle,
        phase: action.phase
      };
    case SET_PLAYER_NAME:
      return {
        ...state,
        player_name: action.player_name
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
    case SET_QUESTION_LIMIT:
      return {
        ...state,
        question_limit: action.question_limit
      };
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
    question_limit: 10,
    current_score: 0,
    player_name: ""
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };