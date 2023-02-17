import { GRID_UPDATE, SELECTED_BUTTON_UPDATE, SQUARE_VALUE_UPDATE } from "../Types";

const initialState = {
    grid: [[]],
    selected_Button:0,
    current_playing_grid:[[]]
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GRID_UPDATE:
        return{
          ...state,
          grid : action.new_game,
          current_playing_grid:action.new_game
        }
      case SQUARE_VALUE_UPDATE:
        return {
          ...state,
          squareValues: state.squareValues+1,
        };
        case SELECTED_BUTTON_UPDATE:
          return {
            ...state,
            selected_Button : action.button_id
          }
      default:
        return state;
    }
  };