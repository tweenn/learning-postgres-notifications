const client = require('./database');

const init = async () => {
	await client.connect();

	client.on('notification', (msg) => {
		const newRow = JSON.parse(msg.payload);
		console.log(newRow);
		return true;
	});

	client.query(`LISTEN ${'sports'}`, (err, res) => {
		if (err) {
			throw new Error(`subscription error: ${err}`)
		};
		console.log(`subscription success: ${JSON.stringify(res)}`);
	});
};

module.exports = init;
