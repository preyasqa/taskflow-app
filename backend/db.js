const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data', 'db.sqlite');

function ensureDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const exists = fs.existsSync(DB_FILE);
  const db = new sqlite3.Database(DB_FILE);
  if (!exists) {
    const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
    db.exec(initSql, (err) => {
      if (err) console.error('DB init error', err);
      else console.log('Database initialized');
    });
  }
  return db;
}

module.exports = ensureDb();
