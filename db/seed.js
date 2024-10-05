const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  username VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

DELETE from messages;

INSERT INTO messages (text, username) 
VALUES
  ('Hi there!', 'Susan'),
  ('Hello World!', 'John')
`;

const main = async () => {
  console.log('seeding...');
  const client = new Client();

  try {
    await client.connect();
    await client.query(SQL);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }

  console.log('done');
};

main();
