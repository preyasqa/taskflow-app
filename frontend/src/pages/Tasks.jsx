import React, { useEffect, useState } from 'react'
import { listTasks, createTask, updateTask, deleteTask } from '../api'
import TaskCard from '../TaskCard'

export default function Tasks({ token, onLogout }){
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  async function load(){
    const res = await listTasks(token);
    setTasks(Array.isArray(res)?res:[])
  }
  useEffect(()=>{ load() }, [])

  async function add(e){
    e.preventDefault();
    await createTask(token, { title });
    setTitle('');
    load();
  }

  async function handleDelete(id){
    await deleteTask(token, id);
    load();
  }

  async function handleEdit(task){
    const newTitle = window.prompt('Edit title', task.title);
    if (!newTitle) return;
    await updateTask(token, task.id, { ...task, title: newTitle });
    load();
  }

  return (
    <div className="container p-4">
      <div className="top flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button onClick={onLogout} className="px-3 py-1 bg-gray-200 rounded">Logout</button>
      </div>
      <form onSubmit={add} className="add flex gap-2 mb-4">
        <input placeholder="New task title" value={title} onChange={e=>setTitle(e.target.value)} className="flex-1 px-3 py-2 border rounded" />
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>
      <div className="grid gap-3">
        {tasks.map(t=> (
          <TaskCard key={t.id} task={t} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
