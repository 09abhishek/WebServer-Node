  const express = require('express');
  const hbs = require('hbs');
  const fs = require('fs');
  const port = process.env.PORT || 3000;

  var app = express();



app.set('view engine', 'hbs');  // using hbs module to render the views.
app.use(express.static(__dirname+'/public')); // middleware creating a accessable public dir
hbs.registerPartials(__dirname+'/views/partials'); // using partials.

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.use((req, res, next) => {
// res.render('maintain.hbs');
// });


app.get('/',(req, res) => {

  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome to my Website',
    person :  {
                name: 'Abhishek',
                likes : [
                  'Programming',
                  'Photography',
                  'Biking',
                  'Guitar'
                        ]
              }
  });
});

app.get('/home',(req, res) => {

  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome to my Website',
    person :  {
                name: 'Abhishek',
                likes : [
                  'Programming',
                  'Photography',
                  'Biking',
                  'Guitar'
                        ]
              }
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page',
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to  handle request!',
          });
});



app.listen(port, ()=> console.log(`Server is up and running on port ${port}`));
