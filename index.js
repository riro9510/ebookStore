require('dotenv').config();
const app = require('./server');
const { testDatabaseConnection } = require('./src/database');
const port = process.env.PORT || 3000;

testDatabaseConnection();

app.listen(port, () => {
  console.log(`🚀Web server listening on port ${port}🚀`);
});
