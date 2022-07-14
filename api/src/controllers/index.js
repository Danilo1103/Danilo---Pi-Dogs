const axios = require("axios")
const {Temperament, Dog} = require('../db');
require("dotenv").config();
const {API_URL} = process.env;


const dataApi = async(req, res)=>{
    try {
    const infoApi = await axios.get(API_URL)
    const mapApi = await infoApi.data.map(d =>{
        return { 
            id: d.id,
            name: d.name,
            img: d.image.url,
            weight_min: parseInt(d?.weight?.metric?.split("-")[0]),
            weight_max: parseInt(d?.weight?.metric?.split("-")[1]),
            height_min: parseInt(d?.height?.metric?.split("-")[0]),
            height_max: parseInt(d?.height?.metric?.split("-")[1]),
            life_span: d.life_span,
            temperament: d.temperament || "he has no temperaments"
        }
    })
    return mapApi 
} catch(e){
    res.send(e)
}
}

const dataApiTemper = async(req, res) => {
    try {
        const infoApiTemper = await axios.get(API_URL)
        let temp1 = infoApiTemper.data.map(d => d.temperament ? d.temperament : "no temperament");
        let temp2 = temp1.map(d => d.split(", "))

        let setTemper = new Set (temp2.flat())
        for (el of setTemper) {if (el) await Temperament.findOrCreate({
            where: {name: el}
        })}

        temperamentoBd = await Temperament.findAll();
        res.status(200).json(temperamentoBd)
    } catch (error) {
        res.status(404).send(error)
    }
    
}

const dataBd = async () => {
    return await Dog.findAll({ 
        include: {
            model: Temperament, 
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}


const apiBd = async() => {
    const api = await dataApi()
    const bd = await dataBd()
    const info = await bd.map((el) => {
        return {
            id: el.id,
            name: el.name.charAt(0).toUpperCase() + el.name.slice(1), 
            img: el.img?el.img:'https://www.abc.es/xlsemanal/wp-content/uploads/sites/5/2022/04/perros-expresiones-faciales-fingir-caras-humanos2.jpg',
            weight_min: el.weight_min,
            weight_max: el.weight_max,
            height_min: el.height_min,
            height_max: el.height_max,
            life_span: el.life_span,
            temperament: el.temperaments.map(el=>el.name).toString(),
            createdInDb: el.createdInDb
        }
    })
    return Allinfo = api.concat(info)
}


const searchNameDog = async(req, res) => {
    try {
        const { name } = req.query
        const dataApiBd = await apiBd()
        if(name) {
            var searchDog = dataApiBd.filter(i=> i.name.toLowerCase().includes(name.toLowerCase()))
        if(searchDog.length){
            res.status(200).json(searchDog) 
        } else {
            res.status(404).json({msg: "dog not found"})
        }
        } else {
            res.status(200).send(dataApiBd)
        } } 
        catch (e) {
            res.send(e)
        }
}

const searchIdDog = async(req, res)=>{
    try {
        const {id} = req.params
        const dogInfo = await apiBd();
        if (id) {
            var dogId = await dogInfo.filter(i =>i.id == id);
            dogId.length
            res.status(200).send(dogId) 
        }
    } catch (error) {
        res.status(404).send(error);
    }
}

async function findNameInApi(name){
    const apidog = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name.toLowerCase()}`);
    if(apidog.data.length === 0) return false
    return true
}

const createDog = async (req, res) => {
    const { name, height_min, height_max, weight_min, weight_max, temperament, life_span, img } = req.body
    if(!name) return res.status(404).json({error: "The name is missing"});
    if(name){
        if(await findNameInApi(name)) return res.status(404).json({error: "The dogs already exist..."})
        let findDogNameInDB = await Dog.findOne({
            where: {name: name.toLowerCase()}
        });
        if(findDogNameInDB) return res.status(404).json({error: "The dogs already exist..."})
    }
    try {
        const newDog = await Dog.create({name, height_min, height_max, weight_min, weight_max, life_span, img})
    
        let temperamento2 = await Temperament.findAll({
            where: {name: temperament}
        })
        newDog.addTemperament(temperamento2)
        res.send('Dog created succesfully')
    } catch (error) {
        res.status(404).send({error: "error in some of the data"})
    }
}

const deleteDog = async (req, res) => {
    try{
        let {id}= req.params;
        await Dog.destroy({
            where:{id}
        })
        res.status(201).json('Dog Delete')
    }catch(err){
        res.status(418).json(err.message)
    }
} 


module.exports = {searchNameDog, searchIdDog, createDog, dataApiTemper, deleteDog};







