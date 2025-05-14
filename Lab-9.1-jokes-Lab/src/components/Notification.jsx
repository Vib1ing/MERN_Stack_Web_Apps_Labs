import { useContext, useEffect } from 'react';
import NotificationContext from '../context/NotificationContext';

const Notification = () => {
  const { notification, dispatch } = useContext(NotificationContext);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE' });
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  const style = {
    padding: '1rem',
    margin: '1rem 0',
    border: notification.type === 'info' ? '1px solid green' : '1px solid red',
    backgroundColor: notification.type === 'info' ? '#e0ffe0' : '#ffe0e0',
    borderRadius: '5px',
    color: '#333',
  };

  return (
    <div style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;
