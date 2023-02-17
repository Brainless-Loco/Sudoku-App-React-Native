import { CHANGE_BUTTON_LOCK_STATUS, GRID_UPDATE, SELECTED_BUTTON_UPDATE, SQUARE_VALUE_UPDATE } from "../Types";

const initialState = {
    grid: [[]],
    selected_Button:0,
    current_playing_grid:[[]],
    is_Num_Button_Locked:true,
    action_history:[],
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
          // squareValues: state.squareValues+1,
        };
        case SELECTED_BUTTON_UPDATE:
          return {
            ...state,
            selected_Button : action.button_id
          };
        case CHANGE_BUTTON_LOCK_STATUS:
          return{
            ...state,
            is_Num_Button_Locked:action.val
          } 
      default:
        return state;
    }
  };