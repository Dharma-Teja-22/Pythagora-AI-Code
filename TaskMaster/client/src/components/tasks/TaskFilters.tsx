import { TaskFilter } from '@/pages/Dashboard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Inbox, Clock, CheckCircle } from 'lucide-react'

interface TaskFiltersProps {
  currentFilter: TaskFilter
  onFilterChange: (filter: TaskFilter) => void
  taskCounts: {
    all: number
    pending: number
    completed: number
  }
}

export function TaskFilters({ currentFilter, onFilterChange, taskCounts }: TaskFiltersProps) {
  const filters = [
    {
      key: 'all' as TaskFilter,
      label: 'All Tasks',
      icon: Inbox,
      count: taskCounts.all,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      key: 'pending' as TaskFilter,
      label: 'Pending',
      icon: Clock,
      count: taskCounts.pending,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      key: 'completed' as TaskFilter,
      label: 'Completed',
      icon: CheckCircle,
      count: taskCounts.completed,
      color: 'text-green-600 dark:text-green-400'
    }
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon
        const isActive = currentFilter === filter.key
        
        return (
          <Button
            key={filter.key}
            variant={isActive ? 'default' : 'outline'}
            onClick={() => onFilterChange(filter.key)}
            className={`flex items-center gap-2 transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : filter.color}`} />
            <span className="font-medium">{filter.label}</span>
            <Badge 
              variant={isActive ? 'secondary' : 'outline'}
              className={`ml-1 ${
                isActive 
                  ? 'bg-white/20 text-white border-white/30' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {filter.count}
            </Badge>
          </Button>
        )
      })}
    </div>
  )
}