import express from "express"
import Member from "../models/Member.js"
import User from "../models/User.js"
import verifyRoles from "../middleware/verifyRoles.js"
import ROLES_LIST from "../config/rolesList.js"
const router = express.Router()

// Get all Mmembers
router.get('/memberData', verifyRoles(ROLES_LIST.Admin), (req, res) => {
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

// Get single Member info
router.get('/memberData/:id', verifyRoles(ROLES_LIST.Admin), (req, res) => {

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
router.post('/', verifyRoles(ROLES_LIST.Admin), (req, res) => {
    Member.create(req.body)
    .then((member) => {
        res.status(200).json(member)
    })
    .catch((err) => {
        console.log("Error creating new member", err)
        res.status(500).json({error: "Error creating new member"})
    })
})

// Edit a Member
router.patch('/:id', verifyRoles(ROLES_LIST.Admin), async(req, res) => {
    try {
        const response = await Member.update(req.body,{
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({message: "No of updated rows: " + response})
        
    } catch(err) {
        console.log(err)
        res.status(500).json({error: "Error updating member details"})
    }
})

//Delete a Member
router.delete('/:id', verifyRoles(ROLES_LIST.Admin), async(req, res) => {
    try {
        const response = await Member.destroy( { where: { id: req.params.id } } )
        res.status(200).json({message: "Member Deleted"})
    }catch(err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

// Computes Total Members
router.get('/reports/memberTotal', verifyRoles(ROLES_LIST.Admin), async (req, res) => {
    try {
        const { count } = await Member.findAndCountAll()
        res.status(200).json({count})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

export default router