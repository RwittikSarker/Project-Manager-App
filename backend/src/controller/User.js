const User = require("../model/User");

const createUser = (req,res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save()
        .then()
    }
}