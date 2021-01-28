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


type iSongList = {
  name: string,
  url: string
}

type iAction = {
  type: string,
  songlist?: iSongList[],
  current_score?: number,
  loadTitle?: string,
  phase?: string,
  player_name?: string,
  question?: {
    name?: string,
    url?: string
  },
  answers?: string[],
  question_loaded?: boolean,
  songHistory?: string[],
  timer?: number,
  question_limit?: number,
  countdown?: void | number | NodeJS.Timeout,
  timerOn?: boolean
}

type iState = {
  scores: number[],
  phase?: string,
  questions: number,
  timer?: number,
  timerOn?: boolean,
  countdown: void | number | NodeJS.Timeout,
  songHistory?: string[],
  question_loaded?: boolean,
  question_limit?: number,
  current_score?: number,
  player_name?: string,
  loadTitle?: string,
  songlist?: iSongList[],
  question: {
    q: {
      name?: string,
      url?: string
    }
    a: string[]
  },
}

const reducer = (state: iState, action: iAction): iState => {
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
          q: {
            name: action.question?.name,
            url: action.question?.url
          },
          a: [...action.answers!]
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

type iProvider = {
  state: iState,
  dispatch: React.Dispatch<iAction>
}

const initialState: iState = {
  scores: [],
  phase: "start",
  questions: 10,
  timer: 30,
  timerOn: false,
  countdown: 0,
  songHistory: [],
  question_loaded: false,
  question_limit: 10,
  current_score: 0,
  player_name: "",
  loadTitle: "",
  songlist: [],
  question: {
    q: {
      name: "",
      url: ""
    },
    a: []
  },
}

const StoreContext = createContext<iProvider>({ state: initialState, dispatch: () => null});
const { Provider } = StoreContext;

const StoreProvider: React.FC = ({ ...props }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  return <Provider value={{state, dispatch}} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };