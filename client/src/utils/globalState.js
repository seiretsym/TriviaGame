import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_SCORE,
  GET_ALL,
  GET_WEEKLY,
  SET_PHASE,
  SET_QUESTIONS,
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
        phase: action.phase
      }
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      }
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    scores: [],
    phase: "start",
    questions: 10
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
