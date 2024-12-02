import React from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => task.id && onToggle(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${task.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-blue-500'
            }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        <div>
          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          <p className="text-gray-500">{task.description}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => task.id && onDelete(task.id)}
          className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}