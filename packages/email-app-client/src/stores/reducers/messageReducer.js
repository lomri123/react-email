import { ADD_MESSAGE, ADD_MESSAGES } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { messages, message, type } = action;
  switch (type) {
    case ADD_MESSAGES:
      return messages;
    case ADD_MESSAGE:
      const tmpState = state[type].push(message);
      return tmpState;
    default:
      return state;
  }
};
export default reducer;
