import { Task } from '@/pages/Dashboard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog'
import { Edit, Trash2, Calendar, Clock } from 'lucide-react'
import { format, isToday, isTomorrow, isPast, isThisWeek } from 'date-fns'

interface TaskCardProps {
  task: Task
  onToggleComplete: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const dueDate = new Date(task.dueDate)
  const isOverdue = isPast(dueDate) && !isToday(dueDate) && !task.completed

  const getDueDateDisplay = () => {
    if (isToday(dueDate)) return 'Today'
    if (isTomorrow(dueDate)) return 'Tomorrow'
    if (isThisWeek(dueDate)) return format(dueDate, 'EEEE')
    return format(dueDate, 'MMM d, yyyy')
  }

  const getDueDateColor = () => {
    if (task.completed) return 'text-green-600 dark:text-green-400'
    if (isOverdue) return 'text-red-600 dark:text-red-400'
    if (isToday(dueDate)) return 'text-orange-600 dark:text-orange-400'
    return 'text-blue-600 dark:text-blue-400'
  }

  return (
    <div className={`group p-6 rounded-xl border transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 ${
      task.completed 
        ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
        : isOverdue
        ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
        : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
    } backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80`}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task._id)}
            className="w-5 h-5"
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-lg leading-tight ${
                task.completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-2 text-sm leading-relaxed ${
                  task.completed 
                    ? 'line-through text-gray-400 dark:text-gray-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-3">
                <div className={`flex items-center gap-1.5 text-sm font-medium ${getDueDateColor()}`}>
                  <Calendar className="w-4 h-4" />
                  {getDueDateDisplay()}
                </div>
                
                {isOverdue && !task.completed && (
                  <Badge variant="destructive" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Overdue
                  </Badge>
                )}
                
                {task.completed && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Completed
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20"
              >
                <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-gray-900">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{task.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(task._id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}