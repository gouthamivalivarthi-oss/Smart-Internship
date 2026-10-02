import React, { useState, useEffect, useRef } from 'react';
import { FiBell, FiCheck, FiTrash2, FiClock, FiCalendar, FiBriefcase, FiCpu } from 'react-icons/fi';
import { notificationApi } from '../../services/api';
import { formatRelativeTime } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationApi.getAll();
      if (res.data?.success) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationApi.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      toast.success('All marked as read');
    } catch (err) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleMarkOneRead = async (id, e) => {
    e.stopPropagation();
    try {
      await notificationApi.markRead(id);
      setNotifications(prev => prev.map(n => (n._id === id ? { ...n, read: true } : n)));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await notificationApi.delete(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
      toast.success('Notification removed');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deadline':
        return <FiClock className="w-4 h-4 text-coral" />;
      case 'interview':
        return <FiCalendar className="w-4 h-4 text-terracotta" />;
      case 'ai_match':
        return <FiCpu className="w-4 h-4 text-purple" />;
      default:
        return <FiBriefcase className="w-4 h-4 text-sage" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-2xl text-brown/70 hover:text-brown hover:bg-peach/20 border border-transparent hover:border-peach/30 transition-all active:scale-95"
        title="Notifications"
      >
        <FiBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-warm rounded-3xl shadow-3d-hover border border-peach/30 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between p-4 border-b border-peach/20 bg-cream/70 backdrop-blur-md">
            <div>
              <h4 className="font-bold text-brown text-sm">Notifications</h4>
              <p className="text-[11px] text-brown/60">
                {unreadCount} unread {unreadCount === 1 ? 'alert' : 'alerts'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-coral hover:text-terracotta font-bold flex items-center gap-1 transition"
              >
                <FiCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-peach/15">
            {loading && notifications.length === 0 ? (
              <p className="text-center py-8 text-xs text-brown/50">Loading notifications...</p>
            ) : notifications.length === 0 ? (
              <div className="text-center py-10 px-4">
                <FiBell className="w-8 h-8 text-peach/70 mx-auto mb-2" />
                <p className="text-xs text-brown/60 font-medium">You are all caught up!</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item._id}
                  className={`p-3.5 transition flex gap-3 items-start hover:bg-peach/10 ${
                    !item.read ? 'bg-peach/15' : ''
                  }`}
                >
                  <div className="mt-0.5 p-2 rounded-xl bg-white border border-peach/30 shadow-xs">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h5 className={`text-xs truncate ${!item.read ? 'text-brown font-bold' : 'text-brown/80 font-medium'}`}>
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-brown/50 whitespace-nowrap">
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-brown/70 mt-0.5 line-clamp-2 leading-relaxed font-normal">
                      {item.message}
                    </p>
                    {item.link && (
                      <Link
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-block mt-1 text-[11px] font-bold text-coral hover:text-terracotta underline decoration-peach hover:decoration-coral transition"
                      >
                        View details →
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    {!item.read && (
                      <button
                        onClick={(e) => handleMarkOneRead(item._id, e)}
                        title="Mark read"
                        className="p-1 text-brown/50 hover:text-coral rounded-lg transition"
                      >
                        <FiCheck className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => handleDelete(item._id, e)}
                      title="Delete"
                      className="p-1 text-brown/50 hover:text-terracotta rounded-lg transition"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
