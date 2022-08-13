const { ObjectId } = require("mongodb");
const mongodb = require("../mysqlConnection");
const { getSlidesFunc, returnResponseMsg, deleteElement } = require("./action-service");

const db = mongodb.db();

let getSlides = async (req, res) => {
    let { id } = req.params;

    let slides = await getSlidesFunc(id);

    res.json(slides);
}

let createSlide = (req, res) => {
    db.collection('slide').insertOne(req.body, (err, result) => {
        if (err) throw err;
        res.json({ ...result, msg: returnResponseMsg('slide', 'create') });
    })
}

let editSlide = (req, res) => {
    db.collection('slide').updateOne({ _id: ObjectId(req.body._id) }, { $set: req.body }, (err, result) => {
        if (err) throw err;
        res.json({ ...result, msg: returnResponseMsg('slide', 'edit') });
    });
}

let deleteSlide = async (req, res) => {
    let result = await deleteElement('slide', req.params.id);
    res.json({ ...result, msg: returnResponseMsg('slide', 'delete') });
}

module.exports = {
    getSlides,
    createSlide,
    editSlide,
    deleteSlide
}