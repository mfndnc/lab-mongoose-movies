const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log('/celebrities', celebrities);
      res.render('celebrities', { celebrities });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/celebrities/new', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase,
  })
    .then((celebrity) => {
      console.log('/celebrities/new POST', celebrity);
      res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id).then((celebrity) => {
    console.log('/celebrities/:id', celebrity);
    res.render('celebrities/show', { celebrity });
  });
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id).then((celebrity) => {
    console.log('/celebrity/:id/edit', celebrity);
    res.render('celebrities/edit', { celebrity });
  });
});

router.post('/celebrities/:id/edit', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase,
  })
    .then((celebrity) => {
      console.log('/celebrity/:id/edit POST', celebrity);
      res.redirect(`/celebrities/${req.params.id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log('/celebrity/:id/delete POST', req.params.id);
      res.redirect(`/celebrities`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
