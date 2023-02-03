const express = require('express');
const router = express.Router();

const getCurrentDate = () =>
  new Date().toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

const messages = [
  {
    text: 'Hi there!',
    user: 'Susan',
    added: getCurrentDate()
  },
  {
    text: 'Hello World!',
    user: 'John',
    added: getCurrentDate()
  }
];

/* GET home page. */
router.get('/', (_req, res, _next) => {
  res.render('index', { title: 'Mini MessageBoard', messages });
});

/* GET and POST new message form. */
router
  .route('/new')
  .get((_req, res, _next) => {
    res.render('form', { title: 'New Message Form' });
  })
  .post((req, res, _next) => {
    const { user, text } = req.body;

    if (user && text) {
      messages.push({
        user,
        text,
        added: getCurrentDate()
      });
    }

    res.redirect('/');
  });

module.exports = router;
