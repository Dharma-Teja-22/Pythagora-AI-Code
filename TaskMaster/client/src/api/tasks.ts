import api from './api';

export interface Task {
  _id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

// Description: Get all tasks for the authenticated user
// Endpoint: GET /api/tasks
// Request: {}
// Response: { tasks: Array<Task> }
export const getTasks = () => {
  // Mocking the response
  return new Promise<{ tasks: Task[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        tasks: [
          {
            _id: '1',
            title: 'Complete project proposal',
            description: 'Write and submit the Q4 project proposal for the new marketing campaign',
            dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'Review team performance',
            description: 'Conduct quarterly performance reviews for all team members',
            dueDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: '3',
            title: 'Update website content',
            description: 'Refresh the about page and add new testimonials',
            dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday (overdue)
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: '4',
            title: 'Prepare presentation slides',
            description: 'Create slides for the monthly board meeting',
            dueDate: new Date().toISOString(), // Today
            completed: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: '5',
            title: 'Schedule team meeting',
            description: 'Organize next week\'s sprint planning session',
            dueDate: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
            completed: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/tasks');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Create a new task
// Endpoint: POST /api/tasks
// Request: { title: string, description: string, dueDate: string, completed: boolean }
// Response: { task: Task, message: string }
export const createTask = (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
  // Mocking the response
  return new Promise<{ task: Task, message: string }>((resolve) => {
    setTimeout(() => {
      const newTask: Task = {
        _id: Date.now().toString(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      resolve({
        task: newTask,
        message: 'Task created successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/tasks', taskData);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Update an existing task
// Endpoint: PUT /api/tasks/:id
// Request: { title: string, description: string, dueDate: string, completed: boolean }
// Response: { task: Task, message: string }
export const updateTask = (taskId: string, taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
  // Mocking the response
  return new Promise<{ task: Task, message: string }>((resolve) => {
    setTimeout(() => {
      const updatedTask: Task = {
        _id: taskId,
        ...taskData,
        createdAt: new Date().toISOString(), // In real API, this would be preserved
        updatedAt: new Date().toISOString()
      };
      resolve({
        task: updatedTask,
        message: 'Task updated successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put(`/api/tasks/${taskId}`, taskData);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Delete a task
// Endpoint: DELETE /api/tasks/:id
// Request: {}
// Response: { message: string }
export const deleteTask = (taskId: string) => {
  // Mocking the response
  return new Promise<{ message: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Task deleted successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.delete(`/api/tasks/${taskId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}