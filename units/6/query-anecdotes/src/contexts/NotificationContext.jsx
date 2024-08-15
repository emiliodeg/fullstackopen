import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');

  return <NotificationContext.Provider value={[notification, notificationDispatch]}>{children}</NotificationContext.Provider>;
};

export const useNotificationDispatch = () => {
  const dispatch = useContext(NotificationContext)[1];
  return (message, time = 5) => {
    dispatch({ type: "SET", payload: message });
    setTimeout(() => {
      dispatch({ type: "SET", payload: null });
    }, time * 1000);
  };
};

export const useNotificationValue = () => useContext(NotificationContext)[0];

export default NotificationContext;
