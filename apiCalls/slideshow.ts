var conn = require('../mysqlConnection');

let getUuid = (req: any, res: any) => {
    let sql = 'SELECT uuid() AS uuid';

    conn.query(sql, (err: any, result: any) => {
        res.json(result[0] || {});
    })
}

let getSlideshow = (req: any, res: any) => {
    let { url } = req.params;
    let sql = 'SELECT * FROM slideshow WHERE url = ?;';

    conn.query(sql, [url], (err: any, result: any) => {
        res.json(result[0] || {});
    })

}

let createSlideshow = (req: any, res: any) => {
    let { name, url, user_id } = req.body;
    let sql = `INSERT INTO slideshow (name, url, user_id) VALUES (?, ?, ?);`;

    conn.query(sql, [name, url, user_id], (err: any, result: any) => {
        res.json(result);
    })
}


export {
    getUuid,
    getSlideshow,
    createSlideshow
}