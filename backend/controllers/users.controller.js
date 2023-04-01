const UserModel = require('../models/users.model');
const bcryptjsjs = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let user = req.body;
    await bcryptjsjs.hash(user.password, 2).then(function(hash){
        user.password = hash;
    })
    await UserModel.createUser(user).then((result) => {
        if(result){
            res.status(200).send(result);
        }else{
            res.status(400).send("Cannot create user!")
        }
    })
}

exports.login =  async (req,res) => {
    let user_login = req.body;
    let user_info = await UserModel.findByEmail(user_login.email);
    console.log(user_info);
    if(!user_info){
        res.status(404).send("Email not found !")
        return;
    }
    await bcryptjsjs.compare(user_login.password, user_info.password)
    .then(function(result) {
        if(!result){
            res.status(404).send("Incorrect password !");
            return;
        }
    });

    let token = jwt.sign({ name: user_info.name , email: user_info.email}, 'Mindx2023');
    console.log(token);
    res.status(200).send({"token": token, message: "Login successfully !"})
}


exports.current = async (req, res) => {
    // console.log(req);
    
}



