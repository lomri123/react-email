import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  SET_USER,
  RESET_MESSAGES,
  DELETE_MESSAGE,
} from "./actionTypes";

export const addSingleMessage = (message, messageType) => {
  return { type: ADD_MESSAGE, message, messageType };
};

export const addMessages = (messages) => {
  return { type: ADD_MESSAGES, messages };
};

export const setUser = (userId) => {
  return { type: SET_USER, userId };
};

export const deleteSingleMessage = (messageId, messageType) => {
  return { type: DELETE_MESSAGE, messageId, messageType };
};

export const resetMessages = () => {
  return { type: RESET_MESSAGES };
};
