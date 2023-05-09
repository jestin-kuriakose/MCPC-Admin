import express from "express"
import Member from "../models/Member.js"
const router = express.Router()

// Get all Mmembers
router.get('/memberData', (req, res) => {
    const count = req.query.count
    Member.findAll({
        limit: count,
    })
    .then((member) => {
        res.status(200).json(member)
    })
    .catch((err) => {
        console.log("Error retrieving Members", err)
        res.status(500).json({error: "Error retrieving Members"})
    })
})

// Get single Tithe info
router.get('/memberData/:id', (req, res) => {

    Member.findOne( { where: { id: req.params.id }} )
    .then((member) => {
        return res.status(200).json(member)
    }) 
    .catch((err) => {
        console.log("Error", err)
        res.status(500).json({error: "Unable to retrieve Member Info"})
    })
})

// Create a new Member
router.post('/', (req, res) => {
    Member.create(req.body)
    .then((member) => {
        console.log(member)
        res.status(200).json(member)
    })
    .catch((err) => {
        console.log("Error creating new member", err)
        res.status(500).json({error: "Error creating new member"})
    })
})

// Edit a Member
router.patch('/:id', async(req, res) => {
    console.log(req.body)
    try {
        const response = await Member.update(req.body,{
            where: {
                id: req.params.id
            }
        })
        console.log(response)
        res.status(200).json({message: "No of updated rows: " + response})
        
    } catch(err) {
        console.log(err)
        res.status(500).json({error: "Error updating member details"})
    }
    

})

export default router