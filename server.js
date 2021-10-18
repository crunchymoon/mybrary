if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');

//setting up ejs view engige
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//setting up layouts (such as nav,header, footer ...)
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

//setting up public files
app.use(express.static('public'));
//importing basic route

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to mongoose'));
app.use('/', indexRouter) //ie: app.use('hello',indexRouter); --> localohost:3000/hello/WHAT_YOU_WRITE_INSIDE

app.listen(process.env.PORT || 3000);