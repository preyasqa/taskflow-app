const express = require('express');
const router = express.Router();
const db = require('../db');

// list tasks for user, with optional search by keyword, tags or status
router.get('/', (req, res) => {
  const userId = req.user.id;
  const { q, status, tags } = req.query;
  let sql = 'SELECT * FROM tasks WHERE user_id = ?';
  const params = [userId];
  if (status) { sql += ' AND status = ?'; params.push(status); }
  if (q) { sql += ' AND (title LIKE ? OR description LIKE ?)'; params.push('%'+q+'%', '%'+q+'%'); }
  if (tags) { sql += " AND tags LIKE ?"; params.push('%'+tags+'%'); }
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const userId = req.user.id;
  const { title, description, tags, due_date, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const stmt = db.prepare('INSERT INTO tasks (user_id, title, description, tags, due_date, priority) VALUES (?,?,?,?,?,?)');
  stmt.run(userId, title, description||'', tags||'', due_date||null, priority||'medium', function (err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (e, row) => {
      if (e) return res.status(500).json({ error: 'DB error' });
      res.json(row);
    });
  });
});

router.put('/:id', (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { title, description, tags, due_date, priority, status } = req.body;
  const stmt = db.prepare('UPDATE tasks SET title=?, description=?, tags=?, due_date=?, priority=?, status=? WHERE id=? AND user_id=?');
  stmt.run(title, description, tags, due_date, priority, status, id, userId, function (err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (e, row) => {
      if (e) return res.status(500).json({ error: 'DB error' });
      res.json(row);
    });
  });
});

router.delete('/:id', (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId], function (err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  });
});

module.exports = router;
