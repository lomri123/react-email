import { SET_USER } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { userId } = action;
  switch (action.type) {
    case SET_USER:
      return userId;
    default:
      return state;
  }
};
export default reducer;
