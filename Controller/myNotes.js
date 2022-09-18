const express = require("express");
const validator = require("../Utilities/validator");
const models = require("../Model/schema")

exports.welcome = async (req, res) => {
    res.send('welcome to home page')
}

exports.registerUser = async (req, res, next) => {
    try {
        const details = await models.userModel.find({ EmailId: req.body.EmailId });
        if (details.length > 0) throw `User exists with this email id`;
        const noOfUser = await models.userModel.find({});
        let counter = noOfUser.length + 1;
        if (!validator.name(req.body.Name)) {
            throw `Enter a valid name with at least 3 characters`;
        }
        if (!validator.phoneno(req.body.PhoneNo)) {
            throw `Enter a valid phone no. with 10 digits`;
        }
        if (!validator.pass(req.body.Password)) {
            throw `Enter a valid password with at least 8 and not more than 12 characters`;
        }
        if (!validator.email(req.body.EmailId)) {
            throw `Enter a valid email id`;
        }
        let userInfo = {
            Name: req.body.Name,
            Password: req.body.Password,
            PhoneNo: req.body.PhoneNo,
            EmailId: req.body.EmailId,
            UserId: "U-" + counter
        }
        if ((validator.name(req.body.Name)) && (validator.phoneno(req.body.PhoneNo)) && (validator.pass(req.body.Password)) && (validator.email(req.body.EmailId))) {
            const userDetails = await models.userModel.insertMany(userInfo);
            res.status(201).send({ status: "success", data: { message: `Successfully registered with user id - ${userInfo.UserId}` } })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({ status: "error", data: { message: err } })
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const details = await models.userModel.find({ EmailId: req.body.EmailId, Password: req.body.Password });
        if (details.length == 0) {
            throw `Email or password is incorrect`;
        }
        else {
            res.cookie('EmailId', req.body.EmailId);
            res.status(201).send({ status: "success", data: { message: `${details[0].Name} logged in successfully` } })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({ status: "error", data: { message: err } })

    }
}

exports.movieList = async (req, res, next) => {
    try {
        const details = await models.movieModel.find({}, { _v: 0, _id: 0 });
        res.status(200).send({ status: "success", results: details.length, data: { movies: details } })
    } catch (err) {
        console.log(err)
        res.status(400).send({ status: "error", data: { message: err } })
    }
}

exports.addMovie = async (req, res, next) => {
    try {
        if (req.params.EmailId != req.cookies.EmailId) {
            throw `You are not authorized to add movie`;
        }
        const details = await models.movieModel.find({ movieName: req.body.movieName });
        if (details.length > 0) throw `Movie exists with this movie name`;

        if (!validator.movieName(req.body.movieName)) {
            throw `Enter a valid name with at least 3 characters`;
        }
        if (!validator.rating(req.body.Rating)) {
            throw `Rating can be between 0 and 5 `;
        }
        if (!validator.cast(req.body.Cast)) {
            throw `Enter maximum top 10 members in the list`;
        }
        if (!validator.genre(req.body.Genre)) {
            throw `Enter a valid genre like Drama/Horror/Action/Thriller/Comedy/Romance/Documentary`;
        }
        if (!validator.releaseDate(req.body.releaseDate)) {
            throw `Enter a valid date in DD-MM-YYYY format`;
        }
        let movieInfo = {
            movieName: req.body.movieName,
            Rating: req.body.Rating,
            Cast: req.body.Cast,
            Genre: req.body.Genre,
            releaseDate: req.body.releaseDate
        }
        if ((validator.movieName(req.body.movieName)) && (validator.rating(req.body.Rating)) && (validator.cast(req.body.Cast)) && (validator.genre(req.body.Genre)) && (validator.releaseDate(req.body.releaseDate))) {
            const movieDetails = await models.movieModel.insertMany(movieInfo);
            res.status(201).send({ status: "success", data: { message: `${movieDetails[0].movieName} added successfully` } })
        }
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            res.status(400).send({ status: "error", data: { message: `Something went wrong` } })
        }
        else {
            res.status(400).send({ status: "error", data: { message: err } })
        }


    }
}

exports.updateMovie = async (req, res, next) => {
    try {
        if (req.params.EmailId != req.cookies.EmailId) {
            throw `You are not authorized to add movie`;
        }
        const updatedMovie = req.body
        console.log(updatedMovie)
        if (!validator.movieName(req.body.movieName)) {
            throw `Enter a valid name with at least 3 characters`;
        }
        if (!validator.rating(req.body.Rating)) {
            throw `Rating can be between 0 and 5 `;
        }
        if (!validator.cast(req.body.Cast)) {
            throw `Enter maximum top 10 members in the list`;
        }
        if (!validator.genre(req.body.Genre)) {
            throw `Enter a valid genre like Drama/Horror/Action/Thriller/Comedy/Romance/Documentary`;
        }
        if (!validator.releaseDate(req.body.releaseDate)) {
            throw `Enter a valid date in DD-MM-YYYY format`;
        }
        let movName = req.body.movieName;
        const movDetails = await models.movieModel.find({ movieName: movName })
        if (movDetails.length == 0) {
            throw `Movie is not present in the list`
        }
        else {
            const updateMovie = await models.movieModel.findOneAndUpdate({ movieName: movName }, { $set: updatedMovie })
            res.status(201).send({ status: "success", data: { message: `Movie updated successfully` } })
        }
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            res.status(400).send({ status: "error", data: { message: `Something went wrong` } })
        }
        else {
            res.status(400).send({ status: "error", data: { message: err } })
        }
    }
}

exports.deleteMovie = async (req, res, next) => {
    try {
        if (req.params.EmailId != req.cookies.EmailId) {
            throw `You are not authorized to add movie`;
        }
        let movName = req.body.movieName;
        const movDetails = await models.movieModel.find({ movieName: movName })
        if (movDetails.length == 0) {
            throw `Movie is not present in the list`
        }
        else {
            const deleteMovie = await models.movieModel.deleteOne({ movieName: movName })
            res.status(201).send({ status: "success", data: { message: `Movie deleted successfully` } })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({ status: "error", data: { message: err } })

    }
}



exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('EmailId');
        res.status(201).send({ status: "success", data: { message: `Logged out successfully` } })
    } catch (err) {
        console.log(err)
        res.status(400).send({ status: "error", data: { message: err } })
    }
}

exports.invalidPath = async (req, res) => {
    res.send('pageNotFound')
}