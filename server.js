const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });

    console.log(`${now} : ${req.method} : ${req.url}`);


    next();
});


// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to your home page.',
        pageTitle: 'Home Page',
        currntYear: new Date().getFullYear()
    })
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page Dynamic',
        currntYear: new Date().getFullYear()
    })
});

app.get('/bad', (req, res) =>{
    res.send({
        status: 'ERROR',
        code: '404',
        message: 'Bad URI, api cannot be reached'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
