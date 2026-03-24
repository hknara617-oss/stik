-- 학교/학원 벽
CREATE TABLE walls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('school', 'hagwon')),
  name TEXT NOT NULL,           -- "서울중학교"
  year INTEGER,                 -- 1998
  grade TEXT,                   -- "2학년"
  region TEXT,                  -- 학원용 "강남구"
  subject TEXT,                 -- 학원용 "수학"
  session TEXT,                 -- 학원용 "저녁반"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 포스트잇 신호
CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wall_id UUID REFERENCES walls(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,      -- 익명 식별자 (localStorage UUID)
  message TEXT NOT NULL,        -- 포스트잇 텍스트 (100자 제한)
  color TEXT NOT NULL,          -- 포스트잇 색상 hex
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting','warm','hot','matched','expired')),
  temperature INTEGER DEFAULT 0 CHECK (temperature >= 0 AND temperature <= 100),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기억 조각
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wall_id UUID REFERENCES walls(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  question TEXT NOT NULL,       -- 질문 원문
  answer TEXT NOT NULL,         -- 유저 답변
  reactions JSONB DEFAULT '{"heart":0,"nod":0,"me":0}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 매칭
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  signal_a UUID REFERENCES signals(id),
  signal_b UUID REFERENCES signals(id),
  greeting_a TEXT,              -- A가 보낸 첫 인사
  greeting_b TEXT,              -- B가 보낸 첫 인사
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 스트릭 (게이미피케이션)
CREATE TABLE streaks (
  device_id TEXT PRIMARY KEY,
  count INTEGER DEFAULT 0,
  last_date DATE,
  badges TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
