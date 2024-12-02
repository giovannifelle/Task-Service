import React from 'react';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { useAuth } from '../context/AuthContext';
import { ClipboardList, LogOut } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskPageProps {
  tasks: Task[];
  loading: boolean;
  editingTask: Task | null;
  onCreateTask: (task: Task) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (task: Task) => void;
}

export function TaskPage({
  tasks,
  loading,
  editingTask,
  onCreateTask,
  onToggleTask,
  onDeleteTask,
  onEditTask
}: TaskPageProps) {
  const { logout, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ClipboardList className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.username}</span>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
        
        <div className="space-y-8">
          <TaskForm 
            onSubmit={onCreateTask} 
            editingTask={editingTask}
          />
          
          <TaskList
            tasks={tasks}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        </div>
      </div>
    </div>
  );
}