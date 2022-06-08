const mongoose = require('mongoose');
const app = require('./app/app')
require('dotenv').config()


const PORT = process.env.PORT
const urlBase = process.env.DB

if (process.env.AMBIENTE == 'mongo') mongoose.connect(urlBase)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))