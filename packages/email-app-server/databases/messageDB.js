const { v4: uuidv4 } = require("uuid");

const messages = {};
const users = {
  123: { sent: [], received: [] },
  456: { sent: [], received: [] },
  789: { sent: [], received: [] },
};

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

function deleteMessage(messageId, deleteType) {
  const response = { result: {}, error: "" };
  if (messages[messageId] === undefined) {
    response.error = "email doesn't exist in the DB";
    return response;
  }
  const message = messages[messageId];
  const { sender, receiver } = message;
  const userToDelete = deleteType === "sent" ? sender : receiver;
  const secondUser = deleteType === "sent" ? receiver : sender;
  if (users[userToDelete] === undefined) {
    response.error = "user doesn't exist in the DB";
    return response;
  }
  const firstIndex = users[userToDelete][deleteType].findIndex(
    (emails) => emails === messageId
  );
  if (firstIndex === -1) {
    response.error = "email doesn't exist in the DB";
    return response;
  }
  users[userToDelete][deleteType].splice(firstIndex, 1);
  response.result = message;

  //checking if we can delete the message completely from the db
  if (users[secondUser] !== undefined) {
    const oppositeDeleteType = deleteType === "sent" ? "received" : "sent";
    const secondIndex = users[secondUser][oppositeDeleteType].findIndex(
      (email) => email === messageId
    );
    if (secondIndex === -1) {
      delete messages[messageId];
    }
  }
  return response;
}

function getMessages(userId) {
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

function getUsers(userId) {
  const userkeys = Object.keys(users);
  return userkeys.filter((user) =>
    user.toLowerCase().includes(userId.toLowerCase())
  );
}

module.exports = {
  addMessage,
  deleteMessage,
  getMessages,
  getUsers,
};
