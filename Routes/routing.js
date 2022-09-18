const express = require("express");
const routing = express.Router();
const myNotes = require("../Controller/myNotes")

routing.get("/",myNotes.welcome);
routing.post("/register",myNotes.registerUser);
routing.post("/login",myNotes.loginUser);
routing.get("/movies",myNotes.movieList);
routing.post("/movies/:EmailId",myNotes.addMovie);
routing.put("/movies/:EmailId",myNotes.updateMovie);
routing.delete("/movies/:EmailId",myNotes.deleteMovie);
routing.post("/logout",myNotes.logoutUser);
routing.all("*",myNotes.invalidPath);

module.exports= routing;