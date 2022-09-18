let validator = {};

validator.name = (name)=>{
if (name.length<3){
    return false;
}
else{
    return true;
}
}

validator.phoneno = (phone)=>{
    if ((phone>=1000000000)&&(phone<9999999999)){
        return true;
    }
    else{
        return false;
    }

}

validator.pass=(password)=>{
    if ((password.length>=8)&&(password.length<=12)){
        return true;
    }
    else{
        return false;
    }
}

validator.email=(emailid)=>{
    let emailPattern =new RegExp("(?=.@*)(?=.+.com)");
    if (emailPattern.test(emailid)){
        return true;
    }
    else{
        return false;
    }

}

validator.movieName = (movie) =>{
    if (movie.length<3){
        return false;
    }
    else{
        return true;
    }
}

validator.rating = (rating) =>{
    if ((rating<=5)&&(rating>0)){
        return true;
    }
    else{
        return false;
    }
}

validator.cast = (cast) =>{
    if (cast.length<=10){
        return true;
    }
    else{
        return false;
    }

}

validator.genre = (genre) =>{
    let genres = process.env.genreList;
    if (genres.includes(genre)){
        return true;
    } 
    else{
        return false;
    }

}

validator.releaseDate = (dates) =>{
    let datePattern = /\d{2}-\d{2}-\d{4}/
    if (dates.match(datePattern)){
        return true;
    }
    else{
        return false;
    }
}

module.exports = validator;
