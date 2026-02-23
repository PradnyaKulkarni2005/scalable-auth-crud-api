import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from '../api/apiClient';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllTasks({
        status: filter.status || undefined,
        priority: filter.priority || undefined,
      });
      setTasks(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      if (editingTaskId) {
        await updateTask(editingTaskId, formData);
        setSuccess('Task updated successfully!');
        setEditingTaskId(null);
      } else {
        await createTask(formData);
        setSuccess('Task created successfully!');
      }
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
      });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setLoading(true);
        await deleteTask(taskId);
        setSuccess('Task deleted successfully!');
        fetchTasks();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
    });
    setEditingTaskId(task._id);
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
    });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Dashboard</h1>
        <div className="header-right">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <section className="task-form-section">
          <h2>{editingTaskId ? 'Edit Task' : 'Create New Task'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter task title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : editingTaskId ? 'Update Task' : 'Create Task'}
              </button>
              {editingTaskId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="tasks-section">
          <h2>My Tasks</h2>

          <div className="filters">
            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              name="priority"
              value={filter.priority}
              onChange={handleFilterChange}
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {loading && <p className="loading">Loading tasks...</p>}

          {!loading && tasks.length === 0 && (
            <p className="no-tasks">No tasks found. Create your first task!</p>
          )}

          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <span className={`status-badge status-${task.status}`}>
                    {task.status}
                  </span>
                </div>

                <p className="task-description">{task.description}</p>

                <div className="task-meta">
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="due-date">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="task-actions">
                  <button
                    onClick={() => handleEdit(task)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
