import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import memberRoute from "./routes/members.js"
import titheRoute from "./routes/tithes.js"
import userRoute from "./routes/users.js"
import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"
import verifyJWT from "./middleware/verifyJWT.js"
import logger from "./middleware/logEvents.js"
import credentials from "./middleware/credentials.js"
import corsOptions from "./config/corsOptions.js"
import cookieParser from "cookie-parser"
import refreshRoute from "./routes/refresh.js"


const app = express()

const PORT = process.env.PORT || 3000;

// app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use("/register", registerRoute)
app.use("/login", loginRoute)
app.use("/refresh", refreshRoute)

app.use(verifyJWT)

app.use("/member", memberRoute)
app.use("/tithe", titheRoute)
app.use("/user", userRoute)

app.listen(PORT, ()=> console.log(`Listening on Port ${PORT}`))