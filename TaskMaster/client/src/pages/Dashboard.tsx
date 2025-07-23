import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TaskList } from '@/components/tasks/TaskList'
import { TaskFilters } from '@/components/tasks/TaskFilters'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskStats } from '@/components/tasks/TaskStats'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getTasks, createTask, updateTask, deleteTask } from '@/api/tasks'
import { useToast } from '@/hooks/useToast'

export type Task = {
  _id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type TaskFilter = 'all' | 'pending' | 'completed'

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all')
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [tasks, currentFilter])

  const loadTasks = async () => {
    try {
      setLoading(true)
      console.log('Loading tasks...')
      const response = await getTasks()
      setTasks(response.tasks)
      console.log('Tasks loaded successfully:', response.tasks.length)
    } catch (error) {
      console.error('Error loading tasks:', error)
      toast({
        title: 'Error',
        description: 'Failed to load tasks',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const filterTasks = () => {
    let filtered = tasks
    
    switch (currentFilter) {
      case 'pending':
        filtered = tasks.filter(task => !task.completed)
        break
      case 'completed':
        filtered = tasks.filter(task => task.completed)
        break
      default:
        filtered = tasks
    }

    // Sort by due date (closest first), then by creation date
    filtered.sort((a, b) => {
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)
      return dateA.getTime() - dateB.getTime()
    })

    setFilteredTasks(filtered)
  }

  const handleCreateTask = async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Creating task:', taskData)
      const response = await createTask(taskData)
      setTasks(prev => [...prev, response.task])
      setIsTaskFormOpen(false)
      toast({
        title: 'Success',
        description: 'Task created successfully'
      })
      console.log('Task created successfully')
    } catch (error) {
      console.error('Error creating task:', error)
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive'
      })
    }
  }

  const handleUpdateTask = async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return

    try {
      console.log('Updating task:', editingTask._id, taskData)
      const response = await updateTask(editingTask._id, taskData)
      setTasks(prev => prev.map(task => 
        task._id === editingTask._id ? response.task : task
      ))
      setEditingTask(null)
      setIsTaskFormOpen(false)
      toast({
        title: 'Success',
        description: 'Task updated successfully'
      })
      console.log('Task updated successfully')
    } catch (error) {
      console.error('Error updating task:', error)
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive'
      })
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      console.log('Deleting task:', taskId)
      await deleteTask(taskId)
      setTasks(prev => prev.filter(task => task._id !== taskId))
      toast({
        title: 'Success',
        description: 'Task deleted successfully'
      })
      console.log('Task deleted successfully')
    } catch (error) {
      console.error('Error deleting task:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive'
      })
    }
  }

  const handleToggleComplete = async (taskId: string) => {
    const task = tasks.find(t => t._id === taskId)
    if (!task) return

    try {
      console.log('Toggling task completion:', taskId, !task.completed)
      const response = await updateTask(taskId, {
        ...task,
        completed: !task.completed
      })
      setTasks(prev => prev.map(t => 
        t._id === taskId ? response.task : t
      ))
      console.log('Task completion toggled successfully')
    } catch (error) {
      console.error('Error toggling task completion:', error)
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive'
      })
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsTaskFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsTaskFormOpen(false)
    setEditingTask(null)
  }

  const pendingCount = tasks.filter(task => !task.completed).length
  const completedCount = tasks.filter(task => task.completed).length

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize your tasks and boost productivity
          </p>
        </div>
        <Button 
          onClick={() => setIsTaskFormOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Task
        </Button>
      </div>

      {/* Stats Section */}
      <TaskStats 
        totalTasks={tasks.length}
        pendingTasks={pendingCount}
        completedTasks={completedCount}
      />

      {/* Filters Section */}
      <TaskFilters 
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        taskCounts={{
          all: tasks.length,
          pending: pendingCount,
          completed: completedCount
        }}
      />

      {/* Tasks List */}
      <TaskList 
        tasks={filteredTasks}
        loading={loading}
        onToggleComplete={handleToggleComplete}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        currentFilter={currentFilter}
      />

      {/* Task Form Dialog */}
      <Dialog open={isTaskFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </DialogTitle>
          </DialogHeader>
          <TaskForm 
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}