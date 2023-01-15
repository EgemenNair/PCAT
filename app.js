const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const app = express();

// Connect to DB
mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://egemen:cWqrYtZFJaaxYch1@cluster0.c0klgy6.mongodb.net/pcat-db?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB connected !!!');
  })
  .catch((err) => console.log(err));
// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`PCAT listening on port: ${port}`);
});
