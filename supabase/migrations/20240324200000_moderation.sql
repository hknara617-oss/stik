-- Add moderation columns to signals
ALTER TABLE signals ADD COLUMN is_blinded BOOLEAN DEFAULT false;
ALTER TABLE signals ADD COLUMN report_count INTEGER DEFAULT 0;

-- Table to track unique reports by device_id
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  signal_id UUID REFERENCES signals(id) ON DELETE CASCADE,
  reporter_device_id TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(signal_id, reporter_device_id)
);

-- Table for banned devices
CREATE TABLE banned_devices (
  device_id TEXT PRIMARY KEY,
  reason TEXT,
  banned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- RLS for reports (only service role can handle logic, public can insert)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_report" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "everyone_can_see_reports" ON reports FOR SELECT USING (true);

-- RLS for banned_devices
ALTER TABLE banned_devices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_check_ban" ON banned_devices FOR SELECT USING (true);

-- Function for atomic report increment and auto-blind
CREATE OR REPLACE FUNCTION increment_report_count(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE signals
  SET report_count = report_count + 1,
      is_blinded = (CASE WHEN report_count + 1 >= 3 THEN true ELSE false END)
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

