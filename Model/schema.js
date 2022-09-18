const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DummyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection Successful"));


let models = {};

const userSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: [true, 'Required field'],
        },
        Password: {
            type: String,
            required: [true, 'Required field'],
        },
        PhoneNo: {
            type: Number,
            required: [true, 'Required field'],
        },
        EmailId: {
            type: String,
            unique: true,
            required: [true, 'Required field'],
        },
        UserId: {
            type: String
        }
    }
);

models.userModel = new mongoose.model('users', userSchema);

const movieSchema = new mongoose.Schema(
    {
        movieName: {
            type: String,
            unique: true,
            required: [true, 'Required field'],
        },
        Rating: {
            type: Number
        },
        Cast: {
            type: Array
        },
        Genre: {
            type: String
        },
        releaseDate: {
            type: Date
        }
    }
);

models.movieModel = new mongoose.model('movies', movieSchema);



module.exports = models;