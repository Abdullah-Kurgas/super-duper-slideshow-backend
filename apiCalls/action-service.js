const mongodb = require("../mysqlConnection");
const { v4: uuid } = require('uuid');
const { ObjectId } = require("mongodb");

const db = mongodb.db();

let generateUuid = () => {
    return uuid();
}

let getElementById = async (id, collection) => {
    let element = await db.collection(collection).findOne({ _id: id });
    return element;
}

let getSlidesFunc = async (id) => {
    let slides = await db.collection('slide').find({ slideshow_id: id }).toArray();
    return slides;
}

let deleteElement = async (table, id) => {
    return await db.collection(table).deleteOne({ _id: ObjectId(id) });
}

let returnResponseMsg = (db, type) => {
    return (db.split('')[0].toUpperCase() + db.substring(1)) + ' has been successfully ' + type + 'd';
}


module.exports = {
    getSlidesFunc,
    generateUuid,
    returnResponseMsg,
    deleteElement,
    getElementById
}