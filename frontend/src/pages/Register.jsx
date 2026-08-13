import React, { useState } from 'react'
import { register } from '../api'

export default function Register({ onRegister, onGoLogin }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  async function submit(e){
    e.preventDefault();
    const res = await register(email, password);
    if (res.token) onRegister(res.token); else setErr(res.error || 'Register failed')
  }
  return (
    <div className="auth">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {err && <div className="error">{err}</div>}
      <div>
        <button onClick={onGoLogin}>Back to Login</button>
      </div>
    </div>
  )
}
