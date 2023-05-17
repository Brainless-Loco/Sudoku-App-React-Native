import { CHANGE_BUTTON_LOCK_STATUS, CHANGE_PAUSE_STATUS, CURRENT_GRID_UPDATE, DELETE_ACTION_HISTORY, FORM_THE_GAME_PATTERN, GRID_UPDATE, INCREASE_MISTAKE_COUNT, INSERT_ACTION_HISTORY, SELECTED_BUTTON_UPDATE, UPDATE_SELECTED_SMALL_SQUARE_INDEX, UPDATE_USER_INFO } from "../Types";
// import {AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-async-stora ync-storage'


var rn = require('random-number');

export const gridUpdate = (grid) =>{
  return {
    type:GRID_UPDATE,
    new_game: grid
  }
}

export const game_pattern_formation = (pattern)=>{

  var genTotal = rn.generator({
    min:  35,
    max:  40,
    integer: true
  });
  var genIndex = rn.generator({
    min: 11,
    max: 99,
    integer:true
  });
  var is_editable_matrix = Array.from(Array(9), () =>  new Array(9).fill(false))

  // AsyncStorage.setItem("has_saved_game",'1')
  // AsyncStorage.setItem("grid",pattern.toString());   

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


  
  // AsyncStorage.setItem('current_playing_game',pattern.toString());
  // AsyncStorage.setItem("is_editable_matrix",is_editable_matrix.toString());  

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
  console.log(info)
  return{
    type:UPDATE_USER_INFO,
    userInfo:info
  }
}