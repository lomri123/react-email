const axios = require("axios");

export const getMessages = (userId) => {
  const data = {
    userId,
  };
  const options = {
    url: "http://localhost:3008/api/messages/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  return new Promise((res, rej) => {
    axios(options)
      .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      });
  });
};

export const addMessage = (messageData) => {
  const data = {
    ...messageData,
  };
  const options = {
    url: "http://localhost:3008/api/messages/addMessage",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  return new Promise((res, rej) => {
    axios(options)
      .then(function (response) {
        res(response.data);
      })
      .catch(function (error) {
        rej(error);
      });
  });
};
