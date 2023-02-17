import { CURRENT_GRID_UPDATE, GRID_UPDATE, SELECTED_BUTTON_UPDATE, SQUARE_VALUE_UPDATE } from "../Types";

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

export const current_grid_update=(id)=>{
  const row = (Math.floor(id/10))%10
  const col = id%10
  return{
    type: CURRENT_GRID_UPDATE,
    index: {
      row:row,
      col : col
    }
  }
}