const express = require('express');
const serve = require('express-static');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config/config.js');
const db = require('./models');

const PORT = process.env.PORT || 3000;

// Express config
const { passport } = require('./config/express-config')(app);

// Passport config
require('./config/passport-config')(passport);

// Mount sockets listeners
require('./socket/listeners')(io);

// Mount express routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
app.use(serve(__dirname + '/public'));
app.use(serve(__dirname + '/public/duck'));

// Starting the server, syncing our models ------------------------------------/
async function main() {
  try {
    await db.sequelize.sync(config.syncOptions);
  } catch (err) {
    console.error('Failed to initialize the database', err);
  }

  try {
    await http.listen(PORT, function() {
      console.log(
        `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
      );
    });
  } catch (err) {
    console.error('Failed to initialize the server', err);
  }
}
main();
module.exports = app;
