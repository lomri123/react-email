import { ADD_MESSAGE, ADD_MESSAGES, SET_USER } from "./actionTypes";

export const addMessage = (message) => {
  return { type: ADD_MESSAGE, ...message };
};

export const addMessages = (messages) => {
  return { type: ADD_MESSAGES, messages };
};

export const setUser = (userId) => {
  return { type: SET_USER, userId };
};
