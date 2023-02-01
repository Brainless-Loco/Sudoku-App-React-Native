import { SQUARE_VALUE_UPDATE } from "../Types";

export const valueUpdate = ({index,val}) => {
    return {
      type: SQUARE_VALUE_UPDATE,
      payload:{index,val}
    };
};