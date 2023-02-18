import { CHANGE_BUTTON_LOCK_STATUS, CURRENT_GRID_UPDATE, DELETE_ACTION_HISTORY, GRID_UPDATE, INSERT_ACTION_HISTORY, SELECTED_BUTTON_UPDATE, SQUARE_VALUE_UPDATE, UPDATE_SELECTED_SMALL_SQUARE_INDEX } from "../Types";

export const valueUpdate = ({index,val}) => {
    return {
      type: SQUARE_VALUE_UPDATE,
      payload:{index,val}
    };
};
export const gridUpdate = (grid) =>{
  return {
    type:GRID_UPDATE,
    new_game: grid
  }
}

export const selected_Button_update =(btn_id)=>{
  return {
    type:SELECTED_BUTTON_UPDATE,
    button_id:btn_id
  }
}

export const current_grid_update=(id,value)=>{
  const row = (Math.floor(id/10))%10
  const col = id%10
  return{
    type: CURRENT_GRID_UPDATE,
    index: {
      row:row-1,
      col : col-1
    },
    val:value
  }
}

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

export const undo_aka_delete_from_action_history = ()=>{
  return{
    type: DELETE_ACTION_HISTORY
  }
}

