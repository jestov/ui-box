const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn-db', { useNewUrlParser: true })
        .then(db => console.log('DB is connected'))
        .catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/colours', require('./routes/colours'));
app.use('/api/snippets', require('./routes/snippets'));

// Static files
app.use(express.static(__dirname + '/public'));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server at port', app.get('port'));
});
