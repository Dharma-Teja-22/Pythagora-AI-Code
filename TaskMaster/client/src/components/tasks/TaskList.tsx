import { Task, TaskFilter } from '@/pages/Dashboard'
import { TaskCard } from './TaskCard'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle, Clock, Inbox } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  onToggleComplete: (taskId: string) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  currentFilter: TaskFilter
}

export function TaskList({ 
  tasks, 
  loading, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  currentFilter 
}: TaskListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 rounded-xl border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-4">
          {currentFilter === 'completed' ? (
            <CheckCircle className="w-12 h-12 text-green-500" />
          ) : currentFilter === 'pending' ? (
            <Clock className="w-12 h-12 text-orange-500" />
          ) : (
            <Inbox className="w-12 h-12 text-blue-500" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {currentFilter === 'completed' && 'No completed tasks'}
          {currentFilter === 'pending' && 'No pending tasks'}
          {currentFilter === 'all' && 'No tasks yet'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          {currentFilter === 'completed' && 'Complete some tasks to see them here.'}
          {currentFilter === 'pending' && 'All your tasks are completed! Great job.'}
          {currentFilter === 'all' && 'Create your first task to get started with organizing your work.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  )
}