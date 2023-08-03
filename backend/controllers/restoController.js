//const { default: Resto } = require('../../src/Resto')
const Review = require('../models/ReviewModel')
const Resto = require('../models/RestoModel')



//get all restos 
const getRestos = async (req, res) => {
    const restos = await Resto.find({}).sort({createdAt: -1})


    res.status(200).json(restos)
}

//get a single resto 
const getResto = async (req, res) => {
    const { id } = req.params

    const resto = await Resto.findById(id)

    if (!resto){
        return res.status(404).json({error: 'No Resto Found'})
    }

    res.status(200).json(resto)
}

// create a resto
const createResto = async (req, res) => {
    const {
            restoName, 
            thumbnail,
            avgRating, 
            description, 
            restoUrl, 
            operatingHours, 
            contactNum, 
        } = req.body


    //add doc to db
    try{
        const resto = await Resto.create({
            restoName, 
            thumbnail,
            avgRating, 
            description, 
            restoUrl, 
            operatingHours, 
            contactNum, 
        })
        res.status(200).json(resto)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}


module.exports = {
    getRestos,
    getResto,
    createResto
}