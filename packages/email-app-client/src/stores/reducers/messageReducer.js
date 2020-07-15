import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  RESET_MESSAGES,
} from "../actions/actionTypes";

const reducer = (state, action) => {
  const { messages, message, type } = action;
  switch (type) {
    case ADD_MESSAGES:
      return messages;
    case ADD_MESSAGE:
      state["sent"].push(message);
      return state;
    case RESET_MESSAGES:
      return { sent: [], received: [] };
    default:
      return state;
  }
};
export default reducer;
