import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Save, X } from 'lucide-react'
import { format } from 'date-fns'
import { Task } from '@/pages/Dashboard'

interface TaskFormProps {
  task?: Task | null
  onSubmit: (data: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

interface FormData {
  title: string
  description: string
  dueDate: string
  completed: boolean
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      completed: false
    }
  })

  useEffect(() => {
    if (task) {
      console.log('Editing task:', task)
      reset({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        completed: task.completed
      })
      setSelectedDate(new Date(task.dueDate))
    } else {
      console.log('Creating new task')
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setSelectedDate(tomorrow)
      setValue('dueDate', tomorrow.toISOString().split('T')[0])
    }
  }, [task, reset, setValue])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setValue('dueDate', date.toISOString().split('T')[0])
      setIsCalendarOpen(false)
    }
  }

  const onFormSubmit = (data: FormData) => {
    console.log('Submitting form data:', data)
    onSubmit(data)
  }

  const dueDateValue = watch('dueDate')

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Title Field */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Task Title *
        </Label>
        <Input
          id="title"
          {...register('title', { 
            required: 'Task title is required',
            minLength: { value: 1, message: 'Title cannot be empty' }
          })}
          placeholder="Enter task title..."
          className="w-full"
        />
        {errors.title && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Enter task description (optional)..."
          rows={3}
          className="w-full resize-none"
        />
      </div>

      {/* Due Date Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Due Date *
        </Label>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : 'Select due date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-900" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input
          type="hidden"
          {...register('dueDate', { required: 'Due date is required' })}
        />
        {errors.dueDate && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.dueDate.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="px-6"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  )
}