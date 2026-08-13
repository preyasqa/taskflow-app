import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [view, setView] = useState(token ? 'tasks' : 'login')

  useEffect(() => { if (token) localStorage.setItem('token', token); else localStorage.removeItem('token'); }, [token])

  if (view === 'login') return <Login onLogin={(t)=>{setToken(t); setView('tasks')}} onGoRegister={()=>setView('register')} />
  if (view === 'register') return <Register onRegister={(t)=>{setToken(t); setView('tasks')}} onGoLogin={()=>setView('login')} />
  return <Tasks token={token} onLogout={()=>{setToken(null); setView('login')}} />
}
