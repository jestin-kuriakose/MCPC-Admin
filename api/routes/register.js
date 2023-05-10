import express from "express"
import bcrypt from "bcrypt"
import User from "../models/User.js"
const router = express.Router()

router.post('/', async (req,res) => {
    const { email, password } = req.body

    if( !email || !password) return res.status(400).json({ 'message': 'Email and Password are required'})

    const duplicate = await User.findOne( { where: { email: email}})

    if(duplicate) return res.status(409).json({ 'message': 'user with this email exist, use a different email'})

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            email: email,
            password: hashedPassword
        })

        res.status(200).json({'message' : `New User ${email} created`})

    } catch(err) {
        res.status(500).json({ 'message' : err.message})
    }
})

export default router;