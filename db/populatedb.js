#! /usr/bin/env node

const { Client } = require('pg');
const { argv } = require('node:process');

const DATABASE_URL = argv[2];

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR(255),
    username VARCHAR(255),
    added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username)
VALUES
  ('Hello!', 'Akrame'),
  ('Is this a new website', 'Odin'),
  ('I think it is, well done!', 'Bill Gates');
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: DATABASE_URL,
		ssl: true,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
}

main();
