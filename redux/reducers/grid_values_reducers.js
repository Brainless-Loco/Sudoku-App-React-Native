import { SQUARE_VALUE_UPDATE } from "../Types";

const initialState = {
    squareValues: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
      case SQUARE_VALUE_UPDATE:
        return {
          ...state,
          squareValues: state.squareValues+1,
        };
      default:
        return state;
    }
  };