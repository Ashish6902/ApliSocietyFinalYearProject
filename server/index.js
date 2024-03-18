const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express();
const port =5000

app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
//app.use('/api/admin', require('./routes/admin'));
app.use('/api/secretary', require('./routes/secretary'));
app.use('/api/user', require('./routes/user'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})