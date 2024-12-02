import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { LoginPage } from './pages/LoginPage';
import { TaskPage } from './pages/TaskPage';
import { taskService } from './services/api';
import { Task } from './types/Task';
import { AuthProvider, useAuth } from './context/AuthContext';
import { logger } from './services/logger';

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.isAuthenticated) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      logger.info('Loading tasks...');
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      logger.error('Error in loadTasks:', error);
      toast.error('Unable to load tasks. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (task: Task) => {
    try {
      setLoading(true);
      if (task.id) {
        await taskService.updateTask(task.id, task.title, task.completed, task.description);
        setTasks(tasks.map(t => t.id === task.id ? task : t));
        toast.success('Task updated successfully');
        setEditingTask(null);
      } else {
        const response = await taskService.createTask(task);
        setTasks([...tasks, response.data]);
        toast.success('Task created successfully');
      }
    } catch (error) {
      logger.error('Error in handleCreateTask:', error);
      toast.error(task.id ? 'Failed to update task' : 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      setLoading(true);
      await taskService.updateTask(id, task.title, !task.completed, task.description);
      setTasks(tasks.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
      toast.success('Task updated successfully');
    } catch (error) {
      logger.error('Error in handleToggleTask:', error);
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setLoading(true);
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      if (editingTask?.id === id) {
        setEditingTask(null);
      }
      toast.success('Task deleted successfully');
    } catch (error) {
      logger.error('Error in handleDeleteTask:', error);
      toast.error('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  if (!user?.isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <TaskPage
      tasks={tasks}
      loading={loading}
      editingTask={editingTask}
      onCreateTask={handleCreateTask}
      onToggleTask={handleToggleTask}
      onDeleteTask={handleDeleteTask}
      onEditTask={handleEditTask}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskManager />
      <Toaster position="bottom-right" />
    </AuthProvider>
  );
}

export default App;