const app = require('./app');
const database = require('./adapters/database');

const PORT = process.env.APP_PORT || 3000;
let server;

database.connect().then(() => {
  server = app
    .listen(PORT, () => {
      console.log(`Server started listening on port ${PORT}`);
    })
    .on('error', (err) => {
      console.log(err.message);
    });
});

function close() {
  database.disconnect();
  if (server) {
    server.close();
    console.log('Server ended successfully');
  }
}

process.on('SIGINT', close);

process.on('SIGTERM', close);
