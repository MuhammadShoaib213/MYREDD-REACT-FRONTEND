import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // After marking read, update state
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          cursor: 'pointer',
          position: 'relative',
          fontSize: '24px',
          marginRight: '20px',
        }}
        onClick={toggleDropdown}
      >
        <FaBell />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: 'red',
              color: '#fff',
              borderRadius: '50%',
              padding: '3px 6px',
              fontSize: '12px',
            }}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '40px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 999,
          }}
        >
          {notifications.length === 0 ? (
            <p style={{ padding: '10px' }}>No notifications.</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  background: notif.isRead ? '#f9f9f9' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => markAsRead(notif._id)}
              >
                <p style={{ margin: 0 }}>{notif.message}</p>
                <small style={{ color: '#aaa' }}>
                  {new Date(notif.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
