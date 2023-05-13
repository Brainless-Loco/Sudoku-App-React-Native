import { CHANGE_BUTTON_LOCK_STATUS, CHANGE_PAUSE_STATUS, CURRENT_GRID_UPDATE, DELETE_ACTION_HISTORY, FORM_THE_GAME_PATTERN, GRID_UPDATE, INCREASE_MISTAKE_COUNT, INSERT_ACTION_HISTORY, SELECTED_BUTTON_UPDATE, UPDATE_SELECTED_SMALL_SQUARE_INDEX } from "../Types";


const initialState = {
    grid: [[]],
    current_playing_grid:[[]],
    is_editable:[[]],
    mistakes:0,
    is_paused:false,
    action_history:[],
    is_Num_Button_Locked:true,
    selected_Button:0,
    selected_small_square_index:0,
    selected_small_square_value:0,
    matched_all_squares:false,
};

export default (state = initialState, action) => {
    switch (action.type) {

      ///New Game Creation Reducers
        case GRID_UPDATE: {///update the new Grid
          return{
            ...state,
            grid : action.new_game,
            action_history : [],
            mistakes:0,
            is_paused:false,
            selected_Button:0,
            is_Num_Button_Locked:false,
            selected_small_square_index:0,
            selected_small_square_value:0,
            matched_all_squares:false
          }
        }

        case FORM_THE_GAME_PATTERN:{
          return {
            ...state,
            current_playing_grid:action.game,
            is_editable:action.is_editable
          }
        }

        ///End of New Game Creation Reducers


        case SELECTED_BUTTON_UPDATE:{  ///locked button update
          return {
            ...state,
            selected_Button : action.button_id
          }
        }
        case CHANGE_BUTTON_LOCK_STATUS:{ ///lock button status change
          return{
            ...state,
            is_Num_Button_Locked:action.val
          }
        }
        case UPDATE_SELECTED_SMALL_SQUARE_INDEX:{  ///update the selection of small square index
            var row = action.val?(Math.floor(action.val/10)%10)-1:0
            var col = action.val?((action.val)%10)-1:0
            var value = action.val?state.current_playing_grid[row][col]:0
            return{
              ...state,
              selected_small_square_index:action.val,
              selected_small_square_value:value
            }
        }
        case CURRENT_GRID_UPDATE:{   ///square update function
            var temp_grid = state.current_playing_grid
            var row = action.index.row
            var col = action.index.col
            temp_grid[row][col]=action.val*1
            var temp = (JSON.stringify(temp_grid)==JSON.stringify(state.grid))

            AsyncStorage.setItem('current_playing_game',temp_grid.toString())
            if(temp) AsyncStorage.setItem('has_saved_game','0')
            return {
              ...state,
              current_playing_grid:temp_grid,
              matched_all_squares:temp
            }
          }


        ///Undo Button reducers
        case INSERT_ACTION_HISTORY:{
          var temp_action_history =  state.action_history
          temp_action_history.push({ index:action.index,val:action.val})
          return{
            ...state,
            action_history:temp_action_history
          }
        }
        case DELETE_ACTION_HISTORY:{
          var temp_action_history =  state.action_history
          var size = temp_action_history.length
          var id = temp_action_history[size-1].index
          var val = temp_action_history[size-1].val
          var row = (Math.floor(id/10)%10)-1
          var col = (id%10)-1
          var temp_grid = state.current_playing_grid
          temp_grid[row][col]=val
          temp_action_history.pop()

          return{
            ...state,
            action_history:temp_action_history,
            current_playing_grid:temp_grid,
          }
        }

      ///end of undo button reducers
      
        case INCREASE_MISTAKE_COUNT:{
          AsyncStorage.setItem('mistake',(state.mistakes+1).toString())
          if(state.mistakes==4){
            AsyncStorage.setItem('current_playing_game','')
            AsyncStorage.setItem('grid','')
            AsyncStorage.setItem('has_saved_game','0')
            AsyncStorage.setItem("is_editable_matrix",'');  
          }
          return{
            ...state,
            mistakes:state.mistakes+1
          }
        }

        ///pause status
        
        case CHANGE_PAUSE_STATUS:{
          return{
            ...state,
            is_paused:!state.is_paused
          }
        }

      default:
        return state;
    }
  };