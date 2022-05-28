var conn = require('../mysqlConnection');

let getSlides = (req, res) => {
    let { id } = req.params;
    let sql = 'SELECT * FROM slide WHERE slideshow_id = ?';

    conn.query(sql, [id], (err, result) => {
        res.json(result);
    })
}

let createSlide = (req, res) => {
    let { image, video_url, website_url, duration, slideshow_id } = req.body;
    let sql = `INSERT INTO slide (image, video_url, website_url, duration, slideshow_id ) 
    VALUES(?, ?, ?, ?, ?)`;

    conn.query(sql, [image, video_url, website_url, duration, slideshow_id], (err, result) => {
        if (err) return res.json(err);

        res.json(result);
    })
}

let editSlide = (req, res) => {
    let { id, image, video_url, website_url, duration } = req.body;
    let sql = 'UPDATE slide SET image = ?, video_url = ?, website_url = ?, duration = ? WHERE id = ?';

    conn.query(sql, [image, video_url, website_url, duration, id], (err, result) => {
        if (err) return res.json(err);

        res.json(result);
    })
}

let deleteSlide = (req, res) => {
    let { id } = req.params;
    let sql = 'DELETE FROM slide WHERE id = ?';

    conn.query(sql, [id], (err, result) => {
        if (err) return res.json(err);

        res.json(result);
    })
}

module.exports = {
    getSlides,
    createSlide,
    editSlide,
    deleteSlide
}