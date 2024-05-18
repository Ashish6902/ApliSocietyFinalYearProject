const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express();
const port =5000

app.use(cors())
app.use(express.json({ limit: '10mb' })); 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/superAdmin', require('./routes/SuperAdmin'));
app.use('/api/secretary', require('./routes/secretary'));
app.use('/api/user', require('./routes/user'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})