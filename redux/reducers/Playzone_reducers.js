import { CHANGE_BUTTON_LOCK_STATUS, CURRENT_GRID_UPDATE, DELETE_ACTION_HISTORY, GRID_UPDATE, INSERT_ACTION_HISTORY, SELECTED_BUTTON_UPDATE, SQUARE_VALUE_UPDATE, UPDATE_SELECTED_SMALL_SQUARE_INDEX } from "../Types";

const initialState = {
    grid: [[]],
    current_playing_grid:[[]],
    action_history:[],
    is_Num_Button_Locked:true,
    selected_Button:0,
    selected_small_square_index:0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GRID_UPDATE: ///update the new Grid
          return{
            ...state,
            grid : action.new_game,
            current_playing_grid:action.new_game,
            action_history : [],
            selected_Button:0,
            is_Num_Button_Locked:false,
            selected_small_square_index:0
          }
        case SQUARE_VALUE_UPDATE:
          return {
            ...state,
            // squareValues: state.squareValues+1,
          };
        case SELECTED_BUTTON_UPDATE:  ///selected button update
          return {
            ...state,
            selected_Button : action.button_id
          };
        case CHANGE_BUTTON_LOCK_STATUS: ///lock the number buttons or not
          return{
            ...state,
            is_Num_Button_Locked:action.val
          };
        case UPDATE_SELECTED_SMALL_SQUARE_INDEX:  ///update the selection of small square index
            return{
              ...state,
              selected_small_square_index:action.val
            };
        case CURRENT_GRID_UPDATE:   ///
            const temp_grid = state.current_playing_grid
            var row = action.index.row
            var col = action.index.col
            temp_grid[row][col]=action.val
            return {
              ...state,
              current_playing_grid:temp_grid
            };
        case INSERT_ACTION_HISTORY:
          var temp_action_history =  state.action_history
          temp_action_history.push({ index:action.index,val:action.val})
          return{
            ...state,
            action_history:temp_action_history
          };
        case DELETE_ACTION_HISTORY:
          var temp_action_history =  state.action_history
          
          temp_action_history.pop()
          return{
            ...state,
            action_history:temp_action_history
          }
      default:
        return state;
    }
  };