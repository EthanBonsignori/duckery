const express = require('express');
const socket = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

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
require('./routes/authRoutes')(app);
require('./routes/htmlRoutes')(app);

// Starting the server, syncing our models ------------------------------------/
async function main() {
  try {
    await db.sequelize.sync(config.syncOptions);
  } catch (err) {
    console.error('Failed to initialize the database', err);
  }

  try {
    await server.listen(PORT, function() {
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
