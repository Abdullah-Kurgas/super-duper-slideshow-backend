var conn = require('../mysqlConnection');

let slideSql = 'SELECT * FROM slide WHERE slideshow_id = ?';

let getUuid = (req, res) => {
    let sql = 'SELECT uuid() AS uuid';

    conn.query(sql, (err, result) => {
        if (err) return res.json(err);
        res.json(result[0] || {});
    })
}

let getSlideshows = (req, res) => {
    let { id } = req.params;
    let sql = 'SELECT * FROM slideshow WHERE user_id = ?';

    conn.query(sql, [id], (err, result) => {
        if (result?.length == 0 || !result) {
            res.json(result)
            return;
        };
        let slideshows = [];

        result.forEach((el) => {
            conn.query(slideSql, [el.url], (err, result2) => {
                let data = { ...el }
                data.slides = result2;
                slideshows.push(data);

                if (slideshows?.length == result?.length) {
                    res.json(slideshows);
                }
            })
        });

    })
}

let getSlideshow = (req, res) => {
    let { uuid } = req.body;
    let sql = 'SELECT * FROM slideshow WHERE url = ?';

    conn.query(sql, [uuid], (err, result) => {
        conn.query(slideSql, [uuid], (err, result2) => {
            let data = { ...result?.[0] }
            data.slides = result2;

            res.json(data || {});
        })
    })
}

let createSlideshow = (req, res) => {
    let { name, url, user_id } = req.body;
    let sql = `INSERT INTO slideshow (name, url, user_id, created_date) VALUES (?, ?, ?, NOW());`;

    conn.query(sql, [name, url, user_id], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    })
}

let editSlideshow = (req, res) => {
    let { id, name } = req.body;
    let sql = 'UPDATE slideshow SET name = ? WHERE id = ?';

    conn.query(sql, [name, id], (err, result) => {
        if (err) return res.json(err);

        res.json(result);
    })
}

let deleteSlideshow = (req, res) => {
    let { url } = req.params;
    let slideSql = `DELETE FROM slide WHERE slideshow_id = ?`;
    let slideshowSql = 'DELETE FROM slideshow WHERE url = ?';


    conn.query(slideSql, [url], (err, result) => {
        if (err) return res.json(err);

        conn.query(slideshowSql, [url], (err, result) => {
            if (err) return res.json(err);

            res.json(result);
        })
    })


}


module.exports = {
    getUuid,
    getSlideshow,
    getSlideshows,
    createSlideshow,
    editSlideshow,
    deleteSlideshow
}