import { GRID_UPDATE, SQUARE_VALUE_UPDATE } from "../Types";

const initialState = {
    grid: [[]],
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GRID_UPDATE:
        return{
          ...state,
          grid : [[2]]
        }
      case SQUARE_VALUE_UPDATE:
        return {
          ...state,
          squareValues: state.squareValues+1,
        };
      default:
        return state;
    }
  };