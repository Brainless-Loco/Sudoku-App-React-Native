const initialState = {
    squareValues: [[]],
};

export default (state = initialState, action) => {
    switch (action.type) {
      case 'VALUE_UPDATE':
        return {
          ...state,
          squareValues: state.squareValues[0].add(2),
        };
      default:
        return state;
    }
  };