const { v4: uuidv4 } = require("uuid");

const messages = {};
const users = { 123: {}, 456: {}, 789: {} };

function addMessage(message) {
  const { sender, receiver } = message;
  const messageId = uuidv4();
  const response = { result: {}, error: "" };
  if (users[sender] === undefined || users[receiver] === undefined) {
    response.error = `${
      users[sender] === undefined ? "sender" : "receiver"
    } id doesn't exist in the DB`;
  } else {
    if (users[sender].sent === undefined) {
      users[sender].sent = [];
    }
    if (users[receiver].received === undefined) {
      users[receiver].received = [];
    }
    users[sender].sent.push(messageId);
    users[receiver].received.push(messageId);
    messages[messageId] = message;
    response.result = { messageId, ...message };
  }
  return response;
}

// function deleteMessage(message) {
//   const {}
//   if(users?.userId?.

//   }
// }

function fetchMessages(userId) {
  const sentMessages = [];
  const receivedMessages = [];
  const response = { result: {}, error: "" };
  if (users[userId] !== undefined) {
    if (users[userId].sent !== undefined) {
      users[userId].sent.forEach((messageId) => {
        if (messages[messageId] !== undefined) {
          sentMessages.push({ ...messages[messageId], messageId });
        }
      });
    }
    if (users[userId].received !== undefined) {
      users[userId].received.forEach((messageId) => {
        if (messages[messageId] !== undefined) {
          receivedMessages.push({ ...messages[messageId], messageId });
        }
      });
    }
    response.result = { received: receivedMessages, sent: sentMessages };
  } else {
    response.error = "user doesn't exist in the DB";
  }
  return response;
}

module.exports = {
  addMessage,
  // deleteMessage,
  fetchMessages,
};
