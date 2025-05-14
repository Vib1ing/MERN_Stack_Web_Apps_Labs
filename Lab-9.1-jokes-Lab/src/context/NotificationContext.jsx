import { createContext, useReducer } from 'react';

const NotificationContext = createContext();

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.payload.message, type: action.payload.type };
    case 'HIDE':
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(NotificationReducer, null);

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
