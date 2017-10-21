const data = require('./userData.json');
let idnum = 101;
module.exports = {

    getUsers(req, res) {
        let good = [];
        if(req.query.hasOwnProperty('age')){
            data.forEach( (v, i, a) => {
                if(v.age < req.query.age){
                    good.push(v);
                }
            })
            res.status(200).send(good);
        } else if (req.query.hasOwnProperty('lastname')){
            data.forEach( (v, i, a) => {
                if(v.last_name === req.query.lastname){
                    good.push(v);
                }
            })
            res.status(200).send(good);
        } else if(req.query.hasOwnProperty('email')){
            data.forEach( (v, i, a) => {
                if(v.email === req.query.email){
                    good.push(v);
                }
            })
            res.status(200).send(good);
        } else if (req.query.hasOwnProperty('favorites')){
            data.forEach( (v, i, a) => {
                v.favorites.forEach( (vv, ii, aa) => {
                    if(vv === req.query.favorites){
                        good.push(v);
                    }
                })
            })
            res.status(200).send(good);
        } else {
            res.status(200).send(data);
        }
    },
    getUser(req, res) {
        const {id} = req.params;
        data.forEach( (v, i, a) => {
            if(v.id === +id){
                res.status(200).send(v);
            }
        })
        res.status(404).json(null);
    },
    getAdmins(req, res) {
        let good = [];
        data.forEach( (v, i, a) => {
            if(v.type === "admin"){
                good.push(v);
            }
        })
        res.status(200).send(good);
    },
    getNonAdmins(req, res) {
        let good = [];
        data.forEach( (v, i, a) => {
            if(v.type !== "admin"){
                good.push(v);
            }
        })
        res.status(200).send(good);
    },
    getUserType(req, res) {
        let good = [];
        data.forEach( (v, i, a) =>{
            if(v.type === req.params.type){
                good.push(v);
            }
        })
        res.status(200).send(good);
    },
    updateUser(req, res) {
        const {id} = req.params;
        const {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
        data.forEach( (v, i, a) => {
            if(v.id === +id){
                v.first_name = first_name;
                v.last_name = last_name;
                v.email = email;
                v.gender = gender;
                v.language = language;
                v.age = age;
                v.city = city;
                v.state = state;
                v.type = type;
                v.favorites = favorites;
            }
        })
        res.status(200).send(data);
    },
    addUser(req, res) {
        const {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
        data.push({
            id: idnum,
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            language: language,
            age: age,
            city: city,
            state: state,
            type: type,
            favorites: favorites,
        });
        idnum++;
        res.status(200).send(data);
    },
    deleteUser(req, res) {
        const {id} = req.params;
        data.forEach( (v, i, a) => {
            if (v.id === +id){
                data.splice(i, 1);
            }
        })
        res.status(200).send(data);
    }
}