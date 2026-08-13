const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export async function register(email, password) {
  const res = await fetch(`${BASE}/auth/register`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ email, password }) });
  return res.json();
}
export async function login(email, password) {
  const res = await fetch(`${BASE}/auth/login`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ email, password }) });
  return res.json();
}
export async function listTasks(token){
  const res = await fetch(`${BASE}/tasks`, { headers: { Authorization: 'Bearer '+token } });
  return res.json();
}
export async function createTask(token, payload){
  const res = await fetch(`${BASE}/tasks`, { method:'POST', headers: { Authorization: 'Bearer '+token, 'content-type':'application/json' }, body: JSON.stringify(payload) });
  return res.json();
}
export async function updateTask(token, id, payload){
  const res = await fetch(`${BASE}/tasks/${id}`, { method:'PUT', headers: { Authorization: 'Bearer '+token, 'content-type':'application/json' }, body: JSON.stringify(payload) });
  return res.json();
}
export async function deleteTask(token, id){
  const res = await fetch(`${BASE}/tasks/${id}`, { method:'DELETE', headers: { Authorization: 'Bearer '+token } });
  return res.json();
}
