var db = require('../models');

module.exports = function(app) {
  // Load index page
  app.get('/', function(req, res) {
    db.Duck.findAll({}).then(function(dbExamples) {
      res.render('index', {
        msg: 'Welcome!',
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get('/:id', function(req, res) {
    db.Duck.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render('duck', {
        duck: dbExample,
        id: req.params.id - 1
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
