import { GRID_UPDATE, SQUARE_VALUE_UPDATE } from "../Types";

export const valueUpdate = ({index,val}) => {
    return {
      type: SQUARE_VALUE_UPDATE,
      payload:{index,val}
    };
};
export const gridUpdate = (grid) =>{
  return {
    type:GRID_UPDATE,
    payload: grid
  }
}