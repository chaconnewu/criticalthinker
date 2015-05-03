var ProCon = require('../app/models/procon.js');;

module.exports = function(app) {
  app.get('/', function(req, res) {
      res.render('index.ejs');
  });

  app.get('/all_procons', function(req, res) {
    ProCon.find({}, function(err, data) {
      console.log(data);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    });
  });


}
