import express from "express"
const router = express.Router()
import User from "../models/User.js";

// Get all user info
router.get('/', (req, res) => {
    User.findAll()
    .then((user)=> {
        console.log(`Retrieved ${user.length} users.`);
    })
    .catch((err) => {
        console.log("unable to retrieve users: ", err)
        res.status(500).json({error: "Unable to retrieve users"})
    })
})

// Create a new User
router.post('/users', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    .then((user) => {
        console.log(`Created user ${user.firstName} ${user.lastName}`);
        res.json(user);
    })
    .catch((err) => {
        console.error('Unable to create user:', err);
        res.status(500).json({ error: 'Unable to create user' });
    });
});

router.post('/login', (req, res) => {
    console.log(req.body)
    if(req.body.email == "jestink@live.com" && req.body.password == "test") {
        return res.status(200).json({message: "Success"})
    }
    return res.status(403).json("User not found")

})

export default router;