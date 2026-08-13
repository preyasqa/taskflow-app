import React, { useState } from 'react'
import { login } from '../api'

export default function Login({ onLogin, onGoRegister }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  async function submit(e){
    e.preventDefault();
    const res = await login(email, password);
    if (res.token) onLogin(res.token); else setErr(res.error || 'Login failed')
  }
  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {err && <div className="error">{err}</div>}
      <div>
        <button onClick={onGoRegister}>Register</button>
      </div>
    </div>
  )
}
