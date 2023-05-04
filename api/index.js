import express from "express"
import cors from "cors"
import memberRoute from "./routes/members.js"
import titheRoute from "./routes/tithes.js"
import userRoute from "./routes/users.js"

const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use("/member", memberRoute)
app.use("/tithe", titheRoute)
app.use("/user", userRoute)

app.listen(PORT, ()=> console.log(`Listening on Port ${PORT}`))