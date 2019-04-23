const express = require('express');
const session = require('express-session');
require('dotenv').config();
const app = express();
const messageCtrl = require('./messagesCtrl');
let {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use((req, res, next) => {
	let badWords = ['internet explorer'];
	if (req.body.message) {
		for (let i = 0; i < badWords.length; i++) {
			let regex = new RegExp(badWords[i], 'g');
			req.body.message = req.body.message.replace(regex, '****')
		}
		next();
	}
	else {
		next();
	}
})

app.get('/api/messages', messageCtrl.getAllMessages);
app.post('/api/messages', messageCtrl.createMessage);
app.get('/api/messages/history', messageCtrl.history);

app.listen(SERVER_PORT, () => console.log(`port ${SERVER_PORT} lenny face`))