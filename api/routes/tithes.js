import express from "express"
const router = express.Router()
import Tithe from "../models/Tithe.js"
import { Op, where } from "sequelize"
import Member from "../models/Member.js"
import sequelize from "../config/db.js"
import verifyRoles from "../middleware/verifyRoles.js"
import ROLES_LIST from "../config/rolesList.js"


// Get all Tithe info
router.get('/titheData', verifyRoles(ROLES_LIST.Admin), (req, res) => {
    const count = req.query.count === undefined ? 1000 : Number(req.query.count)
    const prevYear = req.query.year === undefined ? 1900 : req.query.year - 1;
    const nextYear = req.query.year === undefined ? new Date().getFullYear() + 1 : req.query.year + 1;
    let updatedTithe = []

    Tithe.findAll( { where: { date: { [Op.lt]: `${nextYear}-01-01`, [Op.gt]: `${prevYear}-12-31`} }} )
    .then((tithe) => {
        if(count === undefined) {
            return res.status(200).json(tithe)
        } else {
            const updCount = tithe.length < count ? tithe.length : count
            for(let i=0; i<updCount; i++) {
                updatedTithe[i] = tithe[i]
            }
            return res.status(200).json(updatedTithe)
        }
    }) 
    .catch((err) => {
        console.log("Error", err)
        res.status(500).json({error: "Unable to retrieve Tithe Info"})
    })
})

// Get single Tithe info
router.get('/titheData/:id', verifyRoles(ROLES_LIST.Admin), (req, res) => {

    Tithe.findOne( { where: { id: req.params.id }} )
    .then((tithe) => {
        return res.status(200).json(tithe)
    }) 
    .catch((err) => {
        console.log("Error", err)
        res.status(500).json({error: "Unable to retrieve Tithe Info"})
    })
})

// Get all Tithe info with member Data , 
router.get('/titheWithMemberData', verifyRoles(ROLES_LIST.Admin), (req, res) => {
    const count = req.query.count === undefined ? 1000 : Number(req.query.count)
    const prevYear = req.query.year === undefined ? 1900 : req.query.year - 1;
    const nextYear = req.query.year === undefined ? new Date().getFullYear() + 1 : req.query.year + 1;
    Tithe.findAll({
        limit: count,
        where: { 
            date: { [Op.lt]: `${nextYear}-01-01`, [Op.gt]: `${prevYear}-12-31`} 
        },
        include: [{
            model: Member,
            attributes: ['firstName', 'middleName', 'lastName', 'address1', 'address2', 'city', 'province', 'postalCode', 'country', 'email1', 'phone1']
        }]
    })
    .then((tithe) => {
        res.status(200).json(tithe)
    }) 
    .catch((err) => {
        console.log("Error", err)
        res.status(500).json({error: "Unable to retrieve Tithe Info"})
    })
})

// Get Single Tithe info with member Data 
router.get('/titheWithMemberData/:id', verifyRoles(ROLES_LIST.Admin), (req, res) => {
    Tithe.findOne({
        where: { 
            id: req.params.id
        },
        include: [{
            model: Member,
            attributes: ['firstName', 'middleName', 'lastName', 'address1', 'address2', 'city', 'province', 'postalCode', 'country', 'email1', 'phone1']
        }]
    })
    .then((tithe) => {
        res.status(200).json(tithe)
    }) 
    .catch((err) => {
        console.log("Error", err)
        res.status(500).json({error: "Unable to retrieve Tithe Info"})
    })
})

//Create a new Tithe Info
router.post('/', verifyRoles(ROLES_LIST.Admin), (req,res) => {
    Tithe.create(req.body)
    .then((tithe) => {
        res.status(200).json(tithe)
    })
    .catch((err) => {
        console.log("error", err)
        res.status(500).json("Error creating Tithe Info")
    })
})

//Create a new Tithe Info in bulk
router.post('/bulk', verifyRoles(ROLES_LIST.Admin), (req,res) => {
    Tithe.bulkCreate(req.body)
    .then((tithe) => {
        res.status(200).json(tithe)
    })
    .catch((err) => {
        console.log("error", err)
        res.status(500).json("Error creating Tithe Info")
    })
})

// editing an existing Tithe info
router.patch('/:id', verifyRoles(ROLES_LIST.Admin), (req, res) => {
    Tithe.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((tithe) => {
        res.status(200).json({message: "No of updated rows: " + tithe})
    })
    .catch((err) => {
        console.log("error", err)
        res.status(500).json({Error: "Error updating tithe info"})
    })
})

//Delete a Tithe
router.delete('/:id', verifyRoles(ROLES_LIST.Admin), async(req, res) => {
    try {
        const response = await Tithe.destroy( { where: { id: req.params.id } } )
        res.status(200).json({message: "Tithe Deleted"})
    }catch(err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

// Gives the total Tithe Amount
// Can be filtered according to Date and/or memberId
router.get('/reports/totalAmount', verifyRoles(ROLES_LIST.Admin), async(req, res) => {
    const prevYear = req.query.year - 1;
    const nextYear = req.query.year + 1;

    if(req.query.id === undefined && req.query.year === undefined) {
        await Tithe.sum('amount')
        .then((amount) => {
            res.status(200).json({amount})
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({Error: "Error updating tithe info"})
        })
    } else if(req.query.id === undefined && req.query.year !== undefined) {

        await Tithe.sum('amount', { where: { date: { [Op.lt]: `${nextYear}-01-01`, [Op.gt]: `${prevYear}-12-31`}}})
        .then((amount) => {
            res.status(200).json({amount})
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({Error: "Error updating tithe info"})
        })
    } else if(req.query.id !== undefined && req.query.year === undefined) {
        await Tithe.sum('amount', { where: { member: req.query.id }})
        .then((amount) => {
            res.status(200).json({amount})
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({Error: "Error updating tithe info"})
        })
    } else {
        await Tithe.sum('amount', { where: { date: { [Op.lt]: `${nextYear}-01-01`, [Op.gt]: `${prevYear}-12-31`}, member: req.query.id}})
        .then((amount) => {
            res.status(200).json({amount})
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({Error: "Error updating tithe info"})
        })
    }
})

router.get('/reports/titheTotal', verifyRoles(ROLES_LIST.Admin), (req, res) => {

    Tithe.findAll({
        attributes: [
            'memberId',
            'date',
            'amount', 
            [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
        ], 
        group: 'memberId',
        where: { 
            date: { [Op.lte]: req.query.toDate, [Op.gte]: req.query.fromDate} 
        },
        include: [{
            model: Member,
            attributes: ['firstName', 'middleName', 'lastName', 'address1', 'address2', 'city', 'province', 'postalCode', 'country', 'email1', 'phone1']
        }]
        
    })
    .then(async (tithe) => {
        res.status(200).json(tithe)
    }) 
    .catch((err) => {
        console.log("Error", err)
        res.status(500).json({error: "Unable to retrieve Tithe Info"})
    })
})

export default router;