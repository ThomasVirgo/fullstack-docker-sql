const { app } = require('./app');
const dotenv = require('dotenv');

dotenv.config();

port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening at http://localhost:${port}/`));

