const { ObjectId } = require("mongodb");
const mongodb = require("../mysqlConnection");
const { getSlidesFunc, generateUuid, returnResponseMsg } = require("./action-service");

const db = mongodb.db();

let getSlideshows = async (req, res) => {
    let { id } = req.params;
    var listSlideshow = [];

    let slideshows = await db.collection('slideshow').find({ user_id: id }).toArray();
    
    if(slideshows.length == 0) return res.json(slideshows);

    slideshows.forEach(async (slideshow) => {
        slideshow.slides = await getSlidesFunc(slideshow.url);
        listSlideshow.push(slideshow);

        if (listSlideshow.length == slideshows.length) {
            res.json(listSlideshow);
        }
    })
}

let getSlideshow = (req, res) => {
    let { uuid } = req.body;

    db.collection('slideshow').findOne({ url: uuid }, async (err, result) => {
        if (err) throw err;

        result.slides = await getSlidesFunc(result.url);

        res.json(result);
    })
}

let createSlideshow = (req, res) => {
    let generatedUuid = generateUuid();

    db.collection('slideshow').insertOne({ ...req.body, url: generatedUuid, created_at: new Date().toLocaleString() }, (err, result) => {
        if (err) throw err;
        res.json({ ...result, uuid: generatedUuid, msg: returnResponseMsg('slideshow', 'create') });
    });
}

let editSlideshow = (req, res) => {
    let { _id, name } = req.body;

    db.collection('slideshow').updateOne({ _id: ObjectId(_id) }, { $set: { name: name } }, (err, result) => {
        if (err) throw err;
        res.json({ ...result, msg: returnResponseMsg('slideshow', 'edit') });
    })
}

let deleteSlideshow = async (req, res) => {
    let { url } = req.params;

    await db.collection('slide').deleteMany({ slideshow_id: url })
    
    let deletedSlideshow = await db.collection('slideshow').deleteOne({ url: url });

    res.json({ ...deletedSlideshow, msg: returnResponseMsg('slideshow', 'delete') })

}


module.exports = {
    getSlideshow,
    getSlideshows,
    createSlideshow,
    editSlideshow,
    deleteSlideshow
}