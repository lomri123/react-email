import React, { useReducer } from "react";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";
export const Context = React.createContext();

const initialMessageList = { sent: [], received: [] };
const initialUser = "";

function Provider(props) {
  const [messageData, dispatchMessageData] = useReducer(
    messageReducer,
    initialMessageList
  );
  const [userData, dispatchUserData] = useReducer(userReducer, initialUser);

  return (
    <Context.Provider
      value={{
        messageData,
        dispatchMessageData,
        userData,
        dispatchUserData,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Provider;
