var conn = require('../mysqlConnection');

let getSlides = (req: any, res: any) => {
    let { id } = req.params;
    let sql = 'SELECT * FROM slide WHERE slideshow_id = ?';

    conn.query(sql, [id], (err: any, result: any) => {
        res.json(result);
    })
}

let createSlide = (req: any, res: any) => {
    let { image, video_url, website_url, duration, slideshow_id } = req.body;
    let sql = `INSERT INTO slide (${image ? 'image' : video_url ? 'video_url' : 'website_url'}, duration, slideshow_id ) 
    VALUES(?, ?, ?)`;

    conn.query(sql, [(image || video_url || website_url), duration, slideshow_id], (err: any, result: any) => {
        if (err) return res.json(err);

        res.json(result);
    })
}

let editSlide = (req: any, res: any) => {
    let { id, image, video_url, website_url, duration } = req.body;
    let sql = 'UPDATE slide SET image = ?, video_url = ?, website_url = ?, duration = ? WHERE id = ?';

    conn.query(sql, [image, video_url, website_url, duration, id], (err: any, result: any) => {
        if (err) return res.json(err);

        res.json(result);
    })
}

let deleteSlide = (req: any, res: any) => {
    let { id } = req.params;
    let sql = 'DELETE FROM slide WHERE id = ?';

    conn.query(sql, [id], (err: any, result: any) => {
        if (err) return res.json(err);

        res.json(result);
    })
}

export {
    getSlides,
    createSlide,
    editSlide,
    deleteSlide
}