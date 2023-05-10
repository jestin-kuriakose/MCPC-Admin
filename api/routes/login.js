import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body

    if( !email || !password ) return res.status(400).json({ 'message' : 'Email and Password are required' })

    const foundUser = await User.findOne( { where: { email: email } } )
    if( !foundUser ) return res.status(401).json({ 'message': 'User not found' })

    const match = await bcrypt.compare(password, foundUser.password)
    
    if(match) {

        const role = foundUser.roles

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "role": role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '100s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        foundUser.refreshToken = refreshToken
        const result = await User.update( {refreshToken}, { where: { email: foundUser.email}})

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

        res.status(200).json({role, accessToken})

    } else {
        res.status(401).json({ 'message' : 'Wrong Email or Password' })
    }
})

export default router