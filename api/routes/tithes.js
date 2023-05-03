import express from "express"
const router = express.Router()
import Tithe from "../models/Tithe.js"
import { Op, where } from "sequelize"
import Member from "../models/Member.js"
import sequelize from "../config/db.js"


// Get all Tithe info
router.get('/', (req, res) => {
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

// Get all Tithe info with member Data , 
router.get('/titheWithMemberData', (req, res) => {

    const count = req.query.count === undefined ? 1000 : Number(req.query.count)
    const prevYear = req.query.year === undefined ? 1900 : req.query.year - 1;
    const nextYear = req.query.year === undefined ? new Date().getFullYear() + 1 : req.query.year + 1;

    Tithe.findAll({
        limit: count,
        where: { 
            date: { [Op.lt]: `${nextYear}-01-01`, [Op.gt]: `${prevYear}-12-31`} 
        },
        include: [{
            model: Member
        }]
    })
    .then((tithe) => {
        const d = tithe[0].date
        const date = new Date(d)
        res.status(200).json(tithe)
    }) 
    .catch((err) => {
        console.log("Error", err)
        res.status(500).json({error: "Unable to retrieve Tithe Info"})
    })
})

//Create a new Tithe Info
router.post('/', (req,res) => {
    console.log(req.body)
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

router.get('/reports/totalAmount', async(req, res) => {
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

router.get('/reports/titheTotal', (req, res) => {

    Tithe.findAll({
        attributes: [
            'memberId', 
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