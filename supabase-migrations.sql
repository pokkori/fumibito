-- ふみびと Supabase マイグレーション
-- Supabase SQL Editorで実行してください

-- ユーザーテーブル
CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  payjp_customer_id TEXT,
  payjp_sub_id    TEXT,
  plan            TEXT NOT NULL DEFAULT 'standard',  -- 'standard' | 'premium' | 'gift'
  status          TEXT NOT NULL DEFAULT 'active',     -- 'active' | 'cancelled' | 'paused'
  cancelled_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- プロフィールテーブル（手紙生成の素材）
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,           -- 呼び名（例: さくらさん）
  birthday        DATE,                    -- 誕生日（特別手紙用）
  postal_code     TEXT NOT NULL,
  address         TEXT NOT NULL,           -- 郵送先住所
  address_name    TEXT NOT NULL,           -- 宛名（印刷用）
  interests       TEXT[],                  -- 趣味・関心
  worry           TEXT,                    -- 最初の悩み・状況
  tone            TEXT DEFAULT 'warm',     -- 'warm' | 'formal' | 'cheerful'
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 手紙テーブル（生成・送付ログ）
CREATE TABLE IF NOT EXISTS letters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  month           TEXT NOT NULL,           -- 例: '2026-04'
  content         TEXT NOT NULL,           -- AIが生成した手紙テキスト
  summary         TEXT,                    -- 次月用の要約（150字以内）
  status          TEXT DEFAULT 'generated', -- 'generated' | 'approved' | 'printing' | 'sent' | 'failed'
  sent_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- メッセージテーブル（プレミアム：ユーザーからの返信）
CREATE TABLE IF NOT EXISTS messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  used_in_letter  BOOLEAN DEFAULT FALSE,   -- 翌月手紙に使用済みか
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- RLS（Row Level Security）有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Service Role のみアクセス可（サーバーサイドのみ）
-- anon キーからのアクセスは完全ブロック

-- インデックス
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_letters_user_month ON letters(user_id, month);
CREATE INDEX IF NOT EXISTS idx_letters_status ON letters(status);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
