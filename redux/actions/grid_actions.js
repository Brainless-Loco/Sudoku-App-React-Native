import { CHANGE_BUTTON_LOCK_STATUS, CHANGE_PAUSE_STATUS, CURRENT_GRID_UPDATE, DELETE_ACTION_HISTORY, FORM_THE_GAME_PATTERN, GRID_UPDATE, INCREASE_MISTAKE_COUNT, INSERT_ACTION_HISTORY, SELECTED_BUTTON_UPDATE, UPDATE_ASYNCSTORAGE_FOR_NEW_GAME, UPDATE_FROM_LAST_PLAYED_GAME, UPDATE_REMAINING_NUMS_LIST, UPDATE_SELECTED_SMALL_SQUARE_INDEX, UPDATE_USER_INFO } from "../Types";
// import AsyncStorage from '@react-native-async-storage/async-storage'



var rn = require('random-number');

export const gridUpdate = (grid) =>{
  return {
    type:GRID_UPDATE,
    new_game: grid
  }
}

export const game_pattern_formation = (props)=>{
  const {pattern,gameLevel}= props
  var genTotal = rn.generator({
    min:  gameLevel==3?55:gameLevel==2?40:30,
    max:  gameLevel==3?65:gameLevel==2?50:40,
    integer: true
  });
  var genIndex = rn.generator({
    min: 11,
    max: 99,
    integer:true
  });
  var is_editable_matrix = Array.from(Array(9), () =>  new Array(9).fill(false))

  var total_erase = genTotal()
  while(total_erase){
    var id = genIndex();
    var row = ((Math.floor(id/10))%10)-1
    var col = (id%10)-1

    if(pattern[row][col]){
      total_erase--;
      pattern[row][col]=0;
      is_editable_matrix[row][col]=true;
    }
  }

  return{
    type:FORM_THE_GAME_PATTERN,
    game:pattern,
    is_editable:is_editable_matrix
  }
}

export const selected_Button_update =(btn_id)=>{
  return {
    type:SELECTED_BUTTON_UPDATE,
    button_id:btn_id
  }
}

export const current_grid_update=(id,value)=>{
  var row = (Math.floor(id/10))%10
  var col = id%10
  return{
    type: CURRENT_GRID_UPDATE,
    index: {
      row:row-1,
      col : col-1
    },
    val:value
  }
};


export const change_button_lock_status = (new_status)=>{
  
  return {
    type:CHANGE_BUTTON_LOCK_STATUS,
    val:new_status
  }
}

export const update_selected_small_square_index = (id)=>{
  return {
    type:UPDATE_SELECTED_SMALL_SQUARE_INDEX,
    val:id
  }
};

export const insert_action_history = (id,value)=>{
  return{
    type: INSERT_ACTION_HISTORY,
    index: id,
    val:value
  }
};

export const undo_from_action_history = ()=>{
  return{
    type: DELETE_ACTION_HISTORY
  }
}

export const increase_mistake_count = ()=>{
  return{
    type:INCREASE_MISTAKE_COUNT
  }
}

export const change_pause_status = ()=>{
  return {
    type:CHANGE_PAUSE_STATUS
  }
}

export const updateUserInfo = (info)=>{
  return{
    type:UPDATE_USER_INFO,
    userInfo:info
  }
}

export const update_from_last_saved_game = (gameData)=>{
  return {
    type: UPDATE_FROM_LAST_PLAYED_GAME,
    gameData:gameData
  }
}

export const update_asyncstorage_for_a_new_game = ()=>{
  return{
    type:UPDATE_ASYNCSTORAGE_FOR_NEW_GAME
  }
}

export const update_remaining_num_list = ()=>{
  return{
    type:UPDATE_REMAINING_NUMS_LIST
  }
}
