CREATE TABLE IF NOT EXISTS scripts (
  id TEXT PRIMARY KEY, -- Google Doc ID
  user_email TEXT NOT NULL,
  title TEXT,
  url TEXT NOT NULL,
  created_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_user_email ON scripts(user_email);
