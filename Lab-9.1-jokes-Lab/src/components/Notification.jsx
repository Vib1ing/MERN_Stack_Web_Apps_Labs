import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  const style = {
    padding: '1rem',
    margin: '1rem 0',
    border: notification.type === 'info' ? '1px solid green' : '1px solid red',
    backgroundColor: notification.type === 'info' ? '#e0ffe0' : '#ffe0e0',
    borderRadius: '5px',
    color: '#333',
  };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
