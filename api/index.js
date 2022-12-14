const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PGPORT || 6792
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  console.log("base de datos conectada!");
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
