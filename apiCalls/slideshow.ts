var conn = require('../mysqlConnection');

let slideSql = 'SELECT * FROM slide WHERE slideshow_id = ?';

let getUuid = (req: any, res: any) => {
    let sql = 'SELECT uuid() AS uuid';

    conn.query(sql, (err: any, result: any) => {
        if (err) return res.json(err);
        res.json(result[0] || {});
    })
}

let getSlideshows = (req: any, res: any) => {
    let { id } = req.params;
    let sql = 'SELECT * FROM slideshow WHERE user_id = ?';

    conn.query(sql, [id], (err: any, result: any) => {
        let slideshows: any = [];

        result.forEach((el: any) => {
            conn.query(slideSql, [el.id], (err: any, result2: any) => {
                let data = { ...el }
                data.slides = result2;
                slideshows.push(data);

                if (slideshows.length == result.length) {
                    res.json(slideshows);
                }
            })
        });

    })
}

let getSlideshow = (req: any, res: any) => {
    let { uuid } = req.body;
    let sql = 'SELECT * FROM slideshow WHERE url = ?';

    conn.query(sql, [uuid], (err: any, result: any) => {
        conn.query(slideSql, [uuid], (err: any, result2: any) => {
            let data = { ...result[0] }
            data.slides = result2;

            res.json(data || {});
        })
    })
}

let createSlideshow = (req: any, res: any) => {
    let { name, url, user_id } = req.body;
    let sql = `INSERT INTO slideshow (name, url, user_id, created_date) VALUES (?, ?, ?, NOW());`;

    conn.query(sql, [name, url, user_id], (err: any, result: any) => {
        if (err) return res.json(err);
        res.json(result);
    })
}

let editSlideshow = (req: any, res: any) => {
    let { id, name } = req.body;
    let sql = 'UPDATE slideshow SET name = ? WHERE id = ?';

    conn.query(sql, [name, id], (err: any, result: any) => {
        if (err) return res.json(err);

        res.json(result);
    })
}

let deleteSlideshow = (req: any, res: any) => {
    let { id } = req.params;
    let sql = 'DELETE FROM slideshow WHERE id = ?';

    conn.query(sql, [id], (err: any, result: any) => {
        if (err) return res.json(err);
        res.json(result);
    })
}


export {
    getUuid,
    getSlideshow,
    getSlideshows,
    createSlideshow,
    editSlideshow,
    deleteSlideshow
}