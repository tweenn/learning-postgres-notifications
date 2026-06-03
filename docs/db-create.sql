CREATE SCHEMA queue; -- creates a schema called queue
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- helps us generate uuids
CREATE TABLE queue.message (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	channel text,
	data json,
	created_at timestamptz,
	updated_at timestamptz
); -- creates a table with columns id, channel, data, created_at & updated_at
ALTER TABLE queue.message ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE queue.message ALTER COLUMN updated_at SET DEFAULT now();
-- above two lines make created_at and updated_at columns to be autopopulated


CREATE OR REPLACE FUNCTION queue.notify_new_message() RETURNS TRIGGER AS $$
DECLARE
BEGIN
		PERFORM pg_notify(cast(NEW.channel as text), row_to_json(new)::text);
		RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_new_message BEFORE INSERT ON queue.message
	FOR EACH ROW EXECUTE PROCEDURE queue.notify_new_message();
