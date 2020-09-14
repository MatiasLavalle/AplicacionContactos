const path =require('path')
const express = require('express')
const exphbs = require ('express-handlebars');
const morgan = require('morgan');

const app = express();


app.set('port',process.env.PORT || 3000)
app.set('views',path.join(__dirname, 'views'))

app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')


app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(require('./routes/index'))


app.use(express.static(path.join(__dirname,'public')))





module.exports = app