import React from 'react'

// TaskCard component (Tailwind-ready)
// Props:
// - task: { id, title, description, priority, due_date, tags, status }
// - onEdit(task)
// - onDelete(taskId)

export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColor = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  }[task.priority || 'medium']

  const dueDate = task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'
  const tags = task.tags ? task.tags.split(',').map(t => t.trim()).filter(Boolean) : []

  return (
    <div className="flex items-start justify-between p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex-1">
        <div className="flex items-start gap-3">
          <div className={`px-2 py-1 text-sm font-semibold rounded ${priorityColor}`}>{(task.priority||'medium').toUpperCase()}</div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            {task.description ? <p className="text-sm text-gray-600 mt-1">{task.description}</p> : null}
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xs text-gray-500">Due: {dueDate}</span>
              <div className="flex gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4 flex flex-col gap-2">
        <button onClick={() => onEdit && onEdit(task)} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
        <button onClick={() => onDelete && onDelete(task.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
      </div>
    </div>
  )
}
