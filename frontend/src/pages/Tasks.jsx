import React, { useEffect, useState } from 'react'
import { listTasks, createTask, updateTask, deleteTask } from '../api'

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

  return (
    <div className="container">
      <div className="top">
        <h2>Tasks</h2>
        <button onClick={onLogout}>Logout</button>
      </div>
      <form onSubmit={add} className="add">
        <input placeholder="New task title" value={title} onChange={e=>setTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul className="tasks">
        {tasks.map(t=> (
          <li key={t.id}><strong>{t.title}</strong> <small>{t.status}</small></li>
        ))}
      </ul>
    </div>
  )
}
