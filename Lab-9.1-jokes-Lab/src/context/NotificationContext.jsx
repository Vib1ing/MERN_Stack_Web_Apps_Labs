import { createContext, useReducer, useRef } from 'react';

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
  const [notification, dispatchBase] = useReducer(NotificationReducer, null);
  const timerRef = useRef(null);

  const dispatch = (action) => {
    if (action.type === 'SHOW') {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      dispatchBase(action);

      timerRef.current = setTimeout(() => {
        dispatchBase({ type: 'HIDE' });
        timerRef.current = null;
      }, 3000);
    } else {
      dispatchBase(action);
    }
  };

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
