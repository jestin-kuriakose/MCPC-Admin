import jwt from "jsonwebtoken"
import User from "../models/User.js";
import express from "express"
const router = express.Router()

router.get('/', async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log("getting refresh token from cookies in /refresh")
    console.log(refreshToken)
    const foundUser = await User.findOne({ where: { refreshToken: refreshToken }  });
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) {
                return res.sendStatus(403);
            } 
            const roles = foundUser.roles;
            console.log("roles................................")
            console.log(roles)
            console.log(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '100s' }
            );
            res.json({ roles, accessToken })
        }
    );
})

export default router;