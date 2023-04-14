import express from "express"
const router = express.Router()
import Tithe from "../models/Tithe.js"

// Get all Tithe info
router.get('/', (req, res) => {
    Tithe.findAll()
    .then((tithe) => {
        res.status(200).json(tithe)
    }) 
    .catch((err) => {
        console.log("Error", err)
        res.status(500).json({error: "Unable to retrieve Tithe Info"})
    })
})

//Create a new Tithe Info
router.post('/', (req,res) => {
    Tithe.create(req.body)
    .then((tithe) => {
        res.status(200).json(tithe)
    })
    .catch((err) => {
        console.log("error", err)
        res.status(500).json("Error creating Tithe Info")
    })
})

// editing an existing Tithe info
router.patch('/:id', (req, res) => {
    Tithe.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((tithe) => {
        console.log(tithe)
        res.status(200).json({message: "No of updated rows: " + tithe})
    })
    .catch((err) => {
        console.log("error", err)
        res.status(500).json({Error: "Error updating tithe info"})
    })
})

export default router;