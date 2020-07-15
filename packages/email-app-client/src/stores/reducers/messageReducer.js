import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  RESET_MESSAGES,
  DELETE_MESSAGE,
} from "../actions/actionTypes";

const reducer = (state, action) => {
  const { messages, message, type, messageType, messageId } = action;
  switch (type) {
    case ADD_MESSAGES:
      return messages;
    case ADD_MESSAGE:
      state[messageType].push(message);
      return state;
    case RESET_MESSAGES:
      return { sent: [], received: [] };
    case DELETE_MESSAGE:
      let tmpState = state;
      if (state[messageType] !== undefined) {
        tmpState = state[messageType].filter(
          (message) => message.messageId !== messageId
        );
      }
      return tmpState;
    default:
      return state;
  }
};
export default reducer;
