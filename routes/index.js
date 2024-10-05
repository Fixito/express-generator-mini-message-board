const express = require('express');
const router = express.Router();
const db = require('../db');
const createError = require('http-errors');
const { getLocalDate } = require('../utils/format-date.js');

/* GET home page. */
router.get('/', async (_req, res, _next) => {
  const { rows: messages } = await db.query('SELECT * FROM messages');

  const formattedMessages = messages.map((message) => ({
    ...message,
    created_at: getLocalDate(message.created_at),
  }));

  res.render('index', {
    title: 'Mini Message Board',
    messages: formattedMessages,
  });
});

/* GET and POST new message form. */
router
  .route('/new')
  .get((_req, res, _next) => {
    res.render('form', { title: 'New Message Form' });
  })
  .post(async (req, res, next) => {
    const { user, text } = req.body;

    if (!user || !text)
      return next(createError(400, 'User and text are required.'));

    await db.query(
      'INSERT INTO messages (username, text) VALUES ($1, $2)',
      [user, text]
    );

    res.redirect('/');
  });

module.exports = router;
