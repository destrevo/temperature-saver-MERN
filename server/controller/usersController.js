const users = require("../models/users");
const Data = require("../models/data");
const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const login = async (req, res, next) => {
    const body = req.body;
     try {
         const user = await users.findOne({ email: req.body.email });
         !user && res.status(400).json("Wrong credentials!");
         const result = compareSync(req.body.password, user.password);
         let dataForToken = {
             "_id": user._id,
             "email": user.email,
         }
         if (result) {
             const jsontoken = sign({ result: dataForToken }, process.env.PRIVATE_KEY, {
                 expiresIn: "3000 days",
             });
             const data = await Data.findOne({ createdby: user._id });
             res.send({
                 token: jsontoken,
                 data: data.data
             });
         } else {
             res.status(400).json("Wrong credentials!");
             return next(error);
         }
     } catch (err) {
         return next(err);
     }
};

const register = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    try {
        const newUser = new users({
            email: req.body.email,
            password: req.body.password,
        });
        const user = await newUser.save();
        const createdby = user._id.toString();
        const newData = new Data({
            createdby: createdby,
            data: [],
        });
        const data = await newData.save();
        res.status(200).json({ user, data });
    }
    catch (err) {
        res.status(500).json(err.code);
        return next;
    }
};
exports.login = login;
exports.register = register;